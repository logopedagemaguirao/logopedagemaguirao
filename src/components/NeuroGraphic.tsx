export const NeuroGraphic = () => {
  return (
    <div
      id="hero-neuro-graphic"
      className="relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center select-none"
      aria-hidden="true"
    >
      {/* Ambient background glow ring */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#EADFED]/70 via-[#F5ECDF]/60 to-[#B68FC1]/20 blur-2xl opacity-70 pointer-events-none" />

      {/* Main vector representation: Synapses, speech waveforms & neural balance */}
      <svg
        className="w-full h-full p-4 drop-shadow-sm transition-transform duration-700 hover:scale-[1.02]"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="purpleGrad" x1="50" y1="50" x2="450" y2="450" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3F1F4D" />
            <stop offset="0.5" stopColor="#6E2F82" />
            <stop offset="1" stopColor="#B68FC1" />
          </linearGradient>

          <linearGradient id="softLilaGrad" x1="100" y1="100" x2="400" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B68FC1" stopOpacity="0.4" />
            <stop offset="1" stopColor="#EADFED" stopOpacity="0.1" />
          </linearGradient>

          <radialGradient id="nodeGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(250 250) scale(180)">
            <stop stopColor="#EADFED" stopOpacity="0.5" />
            <stop offset="1" stopColor="#FBF8F3" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central backdrop disc */}
        <circle cx="250" cy="250" r="190" fill="url(#nodeGlow)" />
        <circle cx="250" cy="250" r="190" stroke="#B68FC1" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
        <circle cx="250" cy="250" r="140" stroke="#6E2F82" strokeWidth="1" opacity="0.15" />

        {/* Voice resonance concentric curves (acoustic harmonics) */}
        <path
          d="M 170,180 C 130,220 130,280 170,320"
          stroke="#B68FC1"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M 140,150 C 90,210 90,290 140,350"
          stroke="#B68FC1"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeDasharray="2 4"
          opacity="0.6"
        />
        <path
          d="M 330,180 C 370,220 370,280 330,320"
          stroke="#B68FC1"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M 360,150 C 410,210 410,290 360,350"
          stroke="#B68FC1"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeDasharray="2 4"
          opacity="0.6"
        />

        {/* Stylized neural hemisphere paths */}
        <path
          d="M 250,90 C 200,90 160,120 160,170 C 160,200 175,220 190,240 C 170,260 165,290 180,320 C 195,350 220,380 250,400"
          stroke="url(#purpleGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 250,90 C 300,90 340,120 340,170 C 340,200 325,220 310,240 C 330,260 335,290 320,320 C 305,350 280,380 250,400"
          stroke="url(#purpleGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Inner synaptic pathways (language & articulation network) */}
        <path
          d="M 250,130 Q 215,165 220,210 T 250,270 Q 280,310 250,370"
          stroke="#6E2F82"
          strokeWidth="2"
          strokeDasharray="5 5"
          fill="none"
          opacity="0.75"
        />
        <path
          d="M 200,180 C 230,180 250,210 250,240 C 250,270 270,300 300,300"
          stroke="#6E2F82"
          strokeWidth="1.75"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 300,180 C 270,180 250,210 250,240 C 250,270 230,300 200,300"
          stroke="#B68FC1"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* Synaptic nodes */}
        {/* Core nodes */}
        <circle cx="250" cy="90" r="5" fill="#3F1F4D" />
        <circle cx="250" cy="400" r="5" fill="#3F1F4D" />
        <circle cx="250" cy="240" r="7" fill="#6E2F82" />
        <circle cx="250" cy="240" r="14" stroke="#B68FC1" strokeWidth="1.5" opacity="0.5" />

        {/* Left cluster */}
        <circle cx="160" cy="170" r="4.5" fill="#6E2F82" />
        <circle cx="190" cy="240" r="5.5" fill="#3F1F4D" />
        <circle cx="180" cy="320" r="4.5" fill="#6E2F82" />
        <circle cx="220" cy="210" r="3.5" fill="#B68FC1" />

        {/* Right cluster */}
        <circle cx="340" cy="170" r="4.5" fill="#6E2F82" />
        <circle cx="310" cy="240" r="5.5" fill="#3F1F4D" />
        <circle cx="320" cy="320" r="4.5" fill="#6E2F82" />
        <circle cx="280" cy="210" r="3.5" fill="#B68FC1" />

        {/* Delicate interconnection bridge lines */}
        <line x1="160" y1="170" x2="220" y2="210" stroke="#B68FC1" strokeWidth="1" opacity="0.4" />
        <line x1="340" y1="170" x2="280" y2="210" stroke="#B68FC1" strokeWidth="1" opacity="0.4" />
        <line x1="190" y1="240" x2="250" y2="240" stroke="#3F1F4D" strokeWidth="1.5" opacity="0.5" />
        <line x1="310" y1="240" x2="250" y2="240" stroke="#3F1F4D" strokeWidth="1.5" opacity="0.5" />
        <line x1="180" y1="320" x2="250" y2="370" stroke="#B68FC1" strokeWidth="1" opacity="0.4" />
        <line x1="320" y1="320" x2="250" y2="370" stroke="#B68FC1" strokeWidth="1" opacity="0.4" />
      </svg>

      {/* Floating clinical badge */}
      <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-md border border-[#EADFED] py-2.5 px-4 rounded-xl shadow-sm text-left flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#6E2F82] animate-pulse" />
        <div>
          <p className="text-xs font-semibold text-[#3F1F4D] tracking-wide">Práctica Clínica Basada en Evidencia</p>
          <p className="text-[11px] text-[#2F2931]/70">Población infantil y adulta</p>
        </div>
      </div>
    </div>
  );
};
