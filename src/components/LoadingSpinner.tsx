import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  message = "Loading...",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`${sizeClasses[size]} animate-bounce-subtle`}>
        <div className="w-full h-full rounded-full border-4 border-gray-200 border-t-pokemon-red"></div>
      </div>
      {message && <p className="mt-3 text-gray-600">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
