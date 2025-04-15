import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - 1);
      const rightBound = Math.min(totalPages, currentPage + 1);

      pages.push(1);

      if (leftBound > 2) {
        pages.push(-1);
      }

      for (let i = leftBound; i <= rightBound; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (rightBound < totalPages - 1) {
        pages.push(-2);
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-6 mb-10">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`pagination-button flex items-center ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-pokemon-blue hover:bg-blue-50"
        }`}
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Prev
      </button>

      <div className="flex space-x-1">
        {getPageNumbers().map((page, index) => {
          if (page < 0) {
            return (
              <span key={`dots-${index}`} className="px-3 py-2">
                ...
              </span>
            );
          }

          return (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={`pagination-button min-w-[40px] ${
                currentPage === page
                  ? "bg-pokemon-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`pagination-button flex items-center ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-pokemon-blue hover:bg-blue-50"
        }`}
      >
        Next
        <svg
          className="w-5 h-5 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
