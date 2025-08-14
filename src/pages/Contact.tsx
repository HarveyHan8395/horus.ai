import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { contactAPI } from '../services/api';

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

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: '邮箱联系',
      content: 'contact@horus.ai',
      description: '我们会在24小时内回复您的邮件'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: '电话咨询',
      content: '+86 400-123-4567',
      description: '工作日 9:00-18:00 为您服务'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: '办公地址',
      content: '北京市朝阳区建国门外大街1号',
      description: '欢迎预约到访交流'
    }
  ];

  const subjects = [
    '产品咨询',
    '技术支持',
    '商务合作',
    '媒体采访',
    '其他问题'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">联系我们</h1>
          <p className="mx-auto max-w-2xl text-xl text-blue-200">
            有任何问题或建议？我们很乐意为您提供帮助
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="mb-8 text-2xl font-bold text-white">联系方式</h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg bg-white/10 p-6 backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-white">
                      {info.title}
                    </h3>
                    <p className="mb-1 text-blue-100">{info.content}</p>
                    <p className="text-sm text-blue-300">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="mt-8 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2 text-white">
                <Clock className="h-5 w-5" />
                <span className="text-lg font-semibold">工作时间</span>
              </div>
              <div className="space-y-2 text-blue-200">
                <div className="flex justify-between">
                  <span>周一至周五</span>
                  <span>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>周六</span>
                  <span>10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>周日</span>
                  <span>休息</span>
                </div>
              </div>
            </div>

            {/* Team Info */}
            <div className="mt-8 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2 text-white">
                <Users className="h-5 w-5" />
                <span className="text-lg font-semibold">我们的团队</span>
              </div>
              <p className="text-blue-200">
                我们的专业团队由资深法务专家、技术工程师和产品经理组成，
                致力于为您提供最优质的跨境合规服务。
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="mb-8 text-2xl font-bold text-white">发送消息</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    姓名 *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-blue-300 backdrop-blur-sm focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="请输入您的姓名"
                    required
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    邮箱 *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-blue-300 backdrop-blur-sm focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="请输入您的邮箱"
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    公司名称
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-blue-300 backdrop-blur-sm focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="请输入公司名称"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    联系电话
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-blue-300 backdrop-blur-sm focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  咨询主题
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full rounded-lg bg-white/20 px-4 py-3 text-white backdrop-blur-sm focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" className="text-gray-900">请选择咨询主题</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject} className="text-gray-900">
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  详细信息 *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={6}
                  className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-blue-300 backdrop-blur-sm focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="请详细描述您的问题或需求..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? '发送中...' : '发送消息'}
              </button>
            </form>
            
            {/* Success Message */}
            <div className="mt-6 rounded-lg bg-green-600/20 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-green-300">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">我们承诺</span>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-green-200">
                <li>• 24小时内回复您的咨询</li>
                <li>• 专业团队提供个性化解答</li>
                <li>• 严格保护您的隐私信息</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">常见问题</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <h3 className="mb-3 text-lg font-semibold text-white">
                如何开始使用Horus.AI？
              </h3>
              <p className="text-blue-200">
                您可以直接访问我们的平台浏览免费内容，或联系我们的销售团队了解企业定制服务。
              </p>
            </div>
            
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <h3 className="mb-3 text-lg font-semibold text-white">
                是否提供API接口？
              </h3>
              <p className="text-blue-200">
                是的，我们为企业客户提供完整的API接口，支持数据集成和定制化开发。
              </p>
            </div>
            
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <h3 className="mb-3 text-lg font-semibold text-white">
                数据更新频率如何？
              </h3>
              <p className="text-blue-200">
                我们的数据实时更新，重要政策变化会在第一时间推送给用户。
              </p>
            </div>
            
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <h3 className="mb-3 text-lg font-semibold text-white">
                是否支持多语言？
              </h3>
              <p className="text-blue-200">
                目前主要支持中文，我们正在开发英文版本，未来会支持更多语言。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;