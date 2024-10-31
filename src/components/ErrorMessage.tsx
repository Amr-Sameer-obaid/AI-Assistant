import React from 'react';
import { ErrorState } from '../types/chat';

interface ErrorMessageProps {
  error: ErrorState;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-2">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{error.message}</h3>
          {error.code && (
            <p className="mt-1 text-xs text-red-700">Error code: {error.code}</p>
          )}
        </div>
        {onRetry && (
          <div className="ml-auto">
            <button
              onClick={onRetry}
              className="bg-red-100 px-3 py-1 rounded-md text-sm text-red-800 hover:bg-red-200 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}