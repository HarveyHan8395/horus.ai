import React, { useState } from 'react';
import { Building, Users, Shield, Zap, CheckCircle, ArrowRight, Star, Globe, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { contactAPI } from '../services/api';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">企业定制</h1>
          <p className="mx-auto max-w-2xl text-xl text-blue-200">
            为您的企业量身定制专业的跨境合规解决方案
          </p>
        </div>

        {/* Value Propositions */}
        <div className="mb-16 grid gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">专业合规</h3>
            <p className="text-blue-200">资深法务团队提供专业合规指导</p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">AI驱动</h3>
            <p className="text-blue-200">先进AI技术实现智能风险识别</p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">全球覆盖</h3>
            <p className="text-blue-200">覆盖全球主要国家和地区政策</p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-600">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">专属服务</h3>
            <p className="text-blue-200">专属客户经理提供一对一服务</p>
          </div>
        </div>

        {/* Service Plans */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">服务方案</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {servicePlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-lg p-6 backdrop-blur-sm transition-all hover:scale-105 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400'
                    : 'bg-white/10 border border-white/20'
                } ${
                  selectedPlan === plan.id ? 'ring-2 ring-blue-400' : ''
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      最受欢迎
                    </span>
                  </div>
                )}
                
                <div className="mb-4 text-center">
                  <h3 className="mb-2 text-xl font-bold text-white">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-blue-200">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-blue-200">{plan.description}</p>
                </div>
                
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-blue-100">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full rounded-lg py-3 font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.id === 'enterprise' ? '联系咨询' : '选择方案'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mx-auto max-w-2xl rounded-lg bg-white/10 p-8 backdrop-blur-sm">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-white">联系我们</h2>
            <p className="text-blue-200">填写您的需求，我们将为您提供专业的解决方案</p>
          </div>
          
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-white">
                  公司名称 *
                </label>
                <input
                  type="text"
                  value={contactForm.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-blue-300 backdrop-blur-sm focus:bg-white/30 focus:outline-none"
                  placeholder="请输入公司名称"
                  required
                />
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-white">
                  联系人 *
                </label>
                <input
                  type="text"
                  value={contactForm.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-blue-300 backdrop-blur-sm focus:bg-white/30 focus:outline-none"
                  placeholder="请输入联系人姓名"
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-white">
                  邮箱地址 *
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-blue-300 backdrop-blur-sm focus:bg-white/30 focus:outline-none"
                  placeholder="请输入邮箱地址"
                  required
                />
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-white">
                  联系电话
                </label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-blue-300 backdrop-blur-sm focus:bg-white/30 focus:outline-none"
                  placeholder="请输入联系电话"
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-white">
                  所属行业
                </label>
                <select
                  value={contactForm.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full rounded-lg bg-white/20 px-4 py-3 text-white backdrop-blur-sm focus:bg-white/30 focus:outline-none"
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
                <label className="mb-1 block text-sm font-medium text-white">
                  公司规模
                </label>
                <select
                  value={contactForm.employees}
                  onChange={(e) => handleInputChange('employees', e.target.value)}
                  className="w-full rounded-lg bg-white/20 px-4 py-3 text-white backdrop-blur-sm focus:bg-white/30 focus:outline-none"
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
                <label className="mb-1 block text-sm font-medium text-white">
                  选择方案
                </label>
                <input
                  type="text"
                  value={servicePlans.find(p => p.id === selectedPlan)?.name || ''}
                  readOnly
                  className="w-full rounded-lg bg-blue-600/50 px-4 py-3 text-white backdrop-blur-sm"
                />
              </div>
            )}
            
            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                具体需求
              </label>
              <textarea
                value={contactForm.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                rows={4}
                className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-blue-300 backdrop-blur-sm focus:bg-white/30 focus:outline-none"
                placeholder="请详细描述您的合规需求和期望..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? '提交中...' : '提交咨询'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Success Stories */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">客户案例</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <Building className="h-8 w-8 text-blue-400" />
                <div>
                  <h3 className="font-semibold text-white">某大型科技公司</h3>
                  <p className="text-sm text-blue-200">互联网行业 · 5000+员工</p>
                </div>
              </div>
              <p className="mb-4 text-blue-100">
                "通过Horus.AI的企业定制服务，我们建立了完善的跨境合规体系，
                有效降低了合规风险，提升了业务效率。"
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <Building className="h-8 w-8 text-green-400" />
                <div>
                  <h3 className="font-semibold text-white">某跨国金融机构</h3>
                  <p className="text-sm text-blue-200">金融服务 · 1000+员工</p>
                </div>
              </div>
              <p className="mb-4 text-blue-100">
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