import React from "react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-lg border border-red-100 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-pokemon-red mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h3 className="text-lg font-medium text-red-800 mb-2">
        Something went wrong
      </h3>
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-pokemon-red text-white rounded-md hover:bg-pokemon-light-red transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
