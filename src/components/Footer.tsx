import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

const Footer: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  
  return (
    <footer className={`backdrop-blur-sm border-t ${
      isDarkMode
        ? 'bg-black/50 border-white/10'
        : 'bg-white/90 border-gray-200'
    }`}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* 品牌信息 */}
          <div className="lg:col-span-1">
            <h3 className={`mb-4 text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Horus.AI</h3>
            <p className={`mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              AI LEGAL REGTECH
            </p>
            <p className={`mb-6 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              AI-Powered Legal News & Analysis
            </p>
            <div className="space-y-3">
              <div className={`flex items-center gap-3 text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <Mail className="h-4 w-4 text-blue-500" />
                <a href="mailto:contact@horus-ai.com" className={`transition-colors ${
                  isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'
                }`}>
                  contact@horus-ai.com
                </a>
              </div>
              <div className={`flex items-center gap-3 text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <Phone className="h-4 w-4 text-blue-500" />
                <a href="tel:+861088887777" className={`transition-colors ${
                  isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'
                }`}>
                  +86 10 8888 7777
                </a>
              </div>
              <div className={`flex items-center gap-3 text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <MapPin className="h-4 w-4 text-blue-500" />
                <span>北京市朝阳区建国路88号</span>
              </div>
            </div>
          </div>
          
          {/* 产品服务 */}
          <div>
            <h3 className={`mb-4 text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>产品服务</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/news" 
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ArrowRight className="h-3 w-3" />
                  即时资讯
                </Link>
              </li>
              <li>
                <Link 
                  to="/daily" 
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ArrowRight className="h-3 w-3" />
                  资讯日报
                </Link>
              </li>
              <li>
                <Link 
                  to="/weekly" 
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ArrowRight className="h-3 w-3" />
                  每周重磅
                </Link>
              </li>
              <li>
                <Link 
                  to="/podcast" 
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ArrowRight className="h-3 w-3" />
                  AI播客
                </Link>
              </li>
              <li>
                <Link 
                  to="/enterprise" 
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ArrowRight className="h-3 w-3" />
                  企业定制
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 资源 */}
          <div>
            <h3 className={`mb-4 text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>资源</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ArrowRight className="h-3 w-3" />
                  合规知识库
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ArrowRight className="h-3 w-3" />
                  监管动态地图
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ArrowRight className="h-3 w-3" />
                  行业白皮书
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ArrowRight className="h-3 w-3" />
                  合规培训
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ArrowRight className="h-3 w-3" />
                  专家网络
                </a>
              </li>
            </ul>
          </div>
          
          {/* 企业定制服务 */}
          <div>
            <div className={`rounded-lg p-6 backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gradient-accent/20 border border-white/10' 
                : 'bg-blue-50 border border-blue-200'
            }`}>
              <h3 className={`mb-3 text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>企业定制服务</h3>
              <p className={`mb-4 text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                为您的企业提供专属的合规资讯订阅、风险预警和定制化分析报告
              </p>
              <Link
                to="/enterprise"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-accent px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
              >
                联系我们
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* 底部版权信息 */}
        <div className={`mt-12 border-t pt-8 text-center ${
          isDarkMode ? 'border-white/10' : 'border-gray-200'
        }`}>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            © 2023 Horus.AI - AI Legal RegTech. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;