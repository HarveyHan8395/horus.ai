import React, { useState, useEffect } from 'react';
import { Calendar, Star, TrendingUp, Globe, Building, Scale } from 'lucide-react';
import { toast } from 'sonner';
import AIModal from '../components/AIModal';
import { useThemeStore } from '../stores/themeStore';

interface WeeklyHighlight {
  id: string;
  title: string;
  publisher: string;
  category: string;
  publishDate: string;
  impact: 'high' | 'medium' | 'low';
  regions: string[];
  industries: string[];
  summary: string;
  keyPoints: string[];
  relatedNews: number;
}

const Weekly: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [selectedWeek, setSelectedWeek] = useState(() => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    return startOfWeek.toISOString().split('T')[0];
  });
  const [highlights, setHighlights] = useState<WeeklyHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiModal, setAiModal] = useState<{
    isOpen: boolean;
    type: 'interpretation' | 'compliance';
    newsTitle: string;
  }>({ isOpen: false, type: 'interpretation', newsTitle: '' });

  const categoryNames = {
    'china-sanctions': '中国管制/制裁',
    'foreign-sanctions': '外国管制/制裁',
    'data-ai': '数据合规/AI资讯',
    'foreign-media': '外国媒体报道'
  };

  const impactColors = {
    high: isDarkMode ? 'bg-gradient-to-r from-rose-500 to-pink-600' : 'bg-gradient-to-r from-rose-400 to-pink-500',
    medium: isDarkMode ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-amber-400 to-orange-400',
    low: isDarkMode ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-emerald-400 to-teal-400'
  };

  const impactLabels = {
    high: '高影响',
    medium: '中等影响',
    low: '低影响'
  };

  useEffect(() => {
    fetchWeeklyHighlights();
  }, [selectedWeek]);

  const fetchWeeklyHighlights = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // Simulated data for now
      const mockHighlights: WeeklyHighlight[] = [
        {
          id: '1',
          title: '美国发布半导体出口管制新规',
          publisher: '美国商务部',
          category: 'foreign-sanctions',
          publishDate: '2024-01-15',
          impact: 'high',
          regions: ['美国', '中国', '欧盟'],
          industries: ['半导体', '科技', '制造业'],
          summary: '美国商务部发布针对先进半导体技术的新出口管制规定，对全球半导体供应链产生重大影响。',
          keyPoints: [
            '扩大了受管制的半导体技术范围',
            '加强了对中国企业的限制',
            '要求更严格的许可证申请程序',
            '影响全球半导体供应链'
          ],
          relatedNews: 8
        },
        {
          id: '2',
          title: '欧盟AI法案正式生效',
          publisher: '欧盟委员会',
          category: 'data-ai',
          publishDate: '2024-01-12',
          impact: 'high',
          regions: ['欧盟', '全球'],
          industries: ['人工智能', '科技', '金融'],
          summary: '欧盟人工智能法案正式生效，成为全球首个全面的AI监管框架。',
          keyPoints: [
            '建立AI系统风险分类体系',
            '禁止某些高风险AI应用',
            '要求高风险AI系统进行合规评估',
            '设立AI监管机构'
          ],
          relatedNews: 12
        },
        {
          id: '3',
          title: '中国发布数据出境安全评估新办法',
          publisher: '国家网信办',
          category: 'china-sanctions',
          publishDate: '2024-01-10',
          impact: 'medium',
          regions: ['中国'],
          industries: ['互联网', '金融', '电信'],
          summary: '国家网信办发布数据出境安全评估新办法，进一步规范数据跨境传输。',
          keyPoints: [
            '明确数据出境评估标准',
            '简化部分评估程序',
            '加强数据安全保护',
            '促进数据有序流动'
          ],
          relatedNews: 5
        }
      ];
      
      setHighlights(mockHighlights);
    } catch (error) {
      toast.error('获取每周重磅数据失败，请稍后重试');
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

  const getWeekRange = (weekStart: string) => {
    const start = new Date(weekStart);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    return `${start.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })} - ${end.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}`;
  };

  const handleWeekChange = (direction: 'prev' | 'next') => {
    const currentWeek = new Date(selectedWeek);
    if (direction === 'prev') {
      currentWeek.setDate(currentWeek.getDate() - 7);
    } else {
      currentWeek.setDate(currentWeek.getDate() + 7);
    }
    setSelectedWeek(currentWeek.toISOString().split('T')[0]);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`mb-4 text-4xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>每周重磅</h1>
          <p className={`${
            isDarkMode ? 'text-blue-200' : 'text-gray-600'
          }`}>重要政策解读与深度分析</p>
        </div>

        {/* Week Selector */}
        <div className="mb-8 text-center">
          <div className={`inline-flex items-center gap-4 rounded-lg p-4 backdrop-blur-sm ${
            isDarkMode
              ? 'bg-white/10'
              : 'bg-white shadow-lg border border-gray-200'
          }`}>
            <button
              onClick={() => handleWeekChange('prev')}
              className={`rounded-lg px-4 py-2 transition-all ${
                isDarkMode
                  ? 'bg-white/20 text-white hover:bg-white/30'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              上一周
            </button>
            
            <div className="flex items-center gap-2">
              <Calendar className={`h-5 w-5 ${
                isDarkMode ? 'text-blue-200' : 'text-blue-600'
              }`} />
              <span className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {getWeekRange(selectedWeek)}
              </span>
            </div>
            
            <button
              onClick={() => handleWeekChange('next')}
              disabled={new Date(selectedWeek).getTime() >= new Date().getTime() - 7 * 24 * 60 * 60 * 1000}
              className={`rounded-lg px-4 py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode
                  ? 'bg-white/20 text-white hover:bg-white/30'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              下一周
            </button>
          </div>
        </div>

        {loading ? (
          <div className={`text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <div className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-t-transparent ${
              isDarkMode ? 'border-white' : 'border-blue-600'
            }`}></div>
            <p className="mt-2">加载中...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {highlights.length > 0 ? (
              highlights.map((highlight, index) => (
                <div
                  key={highlight.id}
                  className={`rounded-lg p-6 backdrop-blur-sm transition-all ${
                    isDarkMode
                      ? 'bg-white/10 hover:bg-white/20'
                      : 'bg-white shadow-lg hover:shadow-xl border border-gray-200'
                  }`}
                >
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${
                        isDarkMode ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gradient-to-r from-indigo-400 to-purple-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div className={`rounded px-2 py-1 text-xs text-white ${impactColors[highlight.impact]}`}>
                        {impactLabels[highlight.impact]}
                      </div>
                      <span className={`rounded-lg px-3 py-1 text-xs font-medium text-white ${
                        isDarkMode ? 'bg-gradient-to-r from-slate-600 to-slate-700' : 'bg-gradient-to-r from-slate-500 to-slate-600'
                      }`}>
                        {categoryNames[highlight.category as keyof typeof categoryNames]}
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${
                      isDarkMode ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      <Star className="h-4 w-4" />
                      <span>{highlight.relatedNews} 条相关</span>
                    </div>
                  </div>

                  {/* Title and Publisher */}
                  <div className="mb-4">
                    <h2 className={`mb-2 text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {highlight.title}
                    </h2>
                    <div className={`flex items-center gap-4 text-sm ${
                      isDarkMode ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      <span>{highlight.publisher}</span>
                      <span>{new Date(highlight.publishDate).toLocaleDateString('zh-CN')}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className={`mb-4 ${
                    isDarkMode ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {highlight.summary}
                  </p>

                  {/* Key Points */}
                  <div className="mb-4">
                    <h3 className={`mb-2 font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>关键要点：</h3>
                    <ul className="space-y-1">
                      {highlight.keyPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className={`flex items-start gap-2 ${
                          isDarkMode ? 'text-blue-200' : 'text-gray-600'
                        }`}>
                          <span className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                            isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                          }`}></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Regions and Industries */}
                  <div className="mb-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <div className={`mb-2 flex items-center gap-2 text-sm font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        <Globe className="h-4 w-4" />
                        <span>影响地区：</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {highlight.regions.map((region, regionIndex) => (
                          <span
                            key={regionIndex}
                            className={`rounded-lg px-3 py-1 text-xs font-medium ${
                              isDarkMode
                                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                                : 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 border border-cyan-200'
                            }`}
                          >
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className={`mb-2 flex items-center gap-2 text-sm font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        <Building className="h-4 w-4" />
                        <span>相关行业：</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {highlight.industries.map((industry, industryIndex) => (
                          <span
                            key={industryIndex}
                            className={`rounded-lg px-3 py-1 text-xs font-medium ${
                              isDarkMode
                                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                                : 'bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 border border-violet-200'
                            }`}
                          >
                            {industry}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setAiModal({
                          isOpen: true,
                          type: 'interpretation',
                          newsTitle: highlight.title
                        });
                      }}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all transform hover:scale-105 ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-md'
                      }`}
                    >
                      AI深度解读
                    </button>
                    <button
                      onClick={() => {
                        setAiModal({
                          isOpen: true,
                          type: 'compliance',
                          newsTitle: highlight.title
                        });
                      }}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all transform hover:scale-105 ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 shadow-lg'
                          : 'bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600 shadow-md'
                      }`}
                    >
                      合规影响分析
                    </button>
                    <button
                      onClick={() => toast.info('详情页面开发中...', { duration: 2000 })}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all transform hover:scale-105 ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-md'
                      }`}
                    >
                      查看详情
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={`rounded-lg p-8 text-center backdrop-blur-sm ${
                isDarkMode
                  ? 'bg-white/10'
                  : 'bg-white shadow-lg border border-gray-200'
              }`}>
                <TrendingUp className={`mx-auto mb-4 h-12 w-12 ${
                  isDarkMode ? 'text-blue-300' : 'text-gray-400'
                }`} />
                <p className={isDarkMode ? 'text-blue-200' : 'text-gray-500'}>
                  本周暂无重磅资讯
                </p>
              </div>
            )}

            {/* Weekly Summary */}
            {highlights.length > 0 && (
              <div className={`rounded-lg p-6 backdrop-blur-sm ${
                isDarkMode
                  ? 'bg-white/10'
                  : 'bg-white shadow-lg border border-gray-200'
              }`}>
                <div className={`mb-4 flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <Scale className="h-5 w-5" />
                  <span className="text-lg font-semibold">本周总结</span>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className={`rounded-xl p-4 text-center shadow-lg ${
                    isDarkMode ? 'bg-gradient-to-br from-blue-600 to-indigo-700' : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                  }`}>
                    <div className="text-2xl font-bold text-white">{highlights.length}</div>
                    <div className={isDarkMode ? 'text-blue-100' : 'text-blue-100'}>重磅事件</div>
                  </div>
                  
                  <div className={`rounded-xl p-4 text-center shadow-lg ${
                    isDarkMode ? 'bg-gradient-to-br from-rose-600 to-pink-700' : 'bg-gradient-to-br from-rose-500 to-pink-600'
                  }`}>
                    <div className="text-2xl font-bold text-white">
                      {highlights.filter(h => h.impact === 'high').length}
                    </div>
                    <div className={isDarkMode ? 'text-red-100' : 'text-red-100'}>高影响事件</div>
                  </div>
                  
                  <div className={`rounded-xl p-4 text-center shadow-lg ${
                    isDarkMode ? 'bg-gradient-to-br from-emerald-600 to-teal-700' : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                  }`}>
                    <div className="text-2xl font-bold text-white">
                      {highlights.reduce((sum, h) => sum + h.relatedNews, 0)}
                    </div>
                    <div className={isDarkMode ? 'text-green-100' : 'text-green-100'}>相关资讯</div>
                  </div>
                </div>
              </div>
            )}
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

export default Weekly;