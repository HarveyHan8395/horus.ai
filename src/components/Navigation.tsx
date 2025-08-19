import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isDarkMode = false, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  // 新增：登录弹窗开关
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/news', label: '即时资讯' },
    { path: '/daily', label: '资讯日报' },
    { path: '/weekly', label: '每周重磅' },
    { path: '/podcast', label: 'AI播客' },
    { path: '/enterprise', label: '企业定制' },
    { path: '/contact', label: '联系我们' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`sticky top-0 z-50 shadow-lg backdrop-blur-sm transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-navy' 
        : 'bg-white/90 border-b border-gray-200'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://dachenglaw.oss-cn-beijing.aliyuncs.com/2025/08/17/5MRdLh.png" 
              alt="Horus.AI Logo" 
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col">
              <span className={`text-2xl font-bold leading-tight ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Horus.AI</span>
              <span className={`text-xs font-medium tracking-wide ${
                isDarkMode ? 'text-blue-200' : 'text-blue-600'
              }`}>AI LEGAL REGTECH</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isDarkMode
                    ? `hover:text-blue-200 ${
                        isActive(item.path) ? 'text-white' : 'text-blue-100'
                      }`
                    : `hover:text-blue-600 ${
                        isActive(item.path) ? 'text-gray-900' : 'text-gray-600'
                      }`
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-400"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <button
              onClick={() => setIsLoginOpen(true)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                isDarkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              aria-label="登录（敬请期待）"
            >
              login
            </button>

            {/* Theme Toggle */}
            {toggleDarkMode && (
              <button
                onClick={toggleDarkMode}
                className={`rounded-lg p-2 transition-all ${
                  isDarkMode 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label="切换主题"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden rounded-lg p-2 transition-all ${
                isDarkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label="切换菜单"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`lg:hidden py-4 ${
            isDarkMode ? 'border-t border-blue-600' : 'border-t border-gray-200'
          }`}>
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isDarkMode
                      ? isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                      : isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {isLoginOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50"
          onClick={() => setIsLoginOpen(false)}
        >
          <div
            className={`w-full max-w-sm rounded-lg shadow-xl ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between px-4 py-3 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h3 className="text-base font-semibold">登录</h3>
              <button
                onClick={() => setIsLoginOpen(false)}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                aria-label="关闭登录弹窗"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-4 py-6">
              <p className="text-center text-sm">敬请期待</p>
            </div>
            <div className={`flex justify-end gap-3 px-4 py-3 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <button
                onClick={() => setIsLoginOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  isDarkMode 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;