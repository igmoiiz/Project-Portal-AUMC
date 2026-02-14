'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-b from-amber-50 to-white border-b-2 border-amber-200 py-6 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg border border-amber-300">
              <BookOpen className="w-6 h-6 text-amber-950" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950 leading-tight">
                AUMC
              </h1>
              <p className="text-xs font-medium text-amber-700 uppercase tracking-widest">
                Project Portal
              </p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex gap-1">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-sm font-medium text-amber-950 hover:bg-amber-100 transition-colors"
            >
              Browse
            </Link>
            <Link
              href="/faculty"
              className="px-4 py-2 rounded-lg text-sm font-medium text-amber-950 hover:bg-amber-100 transition-colors"
            >
              Upload
            </Link>
          </nav>
        </div>
        
        {/* Full Title Section */}
        <div className="space-y-2 pb-4 border-t border-amber-100 pt-4">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-950">
            Air University Multan Campus
          </h2>
          <h3 className="text-lg font-medium text-amber-800">
            Project Ideas Portal
          </h3>
          <p className="text-sm text-amber-700 leading-relaxed">
            Browse and explore innovative project ideas across all departments. Connect with faculty supervisors and validate your academic interests.
          </p>
        </div>
      </div>
    </header>
  );
}
