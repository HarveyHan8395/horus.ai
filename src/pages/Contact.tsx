import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ChevronDown } from 'lucide-react';
import { contactAPI } from '../services/api';
import { toast } from 'sonner';
import { useThemeStore } from '../stores/themeStore';

interface ContactForm {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDarkMode } = useThemeStore();

  const faqs = [
    { q: '如何开始使用Horus.AI？', a: '您可以直接访问我们的平台浏览免费内容，或联系我们的销售团队了解企业定制服务。' },
    { q: '是否提供API接口？', a: '是的，我们为企业客户提供完整的API接口，支持数据集成和定制化开发。' },
    { q: '数据更新频率如何？', a: '我们的数据实时更新，重要政策变化会在第一时间推送给用户。' },
    { q: '是否支持多语言？', a: '目前主要支持中文，我们正在开发英文版本，未来会支持更多语言。' },
  ];

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('请填写必填字段');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await contactAPI.submitContact(formData);
      toast.success('感谢您的留言，我们会尽快回复！');
      
      // 重置表单
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('提交表单失败:', error);
      toast.error('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className={`mb-4 text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>联系我们</h1>
          <p className={`${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>我们期待与您沟通，了解您的需求</p>
        </div>

        {/* Contact Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Mail, title: '邮箱', content: 'contact@harveyhan.cn' },
            { icon: Phone, title: '电话', content: '+86 186 1295 8395' },
            { icon: MapPin, title: '地址', content: '北京市朝阳区朝阳门南大街10号' }
          ].map((item, idx) => (
            <div key={idx} className={`rounded-lg p-6 text-center backdrop-blur-sm ${isDarkMode ? 'bg-white/10' : 'bg-white shadow-lg border border-gray-200'}`}>
              <item.icon className="mx-auto mb-3 h-8 w-8 text-blue-500" />
              <h3 className={`mb-2 text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
              <p className={`${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>{item.content}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className={`mx-auto max-w-2xl rounded-lg p-8 backdrop-blur-sm ${isDarkMode ? 'bg-white/10' : 'bg-white shadow-lg border border-gray-200'}`}>
          <h2 className={`mb-6 text-center text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>给我们留言</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>您的姓名 *</label>
                <input type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 focus:outline-none backdrop-blur-sm ${isDarkMode ? 'bg-white/20 text-white placeholder-blue-300 focus:bg-white/30' : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 focus:bg-white focus:border-blue-500'}`} placeholder="请输入您的姓名" required />
              </div>
              <div>
                <label className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>邮箱 *</label>
                <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full rounded-lg px-4 py-3 focus:outline-none backdrop-blur-sm ${isDarkMode ? 'bg-white/20 text-white placeholder-blue-300 focus:bg-white/30' : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 focus:bg-white focus:border-blue-500'}`} placeholder="请输入邮箱地址" required />
              </div>
            </div>

            <div>
              <label className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>主题 *</label>
              <input type="text" value={formData.subject} onChange={(e) => handleInputChange('subject', e.target.value)}
                className={`w-full rounded-lg px-4 py-3 focus:outline-none backdrop-blur-sm ${isDarkMode ? 'bg-white/20 text-white placeholder-blue-300 focus:bg-white/30' : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 focus:bg-white focus:border-blue-500'}`} placeholder="请输入主题" required />
            </div>

            <div>
              <label className={`mb-1 block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>留言内容 *</label>
              <textarea rows={5} value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)}
                className={`w-full rounded-lg px-4 py-3 focus:outline-none backdrop-blur-sm ${isDarkMode ? 'bg-white/20 text-white placeholder-blue-300 focus:bg-white/30' : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 focus:bg-white focus:border-blue-500'}`} placeholder="请输入留言内容" required />
            </div>

            <button type="submit" disabled={isSubmitting}
              className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? '发送中...' : '发送留言'}</span>
            </button>
          </form>

          {/* Success Toast/Message placeholder remains via sonner */}
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className={`mb-8 text-center text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>常见问题</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`rounded-lg p-4 backdrop-blur-sm ${isDarkMode ? 'bg-white/10' : 'bg-white shadow border border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>{faq.q}</p>
                  <ChevronDown className={`${isDarkMode ? 'text-white' : 'text-gray-600'} h-5 w-5`} />
                </div>
                <p className={`mt-2 text-sm ${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;