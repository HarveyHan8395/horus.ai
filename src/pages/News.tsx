import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, AlertCircle, ExternalLink, Brain, FileText, Loader2, Building, Briefcase, Search, Globe } from 'lucide-react';
import { toast } from 'sonner';
import NewsFilter from '../components/NewsFilter';
import { newsAPI, NewsItem, mockNewsData } from '../services/api';
import AIModal from '../components/AIModal';
import { useThemeStore } from '../stores/themeStore';
// import removed: using centralized newsDataManager
import { getAllNewsData, filterNews } from '../utils/newsDataManager';

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
    { id: 'foreign-sanctions', name: '外国管制/制裁', icon: Briefcase },
    { id: 'data-ai', name: '数据合规/AI资讯', icon: Search },
    { id: 'foreign-media', name: '外国媒体报道', icon: Calendar }
  ];

  const publishers = ['美国财政部', '欧盟委员会', '英国政府', '加拿大政府', '澳大利亚政府'];
  const fields = ['金融制裁', '贸易管制', '数据保护', '人工智能', '网络安全'];
  const industries = ['互联网', '高科技', '芯片', '物流港口', '汽车/电池', '能源/光伏', '制造业', '金融/保险', '消费品', '行业通用'];

  useEffect(() => {
    loadNews();
  }, [filters]);

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
      
      // 整合四类新闻数据并应用筛选
      const allProcessed = getAllNewsData();
      const filteredProcessed = filterNews(allProcessed, filters);

      const allNews = filteredProcessed.map((item) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        publishTime: item.publishTime,
        publisher: item.publisher,
        category: item.category,
        field: item.field,
        industry: item.industry as any,
        importance: item.importance,
        region: item.region,
        link: item.link,
      }) as NewsItem);

      const pageSize = 20;
      const paginatedNews = allNews.slice((page - 1) * pageSize, page * pageSize);

      if (page === 1) {
        setNews(paginatedNews);
      } else {
        setNews(prev => [...prev, ...paginatedNews]);
      }
      
      setHasMore(paginatedNews.length > 0 && allNews.length > page * pageSize);
      setCurrentPage(page);

    } catch (error) {
      console.error('Failed to load news:', error);
      toast.error('加载新闻失败');
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
                    {Array.isArray(item.industry) ? item.industry.join(', ') : item.industry}
                  </span>
                </div>
                <h3 className={`mb-3 text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`mb-4 ${isDarkMode ? 'text-blue-200' : 'text-gray-600'} clamp-4`}>
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