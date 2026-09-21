import { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { Logo } from './Logo';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Calendar, 
  ExternalLink, 
  Phone, 
  Camera, 
  ShoppingCart, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Linkedin 
} from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { useCustomImages } from '../context/CustomImageContext';
import { useShop } from '../context/ShopContext';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Header = ({ currentRoute, onNavigate }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { openUploadModal } = useCustomImages();
  const { cartCount, openCart } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const AGENDA_URL = 'https://calendar.app.google/Sk8VZ8WyWi6maxdN6';

  return (
    <header
      id="main-sticky-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF8F3]/95 backdrop-blur-md shadow-sm border-b border-[#EADFED]/80 py-3'
          : 'bg-[#FBF8F3] border-b border-[#EADFED]/40 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo link */}
        <button
          id="header-logo-btn"
          onClick={() => handleNavClick('inicio')}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6E2F82] rounded-lg transition-transform hover:opacity-95"
          aria-label="Ir al inicio - Logopeda Gema Guirao"
        >
          <Logo variant="header" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-[#2F2931]" aria-label="Navegación principal">
          <button
            id="nav-link-inicio"
            onClick={() => handleNavClick('inicio')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentRoute === 'inicio'
                ? 'text-[#3F1F4D] font-semibold bg-[#EADFED]/50'
                : 'hover:text-[#6E2F82] hover:bg-[#F5ECDF]/60'
            }`}
          >
            INICIO
          </button>

          <button
            id="nav-link-sobre-mi"
            onClick={() => handleNavClick('sobre-mi')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentRoute === 'sobre-mi'
                ? 'text-[#3F1F4D] font-semibold bg-[#EADFED]/50'
                : 'hover:text-[#6E2F82] hover:bg-[#F5ECDF]/60'
            }`}
          >
            SOBRE MÍ
          </button>

          {/* Servicios Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              id="nav-link-servicios"
              onClick={() => handleNavClick('servicios')}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                [
                  'servicios',
                  'neurologopedia',
                  'lenguaje-habla',
                  'voz',
                  'disfagia',
                  'terapia-miofuncional',
                  'lectoescritura'
                ].includes(currentRoute)
                  ? 'text-[#3F1F4D] font-semibold bg-[#EADFED]/50'
                  : 'hover:text-[#6E2F82] hover:bg-[#F5ECDF]/60'
              }`}
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
            >
              <span>SERVICIOS</span>
              <ChevronDown className="w-4 h-4 text-[#6E2F82]" />
            </button>

            {servicesDropdownOpen && (
              <div className="absolute left-0 mt-1 w-64 rounded-xl bg-white border border-[#EADFED] shadow-lg py-2 z-50 animate-fadeIn">
                <button
                  id="dropdown-servicios-all"
                  onClick={() => handleNavClick('servicios')}
                  className="w-full text-left px-4 py-2.5 text-xs uppercase tracking-wider text-[#6E2F82] font-semibold border-b border-[#EADFED]/50 hover:bg-[#F5ECDF]/50 transition-colors"
                >
                  Ver todas las áreas
                </button>
                {SERVICES.map((serv) => (
                  <button
                    key={serv.id}
                    id={`dropdown-serv-${serv.slug}`}
                    onClick={() => handleNavClick(serv.slug)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      currentRoute === serv.slug
                        ? 'bg-[#EADFED]/60 text-[#3F1F4D] font-medium'
                        : 'text-[#2F2931] hover:bg-[#FBF8F3] hover:text-[#6E2F82]'
                    }`}
                  >
                    {serv.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            id="nav-link-como-trabajo"
            onClick={() => handleNavClick('como-trabajo')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentRoute === 'como-trabajo'
                ? 'text-[#3F1F4D] font-semibold bg-[#EADFED]/50'
                : 'hover:text-[#6E2F82] hover:bg-[#F5ECDF]/60'
            }`}
          >
            CÓMO TRABAJO
          </button>

          <button
            id="nav-link-faq"
            onClick={() => handleNavClick('preguntas-frecuentes')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentRoute === 'preguntas-frecuentes'
                ? 'text-[#3F1F4D] font-semibold bg-[#EADFED]/50'
                : 'hover:text-[#6E2F82] hover:bg-[#F5ECDF]/60'
            }`}
          >
            PREGUNTAS FRECUENTES
          </button>

          <button
            id="nav-link-blog"
            onClick={() => handleNavClick('blog')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentRoute === 'blog' || currentRoute === 'newsletter'
                ? 'text-[#3F1F4D] font-semibold bg-[#EADFED]/50'
                : 'hover:text-[#6E2F82] hover:bg-[#F5ECDF]/60'
            }`}
          >
            BLOG
          </button>

          <button
            id="nav-link-tienda"
            onClick={() => handleNavClick('tienda')}
            className={`px-3 py-2 rounded-lg transition-colors relative flex items-center gap-1.5 ${
              currentRoute === 'tienda'
                ? 'text-[#3F1F4D] font-semibold bg-[#EADFED]/50'
                : 'hover:text-[#6E2F82] hover:bg-[#F5ECDF]/60'
            }`}
          >
            <span>TIENDA</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#EADFED] text-[#6E2F82] font-bold">
              PDF
            </span>
          </button>

          <button
            id="nav-link-contacto"
            onClick={() => handleNavClick('contacto')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentRoute === 'contacto'
                ? 'text-[#3F1F4D] font-semibold bg-[#EADFED]/50'
                : 'hover:text-[#6E2F82] hover:bg-[#F5ECDF]/60'
            }`}
          >
            CONTACTO
          </button>
        </nav>

        {/* Action Buttons: Phone/WhatsApp, Social Networks & RESERVAR CITA */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-2.5">
          {/* Cart trigger button */}
          <button
            id="header-cart-btn"
            onClick={openCart}
            className="relative p-2 rounded-xl text-[#3F1F4D] hover:bg-[#EADFED]/60 transition-colors cursor-pointer"
            title="Ver cesta de materiales"
          >
            <ShoppingCart className="w-5 h-5 text-[#6E2F82]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#6E2F82] text-white text-[10px] font-bold leading-none shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Social Network Buttons */}
          <div className="flex items-center border-l border-r border-[#EADFED] px-1 gap-0.5">
            <a
              id="header-social-instagram"
              href="https://www.instagram.com/gemaguirao_logopeda/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#3F1F4D] hover:text-[#E1306C] hover:bg-[#E1306C]/10 transition-colors"
              title="Instagram de Gema Guirao"
              aria-label="Instagram de Gema Guirao"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              id="header-social-facebook"
              href="https://www.facebook.com/gemaguirao.neurologopeda/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#3F1F4D] hover:text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors"
              title="Facebook de Gema Guirao"
              aria-label="Facebook de Gema Guirao"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              id="header-social-linkedin"
              href="https://www.linkedin.com/in/gema-guirao-logopeda/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-[#3F1F4D] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors"
              title="LinkedIn de Gema Guirao"
              aria-label="LinkedIn de Gema Guirao"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Teléfono / WhatsApp Pill */}
          <div className="flex items-center gap-1 bg-white border border-[#EADFED] rounded-xl px-2 py-1 shadow-2xs text-xs">
            <a
              id="header-cta-phone"
              href="tel:+34624718369"
              className="inline-flex items-center gap-1 font-semibold text-[#3F1F4D] hover:text-[#6E2F82] px-1 py-1 rounded-lg transition-colors"
              title="Llamar: 624 71 83 69"
            >
              <Phone className="w-3.5 h-3.5 text-[#6E2F82]" />
              <span className="text-[#2F2931]/80 font-medium">Teléfono/WhatsApp:</span>
              <span className="font-bold">624 71 83 69</span>
            </a>
            <span className="text-gray-300">·</span>
            <a
              id="header-cta-whatsapp"
              href="https://wa.me/34624718369?text=Hola%20Gema,%20quisiera%20consultarte%20sobre%20tus%20servicios%20de%20logopedia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-[#25D366] hover:text-[#128C7E] px-1.5 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
              title="Abrir WhatsApp: 624 71 83 69"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat</span>
            </a>
          </div>

          <a
            id="header-cta-reservar-cita"
            href={AGENDA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white text-xs font-semibold tracking-wide shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6E2F82]"
          >
            <Calendar className="w-3.5 h-3.5 text-[#EADFED]" />
            <span>RESERVAR CITA</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={AGENDA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6E2F82] text-white text-xs font-semibold sm:hidden"
            aria-label="Reservar cita en Google Calendar"
          >
            <span>CITA</span>
          </a>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-[#3F1F4D] hover:bg-[#EADFED]/50 focus:outline-none focus:ring-2 focus:ring-[#6E2F82]"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="lg:hidden bg-[#FBF8F3] border-b border-[#EADFED] px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
          <nav className="flex flex-col gap-1 text-base font-medium text-[#2F2931]">
            <button
              id="mobile-nav-inicio"
              onClick={() => handleNavClick('inicio')}
              className={`text-left py-2.5 px-3 rounded-lg ${
                currentRoute === 'inicio' ? 'bg-[#EADFED] text-[#3F1F4D] font-semibold' : 'hover:bg-[#F5ECDF]'
              }`}
            >
              INICIO
            </button>

            <button
              id="mobile-nav-sobre-mi"
              onClick={() => handleNavClick('sobre-mi')}
              className={`text-left py-2.5 px-3 rounded-lg ${
                currentRoute === 'sobre-mi' ? 'bg-[#EADFED] text-[#3F1F4D] font-semibold' : 'hover:bg-[#F5ECDF]'
              }`}
            >
              SOBRE MÍ
            </button>

            <div className="py-1">
              <button
                id="mobile-nav-servicios-toggle"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-left hover:bg-[#F5ECDF]"
              >
                <span>SERVICIOS</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="pl-4 pr-1 py-1 space-y-1 bg-white/70 rounded-lg my-1 border border-[#EADFED]/60">
                  <button
                    onClick={() => handleNavClick('servicios')}
                    className="w-full text-left py-1.5 px-2 text-xs font-semibold text-[#6E2F82]"
                  >
                    Áreas de intervención
                  </button>
                  {SERVICES.map((serv) => (
                    <button
                      key={serv.id}
                      onClick={() => handleNavClick(serv.slug)}
                      className="w-full text-left py-1.5 px-2 text-sm text-[#2F2931] hover:text-[#6E2F82]"
                    >
                      {serv.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              id="mobile-nav-como-trabajo"
              onClick={() => handleNavClick('como-trabajo')}
              className={`text-left py-2.5 px-3 rounded-lg ${
                currentRoute === 'como-trabajo' ? 'bg-[#EADFED] text-[#3F1F4D] font-semibold' : 'hover:bg-[#F5ECDF]'
              }`}
            >
              CÓMO TRABAJO
            </button>

            <button
              id="mobile-nav-faq"
              onClick={() => handleNavClick('preguntas-frecuentes')}
              className={`text-left py-2.5 px-3 rounded-lg ${
                currentRoute === 'preguntas-frecuentes' ? 'bg-[#EADFED] text-[#3F1F4D] font-semibold' : 'hover:bg-[#F5ECDF]'
              }`}
            >
              PREGUNTAS FRECUENTES
            </button>

            <button
              id="mobile-nav-blog"
              onClick={() => handleNavClick('blog')}
              className={`text-left py-2.5 px-3 rounded-lg ${
                currentRoute === 'blog' || currentRoute === 'newsletter' ? 'bg-[#EADFED] text-[#3F1F4D] font-semibold' : 'hover:bg-[#F5ECDF]'
              }`}
            >
              BLOG & NOTICIAS
            </button>

            <button
              id="mobile-nav-tienda"
              onClick={() => handleNavClick('tienda')}
              className={`text-left py-2.5 px-3 rounded-lg flex items-center justify-between ${
                currentRoute === 'tienda' ? 'bg-[#EADFED] text-[#3F1F4D] font-semibold' : 'hover:bg-[#F5ECDF]'
              }`}
            >
              <span>TIENDA DE MATERIALES</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6E2F82] text-white font-bold">
                {cartCount > 0 ? `${cartCount} en cesta` : 'PDF'}
              </span>
            </button>

            <button
              id="mobile-nav-contacto"
              onClick={() => handleNavClick('contacto')}
              className={`text-left py-2.5 px-3 rounded-lg ${
                currentRoute === 'contacto' ? 'bg-[#EADFED] text-[#3F1F4D] font-semibold' : 'hover:bg-[#F5ECDF]'
              }`}
            >
              CONTACTO
            </button>

            {/* Mobile Social Links */}
            <div className="pt-3 pb-1 border-t border-[#EADFED] flex items-center justify-center gap-3">
              <span className="text-xs text-[#2F2931]/70 font-medium">Sígueme en redes:</span>
              <div className="flex items-center gap-2">
                <a
                  id="mobile-social-instagram"
                  href="https://www.instagram.com/gemaguirao_logopeda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white border border-[#EADFED] text-[#E1306C] shadow-2xs"
                  aria-label="Instagram de Gema Guirao"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  id="mobile-social-facebook"
                  href="https://www.facebook.com/gemaguirao.neurologopeda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white border border-[#EADFED] text-[#1877F2] shadow-2xs"
                  aria-label="Facebook de Gema Guirao"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  id="mobile-social-linkedin"
                  href="https://www.linkedin.com/in/gema-guirao-logopeda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white border border-[#EADFED] text-[#0A66C2] shadow-2xs"
                  aria-label="LinkedIn de Gema Guirao"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                id="mobile-cta-upload"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openUploadModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#EADFED]/70 border border-[#B68FC1]/40 text-[#6E2F82] font-semibold text-center text-sm shadow-sm"
              >
                <Camera className="w-4 h-4 text-[#6E2F82]" />
                <span>📷 Subir mis fotos y logotipo</span>
              </button>

              {/* Teléfono / WhatsApp Actions */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  id="mobile-cta-phone"
                  href="tel:+34624718369"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#EADFED] text-[#3F1F4D] font-semibold text-xs shadow-2xs"
                >
                  <Phone className="w-4 h-4 text-[#6E2F82]" />
                  <span>Tel: 624 71 83 69</span>
                </a>
                <a
                  id="mobile-cta-whatsapp"
                  href="https://wa.me/34624718369?text=Hola%20Gema,%20quisiera%20consultarte%20sobre%20tus%20servicios%20de%20logopedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] font-semibold text-xs shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <a
                id="mobile-cta-agenda"
                href={AGENDA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#6E2F82] text-white font-semibold text-center shadow-sm"
              >
                <Calendar className="w-5 h-5 text-[#EADFED]" />
                <span>RESERVAR CITA</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
