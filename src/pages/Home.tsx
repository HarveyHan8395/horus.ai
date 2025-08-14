import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, TrendingUp, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold leading-tight">
            Horus.AI
          </h1>
          <p className="mb-4 text-xl text-blue-100">
            AI驱动的跨境合规资讯平台
          </p>
          <p className="mb-8 text-lg text-blue-200">
            为律师和企业法务提供实时、精准的跨境合规资讯与AI解读
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 transition-all hover:bg-blue-50"
            >
              即时资讯
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/enterprise"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-all hover:bg-white hover:text-blue-900"
            >
              企业定制
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            核心功能
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white/10 p-6 text-center backdrop-blur-sm">
              <Globe className="mx-auto mb-4 h-12 w-12 text-blue-200" />
              <h3 className="mb-2 text-xl font-semibold text-white">即时资讯</h3>
              <p className="text-blue-200">
                四大分类资讯实时更新，覆盖中外制裁、数据合规等领域
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 text-center backdrop-blur-sm">
              <Shield className="mx-auto mb-4 h-12 w-12 text-blue-200" />
              <h3 className="mb-2 text-xl font-semibold text-white">AI解读</h3>
              <p className="text-blue-200">
                智能分析法规变化，提供专业的合规建议和风险评估
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 text-center backdrop-blur-sm">
              <TrendingUp className="mx-auto mb-4 h-12 w-12 text-blue-200" />
              <h3 className="mb-2 text-xl font-semibold text-white">精准筛选</h3>
              <p className="text-blue-200">
                三维筛选系统，按发布机构、专业领域、行业分类精准定位
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 text-center backdrop-blur-sm">
              <Users className="mx-auto mb-4 h-12 w-12 text-blue-200" />
              <h3 className="mb-2 text-xl font-semibold text-white">企业定制</h3>
              <p className="text-blue-200">
                个性化资讯推送，满足不同企业的合规需求
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">最新资讯</h2>
            <Link
              to="/news"
              className="text-blue-200 hover:text-white transition-colors"
            >
              查看全部 →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder news items */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <div className="mb-2 text-sm text-blue-200">2024-01-15</div>
                <h3 className="mb-3 text-lg font-semibold text-white">
                  示例新闻标题 {item}
                </h3>
                <p className="mb-4 text-blue-200">
                  这里是新闻摘要内容，展示AI总结的关键信息...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-300">美国财政部</span>
                  <button className="text-sm text-blue-200 hover:text-white">
                    阅读更多
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;