import React, { useState } from 'react';
import { useCustomImages } from '../context/CustomImageContext';

export interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  id?: string;
  className?: string;
  fallbackSrc?: string;
  captionTitle?: string;
  captionSubtitle?: string;
  aspectRatioClass?: string;
  slotKey?: string;
}

export const SafeImage = ({
  src,
  alt,
  id,
  className = '',
  fallbackSrc,
  captionTitle,
  captionSubtitle,
  aspectRatioClass = 'aspect-[4/3]',
  slotKey,
  ...props
}: SafeImageProps) => {
  const { getImageFor } = useCustomImages();
  const customSrc = getImageFor(slotKey || src);

  const [attempt, setAttempt] = useState<number>(0);
  const [hasFailedAll, setHasFailedAll] = useState<boolean>(false);

  // If user uploaded a custom image in this browser session / IndexedDB, use it directly!
  if (customSrc) {
    return (
      <img
        id={id}
        src={customSrc}
        alt={alt}
        className={className}
        referrerPolicy="no-referrer"
        loading="lazy"
        {...props}
      />
    );
  }

  const getSourceForAttempt = (currAttempt: number): string => {
    const rawPath = src.startsWith('/') ? src : `/${src}`;
    switch (currAttempt) {
      case 0:
        return rawPath;
      case 1:
        return encodeURI(rawPath);
      case 2:
        return `/images${rawPath}`;
      case 3:
        return fallbackSrc || '';
      default:
        return '';
    }
  };

  const handleError = () => {
    if (attempt < 3) {
      setAttempt((prev) => prev + 1);
    } else {
      setHasFailedAll(true);
    }
  };

  const currentSrc = getSourceForAttempt(attempt);

  if (hasFailedAll || !currentSrc) {
    return (
      <div
        id={id}
        className={`w-full ${aspectRatioClass} rounded-2xl bg-gradient-to-br from-[#F5ECDF] via-[#FBF8F3] to-[#EADFED] border border-[#EADFED] p-6 flex flex-col items-center justify-center text-center select-none shadow-sm ${className}`}
      >
        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#6E2F82] mb-3 border border-[#EADFED]">
          <span className="font-serif font-bold text-lg text-[#6E2F82]">GG</span>
        </div>
        <p className="font-serif font-bold text-sm text-[#3F1F4D] max-w-xs">
          {captionTitle || alt}
        </p>
        <p className="text-xs text-[#6E2F82] font-medium mt-1">
          {captionSubtitle || 'Gema Guirao · Neurologopeda Colegiada 30/695'}
        </p>
      </div>
    );
  }

  return (
    <img
      id={id}
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className={className}
      referrerPolicy="no-referrer"
      loading="lazy"
      {...props}
    />
  );
};
