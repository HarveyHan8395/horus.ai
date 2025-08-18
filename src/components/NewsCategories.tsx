import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Globe, Database, Newspaper } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

const NewsCategories: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const categories = [
    {
      id: 'china-sanctions',
      title: '中国管制/制裁',
      description: '商务部、安管局、外交部等机构发布的最新管制措施',
      icon: <Building className="h-12 w-12" />,
      monthlyUpdates: '328',
      agencies: '6'
    },
    {
      id: 'foreign-sanctions',
      title: '外国管制/制裁',
      description: 'OFAC、BIS、DOD等国际机构发布的最新管制措施',
      icon: <Globe className="h-12 w-12" />,
      monthlyUpdates: '512',
      agencies: '8'
    },
    {
      id: 'data-compliance',
      title: '数据合规/AI资讯',
      description: '全球数据保护、人工智能监管最新动态和政策分析',
      icon: <Database className="h-12 w-12" />,
      monthlyUpdates: '247',
      agencies: '7'
    },
    {
      id: 'foreign-media',
      title: '外国媒体报道',
      description: '国会山、道琼斯等国际媒体对合规领域的专业报道',
      icon: <Newspaper className="h-12 w-12" />,
      monthlyUpdates: '1,024',
      agencies: '12'
    }
  ];

  return (
    <section className="px-6 py-16" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className={`mb-4 text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            即时资讯分类
          </h2>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            实时更新的全球监管资讯，按专业领域和行业分类，助您快速获取关键信息
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/news?category=${category.id}`}
              className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                  : 'bg-white shadow-lg hover:shadow-xl border border-gray-200'
              }`}
            >
              <div className="relative z-10">
                <div className="mb-6 flex justify-center">
                  <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                    {category.icon}
                  </div>
                </div>
                
                <h3 className={`mb-3 text-center text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {category.title}
                </h3>
                
                <p className={`mb-6 text-center text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {category.description}
                </p>
                
                <div className="flex justify-between text-center">
                  <div>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>{category.monthlyUpdates}</div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>本月更新</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>{category.agencies}</div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>发布机构</div>
                  </div>
                </div>
              </div>
              
              {/* 悬停效果背景 */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsCategories;