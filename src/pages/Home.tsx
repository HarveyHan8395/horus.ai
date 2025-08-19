import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Globe, Zap, Users, TrendingUp, Clock } from 'lucide-react';
import NewsCategories from '../components/NewsCategories';
import LatestNews from '../components/LatestNews';
// Removed Footer import because it's now included globally in App.tsx
import ExpertAgents from '../components/ExpertAgents';
import { useThemeStore } from '../stores/themeStore';

const Home: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  return (
    <>
      <style>{`
        .hero-section {
          background: #000000;
          position: relative;
          overflow: hidden;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(0, 100, 200, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 150, 255, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(100, 200, 255, 0.2) 0%, transparent 50%);
          z-index: 1;
        }
        .hero-section::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(45deg, transparent 30%, rgba(0, 150, 255, 0.15) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(100, 200, 255, 0.12) 50%, transparent 70%),
            conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0, 200, 255, 0.08) 90deg, transparent 180deg, rgba(100, 150, 255, 0.06) 270deg, transparent 360deg);
          z-index: 2;
        }
        .hero-content {
          position: relative;
          z-index: 3;
        }
      `}</style>
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section className={`relative px-6 py-20 text-center ${
        isDarkMode ? 'text-white hero-section' : 'text-gray-900'
      }`} style={!isDarkMode ? { background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' } : {}}>
        <div className="mx-auto max-w-4xl hero-content">
          <h1 className={`mb-6 text-5xl font-bold leading-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Horus.AI
          </h1>
          <p className={`mb-4 text-xl ${
            isDarkMode ? 'text-gray-100' : 'text-gray-700'
          }`}>
            AI 驱动的跨境合规资讯 Agent
          </p>
          <p className={`mb-8 text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Horus.AI 为跨境合规领域的专业人士提供由人工智能驱动的实时监管资讯、深度分析和合规建议，帮助您在全球复杂监管环境中保持领先。</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/news"
              className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all ${
                isDarkMode 
                  ? 'bg-gradient-accent text-white hover:opacity-90'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              即时资讯
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/enterprise"
              className={`inline-flex items-center gap-2 rounded-lg border-2 px-6 py-3 font-semibold transition-all ${
                isDarkMode 
                  ? 'border-navy-700 text-white hover:bg-navy-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              企业定制
            </Link>
          </div>

          {/* Data Display Section */}
          <div className="mt-8 flex justify-center">
            <div className="flex w-full max-w-sm justify-between text-center">
              <div>
                <p className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>4,300+</p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>监管资讯</p>
              </div>
              <div>
                <p className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>120+</p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>专业机构</p>
              </div>
              <div>
                <p className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>99.87%</p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>准确率</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-7xl">
          <h2 className={`mb-4 text-center text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Horus 解决方案：您的 AI 合规 Agent
          </h2>
          <p className={`mb-12 text-center text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            我们将AI深度融入合规工作流，将信息转化为高质的战略优势。
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className={`rounded-lg p-6 text-center ${
              isDarkMode 
                ? 'bg-white/10 backdrop-blur-sm' 
                : 'bg-white shadow-lg border border-gray-200'
            }`}>
              <Globe className={`mx-auto mb-4 h-12 w-12 ${
                isDarkMode ? 'text-navy-400' : 'text-blue-600'
              }`} />
              <h3 className={`mb-2 text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>全球实时监测</h3>
              <p className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                7×24小时不间断监控全球主要监管机构与新闻网站，确保您在第一时间掌握动态
              </p>
            </div>
            <div className={`rounded-lg p-6 text-center ${
              isDarkMode 
                ? 'bg-white/10 backdrop-blur-sm' 
                : 'bg-white shadow-lg border border-gray-200'
            }`}>
              <Zap className={`mx-auto mb-4 h-12 w-12 ${
                isDarkMode ? 'text-navy-400' : 'text-blue-600'
              }`} />
              <h3 className={`mb-2 text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>AI智能处理</h3>
              <p className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                自动化清洗、过滤、分类并生成专业摘要，将信息智能化为结构化信息
              </p>
            </div>
            <div className={`rounded-lg p-6 text-center ${
              isDarkMode 
                ? 'bg-white/10 backdrop-blur-sm' 
                : 'bg-white shadow-lg border border-gray-200'
            }`}>
              <Shield className={`mx-auto mb-4 h-12 w-12 ${
                isDarkMode ? 'text-navy-400' : 'text-blue-600'
              }`} />
              <h3 className={`mb-2 text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Gemini 深度赋能</h3>
              <p className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                一键获取专业解读、生成解析和初稿，将信息管理与内容创作的效率提升
              </p>
            </div>
            <div className={`rounded-lg p-6 text-center ${
              isDarkMode 
                ? 'bg-white/10 backdrop-blur-sm' 
                : 'bg-white shadow-lg border border-gray-200'
            }`}>
              <TrendingUp className={`mx-auto mb-4 h-12 w-12 ${
                isDarkMode ? 'text-navy-400' : 'text-blue-600'
              }`} />
              <h3 className={`mb-2 text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>多维精准筛选</h3>
              <p className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                按机构、专业领域、行业等多维度精准文档筛选，确保您获得最需要的信息
              </p>
            </div>
            <div className={`rounded-lg p-6 text-center ${
              isDarkMode 
                ? 'bg-white/10 backdrop-blur-sm' 
                : 'bg-white shadow-lg border border-gray-200'
            }`}>
              <Users className={`mx-auto mb-4 h-12 w-12 ${
                isDarkMode ? 'text-navy-400' : 'text-blue-600'
              }`} />
              <h3 className={`mb-2 text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                "千企千面"定制
              </h3>
              <p className={`${
                 isDarkMode ? 'text-gray-300' : 'text-gray-600'
               }`}>
                 为您的不同客户配置专属分析和解读，确保真正实现个性化，高相关性的合规指导
               </p>
             </div>
             <div className={`rounded-lg p-6 text-center ${
               isDarkMode 
                 ? 'bg-white/10 backdrop-blur-sm' 
                 : 'bg-white shadow-lg border border-gray-200'
             }`}>
               <Clock className={`mx-auto mb-4 h-12 w-12 ${
                 isDarkMode ? 'text-navy-400' : 'text-blue-600'
               }`} />
               <h3 className={`mb-2 text-xl font-semibold ${
                 isDarkMode ? 'text-white' : 'text-gray-900'
               }`}>高效时间管理</h3>
               <p className={`${
                 isDarkMode ? 'text-gray-300' : 'text-gray-600'
               }`}>
                 将您从繁琐的信息收集和整理工作中解放出来，专注于更高价值的战略决策
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Expert Agents Section */}
      <ExpertAgents />

      {/* News Categories Section */}
      <NewsCategories />
      
      {/* 最新资讯预览 */}
      <LatestNews />
    </div>
    
    {/* Footer removed (now global) */}
    </>
  );
};

export default Home;