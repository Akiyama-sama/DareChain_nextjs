'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface Parameter {
  name: string;
  description: string;
  required: boolean;
}

interface ApiEndpointDocsProps {
  title: string;
  endpoint: string;
  method: string;
  description: string;
  parameters?: Parameter[];
  responseExample: string;
  errorExample?: string;
}

export default function ApiEndpointDocs({
  title,
  endpoint,
  method,
  description,
  parameters,
  responseExample,
  errorExample,
}: ApiEndpointDocsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center mt-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-500 text-white rounded mr-2">
              {method}
            </span>
            <code className="text-gray-700 dark:text-gray-300 font-mono">{endpoint}</code>
          </div>
        </div>
        <FontAwesomeIcon 
          icon={isOpen ? faChevronUp : faChevronDown} 
          className="text-gray-500 dark:text-gray-400"
        />
      </div>
      
      {isOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">描述</h4>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
          </div>

          {parameters && parameters.length > 0 && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">参数</h4>
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left p-2">名称</th>
                    <th className="text-left p-2">描述</th>
                    <th className="text-left p-2">必填</th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map((param, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="p-2 font-mono">{param.name}</td>
                      <td className="p-2">{param.description}</td>
                      <td className="p-2">{param.required ? '是' : '否'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">成功响应示例</h4>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              {responseExample}
            </pre>
          </div>

          {errorExample && (
            <div>
              <h4 className="text-lg font-semibold mb-2">错误响应示例</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                {errorExample}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 