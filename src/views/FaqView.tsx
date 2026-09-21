import { useState } from 'react';
import { PageRoute } from '../types';
import { FAQS } from '../data/faqsData';
import { ChevronDown, HelpCircle, Calendar, ArrowRight, Search } from 'lucide-react';

interface FaqViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const FaqView = ({ onNavigate }: FaqViewProps) => {
  const [openFaq, setOpenFaq] = useState<string | null>(FAQS[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const AGENDA_URL = 'https://calendar.app.google/Sk8VZ8WyWi6maxdN6';

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="faq-page-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EADFED]/70 border border-[#B68FC1]/40 text-xs font-semibold uppercase tracking-widest text-[#6E2F82]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>INFORMACIÓN AL PACIENTE Y FAMILIAS</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3F1F4D] tracking-tight">
          Preguntas frecuentes
        </h1>
        <p className="text-sm sm:text-base text-[#2F2931]/80 leading-relaxed">
          Respuestas a las cuestiones habituales sobre la primera entrevista clínica, el proceso de valoración, la atención a adultos y la coordinación con otros profesionales sanitarios.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-4 h-4 text-[#6E2F82] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar duda o término (ej: informes, online, adultos...)"
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#EADFED] text-sm text-[#2F2931] placeholder-[#2F2931]/40 focus:outline-none focus:ring-2 focus:ring-[#6E2F82] shadow-sm"
        />
      </div>

      {/* Accordions */}
      <div className="space-y-4" role="region" aria-label="Listado de preguntas frecuentes">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#EADFED] text-sm text-[#2F2931]/70">
            No se han encontrado preguntas con ese término. Puedes consultar directamente con la profesional.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-page-item-${faq.id}`}
                className="bg-white rounded-2xl border border-[#EADFED] overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#6E2F82]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-page-answer-${faq.id}`}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#3F1F4D]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6E2F82] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#3F1F4D]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-page-answer-${faq.id}`}
                    className="px-6 pb-6 pt-2 text-sm text-[#2F2931]/85 leading-relaxed border-t border-[#EADFED]/60 bg-[#FBF8F3]/50"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct link to Booking or Contact */}
      <div className="p-8 rounded-3xl bg-[#F5ECDF]/60 border border-[#EADFED] text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#3F1F4D]">¿Tienes otra pregunta sobre tu situación?</h3>
        <p className="text-xs sm:text-sm text-[#2F2931]/80 max-w-md mx-auto">
          Cada caso tiene particularidades clínicas únicas. Puedes agendar una primera entrevista o remitir una consulta previa.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={AGENDA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6E2F82] text-white text-xs font-semibold tracking-wide"
          >
            <Calendar className="w-4 h-4" />
            <span>RESERVAR PRIMERA ENTREVISTA</span>
          </a>
          <button
            onClick={() => onNavigate('contacto')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white text-[#3F1F4D] text-xs font-semibold border border-[#EADFED]"
          >
            <span>Ir a contacto</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#6E2F82]" />
          </button>
        </div>
      </div>
    </div>
  );
};
