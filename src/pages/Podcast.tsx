import React from 'react';
import { Play, Calendar, Clock, Headphones, Star, ArrowRight } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

const Podcast: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const upcomingEpisodes = [
    {
      id: '1',
      title: '美国半导体制裁新规深度解读',
      description: '全面分析美国最新半导体出口管制措施对全球供应链的影响',
      duration: '25分钟',
      releaseDate: '即将发布',
      category: '制裁政策',
      featured: true
    },
    {
      id: '2',
      title: '欧盟AI法案实施指南',
      description: '详细解读欧盟人工智能法案的关键条款和合规要求',
      duration: '30分钟',
      releaseDate: '即将发布',
      category: 'AI合规',
      featured: false
    },
    {
      id: '3',
      title: '中国数据出境新政策解析',
      description: '深入分析数据出境安全评估新办法的实施细则',
      duration: '20分钟',
      releaseDate: '即将发布',
      category: '数据合规',
      featured: false
    }
  ];

  const features = [
    {
      icon: <Headphones className="h-8 w-8" />,
      title: 'AI智能解读',
      description: '运用先进AI技术，深度解析复杂政策法规'
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: '专业视角',
      description: '汇聚行业专家观点，提供权威专业分析'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: '及时更新',
      description: '紧跟政策动态，第一时间发布解读内容'
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className={`mb-4 text-5xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>AI播客</h1>
          <p className={`mx-auto max-w-2xl text-xl ${
            isDarkMode ? 'text-blue-200' : 'text-gray-600'
          }`}>
            AI驱动的政策解读播客，为您深度剖析重大合规政策
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div className="mb-12 rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-10 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm">
            <Play className="h-12 w-12 text-white" />
          </div>
          <h2 className="mb-6 text-4xl font-bold text-white">敬请期待</h2>
          <p className="mx-auto max-w-2xl text-xl text-blue-100 leading-relaxed">
            我们正在精心打造AI播客功能，即将为您带来前所未有的政策解读体验
          </p>
          <div className="mt-8">
            <button className="rounded-xl bg-white px-10 py-4 text-lg font-semibold text-blue-900 transition-all hover:bg-blue-50 hover:scale-105 shadow-lg">
              订阅更新通知
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h3 className={`mb-8 text-center text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>功能特色</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`rounded-lg p-6 text-center backdrop-blur-sm transition-all ${
                  isDarkMode
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-white shadow-lg hover:shadow-xl border border-gray-200'
                }`}
              >
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                  isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                }`}>
                  {feature.icon}
                </div>
                <h4 className={`mb-2 text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h4>
                <p className={`${
                  isDarkMode ? 'text-blue-200' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Episodes */}
        <div className="mb-12">
          <h3 className={`mb-8 text-center text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>即将推出</h3>
          <div className="space-y-4">
            {upcomingEpisodes.map((episode) => (
              <div
                key={episode.id}
                className={`rounded-lg p-6 backdrop-blur-sm transition-all ${
                  isDarkMode
                    ? `hover:bg-white/20 ${
                        episode.featured
                          ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30'
                          : 'bg-white/10'
                      }`
                    : `hover:shadow-xl ${
                        episode.featured
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300'
                          : 'bg-white shadow-lg border border-gray-200'
                      }`
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      {episode.featured && (
                        <span className={`rounded px-2 py-1 text-xs font-semibold ${
                          isDarkMode ? 'bg-yellow-500 text-black' : 'bg-yellow-400 text-black'
                        }`}>
                          精选
                        </span>
                      )}
                      <span className={`rounded px-2 py-1 text-xs ${
                        isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {episode.category}
                      </span>
                    </div>
                    
                    <h4 className={`mb-2 text-xl font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {episode.title}
                    </h4>
                    
                    <p className={`mb-3 ${
                      isDarkMode ? 'text-blue-200' : 'text-gray-600'
                    }`}>
                      {episode.description}
                    </p>
                    
                    <div className={`flex items-center gap-4 text-sm ${
                      isDarkMode ? 'text-blue-300' : 'text-gray-500'
                    }`}>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{episode.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{episode.releaseDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className={`ml-4 flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                    isDarkMode
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}>
                    <Play className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className={`rounded-lg p-8 backdrop-blur-sm ${
          isDarkMode
            ? 'bg-white/10'
            : 'bg-white shadow-lg border border-gray-200'
        }`}>
          <div className="text-center">
            <h3 className={`mb-4 text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>获取最新更新</h3>
            <p className={`mb-6 ${
              isDarkMode ? 'text-blue-200' : 'text-gray-600'
            }`}>
              订阅我们的通知，第一时间了解AI播客上线动态
            </p>
            
            <div className="mx-auto flex max-w-md gap-2">
              <input
                type="email"
                placeholder="输入您的邮箱地址"
                className={`flex-1 rounded-lg px-4 py-3 backdrop-blur-sm focus:outline-none ${
                  isDarkMode
                    ? 'bg-white/20 text-white placeholder-blue-300 focus:bg-white/30'
                    : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:bg-white border border-gray-300'
                }`}
              />
              <button className={`flex items-center gap-2 rounded-lg px-5 py-3 font-medium transition-colors ${
                isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}>
                订阅我们的通讯
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 text-center">
          <div className="mx-auto mb-4 h-2 w-64 rounded-full bg-white/20">
            <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
          <p className="text-sm text-blue-300">开发进度：30%</p>
        </div>
      </div>
    </div>
  );
};

export default Podcast;