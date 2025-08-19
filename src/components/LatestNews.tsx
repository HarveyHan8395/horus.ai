import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Filter } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import { agents } from './ExpertAgents';
import { getAllNewsData } from '../utils/newsDataManager';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  category: string;
  publisher: string;
  field: string;
  industry: string | string[];
  link: string; // 新增：原文链接
}

// 为 Agent 类型创建类型别名
type AgentType = (typeof agents)[number];

const LatestNews: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const [activePublisher, setActivePublisher] = useState('全部');
  const [activeField, setActiveField] = useState('全部');
  const [activeIndustry, setActiveIndustry] = useState('全部');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [idToAgent, setIdToAgent] = useState<Record<string, AgentType>>({});

  const publishers = ['全部', '商务部', 'OFAC', 'BIS', '外交部', '安管局', 'DOD'];
  const fields = ['全部', '制裁合规', '出口管制', '数据保护', 'AI治理', '金融监管'];
  const industries = ['全部', '互联网', '高科技', '芯片', '物流港口', '汽车/电池', '能源/光伏', '制造业', '金融/保险', '消费品'];

  // 按 Agent 分配资讯的逻辑：为每个 Agent 分配一条最新资讯
  const assignNewsToAgents = (allNews: NewsItem[]): { items: NewsItem[]; map: Record<string, AgentType> } => {
    const agentNews: NewsItem[] = [];
    const idMap: Record<string, AgentType> = {};

    agents.forEach((agent) => {
      let assignedNews: NewsItem | undefined;

      const fieldKeywords: Record<string, string[]> = {
        Harvey: ['合规', '法规', '政策'],
        Kevin: ['制裁', '出口', '管制', '实体清单'],
        Ruby: ['数据', '隐私', '保护', 'GDPR', 'gdpr'],
        Urban: ['AI', 'ai', '人工智能', '算法', '智能'],
        Sophia: ['贸易', '反倾销', '反补贴', '救济'],
        Owen: ['行业', '商业', '分析', '风险']
      };

      const keywords = fieldKeywords[agent.name] || [];

      assignedNews = allNews.find(news =>
        !agentNews.some(assigned => assigned.id === news.id) &&
        keywords.some(keyword =>
          news.title.includes(keyword) ||
          news.field.includes(keyword) ||
          news.summary.includes(keyword)
        )
      );

      if (!assignedNews) {
        assignedNews = allNews.find(news => !agentNews.some(assigned => assigned.id === news.id));
      }

      if (assignedNews) {
        agentNews.push(assignedNews);
        idMap[assignedNews.id] = agent;
      }
    });

    return { items: agentNews, map: idMap };
  };

  // 加载真实新闻数据并按 Agent 分配
  useEffect(() => {
    const all = getAllNewsData();
    const sorted = [...all].sort((a, b) => {
      const ta = new Date((a as any).publishTime || (a as any).date || 0).getTime();
      const tb = new Date((b as any).publishTime || (b as any).date || 0).getTime();
      return tb - ta; // 倒序，最新在前
    });
    const transformedNews = sorted.map((record) => ({
      id: record.id,
      title: record.title,
      summary: record.content,
      date: record.publishTime,
      source: record.publisher,
      category: (record as any).dataSource || 'mixed',
      publisher: record.publisher,
      field: record.field,
      industry: record.industry as any,
      link: record.link || '#'
    }));

    const { items, map } = assignNewsToAgents(transformedNews);
    setNewsItems(items);
    setIdToAgent(map);
  }, []);

  const filteredNews = newsItems.filter(item => {
    const matchesPublisher = activePublisher === '全部' || item.publisher.includes(activePublisher) || 
      (activePublisher === 'OFAC' && item.publisher.includes('财政部')) ||
      (activePublisher === 'BIS' && item.publisher.includes('商务部'));
    
    const matchesField = activeField === '全部' || item.field === activeField;
    
    const matchesIndustry = activeIndustry === '全部' || 
      (Array.isArray(item.industry) && item.industry.includes(activeIndustry)) ||
      (typeof item.industry === 'string' && item.industry.includes(activeIndustry));

    return matchesPublisher && matchesField && matchesIndustry;
  });

  return (
    <section className="py-20" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container px-6 mx-auto">
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <Filter className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>最新资讯</h2>
          </div>

          {/* 筛选器 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* 发布机构筛选 */}
            <div>
              <label className={`mb-2 block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>发布机构</label>
              <div className="flex flex-wrap gap-2">
                {publishers.map((pub) => (
                  <button
                    key={pub}
                    onClick={() => setActivePublisher(pub)}
                    className={`rounded-full px-3 py-1 text-xs transition-all ${
                      activePublisher === pub
                        ? 'bg-blue-600 text-white'
                        : isDarkMode
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {pub}
                  </button>
                ))}
              </div>
            </div>

            {/* 领域筛选 */}
            <div>
              <label className={`mb-2 block text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>领域</label>
              <div className="flex flex-wrap gap-2">
                {fields.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveField(f)}
                    className={`rounded-full px-3 py-1 text-xs transition-all ${
                      activeField === f
                        ? 'bg-blue-600 text-white'
                        : isDarkMode
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {f}
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

        {/* 新闻列表（重构卡片样式） */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item, index) => {
            const agent = idToAgent[item.id] || agents[index % agents.length];
            const badgeChar = item.publisher?.[0] || '讯';
            return (
              <div
                key={item.id}
                className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isDarkMode
                    ? 'backdrop-blur-sm'
                    : 'border-gray-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md'
                }`}
                style={isDarkMode ? { borderColor: 'var(--border-color)', background: 'rgba(17, 24, 39, 0.5)' } : undefined}
              >
                <div className="p-6">
                  {/* 顶部：发布机构 */}
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold ${
                      isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {badgeChar}
                    </div>
                    <span className={`text-sm font-semibold ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {item.publisher}
                    </span>
                  </div>

                  {/* 标题 */}
                  <h3 className={`mb-4 text-xl font-bold leading-snug transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>

                  {/* Agent 信息 */}
                  <div className="mb-4 flex items-center gap-3">
                    {agent?.imageUrl ? (
                      <img src={agent.imageUrl} alt={agent.name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                        isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {agent?.name?.[0] || 'A'}
                      </div>
                    )}
                    <div>
                      <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{agent.name}</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{agent.title}</div>
                    </div>
                    {/* 领域小标签在右侧显示 */}
                    <div className="ml-auto">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        isDarkMode ? 'bg-blue-600/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}>{item.field}</span>
                    </div>
                  </div>

                  {/* 内容摘要 */}
                  <div className={`mb-4 border-t pt-4 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm clamp-4`}>
                      {item.summary}
                    </p>
                  </div>

                  {/* 底部：发布日期与原文链接 */}
                  <div className={`flex items-center justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span>{item.date}</span>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} text-sm`}
                    >
                      原文链接
                    </a>
                  </div>

                  {/* 操作区（可选）：AI解读 / 合规建议 */}
                  <div className="mt-4 flex gap-2">
                    <button
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                        isDarkMode ? 'bg-white/10 text-gray-200 hover:bg-white/15' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      AI解读
                    </button>
                    <button
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                        isDarkMode ? 'bg-white/10 text-gray-200 hover:bg-white/15' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      合规建议
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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