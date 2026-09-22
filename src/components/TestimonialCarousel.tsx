import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Pause,
  Play,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import {
  TESTIMONIALS_DATA,
  TESTIMONIAL_CATEGORIES,
  Testimonial
} from '../data/testimonialsData';

interface TestimonialCarouselProps {
  onNavigate?: (route: string) => void;
  whatsappUrl?: string;
  agendaUrl?: string;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  onNavigate,
  whatsappUrl = 'https://wa.me/34624718369?text=Hola%20Gema,%20he%20le%C3%ADdo%20los%20testimonios%20y%20me%20gustar%C3%ADa%20consultar%20mi%20caso',
  agendaUrl = 'https://calendar.app.google/eN23iK4jY5YyvCgm8'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter testimonials based on category
  const filteredTestimonials: Testimonial[] =
    selectedCategory === 'all'
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((t) => t.category === selectedCategory);

  const total = filteredTestimonials.length;

  // Handle changing category
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentIndex(0);
  };

  const handlePrev = useCallback(() => {
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setDirection('right');
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Autoplay effect
  useEffect(() => {
    if (!isPlaying || total <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6500);

    return () => clearInterval(timer);
  }, [isPlaying, total, handleNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const currentTestimonial = filteredTestimonials[currentIndex] || filteredTestimonials[0];

  return (
    <section
      id="testimonials-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      aria-label="Testimonios de Pacientes y Familias"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={containerRef}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Header with clinical badge and context */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5ECDF] border border-[#B68FC1]/40 text-[#6E2F82] text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#6E2F82]" />
          <span>EXPERIENCIAS REALES DE RECUPERACIÓN Y SALUD VOCAL</span>
        </div>

        <h2
          id="testimonials-title"
          className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#3F1F4D] tracking-tight"
        >
          La voz de quienes confían en mi práctica clínica
        </h2>

        <p className="text-sm sm:text-base text-[#2F2931]/80 leading-relaxed">
          Cada proceso en neurologopedia, deglución y voz es único. Conoce cómo pacientes y familias
          han recuperado su autonomía comunicativa, deglutoria y su bienestar vocal.
        </p>

        {/* Trust Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs font-semibold text-[#3F1F4D]">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#EADFED] shadow-2xs">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              ))}
            </div>
            <span className="font-bold">5.0 / 5</span>
            <span className="text-[#2F2931]/60">· Valoración media</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#EADFED] shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Casos y testimonios verificados</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#EADFED] shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#6E2F82]" />
            <span>Colegiada Sanitaria Nº 30/695</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {TESTIMONIAL_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`testimonial-filter-${cat.id}`}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-[#3F1F4D] text-[#FBF8F3] shadow-xs'
                  : 'bg-white hover:bg-[#F5ECDF] text-[#3F1F4D] border border-[#EADFED]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Testimonial Active Display Card with Motion Transitions */}
      <div className="relative bg-gradient-to-br from-white via-[#FBF8F3] to-[#F5ECDF]/40 rounded-3xl border-2 border-[#EADFED] p-6 sm:p-10 lg:p-12 shadow-sm overflow-hidden min-h-[380px] flex flex-col justify-between">
        {/* Subtle Decorative Background Watermark */}
        <div className="absolute top-4 right-6 text-[#EADFED]/40 pointer-events-none select-none">
          <Quote className="w-28 h-28 sm:w-36 sm:h-36" />
        </div>

        <AnimatePresence mode="wait">
          {currentTestimonial && (
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: direction === 'right' ? 24 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'right' ? -24 : 24 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-6 relative z-10"
            >
              {/* Top Meta row: Category Badge & Stars */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#EADFED]/80 text-[#3F1F4D] font-bold text-xs tracking-wide">
                    {currentTestimonial.categoryLabel}
                  </span>
                  <span className="text-xs text-[#2F2931]/60 flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-[#6E2F82]" />
                    {currentTestimonial.duration}
                  </span>
                </div>

                <div className="flex items-center gap-1" aria-label="5 de 5 estrellas">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-500 transition-transform hover:scale-110"
                    />
                  ))}
                  <span className="text-xs font-bold text-[#3F1F4D] ml-1">5.0</span>
                </div>
              </div>

              {/* Main Headline Highlight Quote */}
              <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl font-bold text-[#3F1F4D] leading-snug">
                {currentTestimonial.highlight}
              </h3>

              {/* Quote Body Paragraph */}
              <p className="text-sm sm:text-base text-[#2F2931]/90 leading-relaxed max-w-4xl">
                «{currentTestimonial.quote}»
              </p>

              {/* Clinical Outcome Highlight Callout */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 border border-[#B68FC1]/30 flex items-start sm:items-center gap-3 shadow-2xs">
                <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E2F82] block">
                    Resultado clínico conseguido
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#3F1F4D]">
                    {currentTestimonial.outcome}
                  </p>
                </div>
              </div>

              {/* Author & Verification Meta */}
              <div className="pt-4 border-t border-[#EADFED] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm"
                    style={{ backgroundColor: currentTestimonial.colorAccent }}
                  >
                    {currentTestimonial.avatarInitial}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-base font-bold text-[#3F1F4D]">
                        {currentTestimonial.name}
                      </h4>
                      {currentTestimonial.verified && (
                        <span
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200"
                          title="Testimonio de paciente atendido"
                        >
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Verificado
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#2F2931]/75 font-medium">
                      {currentTestimonial.relation}
                    </p>
                    <p className="text-[11px] text-[#6E2F82] font-semibold flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {currentTestimonial.modality}
                    </p>
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center gap-2">
                  <a
                    id="testimonial-cta-whatsapp"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Consultar caso similar</span>
                  </a>
                  <a
                    id="testimonial-cta-agenda"
                    href={agendaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F5ECDF] text-[#3F1F4D] border border-[#B68FC1]/40 font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#6E2F82]" />
                    <span>Reservar Cita</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carousel Bottom Controls: Previous, Indicators, Next & Autoplay Toggle */}
        <div className="mt-8 pt-4 border-t border-[#EADFED]/60 flex items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-2">
            <button
              id="testimonial-prev-btn"
              onClick={handlePrev}
              aria-label="Testimonio anterior"
              className="w-10 h-10 rounded-xl bg-white hover:bg-[#F5ECDF] border border-[#EADFED] text-[#3F1F4D] flex items-center justify-center transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="testimonial-next-btn"
              onClick={handleNext}
              aria-label="Testimonio siguiente"
              className="w-10 h-10 rounded-xl bg-white hover:bg-[#F5ECDF] border border-[#EADFED] text-[#3F1F4D] flex items-center justify-center transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Play / Pause toggle */}
            <button
              id="testimonial-playpause-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pausar reproducción automática' : 'Reanudar reproducción automática'}
              className="w-8 h-8 rounded-lg bg-white/80 hover:bg-white text-[#6E2F82] border border-[#EADFED] flex items-center justify-center text-xs transition-colors ml-1 cursor-pointer"
              title={isPlaying ? 'Pausar carrusel' : 'Activar carrusel'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
          </div>

          {/* Indicator dots */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {filteredTestimonials.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  id={`testimonial-dot-${idx}`}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 'right' : 'left');
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Ir al testimonio ${idx + 1}: ${item.name}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-7 sm:w-8 bg-[#3F1F4D]'
                      : 'w-2.5 bg-[#B68FC1]/40 hover:bg-[#B68FC1]'
                  }`}
                />
              );
            })}
          </div>

          {/* Counter info */}
          <div className="text-xs font-semibold text-[#2F2931]/60">
            <span className="text-[#3F1F4D] font-bold">{currentIndex + 1}</span> / {total}
          </div>
        </div>
      </div>

      {/* Mini Bottom Cards Grid: Quick preview of other stories */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTestimonials
          .filter((_, idx) => idx !== currentIndex)
          .slice(0, 3)
          .map((item) => (
            <div
              key={item.id}
              onClick={() => {
                const targetIdx = filteredTestimonials.findIndex((t) => t.id === item.id);
                if (targetIdx !== -1) {
                  setDirection(targetIdx > currentIndex ? 'right' : 'left');
                  setCurrentIndex(targetIdx);
                }
              }}
              className="bg-white p-4 rounded-2xl border border-[#EADFED] hover:border-[#6E2F82] hover:shadow-xs transition-all cursor-pointer group text-left space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#6E2F82] bg-[#F5ECDF] px-2 py-0.5 rounded-md">
                  {item.categoryLabel}
                </span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="font-serif text-xs sm:text-sm font-bold text-[#3F1F4D] line-clamp-2 group-hover:text-[#6E2F82] transition-colors">
                {item.highlight}
              </p>

              <div className="pt-2 border-t border-[#EADFED]/60 flex items-center justify-between text-[11px] text-[#2F2931]/70">
                <span className="font-semibold text-[#3F1F4D]">{item.name}</span>
                <span>{item.modality.split('·')[0]}</span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
