import axios from 'axios';

// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens or other headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Types
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  publisher: string;
  field: string;
  industry: string;
  publishTime: string;
  importance: string;
  region: string;
  category: string;
  link?: string;
}

export interface NewsResponse {
  success: boolean;
  data: {
    records: NewsItem[];
    total: number;
    hasMore: boolean;
  };
}

export interface FilterOptions {
  publishers: string[];
  fields: string[];
  industries: string[];
  categories: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface DailyNewsResponse {
  success: boolean;
  data: {
    records: NewsItem[];
    stats: Record<string, number>;
    total: number;
    date: string;
  };
}

// API functions
export const newsAPI = {
  // Get news with filters
  getNews: async (params: {
    category?: string;
    publisher?: string;
    field?: string;
    industry?: string;
    page?: number;
    pageSize?: number;
  }): Promise<NewsResponse> => {
    return api.get('/feishu/news', { params });
  },

  // Get filter options
  getFilterOptions: async (): Promise<{ success: boolean; data: FilterOptions }> => {
    return api.get('/feishu/filters');
  },

  // Get daily news
  getDailyNews: async (date: string): Promise<DailyNewsResponse> => {
    return api.get(`/feishu/daily/${date}`);
  },

  // Submit contact form
  submitContact: async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    return api.post('/feishu/contact', data);
  },
};

// Mock data for development (when API is not available)
export const mockNewsData: NewsItem[] = [
  {
    id: '1',
    title: '美国商务部发布新一轮半导体出口管制措施',
    content: '美国商务部工业与安全局(BIS)宣布对中国半导体行业实施更严格的出口管制措施，涉及先进制程芯片和相关设备...',
    publisher: '美国商务部',
    field: '出口管制',
    industry: '半导体',
    publishTime: '2024-01-15T10:30:00Z',
    importance: '高',
    region: '美国',
    category: '外国管制/制裁',
    link: 'https://example.com/news/1'
  },
  {
    id: '2',
    title: '欧盟通过《人工智能法案》最终版本',
    content: '欧洲议会正式通过《人工智能法案》，这是全球首部全面规范AI技术的法律框架，将对高风险AI系统实施严格监管...',
    publisher: '欧盟委员会',
    field: '数据合规',
    industry: '人工智能',
    publishTime: '2024-01-14T14:20:00Z',
    importance: '高',
    region: '欧盟',
    category: '数据合规/AI资讯',
    link: 'https://example.com/news/2'
  },
  {
    id: '3',
    title: '中国发布《数据出境安全评估办法》实施细则',
    content: '国家网信办发布数据出境安全评估实施细则，明确了数据出境的申报流程、评估标准和监管要求...',
    publisher: '国家网信办',
    field: '数据合规',
    industry: '数据安全',
    publishTime: '2024-01-13T09:15:00Z',
    importance: '中',
    region: '中国',
    category: '中国管制/制裁',
    link: 'https://example.com/news/3'
  }
];

export const mockFilterOptions: FilterOptions = {
  publishers: ['美国商务部', '欧盟委员会', '国家网信办', '英国政府', '日本经产省'],
  fields: ['出口管制', '数据合规', '金融制裁', '投资审查', '网络安全'],
  industries: ['半导体', '人工智能', '数据安全', '金融科技', '新能源'],
  categories: ['中国管制/制裁', '外国管制/制裁', '数据合规/AI资讯', '外国媒体报道']
};

// Contact API (alias for newsAPI.submitContact)
export const contactAPI = {
  submitContact: newsAPI.submitContact,
};

export default api;