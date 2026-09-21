import { PageRoute } from '../types';
import { Logo } from './Logo';
import { Calendar, Mail, MapPin, Phone, Shield, MessageCircle, Instagram, Facebook, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  const AGENDA_URL = 'https://calendar.app.google/Sk8VZ8WyWi6maxdN6';

  return (
    <footer id="main-footer" className="bg-[#3F1F4D] text-[#FBF8F3] pt-16 pb-12 border-t border-[#6E2F82]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#6E2F82]/50">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <button
              id="footer-logo-btn"
              onClick={() => onNavigate('inicio')}
              className="text-left focus:outline-none focus:ring-2 focus:ring-[#B68FC1] rounded-lg"
              aria-label="Ir al inicio - Logopeda Gema Guirao"
            >
              <Logo variant="footer" />
            </button>
            <div className="text-sm text-[#EADFED]/80 space-y-1">
              <p className="font-medium text-[#FBF8F3]">Gema Guirao</p>
              <p className="text-[#B68FC1]">Neurologopeda · Más de 10 años de experiencia</p>
              <p className="pt-2 text-xs text-[#EADFED]/70 leading-relaxed">
                Evaluación e intervención clínica personalizada en lenguaje, habla, voz, deglución y neurorrehabilitación.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6E2F82]/40 border border-[#B68FC1]/30 text-xs text-[#EADFED]">
              <span className="w-2 h-2 rounded-full bg-[#B68FC1]" />
              <span>Modalidad: Atención presencial y online</span>
            </div>

            {/* Social Media Links for Gema Guirao */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-[#B68FC1] uppercase tracking-wider mb-2">Redes sociales:</p>
              <div className="flex items-center gap-2">
                <a
                  id="footer-social-instagram"
                  href="https://www.instagram.com/logopedagemaguirao/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-[#6E2F82]/50 hover:bg-[#E1306C] text-[#FBF8F3] hover:text-white border border-[#B68FC1]/30 transition-all flex items-center gap-1.5 text-xs font-medium"
                  title="Instagram de Gema Guirao (@logopedagemaguirao)"
                  aria-label="Instagram de Gema Guirao (@logopedagemaguirao)"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-[11px]">Instagram</span>
                </a>
                <a
                  id="footer-social-facebook"
                  href="https://www.facebook.com/gemaguirao.neurologopeda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-[#6E2F82]/50 hover:bg-[#1877F2] text-[#FBF8F3] hover:text-white border border-[#B68FC1]/30 transition-all flex items-center gap-1.5 text-xs font-medium"
                  title="Facebook de Gema Guirao"
                  aria-label="Facebook de Gema Guirao"
                >
                  <Facebook className="w-4 h-4" />
                  <span className="text-[11px]">Facebook</span>
                </a>
                <a
                  id="footer-social-linkedin"
                  href="https://www.linkedin.com/in/gema-guirao-logopeda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-[#6E2F82]/50 hover:bg-[#0A66C2] text-[#FBF8F3] hover:text-white border border-[#B68FC1]/30 transition-all flex items-center gap-1.5 text-xs font-medium"
                  title="LinkedIn de Gema Guirao"
                  aria-label="LinkedIn de Gema Guirao"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-[11px]">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#B68FC1] uppercase mb-4">Navegación</h4>
            <ul className="space-y-2.5 text-sm text-[#EADFED]/90">
              <li>
                <button
                  id="footer-nav-inicio"
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-white transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-sobre-mi"
                  onClick={() => onNavigate('sobre-mi')}
                  className="hover:text-white transition-colors"
                >
                  Sobre mí
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-servicios"
                  onClick={() => onNavigate('servicios')}
                  className="hover:text-white transition-colors"
                >
                  Áreas de intervención
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-como-trabajo"
                  onClick={() => onNavigate('como-trabajo')}
                  className="hover:text-white transition-colors"
                >
                  Cómo trabajo
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-faq"
                  onClick={() => onNavigate('preguntas-frecuentes')}
                  className="hover:text-white transition-colors"
                >
                  Preguntas frecuentes
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-blog"
                  onClick={() => onNavigate('blog')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Blog & Newsletter</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#6E2F82] text-[#EADFED] font-semibold">Artículos</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-tienda"
                  onClick={() => onNavigate('tienda')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Tienda de materiales</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#B68FC1]/30 text-[#EADFED]">PDF</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contacto"
                  onClick={() => onNavigate('contacto')}
                  className="hover:text-white transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#B68FC1] uppercase mb-4">Áreas Clínicas</h4>
            <ul className="space-y-2.5 text-sm text-[#EADFED]/90">
              <li>
                <button
                  id="footer-serv-neurologopedia"
                  onClick={() => onNavigate('neurologopedia')}
                  className="hover:text-white transition-colors"
                >
                  Neurologopedia
                </button>
              </li>
              <li>
                <button
                  id="footer-serv-lenguaje"
                  onClick={() => onNavigate('lenguaje-habla')}
                  className="hover:text-white transition-colors"
                >
                  Lenguaje y habla
                </button>
              </li>
              <li>
                <button
                  id="footer-serv-voz"
                  onClick={() => onNavigate('voz')}
                  className="hover:text-white transition-colors"
                >
                  Voz
                </button>
              </li>
              <li>
                <button
                  id="footer-serv-disfagia"
                  onClick={() => onNavigate('disfagia')}
                  className="hover:text-white transition-colors"
                >
                  Deglución y disfagia
                </button>
              </li>
              <li>
                <button
                  id="footer-serv-miofuncional"
                  onClick={() => onNavigate('terapia-miofuncional')}
                  className="hover:text-white transition-colors"
                >
                  Terapia miofuncional
                </button>
              </li>
              <li>
                <button
                  id="footer-serv-lectura"
                  onClick={() => onNavigate('lectoescritura')}
                  className="hover:text-white transition-colors"
                >
                  Lectura y escritura
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Appointment */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-[#B68FC1] uppercase mb-4">Cita y Atención</h4>
            <p className="text-xs text-[#EADFED]/80 leading-relaxed">
              Reserva tu primera entrevista clínica directamente en la agenda oficial o envía tu consulta.
            </p>
            <div>
              <a
                id="footer-cta-agenda"
                href={AGENDA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6E2F82] hover:bg-[#B68FC1] hover:text-[#3F1F4D] text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>ABRIR AGENDA DE CITAS</span>
              </a>
            </div>

            <div className="space-y-2 pt-2 text-xs text-[#EADFED]/85">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B68FC1] shrink-0" />
                <a href="mailto:LogopedaGemaguirao@gmail.com" className="hover:text-white transition-colors">
                  LogopedaGemaguirao@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B68FC1] shrink-0" />
                <span className="text-[#EADFED]/90">Teléfono / WhatsApp:</span>
                <a href="tel:+34624718369" className="hover:text-white transition-colors underline font-medium">
                  624 71 83 69
                </a>
                <a
                  href="https://wa.me/34624718369?text=Hola%20Gema,%20quisiera%20consultarte%20sobre%20tus%20servicios%20de%20logopedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white text-[11px] font-semibold transition-all ml-1"
                  title="Abrir chat de WhatsApp directo"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B68FC1] shrink-0 mt-0.5" />
                <span>CIMM · Ctra. de Churra, 96, 30007 Murcia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: Legal links & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EADFED]/70">
          <p>© Gema Guirao. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <button
              id="footer-legal-aviso"
              onClick={() => onNavigate('aviso-legal')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Aviso legal
            </button>
            <button
              id="footer-legal-privacidad"
              onClick={() => onNavigate('privacidad')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Política de privacidad
            </button>
            <button
              id="footer-legal-cookies"
              onClick={() => onNavigate('cookies')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Política de cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
