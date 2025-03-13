'use client';

import { useTheme } from 'next-themes';
import { useLanguage } from '../contexts/LanguageContext';

// 定义翻译类型
interface Translation {
  title: string;
  description: string;
  overview: string;
  restDescription: string;
  baseUrl: string;
  randomIdeaTitle: string;
  randomIdeaDesc: string;
  allIdeasTitle: string;
  allIdeasDesc: string;
  ideaByIdTitle: string;
  ideaByIdDesc: string;
  paramName: string;
  paramDesc: string;
  paramRequired: string;
  idParamDesc: string;
  yes: string;
  no: string;
  successResponse: string;
  errorResponse: string;
  errorNotFound: string;
  codeExamples: string;
  jsExample: string;
  pyExample: string;
  fetchError: string;
}

// 语言文本配置
const translations: Record<'zh' | 'en', Translation> = {
  zh: {
    title: 'API文档',
    description: '创意点子生成器提供简单易用的API，让您可以在自己的应用程序中获取和集成创意点子。',
    overview: '概述',
    restDescription: '我们的API使用REST架构，返回JSON格式的数据。所有请求都使用HTTP GET方法。',
    baseUrl: 'API的基本URL为：',
    randomIdeaTitle: '获取随机创意点子',
    randomIdeaDesc: '返回数据库中的一个随机创意点子。',
    allIdeasTitle: '获取所有创意点子',
    allIdeasDesc: '返回数据库中的所有创意点子，按创建时间倒序排列。',
    ideaByIdTitle: '通过ID获取创意点子',
    ideaByIdDesc: '返回指定ID的创意点子。',
    paramName: '名称',
    paramDesc: '描述',
    paramRequired: '必填',
    idParamDesc: '要获取的创意点子的唯一标识符。',
    yes: '是',
    no: '否',
    successResponse: '成功响应示例',
    errorResponse: '错误响应示例',
    errorNotFound: '未找到指定的创意点子',
    codeExamples: '示例代码',
    jsExample: '使用JavaScript获取随机点子',
    pyExample: '使用Python获取随机点子',
    fetchError: '获取随机点子失败:'
  },
  en: {
    title: 'API Documentation',
    description: 'Creative Idea Generator provides a simple API that allows you to fetch and integrate creative ideas in your own applications.',
    overview: 'Overview',
    restDescription: 'Our API uses REST architecture and returns data in JSON format. All requests use the HTTP GET method.',
    baseUrl: 'The base URL for the API is:',
    randomIdeaTitle: 'Get Random Creative Idea',
    randomIdeaDesc: 'Returns a random creative idea from the database.',
    allIdeasTitle: 'Get All Creative Ideas',
    allIdeasDesc: 'Returns all creative ideas from the database, sorted by creation time in descending order.',
    ideaByIdTitle: 'Get Creative Idea by ID',
    ideaByIdDesc: 'Returns a specific creative idea by its ID.',
    paramName: 'Name',
    paramDesc: 'Description',
    paramRequired: 'Required',
    idParamDesc: 'The unique identifier of the creative idea to retrieve.',
    yes: 'Yes',
    no: 'No',
    successResponse: 'Success Response Example',
    errorResponse: 'Error Response Example',
    errorNotFound: 'Creative idea not found',
    codeExamples: 'Code Examples',
    jsExample: 'Using JavaScript to get a random idea',
    pyExample: 'Using Python to get a random idea',
    fetchError: 'Failed to fetch random idea:'
  }
};

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
  isDark: boolean;
  t: Translation;
}

function ApiEndpointDocs({
  title,
  endpoint,
  method,
  description,
  parameters,
  responseExample,
  errorExample,
  isDark,
  t
}: ApiEndpointDocsProps) {
  return (
    <div style={{ 
      border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
      borderRadius: '0.5rem',
      overflow: 'hidden',
      marginBottom: '2rem'
    }}>
      <div style={{
        padding: '1rem',
        backgroundColor: isDark ? '#1f2937' : '#f9fafb',
        borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
      }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold',
          color: isDark ? '#f9fafb' : '#111827'
        }}>{title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
          <span style={{ 
            display: 'inline-block',
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: '600',
            backgroundColor: '#22c55e',
            color: 'white',
            borderRadius: '0.25rem',
            marginRight: '0.5rem'
          }}>
            {method}
          </span>
          <code style={{ 
            fontFamily: 'monospace', 
            color: isDark ? '#d1d5db' : '#374151' 
          }}>{endpoint}</code>
        </div>
      </div>
      
      <div style={{ 
        padding: '1rem',
        backgroundColor: isDark ? '#111827' : '#ffffff'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginBottom: '0.5rem',
            color: isDark ? '#f9fafb' : '#111827'
          }}>{t.paramDesc}</h4>
          <p style={{ color: isDark ? '#d1d5db' : '#374151' }}>{description}</p>
        </div>

        {parameters && parameters.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              color: isDark ? '#f9fafb' : '#111827'
            }}>{t.paramName}</h4>
            <table style={{ minWidth: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}` }}>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '0.5rem',
                    color: isDark ? '#f9fafb' : '#111827'
                  }}>{t.paramName}</th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '0.5rem',
                    color: isDark ? '#f9fafb' : '#111827'
                  }}>{t.paramDesc}</th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '0.5rem',
                    color: isDark ? '#f9fafb' : '#111827'
                  }}>{t.paramRequired}</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((param, index) => (
                  <tr key={index} style={{ borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}` }}>
                    <td style={{ 
                      padding: '0.5rem', 
                      fontFamily: 'monospace',
                      color: isDark ? '#d1d5db' : '#374151'
                    }}>{param.name}</td>
                    <td style={{ 
                      padding: '0.5rem',
                      color: isDark ? '#d1d5db' : '#374151'
                    }}>{param.description}</td>
                    <td style={{ 
                      padding: '0.5rem',
                      color: isDark ? '#d1d5db' : '#374151'
                    }}>{param.required ? t.yes : t.no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginBottom: '0.5rem',
            color: isDark ? '#f9fafb' : '#111827'
          }}>{t.successResponse}</h4>
          <pre style={{ 
            backgroundColor: '#111827', 
            color: '#f9fafb', 
            padding: '1rem', 
            borderRadius: '0.5rem', 
            overflowX: 'auto' 
          }}>
            {responseExample}
          </pre>
        </div>

        {errorExample && (
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              color: isDark ? '#f9fafb' : '#111827'
            }}>{t.errorResponse}</h4>
            <pre style={{ 
              backgroundColor: '#111827', 
              color: '#f9fafb', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              overflowX: 'auto' 
            }}>
              {errorExample}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ApiDocsContent() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  
  // 获取当前语言的文本
  const t = translations[language];

  // 根据当前语言获取错误示例
  const getErrorExample = () => {
    return `{
  "error": "${t.errorNotFound}"
}`;
  };

  // 根据当前语言获取JS示例代码
  const getJsExample = () => {
    return `async function getRandomIdea() {
  try {
    const response = await fetch('https://yourdomain.com/api/ideas/random');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('${t.fetchError}', error);
  }
}`;
  };

  // 根据当前语言获取Python示例代码
  const getPyExample = () => {
    return `import requests

def get_random_idea():
    try:
        response = requests.get('https://yourdomain.com/api/ideas/random')
        return response.json()
    except Exception as e:
        print(f"${t.fetchError} {e}")
        return None`;
  };

  return (
    <div style={{ 
      maxWidth: '64rem', 
      margin: '0 auto', 
      padding: '3rem 1rem',
      backgroundColor: isDark ? '#030712' : '#ffffff',
      color: isDark ? '#f9fafb' : '#111827'
    }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '2.25rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: isDark ? '#f9fafb' : '#111827'
        }}>{t.title}</h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: isDark ? '#d1d5db' : '#4b5563' 
        }}>
          {t.description}
        </p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: isDark ? '#f9fafb' : '#111827'
        }}>{t.overview}</h2>
        <p style={{ 
          marginBottom: '1rem', 
          color: isDark ? '#d1d5db' : '#374151' 
        }}>
          {t.restDescription}
        </p>
        <p style={{ 
          marginBottom: '1rem', 
          color: isDark ? '#d1d5db' : '#374151' 
        }}>
          {t.baseUrl} <code style={{ 
            backgroundColor: isDark ? '#1f2937' : '#f3f4f6', 
            padding: '0.25rem 0.5rem', 
            borderRadius: '0.25rem', 
            fontFamily: 'monospace',
            color: isDark ? '#d1d5db' : '#374151'
          }}>https://yourdomain.com/api</code>
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <ApiEndpointDocs 
          title={t.randomIdeaTitle}
          endpoint="/api/ideas/random"
          method="GET"
          description={t.randomIdeaDesc}
          responseExample={`{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "chineseContent": "创建一个使用AI生成个性化健身计划的应用程序，考虑用户的健康状况、目标和可用设备。",
  "englishContent": "Create an app that uses AI to generate personalized fitness plans considering users' health conditions, goals, and available equipment.",
  "createTime": "2024-03-12T01:23:45.678Z"
}`}
          isDark={isDark}
          t={t}
        />

        <ApiEndpointDocs 
          title={t.allIdeasTitle}
          endpoint="/api/ideas"
          method="GET"
          description={t.allIdeasDesc}
          responseExample={`[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "chineseContent": "创建一个使用AI生成个性化健身计划的应用程序，考虑用户的健康状况、目标和可用设备。",
    "englishContent": "Create an app that uses AI to generate personalized fitness plans considering users' health conditions, goals, and available equipment.",
    "createTime": "2024-03-12T01:23:45.678Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "chineseContent": "设计一个智能花园系统，可以监测土壤湿度、光照和温度，自动灌溉植物，并提供植物护理建议。",
    "englishContent": "Design a smart garden system that monitors soil moisture, light, and temperature, automatically waters plants, and provides plant care advice.",
    "createTime": "2024-03-11T23:45:12.345Z"
  }
]`}
          isDark={isDark}
          t={t}
        />

        <ApiEndpointDocs 
          title={t.ideaByIdTitle}
          endpoint="/api/ideas/{id}"
          method="GET"
          description={t.ideaByIdDesc}
          parameters={[
            { name: 'id', description: t.idParamDesc, required: true }
          ]}
          responseExample={`{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "chineseContent": "创建一个使用AI生成个性化健身计划的应用程序，考虑用户的健康状况、目标和可用设备。",
  "englishContent": "Create an app that uses AI to generate personalized fitness plans considering users' health conditions, goals, and available equipment.",
  "createTime": "2024-03-12T01:23:45.678Z"
}`}
          errorExample={getErrorExample()}
          isDark={isDark}
          t={t}
        />
      </div>

      <div style={{ 
        marginTop: '4rem', 
        padding: '1.5rem', 
        backgroundColor: isDark ? '#1f2937' : '#f9fafb', 
        borderRadius: '0.5rem' 
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: isDark ? '#f9fafb' : '#111827'
        }}>{t.codeExamples}</h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '0.5rem',
            color: isDark ? '#f9fafb' : '#111827'
          }}>{t.jsExample}</h3>
          <pre style={{ 
            backgroundColor: '#111827', 
            color: '#f9fafb', 
            padding: '1rem', 
            borderRadius: '0.5rem', 
            overflowX: 'auto' 
          }}>
            {getJsExample()}
          </pre>
        </div>

        <div>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginBottom: '0.5rem',
            color: isDark ? '#f9fafb' : '#111827'
          }}>{t.pyExample}</h3>
          <pre style={{ 
            backgroundColor: '#111827', 
            color: '#f9fafb', 
            padding: '1rem', 
            borderRadius: '0.5rem', 
            overflowX: 'auto' 
          }}>
            {getPyExample()}
          </pre>
        </div>
      </div>
    </div>
  );
} 