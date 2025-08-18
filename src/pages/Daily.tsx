import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, FileText, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import AIModal from '../components/AIModal';
import { useThemeStore } from '../stores/themeStore';

interface DailyDigest {
  date: string;
  totalNews: number;
  categories: {
    'china-sanctions': number;
    'foreign-sanctions': number;
    'data-ai': number;
    'foreign-media': number;
  };
  highlights: {
    id: string;
    title: string;
    publisher: string;
    category: string;
    summary: string;
  }[];
}

const Daily: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyDigest, setDailyDigest] = useState<DailyDigest | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiModal, setAiModal] = useState<{
    isOpen: boolean;
    type: 'interpretation' | 'compliance';
    newsTitle: string;
  }>({ isOpen: false, type: 'interpretation', newsTitle: '' });

  const categoryNames = {
    'china-sanctions': '中国管制/制裁',
    'foreign-sanctions': '外国制裁',
    'data-ai': '数据合规/AI',
    'foreign-media': '外媒报道'
  };

  useEffect(() => {
    fetchDailyDigest();
  }, [selectedDate]);

  const fetchDailyDigest = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // Simulated data for now
      const mockDigest: DailyDigest = {
        date: selectedDate,
        totalNews: 12,
        categories: {
          'china-sanctions': 3,
          'foreign-sanctions': 4,
          'data-ai': 3,
          'foreign-media': 2
        },
        highlights: [
          {
            id: '1',
            title: '美国财政部发布新制裁措施',
            publisher: '美国财政部',
            category: 'foreign-sanctions',
            summary: '针对特定实体的新制裁措施，影响金融和贸易领域...'
          },
          {
            id: '2',
            title: '欧盟数据保护新规生效',
            publisher: '欧盟委员会',
            category: 'data-ai',
            summary: '新的数据保护规定对跨境数据传输提出更严格要求...'
          },
          {
            id: '3',
            title: '中国发布出口管制清单更新',
            publisher: '商务部',
            category: 'china-sanctions',
            summary: '更新的出口管制清单涵盖多个技术领域...'
          }
        ]
      };
      
      setDailyDigest(mockDigest);
    } catch (error) {
      toast.error('获取日报数据失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (direction: 'prev' | 'next') => {
    const currentDate = new Date(selectedDate);
    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  const handleAIAnalysis = (newsId: string, type: 'interpretation' | 'compliance') => {
    const message = type === 'interpretation' ? 'AI解读功能开发中...' : '合规建议功能开发中...';
    toast.info(message, {
      duration: 2000,
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`mb-4 text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>资讯日报</h1>
          <p className={`${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>每日合规资讯精选汇总</p>
        </div>

        {/* Date Selector */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <button
            onClick={() => handleDateChange('prev')}
            className={`rounded-lg p-2 transition-all ${
              isDarkMode 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-white shadow-md border border-gray-200 text-gray-700 hover:shadow-lg hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className={`flex items-center gap-3 rounded-lg px-6 py-3 backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-white/10' 
              : 'bg-white shadow-md border border-gray-200'
          }`}>
            <Calendar className={`h-5 w-5 ${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`} />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`bg-transparent focus:outline-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            />
          </div>
          
          <button
            onClick={() => handleDateChange('next')}
            disabled={selectedDate >= new Date().toISOString().split('T')[0]}
            className={`rounded-lg p-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode 
                ? 'bg-white/10 text-white hover:bg-white/20' 
                : 'bg-white shadow-md border border-gray-200 text-gray-700 hover:shadow-lg hover:bg-gray-50'
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <div className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent ${
              isDarkMode ? 'border-white' : 'border-gray-900'
            }`}></div>
            <p className="mt-2">加载中...</p>
          </div>
        ) : dailyDigest ? (
          <div className="space-y-8">
            {/* Date Header */}
            <div className="text-center">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatDate(selectedDate)}
              </h2>
            </div>

            {/* Statistics */}
            <div className={`rounded-lg p-6 backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-white/10' 
                : 'bg-white shadow-lg border border-gray-200'
            }`}>
              <div className={`mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <TrendingUp className="h-5 w-5" />
                <span className="text-xl font-semibold">今日统计</span>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className={`rounded-lg p-4 text-center ${
                  isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
                }`}>
                  <div className="text-2xl font-bold text-white">{dailyDigest.totalNews}</div>
                  <div className={isDarkMode ? 'text-blue-100' : 'text-blue-100'}>总计资讯</div>
                </div>
                
                {Object.entries(dailyDigest.categories).map(([category, count]) => (
                  <div key={category} className={`rounded-lg p-4 text-center ${
                    isDarkMode 
                      ? 'bg-white/20' 
                      : 'bg-gray-100 border border-gray-200'
                  }`}>
                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{count}</div>
                    <div className={`${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>{categoryNames[category as keyof typeof categoryNames]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className={`rounded-lg p-6 backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-white/10' 
                : 'bg-white shadow-lg border border-gray-200'
            }`}>
              <div className={`mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <FileText className="h-5 w-5" />
                <span className="text-xl font-semibold">今日要闻</span>
              </div>
              
              <div className="space-y-4">
                {dailyDigest.highlights.map((highlight, index) => (
                  <div
                    key={highlight.id}
                    className={`rounded-lg p-4 transition-all ${
                      isDarkMode 
                        ? 'bg-white/10 hover:bg-white/20' 
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:shadow-md'
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white ${
                        isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </span>
                      <span className={`rounded px-2 py-1 text-xs ${
                        isDarkMode 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {categoryNames[highlight.category as keyof typeof categoryNames]}
                      </span>
                      <span className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>{highlight.publisher}</span>
                    </div>
                    
                    <h3 className={`mb-2 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {highlight.title}
                    </h3>
                    
                    <p className={`mb-3 ${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>
                      {highlight.summary}
                    </p>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setAiModal({
                            isOpen: true,
                            type: 'interpretation',
                            newsTitle: highlight.title
                          });
                        }}
                        className={`rounded px-3 py-1 text-sm transition-all ${
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
                            newsTitle: highlight.title
                          });
                        }}
                        className={`rounded px-3 py-1 text-sm transition-all ${
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
              </div>
            </div>

            {/* Export Options */}
            <div className="text-center">
              <button
                onClick={() => toast.info('导出功能开发中...', { duration: 2000 })}
                className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 transition-all hover:bg-blue-50"
              >
                导出日报 PDF
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-white/10 p-8 text-center backdrop-blur-sm">
            <p className="text-blue-200">该日期暂无资讯数据</p>
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

export default Daily;