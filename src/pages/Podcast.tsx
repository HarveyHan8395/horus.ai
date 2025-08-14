import React from 'react';
import { Play, Calendar, Clock, Headphones, Star, ArrowRight } from 'lucide-react';

const Podcast: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">AI播客</h1>
          <p className="mx-auto max-w-2xl text-xl text-blue-200">
            AI驱动的政策解读播客，为您深度剖析重大合规政策
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
            <Play className="h-10 w-10 text-white" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white">敬请期待</h2>
          <p className="mx-auto max-w-lg text-lg text-blue-100">
            我们正在精心打造AI播客功能，即将为您带来前所未有的政策解读体验
          </p>
          <div className="mt-6">
            <button className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-900 transition-all hover:bg-blue-50">
              订阅更新通知
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h3 className="mb-8 text-center text-2xl font-bold text-white">功能特色</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-lg bg-white/10 p-6 text-center backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                  {feature.icon}
                </div>
                <h4 className="mb-2 text-xl font-semibold text-white">
                  {feature.title}
                </h4>
                <p className="text-blue-200">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Episodes */}
        <div className="mb-12">
          <h3 className="mb-8 text-center text-2xl font-bold text-white">即将推出</h3>
          <div className="space-y-4">
            {upcomingEpisodes.map((episode) => (
              <div
                key={episode.id}
                className={`rounded-lg p-6 backdrop-blur-sm transition-all hover:bg-white/20 ${
                  episode.featured
                    ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30'
                    : 'bg-white/10'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      {episode.featured && (
                        <span className="rounded bg-yellow-500 px-2 py-1 text-xs font-semibold text-black">
                          精选
                        </span>
                      )}
                      <span className="rounded bg-blue-600 px-2 py-1 text-xs text-white">
                        {episode.category}
                      </span>
                    </div>
                    
                    <h4 className="mb-2 text-xl font-semibold text-white">
                      {episode.title}
                    </h4>
                    
                    <p className="mb-3 text-blue-200">
                      {episode.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-blue-300">
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
                  
                  <button className="ml-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/30">
                    <Play className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="rounded-lg bg-white/10 p-8 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold text-white">获取最新更新</h3>
            <p className="mb-6 text-blue-200">
              订阅我们的通知，第一时间了解AI播客上线动态
            </p>
            
            <div className="mx-auto flex max-w-md gap-2">
              <input
                type="email"
                placeholder="输入您的邮箱地址"
                className="flex-1 rounded-lg bg-white/20 px-4 py-3 text-white placeholder-blue-300 backdrop-blur-sm focus:bg-white/30 focus:outline-none"
              />
              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700">
                <span>订阅</span>
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