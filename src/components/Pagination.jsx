import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ page, totalPages, onPage }) => (
  <div className="flex gap-3 items-center mt-6 justify-end select-none">
    {/* Prev */}
    <button
      disabled={page === 1}
      onClick={() => onPage(page - 1)}
      className="flex items-center gap-1 px-4 py-2 bg-white border rounded-xl shadow-sm
                 hover:bg-gray-100 transition disabled:opacity-40 disabled:hover:bg-white"
    >
      <ChevronLeft size={16} strokeWidth={2} />
    </button>

    {/* Page Display */}
    <span className="text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-xl border shadow-sm">
      {page} / {totalPages}
    </span>

    {/* Next */}
    <button
      disabled={page === totalPages}
      onClick={() => onPage(page + 1)}
      className="flex items-center gap-1 px-4 py-2 bg-white border rounded-xl shadow-sm
                 hover:bg-gray-100 transition disabled:opacity-40 disabled:hover:bg-white"
    >
      <ChevronRight size={16} strokeWidth={2} />
    </button>
  </div>
);
