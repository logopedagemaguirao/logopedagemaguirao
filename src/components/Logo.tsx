import { useState } from 'react';
import { useCustomImages } from '../context/CustomImageContext';

interface LogoProps {
  variant?: 'header' | 'footer' | 'hero';
  className?: string;
}

export const Logo = ({ variant = 'header', className = '' }: LogoProps) => {
  const isDark = variant === 'footer';
  const { getImageFor } = useCustomImages();
  const customLogo = getImageFor('logo');

  const logoCandidates = [
    '/Mi_logo-sin fondo.png',
    '/Mi logo.jpeg',
    '/Mi_logo.jpeg',
    encodeURI('/Mi_logo-sin fondo.png'),
    encodeURI('/Mi logo.jpeg')
  ];
  const [candidateIdx, setCandidateIdx] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const handleImgError = () => {
    if (candidateIdx < logoCandidates.length - 1) {
      setCandidateIdx((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  const activeSrc = customLogo || (!allFailed ? logoCandidates[candidateIdx] : null);

  return (
    <div
      id={variant === 'header' ? 'main-header-logo' : variant === 'hero' ? 'hero-logo' : 'footer-logo'}
      className={`inline-flex items-center gap-3.5 select-none ${className}`}
    >
      {activeSrc ? (
        <img
          src={activeSrc}
          alt="Logopeda Gema Guirao"
          className={`${
            variant === 'footer'
              ? 'h-11 sm:h-12 w-auto brightness-0 invert opacity-95'
              : variant === 'hero'
              ? 'h-14 sm:h-16 w-auto'
              : 'h-11 sm:h-12 w-auto'
          } object-contain transition-transform`}
          onError={handleImgError}
        />
      ) : (
        <>
          {/* Fallback exact vector representation of the brand symbol */}
          <div className="relative shrink-0 flex items-center justify-center">
            <svg
              className="w-11 h-11 sm:w-12 sm:h-12 drop-shadow-sm"
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <radialGradient
                  id="logoSphereGrad"
                  cx="45%"
                  cy="40%"
                  r="60%"
                  fx="35%"
                  fy="30%"
                >
                  <stop offset="0%" stopColor="#C493D1" />
                  <stop offset="35%" stopColor="#873A9E" />
                  <stop offset="75%" stopColor="#55216B" />
                  <stop offset="100%" stopColor="#3F1F4D" />
                </radialGradient>
                <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EADFED" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#B68FC1" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              <circle cx="80" cy="76" r="54" fill="url(#logoSphereGrad)" />

              <path
                d="M 60 22 A 66 66 0 0 1 144 76"
                stroke="url(#orbitGrad)"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="138" cy="46" r="3" fill="#B68FC1" />
              <circle cx="145" cy="58" r="1.75" fill="#EADFED" />

              <g stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M 46 80 C 40 70, 42 55, 52 46 C 60 38, 74 36, 86 42 C 94 36, 108 38, 114 48 C 120 58, 118 70, 112 78" />
                <path d="M 46 80 C 44 88, 50 96, 60 98 C 70 100, 78 94, 82 86 C 86 94, 94 98, 102 96 C 108 94, 112 86, 112 78" />
                <path d="M 58 56 C 66 52, 76 60, 72 70 C 68 80, 80 82, 88 74 C 94 66, 104 68, 102 58" />
                <path d="M 64 74 C 74 76, 80 62, 90 60 C 98 62, 96 76, 88 84" />
                <path d="M 52 68 C 60 70, 62 82, 70 82" />
                <path d="M 74 44 C 80 50, 88 48, 92 44" />

                <circle cx="52" cy="46" r="2.2" fill="#FFFFFF" />
                <circle cx="86" cy="42" r="2.2" fill="#FFFFFF" />
                <circle cx="114" cy="48" r="2.2" fill="#FFFFFF" />
                <circle cx="72" cy="70" r="2" fill="#FFFFFF" />
                <circle cx="88" cy="74" r="2" fill="#FFFFFF" />
                <circle cx="60" cy="98" r="2" fill="#FFFFFF" />
                <circle cx="102" cy="96" r="2" fill="#FFFFFF" />
                <circle cx="90" cy="60" r="2" fill="#FFFFFF" />

                <path
                  d="M 104 82 L 110 82 L 113 74 L 117 90 L 122 66 L 126 96 L 130 72 L 134 88 L 138 78 L 142 84 L 148 82"
                  stroke="#FFFFFF"
                  strokeWidth="2.25"
                />
              </g>

              <path
                d="M 56 138 Q 86 142 120 134"
                stroke={isDark ? '#B68FC1' : '#6E2F82'}
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <span
              className={`text-[11px] sm:text-xs font-serif tracking-[0.28em] uppercase ${
                isDark ? 'text-[#EADFED]' : 'text-[#3F1F4D]'
              }`}
              style={{ letterSpacing: '0.24em' }}
            >
              LOGOPEDA
            </span>
            <span
              className={`font-serif text-lg sm:text-xl font-bold tracking-tight -mt-0.5 ${
                isDark ? 'text-[#FBF8F3]' : 'text-[#3F1F4D]'
              }`}
            >
              Gema Guirao
            </span>
          </div>
        </>
      )}
    </div>
  );
};
