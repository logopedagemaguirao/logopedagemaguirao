import { PageRoute } from '../types';
import { ContactForm } from '../components/ContactForm';
import { Calendar, Mail, Phone, MapPin, MessageCircle, Globe2, ExternalLink, Clock, Instagram, Facebook, Linkedin } from 'lucide-react';

interface ContactViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactView = ({ onNavigate }: ContactViewProps) => {
  const AGENDA_URL = 'https://calendar.app.google/Sk8VZ8WyWi6maxdN6';

  return (
    <div id="contact-page-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6E2F82]">
          ATENCIÓN Y CITA PREVIA
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3F1F4D] tracking-tight leading-tight">
          Solicitar una primera entrevista
        </h1>
        <p className="text-base sm:text-lg text-[#2F2931]/80 leading-relaxed">
          Para valorar el caso, puede reservarse directamente una cita o realizar una consulta.
        </p>
      </div>

      {/* Main Grid: Agenda Button & Info Cards + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Agenda Booking & Channels */}
        <div className="lg:col-span-6 space-y-6">
          {/* Card: Direct Booking via Google Calendar */}
          <div className="bg-[#3F1F4D] text-[#FBF8F3] rounded-3xl p-8 sm:p-10 shadow-md space-y-6 border border-[#6E2F82]/50 relative overflow-hidden">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6E2F82]/50 text-xs font-semibold text-[#EADFED]">
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserva Inmediata</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Agenda oficial online
              </h2>
              <p className="text-xs sm:text-sm text-[#EADFED]/85 leading-relaxed">
                Accede a la disponibilidad de fechas y horas para agendar tu primera entrevista directamente a través de Google Calendar.
              </p>
            </div>

            <div>
              <a
                id="btn-abrir-agenda-citas"
                href={AGENDA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-xl bg-[#6E2F82] hover:bg-[#B68FC1] hover:text-[#3F1F4D] text-white text-sm font-semibold tracking-wider transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#B68FC1]"
              >
                <Calendar className="w-4 h-4" />
                <span>ABRIR AGENDA DE CITAS</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#EADFED]/70 border-t border-[#6E2F82]/50">
              <Clock className="w-3.5 h-3.5 text-[#B68FC1]" />
              <span>Confirmación telemática de la cita tras la reserva</span>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white rounded-3xl border border-[#EADFED] p-8 shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              Canales de atención
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Modalidad */}
              <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#EADFED] space-y-1 sm:col-span-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6E2F82] uppercase tracking-wider">
                  <Globe2 className="w-4 h-4" />
                  <span>Modalidad de intervención</span>
                </div>
                <p className="text-sm font-semibold text-[#3F1F4D]">
                  Presencial y online
                </p>
                <p className="text-xs text-[#2F2931]/70">
                  Adaptada según la valoración de la dificultad clínica y las necesidades del paciente.
                </p>
              </div>

              {/* Correo */}
              <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#EADFED] space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6E2F82] uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>Correo electrónico</span>
                </div>
                <a
                  href="mailto:LogopedaGemaguirao@gmail.com"
                  className="text-xs sm:text-sm font-semibold text-[#3F1F4D] hover:text-[#6E2F82] break-all block"
                >
                  LogopedaGemaguirao@gmail.com
                </a>
              </div>

              {/* Teléfono / WhatsApp */}
              <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#EADFED] space-y-1.5 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#6E2F82] uppercase tracking-wider">
                    <Phone className="w-4 h-4" />
                    <span>Teléfono / WhatsApp</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Atención directa
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="tel:+34624718369"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EADFED] text-xs sm:text-sm font-bold text-[#3F1F4D] hover:text-[#6E2F82] shadow-2xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#6E2F82]" />
                    <span>Llamar: 624 71 83 69</span>
                  </a>
                  <a
                    href="https://wa.me/34624718369?text=Hola%20Gema,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20una%20consulta%20de%20logopedia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Enviar WhatsApp directo</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>

              {/* Redes Sociales: Instagram, Facebook, LinkedIn */}
              <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#EADFED] space-y-2 sm:col-span-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6E2F82] uppercase tracking-wider">
                  <Globe2 className="w-4 h-4" />
                  <span>Mis redes sociales profesionales</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href="https://www.instagram.com/logopedagemaguirao/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#EADFED] hover:border-[#E1306C] text-[#3F1F4D] hover:text-[#E1306C] text-xs font-semibold shadow-2xs transition-all"
                  >
                    <Instagram className="w-4 h-4 text-[#E1306C]" />
                    <span>Instagram (@logopedagemaguirao)</span>
                  </a>
                  <a
                    href="https://www.facebook.com/gemaguirao.neurologopeda/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#EADFED] hover:border-[#1877F2] text-[#3F1F4D] hover:text-[#1877F2] text-xs font-semibold shadow-2xs transition-all"
                  >
                    <Facebook className="w-4 h-4 text-[#1877F2]" />
                    <span>Facebook (Gema Guirao)</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gema-guirao-logopeda/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#EADFED] hover:border-[#0A66C2] text-[#3F1F4D] hover:text-[#0A66C2] text-xs font-semibold shadow-2xs transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    <span>LinkedIn (Gema Guirao)</span>
                  </a>
                </div>
              </div>

              {/* Dirección */}
              <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#EADFED] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6E2F82] uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>Ubicación de Consulta</span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#3F1F4D]">
                    CIMM · Centro de Iniciativas Municipales de Murcia
                  </p>
                  <p className="text-xs text-[#2F2931]/80 mt-0.5">
                    Ctra. de Churra, 96, 30007 Santiago y Zaraíche, Murcia
                  </p>
                  <a
                    href="https://maps.google.com/?q=Ctra.+de+Churra,+96,+30007+Murcia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6E2F82] hover:underline mt-1.5"
                  >
                    <span>Ver ubicación en Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prepared Contact Form */}
        <div className="lg:col-span-6">
          <ContactForm onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
};
