import React from 'react';
import { PageRoute } from '../types';
import { NewsletterSection } from '../components/NewsletterSection';
import { BookOpen, Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface NewsletterViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const NewsletterView: React.FC<NewsletterViewProps> = ({ onNavigate }) => {
  const sampleEditions = [
    {
      id: 'ed-1',
      date: 'Septiembre 2026',
      tag: 'Salud Vocal',
      title: 'Estrategias de higiene vocal para docentes: cómo evitar la disfonía',
      summary: 'Pautas prácticas sobre calentamiento vocal en 3 minutos, hidratación laríngea real y micro-pausas respiratorias durante la jornada laboral.',
      readTime: '4 min de lectura'
    },
    {
      id: 'ed-2',
      date: 'Agosto 2026',
      tag: 'Neurologopedia & Disfagia',
      title: 'Alimentación segura tras un ictus: cómo identificar signos de atragantamiento silente',
      summary: 'Explicación clara sobre texturas adaptadas, posturas cefálicas protectoras y cuándo solicitar una videoendoscopia o evaluación clínica de la deglución.',
      readTime: '5 min de lectura'
    },
    {
      id: 'ed-3',
      date: 'Julio 2026',
      tag: 'Lenguaje Infantil',
      title: 'Estimulación del habla en casa: cómo enriquecer el vocabulario sin pantallas',
      summary: 'Interacciones cotidianas durante el baño y la comida, modelado del lenguaje y tiempos de espera para que los peques consoliden sus respuestas.',
      readTime: '4 min de lectura'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Header breadcrumb & introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#6E2F82] mb-3">
          <button 
            onClick={() => onNavigate('inicio')}
            className="hover:underline text-[#3F1F4D]"
          >
            Inicio
          </button>
          <span>/</span>
          <span className="text-[#6E2F82]">Boletín y Recursos Clínicos</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3F1F4D] tracking-tight">
          Boletín Clínico de Neurologopedia
        </h1>
        <p className="text-base sm:text-lg text-[#2F2931]/80 max-w-2xl mt-3 leading-relaxed">
          Un espacio mensual de divulgación profesional, pautas para familias y cuidadores, y ejercicios prácticos de logopedia clínica por <strong>Gema Guirao</strong>.
        </p>
      </section>

      {/* Main Newsletter Subscription Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterSection onNavigate={onNavigate} variant="full" />
      </div>

      {/* Sample Editions Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" aria-labelledby="ediciones-anteriores-title">
        <div className="border-t border-[#EADFED] pt-12 text-left">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6E2F82]">
            CONTENIDO DIVULGATIVO
          </span>
          <h2 id="ediciones-anteriores-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1F4D] mt-2">
            Ejemplos de temáticas tratadas en el boletín
          </h2>
          <p className="text-sm text-[#2F2931]/75 max-w-xl mt-1">
            Cada edición se redacta con rigor clínico, lenguaje accesible y pautas directamente aplicables al día a día.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {sampleEditions.map((edition) => (
            <div
              key={edition.id}
              className="bg-white rounded-2xl border border-[#EADFED] p-6 sm:p-7 shadow-sm hover:border-[#B68FC1] hover:shadow-md transition-all flex flex-col justify-between text-left"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-[#EADFED]/60 text-[#6E2F82] font-semibold">
                    {edition.tag}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-[#B68FC1]" />
                    <span>{edition.date}</span>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#3F1F4D] leading-snug">
                  {edition.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#2F2931]/75 leading-relaxed">
                  {edition.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EADFED]/60 flex items-center justify-between text-xs text-[#6E2F82]">
                <span className="flex items-center gap-1 text-[11px] text-[#2F2931]/60">
                  <Clock className="w-3.5 h-3.5 text-[#B68FC1]" />
                  <span>{edition.readTime}</span>
                </span>
                <span className="font-semibold inline-flex items-center gap-1">
                  <span>En tu email</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions about the Newsletter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1F4D]">
            Preguntas frecuentes sobre el boletín
          </h2>
          <p className="text-xs sm:text-sm text-[#2F2931]/75">
            Todo lo que necesitas saber antes de suscribirte.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#EADFED] p-5">
            <h3 className="font-serif font-bold text-[#3F1F4D] text-sm sm:text-base">
              ¿Con qué frecuencia recibiré los correos?
            </h3>
            <p className="text-xs sm:text-sm text-[#2F2931]/80 mt-1 leading-relaxed">
              Enviamos únicamente <strong>1 correo al mes</strong>, el primer martes de cada mes. Ocasionalmente, si surge un taller clínico relevante o un recurso descargable nuevo, lo compartiremos de forma puntual.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#EADFED] p-5">
            <h3 className="font-serif font-bold text-[#3F1F4D] text-sm sm:text-base">
              ¿Tiene algún coste o compromiso?
            </h3>
            <p className="text-xs sm:text-sm text-[#2F2931]/80 mt-1 leading-relaxed">
              Es 100% gratuito. No hay suscripciones de pago ni contenido patrocinado de terceros.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#EADFED] p-5">
            <h3 className="font-serif font-bold text-[#3F1F4D] text-sm sm:text-base">
              ¿Cómo puedo darme de baja?
            </h3>
            <p className="text-xs sm:text-sm text-[#2F2931]/80 mt-1 leading-relaxed">
              Al final de cada correo encontrarás un enlace directo para darte de baja en un solo clic, sin preguntas ni procesos complicados, en estricto cumplimiento del RGPD.
            </p>
          </div>
        </div>

        <div className="pt-6 text-center">
          <button
            onClick={() => onNavigate('contacto')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6E2F82] hover:text-[#3F1F4D]"
          >
            <span>¿Tienes alguna propuesta o duda clínica? Contáctame aquí</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
