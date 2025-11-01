
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-green-600 text-white hover:bg-green-700'}`}>
        <ChevronLeft className="w-5 h-5" />
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{i + 1}</button>
      ))}
      <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-green-600 text-white hover:bg-green-700'}`}>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
