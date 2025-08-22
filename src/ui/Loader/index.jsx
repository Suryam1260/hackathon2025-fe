import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4" role="status" aria-live="polite" aria-busy="true">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-500 blur-md opacity-70 animate-pulse"></div>
          <svg className="relative w-16 h-16 text-indigo-600 animate-spin" viewBox="0 0 50 50" aria-hidden="true">
            <circle cx="25" cy="25" r="20" strokeWidth="6" stroke="currentColor" fill="none" opacity="0.15" />
            <circle cx="25" cy="25" r="20" strokeWidth="6" stroke="currentColor" fill="none" strokeLinecap="round" strokeDasharray="100" strokeDashoffset="60" />
          </svg>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">Loading…</p>
        <span className="sr-only">Content is loading</span>
      </div>
    </div>
  )
}

export default Loader