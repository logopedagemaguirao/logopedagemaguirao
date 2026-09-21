import { useState } from 'react';
import { PageRoute } from '../types';
import { SERVICES } from '../data/servicesData';
import { FAQS } from '../data/faqsData';
import { USER_ATTACHED_IMAGES } from '../data/userImages';
import { SafeImage } from '../components/SafeImage';
import {
  Calendar,
  ArrowRight,
  Sparkles,
  UserCheck,
  Globe2,
  ChevronDown,
  Brain,
  MessageSquare,
  Mic,
  ShieldCheck,
  Activity,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Compass
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const HomeView = ({ onNavigate }: HomeViewProps) => {
  const [openFaq, setOpenFaq] = useState<string | null>(FAQS[0]?.id || null);
  const [activePhotoTab, setActivePhotoTab] = useState<'portrait' | 'consultation' | 'materials'>('portrait');

  const AGENDA_URL = 'https://calendar.app.google/Sk8VZ8WyWi6maxdN6';
  const WHATSAPP_URL = 'https://wa.me/34624718369?text=Hola%20Gema,%20me%20gustar%C3%ADa%20consultarte%20sobre%20tus%20servicios%20de%20logopedia%20y%20disponibilidad%20de%20cita.';

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Brain':
        return <Brain className="w-6 h-6 text-[#6E2F82]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-[#6E2F82]" />;
      case 'Mic':
        return <Mic className="w-6 h-6 text-[#6E2F82]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#6E2F82]" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#6E2F82]" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-[#6E2F82]" />;
      default:
        return <Brain className="w-6 h-6 text-[#6E2F82]" />;
    }
  };

  const heroPhotos = {
    portrait: {
      path: USER_ATTACHED_IMAGES.portrait.path,
      alt: 'Gema Guirao - Neurologopeda Colegiada',
      title: 'Gema Guirao',
      subtitle: 'Neurologopeda · Colegiada Nº 30/695'
    },
    consultation: {
      path: USER_ATTACHED_IMAGES.consultation.path,
      alt: 'Consulta Clínica CIMM Murcia',
      title: 'Consulta CIMM Murcia',
      subtitle: 'Espacio adaptado para la máxima privacidad y confort'
    },
    materials: {
      path: USER_ATTACHED_IMAGES.materialesAdaptados.path,
      alt: 'Materiales terapéuticos y fonoaudiológicos',
      title: 'Materiales y Herramientas',
      subtitle: 'Estimulación del habla, articulación y deglución'
    }
  };

  return (
    <div id="home-view" className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO ULTRA-VISUAL CON CONVERSIÓN INMEDIATA */}
      <section id="hero-section" className="relative pt-4 sm:pt-10 overflow-hidden" aria-labelledby="hero-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Columna Izquierda: Mensaje claro, sin paja, enfocado en contactar */}
            <div className="lg:col-span-7 space-y-5 text-left">
              {/* Badge dinámico con estado de disponibilidad */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>AGENDA ABIERTA · ATENCIÓN EN MURCIA Y ONLINE</span>
              </div>

              {/* Título principal conciso y de alto impacto */}
              <h1
                id="hero-title"
                className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#3F1F4D] leading-[1.12]"
              >
                Recuperar, potenciar y cuidar la comunicación.
              </h1>

              {/* Frase corta y directa */}
              <p className="text-base sm:text-lg text-[#2F2931]/85 max-w-xl font-medium leading-relaxed">
                Neurologopedia clínica y logopedia funcional para niños, jóvenes y adultos. Tratamiento individualizado y cercano en el CIMM de Murcia o desde casa.
              </p>

              {/* Puntos clave visuales en chips compactos */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#EADFED] text-xs font-semibold text-[#3F1F4D] shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6E2F82]" />
                  Colegiada Sanitaria Nº 30/695
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#EADFED] text-xs font-semibold text-[#3F1F4D] shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-[#6E2F82]" />
                  +10 años de experiencia
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#EADFED] text-xs font-semibold text-[#3F1F4D] shadow-2xs">
                  <Globe2 className="w-3.5 h-3.5 text-[#6E2F82]" />
                  Presencial & Online
                </span>
              </div>

              {/* PANEL DE CONTACTO INMEDIATO Y LLAMATIVO */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-white via-[#FBF8F3] to-[#F5ECDF]/60 border-2 border-[#B68FC1]/40 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#6E2F82]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
                      ¿Tienes alguna duda o quieres valorar tu caso?
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6E2F82] font-semibold bg-[#EADFED]/60 px-2 py-0.5 rounded-full hidden sm:inline">
                    Respuesta en &lt; 24h
                  </span>
                </div>

                {/* 3 Botones de acción principales */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Botón WhatsApp prioritario */}
                  <a
                    id="hero-action-whatsapp"
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all group cursor-pointer"
                    title="Escribir por WhatsApp a Gema Guirao"
                  >
                    <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>WhatsApp Directo</span>
                  </a>

                  {/* Botón Teléfono */}
                  <a
                    id="hero-action-call"
                    href="tel:+34624718369"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-[#F5ECDF] text-[#3F1F4D] border border-[#B68FC1]/50 font-bold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all"
                    title="Llamar al 624 71 83 69"
                  >
                    <Phone className="w-4 h-4 text-[#6E2F82]" />
                    <span>624 71 83 69</span>
                  </a>

                  {/* Botón Cita Online Calendar */}
                  <a
                    id="hero-action-calendar"
                    href={AGENDA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all"
                    title="Reservar en Google Calendar"
                  >
                    <Calendar className="w-4 h-4 text-[#EADFED]" />
                    <span>Reservar Cita</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta Fotográfica Interactiva */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Glow ambiental */}
                <div
                  className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#6E2F82]/25 via-[#B68FC1]/30 to-[#F5ECDF] blur-xl opacity-80"
                  aria-hidden="true"
                />

                {/* Tarjeta con selector visual de fotos */}
                <div className="relative bg-white p-3.5 sm:p-4 rounded-3xl border border-[#EADFED] shadow-xl">
                  {/* Selector visual de pestañas de foto */}
                  <div className="flex items-center gap-1.5 p-1 bg-[#FBF8F3] rounded-2xl mb-3 border border-[#EADFED]">
                    <button
                      id="hero-tab-portrait"
                      type="button"
                      onClick={() => setActivePhotoTab('portrait')}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                        activePhotoTab === 'portrait'
                          ? 'bg-[#6E2F82] text-white shadow-xs'
                          : 'text-[#3F1F4D] hover:bg-[#EADFED]/60'
                      }`}
                    >
                      Gema Guirao
                    </button>
                    <button
                      id="hero-tab-consultation"
                      type="button"
                      onClick={() => setActivePhotoTab('consultation')}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                        activePhotoTab === 'consultation'
                          ? 'bg-[#6E2F82] text-white shadow-xs'
                          : 'text-[#3F1F4D] hover:bg-[#EADFED]/60'
                      }`}
                    >
                      Consulta CIMM
                    </button>
                    <button
                      id="hero-tab-materials"
                      type="button"
                      onClick={() => setActivePhotoTab('materials')}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                        activePhotoTab === 'materials'
                          ? 'bg-[#6E2F82] text-white shadow-xs'
                          : 'text-[#3F1F4D] hover:bg-[#EADFED]/60'
                      }`}
                    >
                      Materiales
                    </button>
                  </div>

                  {/* Imagen activa */}
                  <div className="relative aspect-square sm:aspect-[4/4.2] rounded-2xl overflow-hidden bg-[#EADFED]/30 border border-[#EADFED]">
                    <SafeImage
                      id="hero-main-photo"
                      src={heroPhotos[activePhotoTab].path}
                      alt={heroPhotos[activePhotoTab].alt}
                      slotKey={activePhotoTab === 'materials' ? 'therapy' : (activePhotoTab === 'consultation' ? 'consultation' : 'portrait')}
                      className="w-full h-full object-cover object-center transition-all duration-500"
                    />

                    {/* Gradiente inferior para texto de pie de foto */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3F1F4D]/80 via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                      <p className="font-serif font-bold text-sm sm:text-base leading-tight">
                        {heroPhotos[activePhotoTab].title}
                      </p>
                      <p className="text-[11px] text-[#EADFED] font-medium leading-normal mt-0.5">
                        {heroPhotos[activePhotoTab].subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Distintivos flotantes de confianza */}
                  <div className="mt-3 pt-3 border-t border-[#EADFED] flex items-center justify-between text-xs text-[#3F1F4D] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6E2F82]" />
                      Atención individualizada
                    </span>
                    <button
                      id="hero-view-about-btn"
                      onClick={() => onNavigate('sobre-mi')}
                      className="text-[#6E2F82] hover:text-[#3F1F4D] font-bold inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Ver perfil completo</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MOSAICO VISUAL DE LA CONSULTA Y ESPACIO TERAPÉUTICO */}
      <section id="galeria-visual-resumen" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EADFED] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6E2F82]">
                INSTALACIONES Y PRÁCTICA CLÍNICA
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1F4D] mt-1">
                Un entorno seguro, cómodo y especializado
              </h2>
            </div>
            <a
              id="galeria-contact-cta"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs transition-all w-fit"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Preguntar por disponibilidad de sesiones</span>
            </a>
          </div>

          {/* Galería Bento con fotos de la clínica y materiales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#EADFED]/30 border border-[#EADFED] group">
              <SafeImage
                src={USER_ATTACHED_IMAGES.consultation.path}
                alt="Despacho de Valoración CIMM Murcia"
                slotKey="consultation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3F1F4D]/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-bold">Despacho de Valoración CIMM</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#EADFED]/30 border border-[#EADFED] group">
              <SafeImage
                src={USER_ATTACHED_IMAGES.espacioIntervencion.path}
                alt="Espacio de Intervención Logopédica"
                slotKey="espacio_intervencion"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3F1F4D]/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-bold">Espacio de Intervención</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#EADFED]/30 border border-[#EADFED] group">
              <SafeImage
                src={USER_ATTACHED_IMAGES.materialesAdaptados.path}
                alt="Materiales Adaptados y Fonoaudiología"
                slotKey="materiales_adaptados"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3F1F4D]/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-bold">Materiales Adaptados</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#EADFED]/30 border border-[#EADFED] group">
              <SafeImage
                src={USER_ATTACHED_IMAGES.diagnosticoSeguimiento.path}
                alt="Diagnóstico y Seguimiento Clínico"
                slotKey="diagnostico_seguimiento"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3F1F4D]/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-bold">Diagnóstico y Seguimiento</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ESPECIALIDADES CLÍNICAS (Tarjetas visuales, directas, sin texto innecesario) */}
      <section id="areas-intervencion" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="servicios-title">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6E2F82]">
            ÁREAS DE TRATAMIENTO
          </span>
          <h2 id="servicios-title" className="font-serif text-3xl sm:text-4xl font-bold text-[#3F1F4D]">
            ¿En qué puedo ayudarte?
          </h2>
          <p className="text-xs sm:text-sm text-[#2F2931]/75">
            Selecciona tu motivo de consulta para ver cómo lo abordamos o escríbeme directamente para orientarte.
          </p>
        </div>

        {/* 6 Tarjetas Visuales con llamada directa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map((serv) => (
            <article
              key={serv.id}
              id={`card-serv-${serv.slug}`}
              className="bg-white rounded-3xl border border-[#EADFED] p-6 flex flex-col justify-between hover:shadow-lg hover:border-[#B68FC1] transition-all group"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#EADFED]/70 border border-[#B68FC1]/30 flex items-center justify-center group-hover:bg-[#6E2F82] group-hover:text-white transition-all text-[#6E2F82]">
                    {getServiceIcon(serv.iconName)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E2F82] bg-[#F5ECDF] px-2.5 py-1 rounded-full">
                    {serv.slug === 'neurologopedia'
                      ? 'Adultos y Neurología'
                      : serv.slug === 'voz'
                      ? 'Voz Profesional'
                      : serv.slug === 'disfagia'
                      ? 'Deglución Segura'
                      : serv.slug === 'terapia-miofuncional'
                      ? 'Miofuncional'
                      : serv.slug === 'lectoescritura'
                      ? 'Infancia y Jóvenes'
                      : 'Infancia y Adultos'}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#3F1F4D] group-hover:text-[#6E2F82] transition-colors">
                  {serv.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#2F2931]/80 leading-relaxed line-clamp-2">
                  {serv.summary}
                </p>

                {/* Etiquetas de problemas frecuentes */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {serv.includes.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-lg bg-[#FBF8F3] border border-[#EADFED] text-[11px] font-medium text-[#3F1F4D]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botón de acción directo para contactar por este servicio */}
              <div className="pt-5 mt-4 border-t border-[#EADFED] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onNavigate(serv.slug)}
                  className="text-xs font-bold text-[#6E2F82] hover:text-[#3F1F4D] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Ver detalles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/34624718369?text=${encodeURIComponent(`Hola Gema, me gustaría consultar información sobre el servicio de ${serv.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
                  title={`Consultar ${serv.name} por WhatsApp`}
                >
                  <MessageCircle className="w-3 h-3 text-emerald-600" />
                  <span>Consultar caso</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. TRES PASOS SENCILLOS (Mínimo texto, máxima claridad para animar al contacto) */}
      <section id="pasos-simples-contacto" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5ECDF]/50 rounded-3xl border border-[#EADFED] p-8 sm:p-12 text-center space-y-8">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6E2F82]">
              SENCILLO Y CERCANO
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1F4D]">
              ¿Cómo empezamos? En solo 3 pasos:
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-2xl border border-[#EADFED] space-y-2 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#6E2F82] text-white font-serif font-bold text-base flex items-center justify-center">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-[#3F1F4D]">
                Primer Contacto
              </h3>
              <p className="text-xs text-[#2F2931]/80 leading-relaxed">
                Escríbeme por WhatsApp, llámame o reserva online. Sin formularios largos ni complicaciones.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EADFED] space-y-2 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#6E2F82] text-white font-serif font-bold text-base flex items-center justify-center">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-[#3F1F4D]">
                Primera Entrevista
              </h3>
              <p className="text-xs text-[#2F2931]/80 leading-relaxed">
                Evaluamos la situación, resolvemos dudas y definimos prioridades reales para ti o tu familiar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EADFED] space-y-2 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#6E2F82] text-white font-serif font-bold text-base flex items-center justify-center">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-[#3F1F4D]">
                Plan a tu Medida
              </h3>
              <p className="text-xs text-[#2F2931]/80 leading-relaxed">
                Sesiones prácticas y pautas para el día a día, enfocadas en resultados funcionales y bienestar.
              </p>
            </div>
          </div>

          {/* Gran botón de llamada a la acción */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              id="pasos-btn-whatsapp"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Escríbeme ahora por WhatsApp (624 71 83 69)</span>
            </a>

            <a
              id="pasos-btn-agenda"
              href={AGENDA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4 text-[#EADFED]" />
              <span>Abrir Agenda Google Calendar</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. POBLACIÓN ATENDIDA (2 TARJETAS VISUALES) */}
      <section id="atencion-infantil-adulta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjeta Infancia */}
          <div className="bg-white rounded-3xl border border-[#EADFED] p-6 sm:p-8 space-y-4 shadow-sm hover:border-[#B68FC1] transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EADFED]/60 text-xs font-bold text-[#6E2F82] uppercase tracking-wider">
                INFANCIA Y JÓVENES
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#3F1F4D]">
                Desarrollo del habla, lenguaje y deglución
              </h3>
              <p className="text-xs sm:text-sm text-[#2F2931]/80 leading-relaxed">
                Atención temprana, dificultades de pronunciación, respiración oral, deglución atípica y lectoescritura.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2.5 py-1 rounded-lg bg-[#FBF8F3] border border-[#EADFED] text-[11px] font-semibold text-[#3F1F4D]">
                  Habla y articulación
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#FBF8F3] border border-[#EADFED] text-[11px] font-semibold text-[#3F1F4D]">
                  Deglución atípica
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#FBF8F3] border border-[#EADFED] text-[11px] font-semibold text-[#3F1F4D]">
                  Lectoescritura
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-[#EADFED]">
              <a
                href={`https://wa.me/34624718369?text=${encodeURIComponent('Hola Gema, quisiera consultar sobre logopedia infantil para mi hijo/a.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6E2F82] hover:text-[#3F1F4D]"
              >
                <span>Consultar caso infantil por WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Tarjeta Adultos */}
          <div className="bg-white rounded-3xl border border-[#EADFED] p-6 sm:p-8 space-y-4 shadow-sm hover:border-[#B68FC1] transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EADFED]/60 text-xs font-bold text-[#6E2F82] uppercase tracking-wider">
                ADULTOS Y MAYORES
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#3F1F4D]">
                Rehabilitación neurológica, disfagia y voz
              </h3>
              <p className="text-xs sm:text-sm text-[#2F2931]/80 leading-relaxed">
                Recuperación tras ictus, traumatismos, Parkinson, deglución segura y patologías de la voz profesional.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2.5 py-1 rounded-lg bg-[#FBF8F3] border border-[#EADFED] text-[11px] font-semibold text-[#3F1F4D]">
                  Ictus y afasia
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#FBF8F3] border border-[#EADFED] text-[11px] font-semibold text-[#3F1F4D]">
                  Disfagia (deglución)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#FBF8F3] border border-[#EADFED] text-[11px] font-semibold text-[#3F1F4D]">
                  Voz profesional
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-[#EADFED]">
              <a
                href={`https://wa.me/34624718369?text=${encodeURIComponent('Hola Gema, quisiera consultar sobre neurologopedia o rehabilitación para un adulto.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6E2F82] hover:text-[#3F1F4D]"
              >
                <span>Consultar caso de adulto por WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONSULTA EN MURCIA & ONLINE (VISUAL & PRECISA) */}
      <section id="ubicacion-cimm-murcia" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-white via-[#FBF8F3] to-[#F5ECDF]/60 rounded-3xl border-2 border-[#B68FC1]/40 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-white border border-[#EADFED] shadow-md">
                <SafeImage
                  src={USER_ATTACHED_IMAGES.consultation.path}
                  alt="Consulta CIMM Murcia - Gema Guirao"
                  slotKey="consultation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl border border-[#EADFED] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#3F1F4D]">
                    <MapPin className="w-4 h-4 text-[#6E2F82]" />
                    <span>CIMM Murcia</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Fácil aparcamiento
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6E2F82]">
                MODALIDADES DE ATENCIÓN
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1F4D]">
                Atención presencial en Murcia y modalidad online
              </h2>
              <p className="text-xs sm:text-sm text-[#2F2931]/80 leading-relaxed">
                Las sesiones presenciales se realizan en el <strong>CIMM (Centro de Iniciativas Municipales de Murcia)</strong>, Carretera de Churra, 96, 30007 Murcia. Si no puedes desplazarte, realizamos valoración e intervención telemática con la misma rigurosidad.
              </p>

              {/* Botones de acción directos */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  id="cimm-action-whatsapp"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Contactar por WhatsApp</span>
                </a>

                <a
                  id="cimm-action-calendar"
                  href={AGENDA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white font-bold text-xs shadow-xs transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#EADFED]" />
                  <span>Reservar Primera Cita</span>
                </a>

                <button
                  id="cimm-action-contact-view"
                  type="button"
                  onClick={() => onNavigate('contacto')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F5ECDF] text-[#3F1F4D] border border-[#B68FC1]/40 font-bold text-xs transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-[#6E2F82]" />
                  <span>Cómo llegar & mapa</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. DUDAS FRECUENTES RÁPIDAS (Acordeones compactos) */}
      <section id="faq-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-6">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6E2F82]">
            DUDAS FRECUENTES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1F4D]">
            Preguntas habituales antes de empezar
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.slice(0, 4).map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-white rounded-2xl border border-[#EADFED] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  id={`faq-btn-${faq.id}`}
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full text-left px-5 py-3.5 sm:py-4 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-sm sm:text-base font-bold text-[#3F1F4D]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6E2F82] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#3F1F4D]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#2F2931]/80 leading-relaxed border-t border-[#EADFED]/60 bg-[#FBF8F3]/50"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. GRAN LLAMADA DE CONTACTO FINAL (ATRACTIVO Y MUY VISUAL) */}
      <section id="cta-final-contacto" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#3F1F4D] text-[#FBF8F3] rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xl border border-[#6E2F82]/60 relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6E2F82]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B68FC1]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#6E2F82] text-xs font-bold uppercase tracking-wider text-[#EADFED]">
              CONTACTA HOY MISMO
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              ¿Hablamos de tu caso?
            </h2>

            <p className="text-sm sm:text-base text-[#EADFED]/90 max-w-lg mx-auto leading-relaxed">
              Sin compromisos a largo plazo. Escríbeme directamente por WhatsApp o reserva tu primera entrevista en la agenda.
            </p>

            {/* Tarjetas de contacto integradas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-left">
              <a
                id="cta-final-card-whatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-3 shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-100">WhatsApp Profesional</p>
                  <p className="text-sm font-bold">624 71 83 69</p>
                </div>
              </a>

              <a
                id="cta-final-card-calendar"
                href={AGENDA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#6E2F82] hover:bg-[#B68FC1] hover:text-[#3F1F4D] text-white flex items-center gap-3 shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#EADFED]">Agenda Google Calendar</p>
                  <p className="text-sm font-bold">Reservar 1ª Entrevista</p>
                </div>
              </a>
            </div>

            {/* Redes sociales profesionales */}
            <div className="pt-4 border-t border-[#6E2F82] flex flex-wrap items-center justify-center gap-4 text-xs text-[#EADFED]">
              <span className="font-semibold text-white/90">Mis redes sociales:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.instagram.com/gemaguirao_logopeda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#E1306C] text-white transition-all inline-flex items-center gap-1.5 font-bold"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/gemaguirao.neurologopeda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#1877F2] text-white transition-all inline-flex items-center gap-1.5 font-bold"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/gema-guirao-logopeda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#0A66C2] text-white transition-all inline-flex items-center gap-1.5 font-bold"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
