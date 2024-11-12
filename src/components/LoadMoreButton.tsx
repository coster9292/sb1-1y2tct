import React from 'react';
import { Loader } from 'lucide-react';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
}

export function LoadMoreButton({ onClick, loading }: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onClick}
        disabled={loading}
        className="btn-secondary inline-flex items-center gap-2"
      >
        {loading ? (
          <>
            <Loader className="animate-spin h-5 w-5" />
            Loading more cars...
          </>
        ) : (
          'Load More Cars'
        )}
      </button>
    </div>
  );
}