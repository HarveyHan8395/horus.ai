import React, { useState, useEffect } from 'react';
import { X, Brain, Shield, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'interpretation' | 'compliance';
  newsTitle: string;
}

const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, type, newsTitle }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setResult('');
      
      // 模拟AI分析过程
      const timer = setTimeout(() => {
        setLoading(false);
        if (type === 'interpretation') {
          setResult(`基于对"${newsTitle}"的深度分析，我们发现以下关键要点：\n\n1. **政策背景**：此项政策的出台反映了监管机构对跨境数据流动的日益重视\n\n2. **影响范围**：主要影响涉及跨境业务的科技企业和金融机构\n\n3. **合规要求**：企业需要建立完善的数据分类分级制度和跨境传输审批流程\n\n4. **时间节点**：建议企业在6个月内完成相关合规体系建设\n\n5. **风险提示**：未及时合规可能面临业务暂停和罚款风险`);
        } else {
          setResult(`针对"${newsTitle}"，我们为您提供以下合规建议：\n\n**立即行动项**：\n• 评估现有跨境数据传输流程\n• 识别涉及个人信息和重要数据的业务场景\n• 建立数据出境风险评估机制\n\n**中期规划**：\n• 制定数据分类分级标准\n• 建立跨境数据传输审批制度\n• 培训相关业务人员\n\n**长期合规**：\n• 定期开展合规审计\n• 建立与监管机构的沟通机制\n• 持续关注政策变化\n\n**风险等级**：🔴 高风险 - 建议优先处理`);
        }
      }, 2000 + Math.random() * 1000); // 2-3秒随机延迟

      return () => clearTimeout(timer);
    }
  }, [isOpen, type, newsTitle]);

  if (!isOpen) return null;

  const modalTitle = type === 'interpretation' ? 'AI智能解读' : '合规建议';
  const modalIcon = type === 'interpretation' ? Brain : Shield;
  const IconComponent = modalIcon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              type === 'interpretation' 
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
            }`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {modalTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* News Title */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              分析目标
            </h3>
            <p className="text-gray-900 dark:text-white">{newsTitle}</p>
          </div>

          {/* Loading or Result */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <div className="absolute inset-0 w-8 h-8 border-2 border-blue-200 rounded-full animate-pulse"></div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">
                AI正在深度分析中，请稍候...
              </p>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">分析完成</span>
              </div>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                  {result}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>AI分析仅供参考，具体执行请咨询专业律师</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    关闭
                  </button>
                  <button
                    onClick={() => {
                      // 这里可以添加导出或分享功能
                      navigator.clipboard.writeText(result);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    复制结果
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIModal;