import { useState } from 'react';
import { MessageCircle, Phone, Calendar, X, Sparkles } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { USER_ATTACHED_IMAGES } from '../data/userImages';

export const FloatingContactDock = () => {
  const [isOpen, setIsOpen] = useState(true);
  const AGENDA_URL = 'https://calendar.app.google/Sk8VZ8WyWi6maxdN6';
  const WHATSAPP_URL = 'https://wa.me/34624718369?text=Hola%20Gema,%20me%20gustar%C3%ADa%20consultarte%20sobre%20tus%20servicios%20de%20logopedia%20y%20disponibilidad%20de%20cita.';

  return (
    <aside
      id="floating-contact-dock"
      aria-label="Contacto rápido con Gema Guirao"
      className="fixed bottom-4 right-4 z-40 transition-all duration-300"
    >
      {isOpen ? (
        <div className="bg-white/95 backdrop-blur-md border-2 border-[#6E2F82]/30 p-2 sm:p-2.5 rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 text-left animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-[94vw] sm:max-w-none">
          {/* Avatar and online status */}
          <div className="relative shrink-0 hidden xs:block">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#EADFED] bg-[#F5ECDF]">
              <SafeImage
                src={USER_ATTACHED_IMAGES.portrait.path}
                alt="Gema Guirao"
                slotKey="portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-300"
              title="Disponible para consultas"
            />
          </div>

          {/* Quick text */}
          <div className="pr-1 text-xs">
            <div className="flex items-center gap-1 font-bold text-[#3F1F4D]">
              <Sparkles className="w-3 h-3 text-[#6E2F82]" />
              <span>¿Hablamos de tu caso?</span>
            </div>
            <p className="text-[11px] text-[#6E2F82] font-medium hidden sm:block">
              Respuesta en menos de 24h
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            {/* WhatsApp Directo */}
            <a
              id="floating-dock-whatsapp"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs hover:shadow transition-all group"
              title="Abrir WhatsApp directo con Gema (624 71 83 69)"
            >
              <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="font-semibold">WhatsApp</span>
            </a>

            {/* Llamar */}
            <a
              id="floating-dock-call"
              href="tel:+34624718369"
              className="p-2 rounded-xl bg-[#F5ECDF] hover:bg-[#EADFED] text-[#3F1F4D] transition-colors border border-[#B68FC1]/40"
              title="Llamar a Gema Guirao: 624 71 83 69"
              aria-label="Llamar al 624 71 83 69"
            >
              <Phone className="w-4 h-4 text-[#6E2F82]" />
            </a>

            {/* Reservar online */}
            <a
              id="floating-dock-calendar"
              href={AGENDA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white transition-colors"
              title="Reservar primera entrevista en Google Calendar"
              aria-label="Reservar cita en Google Calendar"
            >
              <Calendar className="w-4 h-4 text-[#EADFED]" />
            </a>

            {/* Close button */}
            <button
              id="floating-dock-close"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-gray-400 hover:text-[#3F1F4D] transition-colors ml-0.5 rounded-lg hover:bg-gray-100"
              title="Minimizar aviso"
              aria-label="Minimizar aviso de contacto"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <button
          id="floating-dock-reopen"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#6E2F82] hover:bg-[#3F1F4D] text-white font-bold text-xs shadow-lg border border-white/20 transition-all cursor-pointer group"
          title="Contactar con Gema Guirao"
        >
          <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
          <MessageCircle className="w-4 h-4 text-[#EADFED]" />
          <span>Contactar</span>
        </button>
      )}
    </aside>
  );
};
