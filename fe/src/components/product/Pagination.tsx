// src/components/product/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChange,
}) => {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
  }

  const circleClass = "w-10 h-10 flex items-center justify-center rounded-full border transition hover:bg-blue-100";

  return (
    <ul className="flex justify-center mt-4 space-x-2">
      {/* Previous */}
      <li>
        <button
          className={`${circleClass} ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => currentPage > 1 && onChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
      </li>

      {/* Pages */}
      {pages.map((p, idx) =>
        p === "..." ? (
          <li key={idx} className="w-10 h-10 flex items-center justify-center">
            ...
          </li>
        ) : (
          <li key={idx}>
            <button
              onClick={() => onChange(Number(p))}
              className={`${circleClass} ${p === currentPage ? "bg-blue-500 text-white" : ""}`}
            >
              {p}
            </button>
          </li>
        )
      )}

      {/* Next */}
      <li>
        <button
          className={`${circleClass} ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => currentPage < totalPages && onChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
