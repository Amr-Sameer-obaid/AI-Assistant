import { GoogleGenerativeAI } from '@google/generative-ai';
import { ErrorState } from '../types/chat';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    if (!prompt.trim()) {
      throw new Error('Prompt cannot be empty');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    if (!response.text()) {
      throw new Error('Empty response received from AI');
    }

    return response.text();
  } catch (error) {
    const errorState: ErrorState = {
      message: 'Failed to generate AI response',
      code: error instanceof Error ? error.name : 'UNKNOWN_ERROR'
    };

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorState.message = 'Invalid or missing API key. Please check your configuration.';
        errorState.code = 'INVALID_API_KEY';
      } else if (error.message.includes('network')) {
        errorState.message = 'Network error. Please check your connection.';
        errorState.code = 'NETWORK_ERROR';
      }
    }

    throw errorState;
  }
}