export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  id: string;
}

export interface ErrorState {
  message: string;
  code?: string;
}