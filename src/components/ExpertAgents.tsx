import React from 'react';

export const agents = [
  {
    name: 'Harvey',
    title: '首席合规官/团队负责人',
    description: '擅长从顶层设计合规体系，为复杂商业决策提供战略性合规指引。',
    imageUrl: 'https://dachenglaw.oss-cn-beijing.aliyuncs.com/2025/08/17/d2ekWe.png',
  },
  {
    name: 'Kevin',
    title: '出口管制和经济制裁专家',
    description: '精通全球出口管制法规与经济制裁实践，擅长处理实体清单筛查与风险应对。',
    imageUrl: 'https://dachenglaw.oss-cn-beijing.aliyuncs.com/2025/08/17/sycpRV.png',
  },
  {
    name: 'Ruby',
    title: '数据与隐私合规专家',
    description: '专注于数据跨境流动与隐私保护，擅长为企业构建符合 GDPR 等主流法规的数据合规框架。',
    imageUrl: 'https://dachenglaw.oss-cn-beijing.aliyuncs.com/2025/08/17/aZPRQ9.png',
  },
  {
    name: 'Urban',
    title: '人工智能合规专家',
    description: '深耕人工智能伦理与治理，擅长评估 AI 应用的合规风险并提供解决方案。',
    imageUrl: 'https://dachenglaw.oss-cn-beijing.aliyuncs.com/2025/08/17/ME7QT4.png',
  },
  {
    name: 'Sophia',
    title: '贸易救济专家',
    description: '擅长处理反倾销、反补贴等贸易救济案件，为企业在国际贸易争端中提供专业策略支持。',
    imageUrl: 'https://dachenglaw.oss-cn-beijing.aliyuncs.com/2025/08/17/5IaWF3.png',
  },
  {
    name: 'Owen',
    title: '行业与商业分析专家',
    description: '拥有丰富的多行业从业背景，擅长将复杂的法律合规要求转化为可执行的商业语言和行动方案。',
    imageUrl: 'https://dachenglaw.oss-cn-beijing.aliyuncs.com/2025/08/17/PNm6wO.png',
  },
];

const ExpertAgents: React.FC = () => {
  return (
    <section className="py-20" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container px-6 mx-auto">
        <div className="mb-12 text-center">
          {/* 标题按主题颜色显示 */}
          <h2 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>认识我们的专家 Agents</h2>
          {/* 副标题按主题次要文本颜色显示 */}
          <p className="mt-4 text-lg" style={{ color: 'var(--text-secondary)' }}>
            Horus.AI 由一个多智能体（Multi-Agents）架构驱动，每位专家都在各自领域拥有深厚的专业知识。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="p-8 transition-transform duration-300 transform border rounded-lg shadow-lg hover:scale-105"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center mb-6">
                <img
                  src={agent.imageUrl}
                  alt={agent.name}
                  className="w-32 h-32 mr-6 rounded-full"
                />
                <div>
                  {/* 卡片标题按主题主文本色显示 */}
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{agent.name}</h3>
                  {/* 卡片小标题按主题次要文本色显示 */}
                  <p className="text-base" style={{ color: 'var(--text-secondary)' }}>{agent.title}</p>
                </div>
              </div>
              {/* 卡片描述按主题次要文本色显示 */}
              <p style={{ color: 'var(--text-secondary)' }}>{agent.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertAgents;