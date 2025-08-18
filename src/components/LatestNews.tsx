import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Filter } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  category: string;
  publisher: string;
  field: string;
  industry: string;
}

const LatestNews: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [activePublisher, setActivePublisher] = useState('全部');
  const [activeField, setActiveField] = useState('全部');
  const [activeIndustry, setActiveIndustry] = useState('全部');

  const publishers = ['全部', '商务部', 'OFAC', 'BIS', '外交部', '安管局', 'DOD'];
  const fields = ['全部', '制裁合规', '出口管制', '数据保护', 'AI治理', '金融监管'];
  const industries = ['全部', '科技', '金融', '制造业', '能源', '医疗', '电信'];

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: '商务部发布最新出口管制清单更新通知',
      summary: '商务部近日发布关于调整出口管制清单的公告，新增多项技术产品和软件的管制措施，涉及人工智能、量子计算等前沿技术领域...',
      date: '2024-01-15',
      source: '商务部官网',
      category: 'china-sanctions',
      publisher: '商务部',
      field: '出口管制',
      industry: '科技'
    },
    {
      id: '2',
      title: 'OFAC更新特别指定国民清单(SDN List)',
      summary: 'OFAC今日更新SDN清单，新增15个实体和个人，主要涉及俄罗斯和伊朗相关制裁措施，企业需及时核查业务往来对象...',
      date: '2024-01-14',
      source: 'OFAC官网',
      category: 'foreign-sanctions',
      publisher: 'OFAC',
      field: '制裁合规',
      industry: '金融'
    },
    {
      id: '3',
      title: '欧盟通过人工智能法案最终版本',
      summary: '欧洲议会正式通过《人工智能法案》，该法案将对高风险AI系统实施严格监管，预计将对全球AI产业产生重大影响...',
      date: '2024-01-13',
      source: '欧盟官网',
      category: 'data-compliance',
      publisher: '欧盟',
      field: 'AI治理',
      industry: '科技'
    },
    {
      id: '4',
      title: 'BIS发布半导体制造设备新管制规定',
      summary: 'BIS发布针对先进半导体制造设备的新出口管制规定，进一步限制向特定国家和地区出口相关技术和设备...',
      date: '2024-01-12',
      source: 'BIS官网',
      category: 'foreign-sanctions',
      publisher: 'BIS',
      field: '出口管制',
      industry: '制造业'
    },
    {
      id: '5',
      title: '国家网信办发布数据出境安全评估新规',
      summary: '国家网信办发布《数据出境安全评估办法》修订版，对数据出境安全评估程序和标准进行了进一步细化和完善...',
      date: '2024-01-11',
      source: '网信办官网',
      category: 'data-compliance',
      publisher: '网信办',
      field: '数据保护',
      industry: '科技'
    },
    {
      id: '6',
      title: '美国财政部发布加密货币制裁指导意见',
      summary: '美国财政部发布关于加密货币相关制裁合规的最新指导意见，要求相关企业加强对数字资产交易的监管和报告...',
      date: '2024-01-10',
      source: '美国财政部',
      category: 'foreign-sanctions',
      publisher: 'OFAC',
      field: '金融监管',
      industry: '金融'
    }
  ];

  const filteredNews = newsItems.filter(item => {
    return (activePublisher === '全部' || item.publisher === activePublisher) &&
           (activeField === '全部' || item.field === activeField) &&
           (activeIndustry === '全部' || item.industry === activeIndustry);
  });

  return (
    <section className="px-6 py-16" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className={`mb-4 text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            最新资讯
          </h2>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            实时追踪全球合规动态，第一时间获取重要监管信息
          </p>
        </div>

        {/* 筛选器 */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className={`h-5 w-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>筛选条件：</span>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {/* 发布机构筛选 */}
            <div>
              <label className={`mb-2 block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>发布机构</label>
              <div className="flex flex-wrap gap-2">
                {publishers.map((publisher) => (
                  <button
                    key={publisher}
                    onClick={() => setActivePublisher(publisher)}
                    className={`rounded-full px-3 py-1 text-xs transition-all ${
                      activePublisher === publisher
                        ? 'bg-blue-600 text-white'
                        : isDarkMode
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {publisher}
                  </button>
                ))}
              </div>
            </div>

            {/* 专业领域筛选 */}
            <div>
              <label className={`mb-2 block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>专业领域</label>
              <div className="flex flex-wrap gap-2">
                {fields.map((field) => (
                  <button
                    key={field}
                    onClick={() => setActiveField(field)}
                    className={`rounded-full px-3 py-1 text-xs transition-all ${
                      activeField === field
                        ? 'bg-blue-600 text-white'
                        : isDarkMode
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>

            {/* 行业筛选 */}
            <div>
              <label className={`mb-2 block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>行业</label>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setActiveIndustry(industry)}
                    className={`rounded-full px-3 py-1 text-xs transition-all ${
                      activeIndustry === industry
                        ? 'bg-blue-600 text-white'
                        : isDarkMode
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 新闻列表 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className={`group overflow-hidden rounded-xl border transition-all duration-300 ${
                isDarkMode
                  ? 'backdrop-blur-sm'
                  : 'border-gray-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md'
              }`}
              style={isDarkMode ? { borderColor: 'var(--border-color)', background: 'rgba(17, 24, 39, 0.5)' /* 原为 bg-gray-800/50，等效于 gray-900 半透明；旧方案 #2a2a2a 未启用 */ } : undefined}
            >
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    isDarkMode
                      ? 'bg-blue-600/20 text-blue-300'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.field}
                  </span>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>{item.date}</span>
                </div>

                <h3 className={`mb-3 text-lg font-semibold transition-colors ${
                  isDarkMode
                    ? 'text-white group-hover:text-blue-300'
                    : 'text-gray-900 group-hover:text-blue-600'
                }`}>
                  {item.title}
                </h3>

                <p className={`mb-4 text-sm line-clamp-3 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {item.summary}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className={`h-4 w-4 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>{item.source}</span>
                  </div>
                  <Link
                    to={`/news/${item.id}`}
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      isDarkMode
                        ? 'text-blue-400 hover:text-blue-300'
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    阅读更多
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 font-semibold text-white transition-all hover:from-blue-700 hover:to-blue-800"
          >
            查看更多资讯
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;