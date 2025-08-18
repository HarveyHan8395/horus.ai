import React, { useState } from 'react';
import { Building, Users, Shield, Zap, CheckCircle, ArrowRight, Star, Globe, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { contactAPI } from '../services/api';
import { useThemeStore } from '../stores/themeStore';

interface ServicePlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  popular?: boolean;
}

const Enterprise: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [contactForm, setContactForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    industry: '',
    employees: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDarkMode } = useThemeStore();

  const servicePlans: ServicePlan[] = [
    {
      id: 'basic',
      name: '基础版',
      price: '¥9,999',
      period: '/月',
      description: '适合中小型企业的基础合规需求',
      features: [
        '每日合规资讯推送',
        '基础政策解读',
        '邮件通知服务',
        '标准客服支持',
        '月度合规报告'
      ]
    },
    {
      id: 'professional',
      name: '专业版',
      price: '¥19,999',
      period: '/月',
      description: '为成长型企业提供全面的合规解决方案',
      features: [
        '实时合规监控',
        'AI智能风险评估',
        '定制化政策解读',
        '专属客户经理',
        '周度深度分析报告',
        '合规培训资源',
        'API接口访问'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: '企业版',
      price: '定制报价',
      period: '',
      description: '为大型企业量身定制的全方位合规管理平台',
      features: [
        '全球合规监控网络',
        '高级AI分析引擎',
        '多语言支持',
        '专业法务团队支持',
        '实时预警系统',
        '定制化仪表板',
        '私有化部署选项',
        '7x24小时技术支持'
      ],
      highlighted: true
    }
  ];

  const industries = [
    '金融服务', '科技互联网', '制造业', '医疗健康',
    '能源化工', '电信通讯', '零售电商', '其他'
  ];

  const employeeRanges = [
    '50人以下', '50-200人', '200-1000人', 
    '1000-5000人', '5000人以上'
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactForm.companyName || !contactForm.contactPerson || !contactForm.email) {
      toast.error('请填写必填信息');
      return;
    }

    setIsSubmitting(true);

    try {
      // 转换为联系表单格式
      const contactData = {
        name: contactForm.contactPerson,
        email: contactForm.email,
        company: contactForm.companyName,
        phone: contactForm.phone,
        subject: '企业定制服务咨询',
        message: `行业: ${contactForm.industry}\n公司规模: ${contactForm.employees}\n具体需求: ${contactForm.requirements}`
      };
      
      await contactAPI.submitContact(contactData);
      toast.success('咨询信息已提交，我们将在24小时内联系您');
      
      // Reset form
      setContactForm({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        industry: '',
        employees: '',
        requirements: ''
      });
      setSelectedPlan('');
    } catch (error) {
      console.error('提交表单失败:', error);
      toast.error('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className={`mb-4 text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>企业定制</h1>
          <p className={`mx-auto max-w-2xl text-xl ${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>
            为您的企业量身定制专业的跨境合规解决方案
          </p>
        </div>

        {/* Value Propositions */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className={`mb-2 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>定制化简报</h3>
            <p className={`${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>根据您的行业、关注领域和内部话术习惯，生成高度定制化的日报、周报，直达关键决策者邮箱。</p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className={`mb-2 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>专属风险预警</h3>
            <p className={`${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>主动监测与您业务、客户、供应链相关的负面动态，第一时间发出预警，帮助您快速响应，规避风险。</p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-pink-600">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className={`mb-2 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>合规报告与培训</h3>
            <p className={`${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>直接输出符合您集团文件格式习惯的合规文件初稿，或为您的团队提供基于最新动态的内部培训材料。</p>
          </div>
        </div>

        {/* Service Plans */}
        <div className="mb-16">
          <h2 className={`mb-8 text-center text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>服务方案</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {servicePlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-lg p-6 backdrop-blur-sm transition-all hover:scale-105 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400'
                    : isDarkMode 
                      ? 'bg-white/10 border border-white/20' 
                      : 'bg-white shadow-lg border border-gray-200'
                } ${
                  selectedPlan === plan.id ? 'ring-2 ring-blue-400' : ''
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                      isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
                    }`}>
                      最受欢迎
                    </span>
                  </div>
                )}
                
                <div className="mb-4 text-center">
                  <h3 className={`mb-2 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  <div className="mb-2">
                    <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                    {plan.period && <span className={`${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>{plan.period}</span>}
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>{plan.description}</p>
                </div>
                
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className={`flex items-center gap-2 ${isDarkMode ? 'text-blue-100' : 'text-gray-700'}`}>
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full rounded-lg py-3 font-semibold transition-all ${
                    plan.highlighted
                      ? (isDarkMode ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-yellow-400 text-black hover:bg-yellow-300')
                      : isDarkMode 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {plan.id === 'enterprise' ? '联系咨询' : '选择方案'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className={`mx-auto max-w-2xl rounded-lg p-8 backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-white/10' 
            : 'bg-white shadow-lg border border-gray-200'
        }`}>
          <div className="mb-6 text-center">
            <h2 className={`mb-2 text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>联系我们</h2>
            <p className={`${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>与我们联系，开启您的专属合规之旅</p>
          </div>
          
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  公司名称 *
                </label>
                <input
                  type="text"
                  value={contactForm.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 backdrop-blur-sm focus:outline-none ${
                    isDarkMode 
                      ? 'bg-white/20 text-white placeholder-blue-300 focus:bg-white/30' 
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 focus:bg-white focus:border-blue-500'
                  }`}
                  placeholder="请输入公司名称"
                  required
                />
              </div>
              
              <div>
                <label className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  联系人 *
                </label>
                <input
                  type="text"
                  value={contactForm.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 backdrop-blur-sm focus:outline-none ${
                    isDarkMode 
                      ? 'bg-white/20 text-white placeholder-blue-300 focus:bg-white/30' 
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 focus:bg-white focus:border-blue-500'
                  }`}
                  placeholder="请输入联系人姓名"
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  邮箱地址 *
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 backdrop-blur-sm focus:outline-none ${
                    isDarkMode 
                      ? 'bg-white/20 text-white placeholder-blue-300 focus:bg-white/30' 
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 focus:bg-white focus:border-blue-500'
                  }`}
                  placeholder="请输入邮箱地址"
                  required
                />
              </div>
              
              <div>
                <label className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  联系电话
                </label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 backdrop-blur-sm focus:outline-none ${
                    isDarkMode 
                      ? 'bg-white/20 text-white placeholder-blue-300 focus:bg-white/30' 
                      : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 focus:bg-white focus:border-blue-500'
                  }`}
                  placeholder="请输入联系电话"
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  所属行业
                </label>
                <select
                  value={contactForm.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 backdrop-blur-sm focus:outline-none ${
                    isDarkMode 
                      ? 'bg-white/20 text-white focus:bg-white/30' 
                      : 'bg-gray-50 text-gray-900 border border-gray-300 focus:bg-white focus:border-blue-500'
                  }`}
                >
                  <option value="" className="text-gray-900">请选择行业</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry} className="text-gray-900">
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  公司规模
                </label>
                <select
                  value={contactForm.employees}
                  onChange={(e) => handleInputChange('employees', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 backdrop-blur-sm focus:outline-none ${
                    isDarkMode 
                      ? 'bg-white/20 text-white focus:bg-white/30' 
                      : 'bg-gray-50 text-gray-900 border border-gray-300 focus:bg-white focus:border-blue-500'
                  }`}
                >
                  <option value="" className="text-gray-900">请选择规模</option>
                  {employeeRanges.map((range) => (
                    <option key={range} value={range} className="text-gray-900">
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {selectedPlan && (
              <div>
                <label className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  选择方案
                </label>
                <input
                  type="text"
                  value={servicePlans.find(p => p.id === selectedPlan)?.name || ''}
                  readOnly
                  className={`w-full rounded-lg px-4 py-3 backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-blue-600/50 text-white' 
                      : 'bg-blue-100 text-blue-900 border border-blue-300'
                  }`}
                />
              </div>
            )}
            
            <div>
              <label className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                具体需求
              </label>
              <textarea
                value={contactForm.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                rows={4}
                className={`w-full rounded-lg px-4 py-3 backdrop-blur-sm focus:outline-none ${
                  isDarkMode 
                    ? 'bg-white/20 text-white placeholder-blue-300 focus:bg-white/30' 
                    : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 focus:bg-white focus:border-blue-500'
                }`}
                placeholder="请详细描述您的合规需求和期望..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <span>{isSubmitting ? '提交中...' : '提交咨询'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Success Stories */}
        <div className="mt-16">
          <h2 className={`mb-8 text-center text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>客户案例</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className={`rounded-lg p-6 backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-white/10' 
                : 'bg-white shadow-lg border border-gray-200'
            }`}>
              <div className="mb-4 flex items-center gap-3">
                <Building className="h-8 w-8 text-blue-400" />
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>某大型科技公司</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>互联网行业 · 5000+员工</p>
                </div>
              </div>
              <p className={`mb-4 ${isDarkMode ? 'text-blue-100' : 'text-gray-700'}`}>
                "通过Horus.AI的企业定制服务，我们建立了完善的跨境合规体系，
                有效降低了合规风险，提升了业务效率。"
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            
            <div className={`rounded-lg p-6 backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-white/10' 
                : 'bg-white shadow-lg border border-gray-200'
            }`}>
              <div className="mb-4 flex items-center gap-3">
                <Building className="h-8 w-8 text-green-400" />
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>某跨国金融机构</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>金融服务 · 1000+员工</p>
                </div>
              </div>
              <p className={`mb-4 ${isDarkMode ? 'text-blue-100' : 'text-gray-700'}`}>
                "AI驱动的实时监控系统帮助我们及时发现潜在合规问题，
                专业的法务团队支持让我们更有信心拓展海外业务。"
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enterprise;