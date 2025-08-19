import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { newsAPI, FilterOptions } from '../services/api';
import { useThemeStore } from '../stores/themeStore';
import { getFilterOptions as getLocalFilterOptions } from '../utils/newsDataManager';

interface NewsFilterProps {
  onFilterChange: (filters: {
    category: string;
    publisher: string;
    field: string;
    industry: string;
    search: string;
  }) => void;
  currentFilters: {
    category: string;
    publisher: string;
    field: string;
    industry: string;
    search: string;
  };
}

const NewsFilter: React.FC<NewsFilterProps> = ({ onFilterChange, currentFilters }) => {
  const { isDarkMode } = useThemeStore();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    publishers: [],
    fields: [],
    industries: [],
    categories: []
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      setLoading(true);
      const response = await newsAPI.getFilterOptions();
      if (response.success) {
        setFilterOptions(response.data);
        return;
      }
    } catch (error) {
      console.error('Failed to load filter options:', error);
    } finally {
      // 无论是否异常，都尝试使用本地数据管理器生成的筛选项作为兜底
      const localFilters = getLocalFilterOptions();
      setFilterOptions(localFilters);
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = {
      ...currentFilters,
      [key]: value
    };
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '全部资讯',
      publisher: '',
      field: '',
      industry: '',
      search: ''
    };
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = currentFilters.publisher || currentFilters.field || currentFilters.industry || currentFilters.search || currentFilters.category !== '全部资讯';

  return (
    <div
      className={`rounded-lg shadow-sm border p-4 mb-6 ${
        isDarkMode ? '' : 'bg-white border-gray-200'
      }`}
      style={isDarkMode ? { background: 'var(--card-bg)', borderColor: 'var(--border-color)' } : undefined}
    >
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="搜索关键词..."
          value={currentFilters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isDarkMode
              ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['全部资讯', ...filterOptions.categories].map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange('category', category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentFilters.category === category
                ? 'bg-blue-600 text-white'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center gap-2 font-medium ${
            isDarkMode
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <Filter className="w-4 h-4" />
          高级筛选
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className={`flex items-center gap-1 text-sm ${
              isDarkMode
                ? 'text-gray-400 hover:text-gray-200'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <X className="w-4 h-4" />
            清除筛选
          </button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {isFilterOpen && (
        <div className={`mt-4 pt-4 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2>加载筛选选项...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Publisher Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  发布机构
                </label>
                <select
                  value={currentFilters.publisher}
                  onChange={(e) => handleFilterChange('publisher', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-white'
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                >
                  <option value="">全部机构</option>
                  {filterOptions.publishers.map((publisher) => (
                    <option key={publisher} value={publisher}>
                      {publisher}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  专业领域
                </label>
                <select
                  value={currentFilters.field}
                  onChange={(e) => handleFilterChange('field', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-white'
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                >
                  <option value="">全部领域</option>
                  {filterOptions.fields.map((field) => (
                    <option key={field} value={field}>
                      {field}
                    </option>
                  ))}
                </select>
              </div>

              {/* Industry Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  行业分类
                </label>
                <select
                  value={currentFilters.industry}
                  onChange={(e) => handleFilterChange('industry', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-white'
                      : 'border-gray-300 bg-white text-gray-900'
                  }`}
                >
                  <option value="">全部行业</option>
                  {filterOptions.industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {currentFilters.category !== '全部资讯' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                分类: {currentFilters.category}
                <button
                  onClick={() => handleFilterChange('category', '全部资讯')}
                  className="ml-1 hover:text-blue-600 dark:hover:text-blue-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentFilters.publisher && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                机构: {currentFilters.publisher}
                <button
                  onClick={() => handleFilterChange('publisher', '')}
                  className="ml-1 hover:text-green-600 dark:hover:text-green-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentFilters.field && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                领域: {currentFilters.field}
                <button
                  onClick={() => handleFilterChange('field', '')}
                  className="ml-1 hover:text-purple-600 dark:hover:text-purple-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentFilters.industry && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-sm rounded-full">
                行业: {currentFilters.industry}
                <button
                  onClick={() => handleFilterChange('industry', '')}
                  className="ml-1 hover:text-orange-600 dark:hover:text-orange-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFilter;