import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, FileText, TrendingUp, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';
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
  const [rawHighlightsHtml, setRawHighlightsHtml] = useState<string | null>(null);

  const categoryNames = {
    'china-sanctions': '中国管制/制裁',
    'foreign-sanctions': '外国管制/制裁',
    'data-ai': '数据合规/AI资讯',
    'foreign-media': '外国媒体报道'
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
      
      // If the selected date is 2025-08-19, set the provided HTML content
      if (selectedDate === '2025-08-19') {
        const html = `
<div class="space-y-4">
  <div>
    <h4 class="font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}">一、中国管制/制裁资讯（0条）</h4>
    <div class="news-item"><strong>· 昨日无相关新闻</strong></div>
  </div>

  <div>
    <h4 class="font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}">二、外国管制/制裁资讯（4条）</h4>
    <div class="news-item"><strong>1. 「OFAC」禁毒相关指定及指定移除；反恐、全球马格尼茨基及涉俄指定更新</strong><p class="news-content">美国财政部OFAC以贩毒为由制裁4名哥斯达黎加个人和2个实体，并更新多个制裁名单信息。<a href="https://ofac.treasury.gov/recent-actions/20250818" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">显示原文</a></p></div>
    <div class="news-item"><strong>2. 「美国财政部」美国财政部制裁臭名昭著的哥斯达黎加毒枭</strong><p class="news-content">美国财政部OFAC以参与毒品走私和洗钱为由制裁4名哥斯达黎加个人和2个实体，并配合美国缉毒局及哥斯达黎加政府打击贩毒活动。<a href="https://home.treasury.gov/news/press-releases/sb0227" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">显示原文</a></p></div>
    <div class="news-item"><strong>3. 「美国财政部」财政部就《美国稳定币国家创新引导与建立法案》（GENIUS法案）发布征求意见通知</strong><p class="news-content">美国财政部就《GENIUS法案》发布征求意见稿，旨在建立稳定币监管框架并征求公众对数字资产反非法活动的技术应用意见。<a href="https://home.treasury.gov/news/press-releases/sb0228" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">显示原文</a></p></div>
    <div class="news-item"><strong>4. 「美国司法部」新泽西州居民因参与全球出口管制及制裁规避阴谋被判刑</strong><p class="news-content">新泽西州居民因参与全球出口管制和制裁规避计划，协助俄罗斯获取军用物资及敏感电子设备，被判处30个月监禁并没收75,547美元。<a href="https://www.justice.gov/opa/pr/new-jersey-resident-sentenced-role-global-export-control-and-sanctions-evasion-scheme" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">显示原文</a></p></div>
  </div>

  <div>
    <h4 class="font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}">三、数据合规/人工智能资讯（1条）</h4>
    <div class="news-item"><strong>1. 「IAPP」审视西方网络政策对中国在数字时代崛起的反应</strong><p class="news-content">中国数字技术崛起引发美欧战略调整，双方通过立法与监管措施重构数据主权、供应链安全及技术标准，以应对中国在全球数字生态系统中的影响力扩张。<a href="https://iapp.org/news/a/examining-western-cyber-policy-reactions-to-chinas-rise-in-the-digital-age" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">显示原文</a></p></div>
  </div>

  <div>
    <h4 class="font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}">四、行业资讯：AI/芯片</h4>
    <div class="news-item"><strong>1. 彭博社：Advent 寻求以 13 亿美元收购瑞士芯片制造商 U-blox</strong> <a href="https://www.bloomberg.com/news/articles/2025-08-17/advent-seeks-to-buy-swiss-chipmaker-u-blox-in-1-3-billion-deal" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">显示原文</a></div>
    <div class="news-item"><strong>2. 彭博社：美蓓亚继续参与日本传感器制造商芝浦的竞购战</strong> <a href="https://www.bloomberg.com/news/articles/2025-08-18/minebea-s-ceo-signals-end-to-bidding-war-with-yageo-for-shibaura" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">显示原文</a></div>
    <div class="news-item"><strong>3. 彭博社：富士康将在俄亥俄州运营软银的 Stargate AI 服务器站点</strong> <a href="https://www.bloomberg.com/company/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">显示原文</a></div>
    <div class="news-item"><strong>4. 路透社：富士康的苹果时代逐渐消失，人工智能服务器推动台湾科技行业的增长</strong> <a href="https://www.reuters.com/world/china/foxconns-apple-era-fades-ai-servers-drive-growth-taiwan-tech-sector-2025-08-18/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">显示原文</a></div>
  </div>

  <div>
    <h4 class="font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}">五、公众号（2条）</h4>
    <div class="space-y-2">
      <div>
        <div class="font-semibold">「贸易夜航」</div>
        <div class="news-item">特朗普对中国40%转运关税生效！美国海关启动异国货物查验，东南亚港口被查<br/>美国海关和边境保护局（CBP）开始对非法转运行为实施40%惩罚性关税，并加强执法措施，包括刑事指控和货物扣押。 <a href="https://mp.weixin.qq.com/s/YmQFCkmlAeEtf535dgwwyw" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">查看原文</a></div>
      </div>
      <div>
        <div class="font-semibold">「那一片数据星辰」</div>
        <div class="news-item">EDPB250页《AI安全与数据保护的法律合规培训》全文翻译|第三部分 高阶议题 第10单元 AI的公平性和问责性<br/>该新闻介绍了人工智能培训模块的内容，重点讨论了AI系统生命周期中的数据保护风险、GDPR合规要求及技术文档化的重要性，并涉及AI系统的公平性、问责制及影响评估等议题。 <a href="https://mp.weixin.qq.com/s/FpBseb17dFhEaExHWiUCjg" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">查看原文</a></div>
      </div>
    </div>
  </div>

  <div>
    <h4 class="font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}">六、外媒（5条）</h4>
    <div class="space-y-2">
      <div class="news-item">「国会山」参议院民主党人敦促特朗普叫停英伟达与AMD交易<br/>民主党参议员致信特朗普总统，要求撤销允许英伟达和AMD向中国出售AI芯片并收取15%收入分成的协议，认为该协议违反美国国家安全利益及出口管制法律。 <a href="https://thehill.com/policy/technology/5457662-nvidia-amd-china-ai-chips/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">查看原文</a></div>
      <div class="news-item">「国会山」参议院民主党人敦促特朗普叫停英伟达与AMD交易<br/>参议院民主党人敦促特朗普总统撤销允许英伟达和AMD向中国出售AI芯片并分享15%销售收入的协议，认为该协议违反美国国家安全利益及法律。 <a href="https://thehill.com/policy/technology/5457662-nvidia-amd-china-ai-chips/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">查看原文</a></div>
      <div class="news-item">「全球制裁」乌克兰修订制裁法规并指定人工智能无人机制造商为制裁对象 <a href="https://globalsanctions.com/2025/08/ukraine-amends-sanctions-regulations-designates-ai-drone-manufacturers/?utm_source=rss&utm_medium=rss&utm_campaign=ukraine-amends-sanctions-regulations-designates-ai-drone-manufacturers" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">查看原文</a></div>
      <div class="news-item">「全球制裁」挪威发布新版资产冻结操作指引 <a href="https://globalsanctions.com/2025/08/norway-publishes-new-guidance-on-freezing-assets/?utm_source=rss&utm_medium=rss&utm_campaign=norway-publishes-new-guidance-on-freezing-assets" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">查看原文</a></div>
      <div class="news-item">「全球制裁」美国将4名个人及2家实体列入毒品制裁名单——其他更新 <a href="https://globalsanctions.com/2025/08/us-designates-4-individuals-2-entities-on-narcotics-list-other-updates/?utm_source=rss&utm_medium=rss&utm_campaign=us-designates-4-individuals-2-entities-on-narcotics-list-other-updates" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:underline">查看原文</a></div>
    </div>
  </div>
</div>`;
        setRawHighlightsHtml(html);
        // Adjust counts based on provided sections
        mockDigest.totalNews = 4 + 1 + 4 + 2 + 5; // foreign sanctions + data-ai + industry + public accounts + foreign media
        mockDigest.categories = {
          'china-sanctions': 0,
          'foreign-sanctions': 4,
          'data-ai': 1,
          'foreign-media': 5
        };
      } else {
        setRawHighlightsHtml(null);
      }

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
              
              {rawHighlightsHtml ? (
                <div
                  className={`rounded-lg p-4 ${isDarkMode ? 'bg-white/10' : 'bg-gray-50 border border-gray-200'}`}
                >
                  <div className="prose max-w-none">
                    <div
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHighlightsHtml) }}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {dailyDigest!.highlights.map((highlight, index) => (
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
              )}
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