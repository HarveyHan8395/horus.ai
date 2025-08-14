import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

// Feishu API configuration
const FEISHU_CONFIG = {
  APP_TOKEN: process.env.FEISHU_APP_TOKEN || '',
  APP_SECRET: process.env.FEISHU_APP_SECRET || '',
  NEWS_TABLE_ID: process.env.FEISHU_NEWS_TABLE_ID || '',
  CONTACT_TABLE_ID: process.env.FEISHU_CONTACT_TABLE_ID || '',
  BASE_URL: 'https://open.feishu.cn/open-apis'
};

// Interface definitions
interface NewsRecord {
  record_id: string;
  fields: {
    标题: string;
    内容: string;
    发布机构: string;
    专业领域: string;
    行业分类: string;
    发布时间: string;
    重要程度: string;
    地区: string;
    分类: string;
    链接?: string;
  };
}

interface ContactRecord {
  fields: {
    姓名: string;
    邮箱: string;
    公司名称?: string;
    联系电话?: string;
    咨询主题?: string;
    详细信息: string;
    提交时间: string;
    状态: string;
  };
}

// Get access token
async function getAccessToken(): Promise<string> {
  try {
    const response = await axios.post(
      `${FEISHU_CONFIG.BASE_URL}/auth/v3/tenant_access_token/internal`,
      {
        app_id: process.env.FEISHU_APP_ID,
        app_secret: FEISHU_CONFIG.APP_SECRET
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.code === 0) {
      return response.data.tenant_access_token;
    } else {
      throw new Error(`Failed to get access token: ${response.data.msg}`);
    }
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

// Get news data from Feishu
router.get('/news', async (req: Request, res: Response) => {
  try {
    const { category, publisher, field, industry, page = 1, pageSize = 20 } = req.query;
    
    const accessToken = await getAccessToken();
    
    // Build filter conditions
    const filter: any = {};
    if (category && category !== '全部资讯') {
      filter['分类'] = category;
    }
    if (publisher) {
      filter['发布机构'] = publisher;
    }
    if (field) {
      filter['专业领域'] = field;
    }
    if (industry) {
      filter['行业分类'] = industry;
    }

    const response = await axios.post(
      `${FEISHU_CONFIG.BASE_URL}/bitable/v1/apps/${FEISHU_CONFIG.APP_TOKEN}/tables/${FEISHU_CONFIG.NEWS_TABLE_ID}/records/search`,
      {
        filter,
        sort: [{
          field_name: '发布时间',
          desc: true
        }],
        page_size: parseInt(pageSize as string),
        page_token: page === 1 ? undefined : `page_${page}`
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.code === 0) {
      const records = response.data.data.items.map((item: any) => ({
        id: item.record_id,
        title: item.fields['标题'] || '',
        content: item.fields['内容'] || '',
        publisher: item.fields['发布机构'] || '',
        field: item.fields['专业领域'] || '',
        industry: item.fields['行业分类'] || '',
        publishTime: item.fields['发布时间'] || '',
        importance: item.fields['重要程度'] || '',
        region: item.fields['地区'] || '',
        category: item.fields['分类'] || '',
        link: item.fields['链接'] || ''
      }));

      res.json({
        success: true,
        data: {
          records,
          total: response.data.data.total,
          hasMore: response.data.data.has_more
        }
      });
    } else {
      throw new Error(`Feishu API error: ${response.data.msg}`);
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news data'
    });
  }
});

// Get filter options
router.get('/filters', async (req: Request, res: Response) => {
  try {
    const accessToken = await getAccessToken();
    
    // Get unique values for filter options
    const response = await axios.post(
      `${FEISHU_CONFIG.BASE_URL}/bitable/v1/apps/${FEISHU_CONFIG.APP_TOKEN}/tables/${FEISHU_CONFIG.NEWS_TABLE_ID}/records/search`,
      {
        page_size: 500 // Get more records to extract unique values
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.code === 0) {
      const records = response.data.data.items;
      
      // Extract unique values
      const publishers = [...new Set(records.map((item: any) => item.fields['发布机构']).filter(Boolean))];
      const fields = [...new Set(records.map((item: any) => item.fields['专业领域']).filter(Boolean))];
      const industries = [...new Set(records.map((item: any) => item.fields['行业分类']).filter(Boolean))];
      const categories = [...new Set(records.map((item: any) => item.fields['分类']).filter(Boolean))];

      res.json({
        success: true,
        data: {
          publishers,
          fields,
          industries,
          categories
        }
      });
    } else {
      throw new Error(`Feishu API error: ${response.data.msg}`);
    }
  } catch (error) {
    console.error('Error fetching filters:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch filter options'
    });
  }
});

// Submit contact form
router.post('/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, company, phone, subject, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, message'
      });
    }

    const accessToken = await getAccessToken();
    
    const contactRecord: ContactRecord = {
      fields: {
        '姓名': name,
        '邮箱': email,
        '公司名称': company || '',
        '联系电话': phone || '',
        '咨询主题': subject || '',
        '详细信息': message,
        '提交时间': new Date().toISOString(),
        '状态': '待处理'
      }
    };

    const response = await axios.post(
      `${FEISHU_CONFIG.BASE_URL}/bitable/v1/apps/${FEISHU_CONFIG.APP_TOKEN}/tables/${FEISHU_CONFIG.CONTACT_TABLE_ID}/records`,
      {
        records: [contactRecord]
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.code === 0) {
      res.json({
        success: true,
        message: 'Contact form submitted successfully',
        data: {
          recordId: response.data.data.records[0].record_id
        }
      });
    } else {
      throw new Error(`Feishu API error: ${response.data.msg}`);
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form'
    });
  }
});

// Get daily news summary
router.get('/daily/:date', async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const accessToken = await getAccessToken();
    
    // Filter by date
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const response = await axios.post(
      `${FEISHU_CONFIG.BASE_URL}/bitable/v1/apps/${FEISHU_CONFIG.APP_TOKEN}/tables/${FEISHU_CONFIG.NEWS_TABLE_ID}/records/search`,
      {
        filter: {
          '发布时间': {
            gte: startDate.toISOString(),
            lt: endDate.toISOString()
          }
        },
        sort: [{
          field_name: '重要程度',
          desc: true
        }, {
          field_name: '发布时间',
          desc: true
        }]
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.code === 0) {
      const records = response.data.data.items.map((item: any) => ({
        id: item.record_id,
        title: item.fields['标题'] || '',
        content: item.fields['内容'] || '',
        publisher: item.fields['发布机构'] || '',
        field: item.fields['专业领域'] || '',
        industry: item.fields['行业分类'] || '',
        publishTime: item.fields['发布时间'] || '',
        importance: item.fields['重要程度'] || '',
        region: item.fields['地区'] || '',
        category: item.fields['分类'] || ''
      }));

      // Group by category for statistics
      const stats = records.reduce((acc: any, record: any) => {
        const category = record.category || '其他';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

      res.json({
        success: true,
        data: {
          records,
          stats,
          total: records.length,
          date
        }
      });
    } else {
      throw new Error(`Feishu API error: ${response.data.msg}`);
    }
  } catch (error) {
    console.error('Error fetching daily news:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch daily news'
    });
  }
});

export default router;