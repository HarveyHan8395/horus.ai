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
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xl">
              H
            </div>
            <span className="text-2xl font-bold text-white">Horus.AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 ${
                  isActive(item.path)
                    ? 'text-white'
                    : 'text-blue-100'
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
            {/* Theme Toggle */}
            {toggleDarkMode && (
              <button
                onClick={toggleDarkMode}
                className="rounded-lg bg-white/10 p-2 text-white transition-all hover:bg-white/20"
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
              className="lg:hidden rounded-lg bg-white/10 p-2 text-white transition-all hover:bg-white/20"
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
          <div className="lg:hidden border-t border-blue-600 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;