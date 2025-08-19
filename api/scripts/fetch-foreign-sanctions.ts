/**
 * 飞书API搜索外国管制/制裁新闻数据脚本
 * 根据feishu-api-records-search.md的说明调用飞书多维表格API
 */

import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// ESM模式的__dirname设置
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 飞书API配置 - 外国管制/制裁
const FEISHU_CONFIG = {
  APP_TOKEN: 'Bkasbun8ua4fQ6suGjvcKGT3nre',
  TABLE_ID: 'tbl6aOnlKdxnVqj6',
  BASE_URL: 'https://open.feishu.cn/open-apis'
};

// 新增：通过 app_id + app_secret 动态获取 tenant_access_token
async function getTenantAccessToken(): Promise<string> {
  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;
  if (!appId || !appSecret) {
    throw new Error('缺少 FEISHU_APP_ID 或 FEISHU_APP_SECRET，请在 .env 中配置');
  }
  const url = `${FEISHU_CONFIG.BASE_URL}/auth/v3/tenant_access_token/internal`;
  const resp = await axios.post(url, { app_id: appId, app_secret: appSecret }, { headers: { 'Content-Type': 'application/json' } });
  if (resp.data && resp.data.code === 0 && resp.data.tenant_access_token) {
    return resp.data.tenant_access_token as string;
  }
  throw new Error(`获取 tenant_access_token 失败: ${resp.data?.msg || 'unknown error'}`);
}

// 需求：仅获取前100条并输出到固定文件名
const TARGET_LIMIT = 100;
const OUTPUT_JSON_FILENAME = 'foreign-sanctions-news-2025-08-18.json';
const WRITE_MARKDOWN = false; // 避免生成不必要的文件

// 删除以下旧代码：
// const TENANT_ACCESS_TOKEN = process.env.FEISHU_TENANT_TOKEN || '';
// if (!TENANT_ACCESS_TOKEN) {
//   console.error('环境变量 FEISHU_TENANT_TOKEN 未设置，请在 .env 中配置后重试。');
//   process.exit(1);
// }

// 接口定义
interface FeishuNewsRecord {
  record_id: string;
  fields: {
    '新闻标题-中文': Array<{ text: string; type: string }>;
    '发布机构': Array<{ text: string; type: string }>;
    '配置列-仅日期': { type: number; value: number[] };
    'AI 总结': Array<{ text: string; type: string }>;
    '原文链接': Array<{ text: string; type: string }>;
    '行业分类': string;
    '相关性判断': Array<{ text: string; type: string }>;
    'role': Array<{ text: string; type: string }>;
  };
}

interface FeishuApiResponse {
  code: number;
  msg: string;
  data: {
    has_more: boolean;
    items: FeishuNewsRecord[];
    page_token?: string;
    total: number;
  };
}

/**
 * 调用飞书API搜索记录
 */
async function fetchFeishuRecords(accessToken: string, pageToken?: string): Promise<FeishuApiResponse> {
  const url = `${FEISHU_CONFIG.BASE_URL}/bitable/v1/apps/${FEISHU_CONFIG.APP_TOKEN}/tables/${FEISHU_CONFIG.TABLE_ID}/records/search`;
  
  const requestBody = {
    field_names: [
      '新闻标题-中文',
      '发布机构', 
      '配置列-仅日期',
      'AI 总结',
      '原文链接',
      '行业分类',
      '相关性判断',
      'role'
    ],
    sort: [{
      field_name: '发布时间-北京-database',
      desc: true
    }],
    filter: {
      conjunction: 'and',
      conditions: [{
        field_name: '相关性判断',
        operator: 'is',
        value: ['相关']
      }]
    },
    automatic_fields: false,
    page_size: 100 // 拉取更大的分页，加速获取到前100条
  } as any;

  // 如果有分页token，添加到请求体中
  if (pageToken) {
    requestBody.page_token = pageToken;
  }

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json; charset=utf-8'
  };

  const response: AxiosResponse<FeishuApiResponse> = await axios.post(url, requestBody, { headers });
  return response.data;
}

/**
 * 格式化新闻记录为可读格式
 */
function formatNewsRecord(record: FeishuNewsRecord): any {
  const extractText = (field: Array<{ text: string; type: string }> | undefined): string => {
    return field && field.length > 0 ? field[0].text : '';
  };

  const formatDate = (dateField: { type: number; value: number[] } | undefined): string => {
    if (!dateField || !dateField.value || dateField.value.length === 0) {
      return '';
    }
    const timestamp = dateField.value[0];
    return new Date(timestamp).toISOString().split('T')[0]; // 返回 YYYY-MM-DD 格式
  };

  return {
    record_id: record.record_id,
    title: extractText(record.fields['新闻标题-中文']),
    publisher: extractText(record.fields['发布机构']),
    publish_date: formatDate(record.fields['配置列-仅日期']),
    summary: extractText(record.fields['AI 总结']),
    original_link: extractText(record.fields['原文链接']),
    industry_category: record.fields['行业分类'] || '',
    relevance: extractText(record.fields['相关性判断']),
    role: extractText(record.fields['role'])
  };
}

/**
 * 主函数：获取所有相关新闻数据（前100条）
 */
async function main() {
  console.log('开始获取外国管制/制裁新闻数据...');
  
  // 新增：运行时获取 tenant_access_token
  const accessToken = await getTenantAccessToken();
  
  const allRecords: any[] = [];
  let pageToken: string | undefined;
  let hasMore = true;
  let pageCount = 0;

  try {
    while (hasMore && pageCount < 10 && allRecords.length < TARGET_LIMIT) { // 限制最多10页，且只收集到100条
      pageCount++;
      console.log(`正在获取第 ${pageCount} 页数据...`);
      
      const response = await fetchFeishuRecords(accessToken, pageToken);
      
      if (response.code !== 0) {
        throw new Error(`飞书API返回错误: ${response.msg}`);
      }

      // 格式化并添加记录
      const formattedRecords = response.data.items.map(formatNewsRecord);
      allRecords.push(...formattedRecords);

      // 如果超过目标上限，只保留前100条
      if (allRecords.length >= TARGET_LIMIT) {
        allRecords.length = TARGET_LIMIT;
        hasMore = false;
      } else {
        // 检查是否还有更多数据
        hasMore = response.data.has_more;
        pageToken = response.data.page_token;
      }
      
      console.log(`当前累计 ${allRecords.length} 条记录（目标 ${TARGET_LIMIT}）`);
      
      // 为避免API限制，添加延迟
      if (hasMore) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }

    console.log(`最终共获取到 ${allRecords.length} 条相关新闻记录`);

    // 生成结果文档
    const resultData = {
      fetch_time: new Date().toISOString(),
      total_records: allRecords.length,
      source: {
        app_token: FEISHU_CONFIG.APP_TOKEN,
        table_id: FEISHU_CONFIG.TABLE_ID,
        category: '外国管制/制裁'
      },
      records: allRecords
    };

    // 保存到JSON文件（固定文件名）
    const outputDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, OUTPUT_JSON_FILENAME);
    fs.writeFileSync(outputPath, JSON.stringify(resultData, null, 2), 'utf-8');
    
    console.log(`数据已保存到: ${outputPath}`);
    
    if (WRITE_MARKDOWN) {
      // 同时保存一个格式化的Markdown文档（可选）
      const markdownContent = generateMarkdownReport(resultData);
      const mdOutputPath = path.join(outputDir, OUTPUT_JSON_FILENAME.replace(/\.json$/, '.md'));
      fs.writeFileSync(mdOutputPath, markdownContent, 'utf-8');
      console.log(`Markdown报告已保存到: ${mdOutputPath}`);
    }
    
    // 显示前几条数据样例
    console.log('\n=== 数据样例 (前3条) ===');
    allRecords.slice(0, 3).forEach((record, index) => {
      console.log(`\n[${index + 1}] ${record.title}`);
      console.log(`    发布机构: ${record.publisher}`);
      console.log(`    发布日期: ${record.publish_date}`);
      console.log(`    行业分类: ${record.industry_category}`);
      console.log(`    原文链接: ${record.original_link}`);
      console.log(`    AI总结: ${record.summary.substring(0, 100)}...`);
    });

  } catch (error) {
    console.error('获取数据时发生错误:', error);
    process.exit(1);
  }
}

/**
 * 生成Markdown格式的报告
 */
function generateMarkdownReport(data: any): string {
  const { fetch_time, total_records, source, records } = data;
  
  let markdown = `# 外国管制/制裁新闻数据报告

## 基本信息
- **获取时间**: ${fetch_time}
- **数据源**: 飞书多维表格
- **应用Token**: ${source.app_token}
- **表格ID**: ${source.table_id}
- **数据类别**: ${source.category}
- **记录总数**: ${total_records}

## 数据概览

`;

  // 统计信息
  const publisherStats: Record<string, number> = {};
  const industryStats: Record<string, number> = {};
  
  records.forEach((record: any) => {
    if (record.publisher) {
      publisherStats[record.publisher] = (publisherStats[record.publisher] || 0) + 1;
    }
    if (record.industry_category) {
      industryStats[record.industry_category] = (industryStats[record.industry_category] || 0) + 1;
    }
  });

  markdown += `### 发布机构分布
`;
  Object.entries(publisherStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .forEach(([publisher, count]) => {
      markdown += `- ${publisher}: ${count}条\n`;
    });

  markdown += `\n### 行业分类分布
`;
  Object.entries(industryStats)
    .sort(([,a], [,b]) => b - a)
    .forEach(([industry, count]) => {
      markdown += `- ${industry}: ${count}条\n`;
    });

  markdown += `\n## 详细记录

`;

  // 详细记录列表
  records.forEach((record: any, index: number) => {
    markdown += `### ${index + 1}. ${record.title}

- **发布机构**: ${record.publisher}
- **发布日期**: ${record.publish_date}
- **行业分类**: ${record.industry_category}
- **原文链接**: ${record.original_link}
- **记录ID**: ${record.record_id}

**AI总结**:
${record.summary}

---

`;
  });

  return markdown;
}

// 运行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { fetchFeishuRecords, formatNewsRecord };