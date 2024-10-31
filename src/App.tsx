import React, { useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingIndicator } from './components/LoadingIndicator';
import { generateAIResponse } from './services/ai';
import { generateMessageId } from './utils/messageUtils';
import { Message, ErrorState } from './types/chat';

const INITIAL_MESSAGE: Message = {
  id: generateMessageId(),
  role: 'assistant',
  content: "Hi! I'm Bolt, an AI assistant created by StackBlitz. I'm here to help you with coding, development, and technical questions. How can I assist you today?",
  timestamp: Date.now(),
};

function App() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);

  const handleSendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const userMessage: Message = {
        id: generateMessageId(),
        role: 'user',
        content,
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, userMessage]);

      const aiResponse = await generateAIResponse(content);
      
      const assistantMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorState: ErrorState = {
        message: err instanceof Error ? err.message : 'An unexpected error occurred',
        code: err instanceof Error ? err.name : 'UNKNOWN_ERROR',
      };
      setError(errorState);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage.content);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Bolt AI Assistant</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
              />
            ))}
            {isLoading && <LoadingIndicator />}
            {error && <ErrorMessage error={error} onRetry={handleRetry} />}
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  );
}

export default App;