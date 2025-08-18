import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, AlertCircle, ExternalLink, Brain, FileText, Loader2, Building, Briefcase, Search, Globe } from 'lucide-react';
import { toast } from 'sonner';
import NewsFilter from '../components/NewsFilter';
import { newsAPI, NewsItem, mockNewsData } from '../services/api';
import AIModal from '../components/AIModal';
import { useThemeStore } from '../stores/themeStore';

const News: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    category: '全部资讯',
    publisher: '',
    field: '',
    industry: '',
    search: ''
  });
  const [aiModal, setAiModal] = useState<{
    isOpen: boolean;
    type: 'interpretation' | 'compliance';
    newsTitle: string;
  }>({ isOpen: false, type: 'interpretation', newsTitle: '' });

  const categories = [
    { id: 'all', name: '全部资讯', icon: Globe },
    { id: 'china-sanctions', name: '中国管制/制裁', icon: Building },
    { id: 'foreign-sanctions', name: '外国制裁', icon: Briefcase },
    { id: 'data-ai', name: '数据合规/AI', icon: Search },
    { id: 'foreign-media', name: '外媒报道', icon: Calendar }
  ];

  const publishers = ['美国财政部', '欧盟委员会', '英国政府', '加拿大政府', '澳大利亚政府'];
  const fields = ['金融制裁', '贸易管制', '数据保护', '人工智能', '网络安全'];
  const industries = ['金融服务', '科技行业', '制造业', '能源行业', '行业通用'];

  useEffect(() => {
    fetchNews();
  }, [filters]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // Simulated data for now
      const mockData: NewsItem[] = [
        {
          id: '1',
          title: '美国财政部发布新制裁措施',
          content: '美国财政部今日宣布对多家中国企业实施新的制裁措施...',
          publishTime: '2024-01-15',
          publisher: '美国财政部',
          category: 'foreign-sanctions',
          field: 'finance',
          industry: '金融',
          importance: '高',
          region: '美国'
        },
        {
          id: '2',
          title: 'GDPR合规新要求解读',
          content: '欧盟发布GDPR合规新要求，对数据处理提出更严格标准...',
          publishTime: '2024-01-14',
          publisher: '欧盟委员会',
          category: 'data-ai',
          field: 'data-protection',
          industry: '科技',
          importance: '中',
          region: '欧盟'
        }
      ];
      
      setNews(mockData);
    } catch (error) {
      toast.error('获取资讯失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleAIAnalysis = (newsId: string, type: 'interpretation' | 'compliance') => {
    const message = type === 'interpretation' ? 'AI解读功能开发中...' : '合规建议功能开发中...';
    toast.info(message, {
      duration: 2000,
    });
  };

  useEffect(() => {
    loadNews();
  }, [filters]);

  const loadNews = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        category: filters.category === '全部资讯' ? undefined : filters.category,
        publisher: filters.publisher || undefined,
        field: filters.field || undefined,
        industry: filters.industry || undefined,
        page,
        pageSize: 20
      };

      const response = await newsAPI.getNews(params);
      
      if (response.success) {
        if (page === 1) {
          setNews(response.data.records);
        } else {
          setNews(prev => [...prev, ...response.data.records]);
        }
        setHasMore(response.data.hasMore);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Failed to load news:', error);
      // Use mock data as fallback
      if (page === 1) {
        const filteredMockData = mockNewsData.filter(item => {
          const matchesCategory = filters.category === '全部资讯' || item.category === filters.category;
          const matchesSearch = !filters.search || 
            item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            item.content.toLowerCase().includes(filters.search.toLowerCase());
          const matchesPublisher = !filters.publisher || item.publisher === filters.publisher;
          const matchesField = !filters.field || item.field === filters.field;
          const matchesIndustry = !filters.industry || item.industry === filters.industry;
          
          return matchesCategory && matchesSearch && matchesPublisher && matchesField && matchesIndustry;
        });
        setNews(filteredMockData);
        setHasMore(false);
      }
      toast.error('加载新闻失败，显示模拟数据');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadNews(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`mb-4 text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>即时资讯</h1>
          <p className={`${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>实时跟踪全球跨境合规动态</p>
        </div>

        {/* Filter Component */}
        <NewsFilter
          currentFilters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* News List */}
        {loading && news.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDarkMode ? 'border-white' : 'border-gray-900'}`}></div>
          </div>
        ) : (
          <div className="space-y-6">
            {news.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg p-6 backdrop-blur-sm transition-all ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20' 
                    : 'bg-white shadow-lg border border-gray-200 hover:shadow-xl'
                }`}
              >
                <div className={`mb-4 flex flex-wrap items-center gap-4 text-sm ${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>
                  <span>{item.publishTime}</span>
                  <span>•</span>
                  <span>{item.publisher}</span>
                  <span>•</span>

                  <span className={`rounded px-2 py-1 text-xs ${
                    isDarkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.industry}
                  </span>
                </div>
                <h3 className={`mb-3 text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`mb-4 ${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>
                  {item.content}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={item.link || `#news-${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      isDarkMode 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    查看原文
                  </a>
                  <button
                    onClick={() => {
                      setAiModal({
                        isOpen: true,
                        type: 'interpretation',
                        newsTitle: item.title
                      });
                    }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      isDarkMode 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    AI解读
                  </button>
                  <button
                    onClick={() => {
                      setAiModal({
                        isOpen: true,
                        type: 'compliance',
                        newsTitle: item.title
                      });
                    }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      isDarkMode 
                        ? 'bg-purple-600 text-white hover:bg-purple-700' 
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    合规建议
                  </button>
                </div>
              </div>
            ))}

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center pt-8">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
                    isDarkMode 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className={`animate-spin rounded-full h-4 w-4 border-b-2 ${isDarkMode ? 'border-white' : 'border-white'}`}></div>
                      加载中...
                    </>
                  ) : (
                    '加载更多'
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && news.length === 0 && (
          <div className="rounded-lg bg-white/10 p-8 text-center backdrop-blur-sm">
            <p className="text-blue-200">暂无符合条件的资讯</p>
          </div>
        )}

        {/* AI Modal */}
        <AIModal
          isOpen={aiModal.isOpen}
          onClose={() => setAiModal(prev => ({ ...prev, isOpen: false }))}
          type={aiModal.type}
          newsTitle={aiModal.newsTitle}
        />
      </div>
    </div>
  );
};

export default News;