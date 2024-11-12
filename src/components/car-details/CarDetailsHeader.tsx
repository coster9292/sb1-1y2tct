import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CarDetailsHeaderProps {
  title: string;
  adTitle?: string;
  redirectUrl?: string;
}

export function CarDetailsHeader({ title, adTitle, redirectUrl }: CarDetailsHeaderProps) {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mb-8 btn-secondary inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Search
      </button>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {adTitle && adTitle !== title && (
            <p className="mt-2 text-gray-600">{adTitle}</p>
          )}
        </div>
        {redirectUrl && (
          <a
            href={redirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Full Ad
          </a>
        )}
      </div>
    </div>
  );
}