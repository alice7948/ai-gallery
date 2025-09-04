export interface AITool {
  id: string;
  name: string;
  description: string;
  logo: string;
  screenshot: string;
  category: Category;
  url: string;
  prompts: Prompt[];
}

export interface Prompt {
  title: string;
  prompt: string;
}

export type Category = 
  | 'text-generation'
  | 'image-generation'
  | 'code-assistant'
  | 'data-analysis'
  | 'audio-video'
  | 'other';

export interface ToolsData {
  tools: AITool[];
}

export const categoryLabels: Record<Category, string> = {
  'text-generation': '文章生成',
  'image-generation': '画像生成',
  'code-assistant': 'コード支援',
  'data-analysis': 'データ分析',
  'audio-video': '音声・動画',
  'other': 'その他'
};