import React from 'react';
import { motion } from 'framer-motion';

const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#fffcf5] flex flex-col">
      {/* Header Skeleton */}
      <div className="h-20 bg-white border-b border-gray-100 flex items-center px-4 md:px-10 justify-between">
        <div className="w-32 h-8 bg-gray-200 rounded-lg animate-pulse" />
        <div className="hidden md:flex gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-20 h-4 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
          <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 px-4 md:px-10 py-10">
        {/* Banner/Hero area */}
        <div className="w-full h-[400px] bg-gray-200 rounded-3xl mb-12 animate-pulse overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-[shimmer_2s_infinite]" />
        </div>

        {/* Section Title */}
        <div className="w-48 h-8 bg-gray-200 rounded-lg mb-8 animate-pulse" />

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
              <div className="w-3/4 h-4 bg-gray-100 rounded animate-pulse" />
              <div className="w-1/2 h-4 bg-gray-50 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%) skewX(-20deg); }
        }
      `}</style>
    </div>
  );
};

export default PageSkeleton;
