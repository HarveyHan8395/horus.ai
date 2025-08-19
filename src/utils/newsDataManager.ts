// News Data Manager - 整合四个数据源的新闻管理器
import foreignSanctionsData from '../../data/foreign-sanctions-news-2025-08-18.json';
import chinaSanctionsData from '../../data/china-sanctions-news-2025-08-18.json';
import foreignMediaData from '../../data/foreign-media-news-2025-08-18.json';
import dataComplianceData from '../../data/data-compliance-news-2025-08-18.json';

export interface NewsRecord {
  record_id: string;
  title: string;
  publisher: string;
  publish_date: string;
  summary: string;
  original_link: string;
  industry_category: string | string[];
  relevance: string;
  role: string;
}

export interface ProcessedNewsItem {
  id: string;
  title: string;
  content: string;
  publishTime: string;
  publisher: string;
  category: string;
  field: string;
  industry: string | string[];
  importance: string;
  region: string;
  link: string;
  dataSource: 'china-sanctions' | 'foreign-sanctions' | 'foreign-media' | 'data-compliance';
}

// 数据源与分类映射
const DATA_SOURCE_CATEGORY_MAP = {
  'china-sanctions': '中国管制/制裁',
  'foreign-sanctions': '外国管制/制裁',
  'foreign-media': '外国媒体报道',
  'data-compliance': '数据合规/AI资讯'
} as const;

// 根据行业分类推断专业领域
const inferFieldFromIndustry = (industries: string | string[]): string => {
  const industriesArray = Array.isArray(industries) ? industries : [industries || ''];
  const industriesStr = industriesArray.join(' ').toLowerCase();
  
  if (industriesStr.includes('金融') || industriesStr.includes('保险')) {
    return '制裁合规';
  }
  if (industriesStr.includes('高科技') || industriesStr.includes('芯片')) {
    return '出口管制';
  }
  if (industriesStr.includes('互联网') || industriesStr.includes('数据') || industriesStr.includes('ai')) {
    return 'AI治理';
  }
  if (industriesStr.includes('能源') || industriesStr.includes('光伏')) {
    return '投资审查';
  }
  return '制裁合规'; // 默认领域
};

// 处理单个记录
const processRecord = (record: any, dataSource: keyof typeof DATA_SOURCE_CATEGORY_MAP): ProcessedNewsItem => {
  const industriesArray = Array.isArray(record.industry_category)
    ? record.industry_category
    : (record.industry_category ? [record.industry_category] : ['行业通用']);

  return {
    id: record.record_id,
    title: record.title,
    content: record.summary || '',
    publishTime: record.publish_date,
    publisher: record.publisher,
    category: DATA_SOURCE_CATEGORY_MAP[dataSource],
    field: inferFieldFromIndustry(industriesArray),
    industry: industriesArray,
    importance: '高',
    region: dataSource.includes('china') ? '中国' : '国际',
    link: record.original_link || '#',
    dataSource
  };
};

// 获取所有新闻数据
export const getAllNewsData = (): ProcessedNewsItem[] => {
  const allRecords: ProcessedNewsItem[] = [];

  // 处理每个数据源
  const dataSources = [
    { data: chinaSanctionsData, source: 'china-sanctions' as const },
    { data: foreignSanctionsData, source: 'foreign-sanctions' as const },
    { data: foreignMediaData, source: 'foreign-media' as const },
    { data: dataComplianceData, source: 'data-compliance' as const }
  ];

  dataSources.forEach(({ data, source }) => {
    if (data && data.records && Array.isArray(data.records)) {
      const processedRecords = data.records.map((record: any) => 
        processRecord(record, source)
      );
      allRecords.push(...processedRecords);
    }
  });

  // 按发布时间降序排序
  return allRecords.sort((a, b) => {
    const dateA = new Date(a.publishTime);
    const dateB = new Date(b.publishTime);
    return dateB.getTime() - dateA.getTime();
  });
};

// 获取筛选选项
export const getFilterOptions = () => {
  const allNews = getAllNewsData();
  
  const publishers = [...new Set(allNews.map(item => item.publisher))].filter(Boolean);
  const fields = [...new Set(allNews.map(item => item.field))].filter(Boolean);
  const industries = [...new Set(
    allNews.flatMap(item => Array.isArray(item.industry) ? item.industry : [item.industry])
  )].filter(Boolean);
  const categories = Object.values(DATA_SOURCE_CATEGORY_MAP);

  return {
    publishers: publishers.sort(),
    fields: fields.sort(),
    industries: industries.sort(),
    categories: categories.sort()
  };
};

// 筛选新闻
export const filterNews = (
  allNews: ProcessedNewsItem[],
  filters: {
    category?: string;
    publisher?: string;
    field?: string;
    industry?: string;
    search?: string;
  }
) => {
  return allNews.filter(item => {
    const matchesCategory = !filters.category || 
      filters.category === '全部资讯' || 
      item.category === filters.category;
      
    const matchesSearch = !filters.search ||
      item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.content.toLowerCase().includes(filters.search.toLowerCase());
      
    const matchesPublisher = !filters.publisher || item.publisher === filters.publisher;
    
    const matchesField = !filters.field || item.field === filters.field;
    
    const matchesIndustry = !filters.industry || 
      (Array.isArray(item.industry) ? 
        item.industry.includes(filters.industry) : 
        item.industry === filters.industry);

    return matchesCategory && matchesSearch && matchesPublisher && matchesField && matchesIndustry;
  });
};

// 获取数据统计
export const getNewsStats = () => {
  const allNews = getAllNewsData();
  const categories = Object.values(DATA_SOURCE_CATEGORY_MAP);
  
  const stats = categories.reduce((acc, category) => {
    acc[category] = allNews.filter(item => item.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: allNews.length,
    byCategory: stats,
    lastUpdated: new Date().toISOString()
  };
};