// components/LoadingOverlay.tsx
'use client'

import React from 'react'

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
