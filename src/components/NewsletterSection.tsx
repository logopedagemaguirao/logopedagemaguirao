import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  ShieldCheck, 
  BookOpen, 
  Send, 
  Users, 
  FileText, 
  X,
  Lock
} from 'lucide-react';
import { PageRoute } from '../types';

interface Subscriber {
  id: string;
  name: string;
  email: string;
  topics: string[];
  date: string;
}

const STORAGE_KEY = 'gema_guirao_newsletter_subscribers';
const USER_SUBSCRIBED_KEY = 'gema_guirao_user_is_subscribed';

interface NewsletterSectionProps {
  onNavigate?: (route: PageRoute) => void;
  variant?: 'embedded' | 'full';
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ 
  onNavigate,
  variant = 'embedded' 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Neurologopedia y Daño Cerebral',
    'Salud Vocal y Prevención'
  ]);
  const [acceptedRgpd, setAcceptedRgpd] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState<number>(142);
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [subscribersList, setSubscribersList] = useState<Subscriber[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const availableTopics = [
    { id: 'neuro', label: 'Neurologopedia y Daño Cerebral', icon: '🧠' },
    { id: 'voz', label: 'Salud Vocal y Prevención', icon: '🗣️' },
    { id: 'disfagia', label: 'Disfagia y Deglución Segura', icon: '🍽️' },
    { id: 'infantil', label: 'Desarrollo del Lenguaje y Habla', icon: '🌱' }
  ];

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Subscriber[] = JSON.parse(stored);
        setSubscribersList(parsed);
        setSubscriberCount(142 + parsed.length);
      }
      const userSub = localStorage.getItem(USER_SUBSCRIBED_KEY);
      if (userSub === 'true') {
        setIsSubscribed(true);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleToggleTopic = (label: string) => {
    setSelectedTopics((prev) => 
      prev.includes(label) 
        ? prev.filter((t) => t !== label) 
        : [...prev, label]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Por favor, introduce tu nombre.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Por favor, introduce un correo electrónico válido.');
      return;
    }
    if (!acceptedRgpd) {
      setErrorMessage('Debes aceptar la política de privacidad para suscribirte.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newSubscriber: Subscriber = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        topics: selectedTopics,
        date: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      try {
        const updated = [...subscribersList, newSubscriber];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        localStorage.setItem(USER_SUBSCRIBED_KEY, 'true');
        setSubscribersList(updated);
        setSubscriberCount((prev) => prev + 1);
      } catch {
        // Fallback
      }

      setIsSubmitting(false);
      setIsSubscribed(true);
    }, 600);
  };

  const exportSubscribersCSV = () => {
    const headers = 'ID,Nombre,Email,Temas,Fecha\n';
    const rows = subscribersList.map(s => 
      `"${s.id}","${s.name}","${s.email}","${s.topics.join('; ')}","${s.date}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `suscriptores-newsletter-gema-guirao-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      id="newsletter-section" 
      aria-labelledby="newsletter-title"
      className={variant === 'full' ? 'py-12' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3F1F4D] via-[#4F2561] to-[#3F1F4D] text-white shadow-xl border border-[#6E2F82]/50">
        {/* Subtle background decorative shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#6E2F82]/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-[#B68FC1]/20 blur-3xl pointer-events-none" />

        <div className="relative p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left column: Editorial introduction & value proposal */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#EADFED]">
                <Sparkles className="w-3.5 h-3.5 text-[#B68FC1]" />
                <span>Boletín Clínico Mensual · Sin spam</span>
              </div>

              <h2 id="newsletter-title" className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FBF8F3]">
                Pautas y Avances en <span className="text-[#EADFED]">Neurologopedia y Voz</span>
              </h2>

              <p className="text-sm sm:text-base text-[#EADFED]/90 leading-relaxed max-w-xl">
                Recibe mensualmente en tu correo recursos prácticos, recomendaciones preventivas y divulgación clínica fundamentada por <strong>Gema Guirao</strong>. Diseñado especialmente para familias, cuidadores, profesionales de la voz y pacientes.
              </p>

              {/* Core benefits list */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6E2F82] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#EADFED]" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#EADFED]/85">
                    <strong>Pautas de estimulación en casa:</strong> Ejercicios para lenguaje, disfagia y rehabilitación tras ictus o daño cerebral.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6E2F82] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#EADFED]" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#EADFED]/85">
                    <strong>Cuidado de la voz:</strong> Consejos de ergonomía y técnica vocal para docentes, oradores y opositores.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6E2F82] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#EADFED]" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#EADFED]/85">
                    <strong>Regalo de bienvenida inmediato:</strong> Acceso a la <em>«Guía de Pautas Esenciales de Higiene Vocal y Estimulación»</em>.
                  </p>
                </div>
              </div>

              {/* Social proof & privacy stamp */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#EADFED]/70">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#B68FC1]" />
                  <span>Más de <strong>{subscriberCount}</strong> lectores mensuales</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B68FC1]" />
                  <span>100% libre de spam · Cancelación en 1 clic</span>
                </div>
              </div>
            </div>

            {/* Right column: Interactive form or success state */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 text-[#2F2931] shadow-2xl border border-white/20">
                
                {isSubscribed ? (
                  /* Success State */
                  <div id="newsletter-success-state" className="text-center py-4 space-y-5">
                    <div className="w-14 h-14 mx-auto rounded-full bg-[#EADFED] text-[#6E2F82] flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3F1F4D]">
                        ¡Bienvenido/a al boletín clínico!
                      </h3>
                      <p className="text-sm text-[#2F2931]/80 max-w-md mx-auto leading-relaxed">
                        Tu suscripción ha sido confirmada con éxito. Ya tienes disponible tu guía de bienvenida para leer o descargar.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FBF8F3] border border-[#EADFED] text-left flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#6E2F82] text-white flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#3F1F4D]">Guía Digital de Bienvenida</p>
                          <p className="text-[11px] text-[#6E2F82]">Pautas de Higiene Vocal y Salud Comunicativa</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowWelcomeGuide(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6E2F82] hover:bg-[#3F1F4D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Ver guía</span>
                      </button>
                    </div>

                    <div className="pt-2 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubscribed(false);
                          setName('');
                          setEmail('');
                          localStorage.removeItem(USER_SUBSCRIBED_KEY);
                        }}
                        className="text-xs text-[#6E2F82] hover:underline"
                      >
                        Suscribir otro correo
                      </button>
                      <span className="text-xs text-[#2F2931]/40">•</span>
                      <button
                        type="button"
                        onClick={() => setShowWelcomeGuide(true)}
                        className="text-xs font-semibold text-[#3F1F4D] hover:text-[#6E2F82]"
                      >
                        Leer guía ahora
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Subscription Form */
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="newsletter-name" className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
                          Tu Nombre *
                        </label>
                        <span className="text-[11px] text-[#2F2931]/60">Obligatorio</span>
                      </div>
                      <input
                        id="newsletter-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. María García"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EADFED] text-sm text-[#2F2931] placeholder-[#2F2931]/40 focus:outline-none focus:ring-2 focus:ring-[#6E2F82] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="newsletter-email" className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
                          Correo Electrónico *
                        </label>
                        <span className="text-[11px] text-[#2F2931]/60">Donde recibirás las pautas</span>
                      </div>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#6E2F82] absolute left-3.5 top-3.5" />
                        <input
                          id="newsletter-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tuemail@ejemplo.com"
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EADFED] text-sm text-[#2F2931] placeholder-[#2F2931]/40 focus:outline-none focus:ring-2 focus:ring-[#6E2F82] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Topic interest pills */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D] mb-2">
                        ¿Qué áreas te interesan más? (Opcional)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {availableTopics.map((topic) => {
                          const isSelected = selectedTopics.includes(topic.label);
                          return (
                            <button
                              type="button"
                              key={topic.id}
                              onClick={() => handleToggleTopic(topic.label)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#6E2F82] text-white shadow-xs'
                                  : 'bg-[#FBF8F3] text-[#3F1F4D] border border-[#EADFED] hover:border-[#B68FC1]'
                              }`}
                            >
                              <span>{topic.icon}</span>
                              <span>{topic.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* RGPD Consent Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer text-left">
                        <input
                          id="newsletter-consent-rgpd"
                          type="checkbox"
                          checked={acceptedRgpd}
                          onChange={(e) => setAcceptedRgpd(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-[#6E2F82] focus:ring-[#6E2F82] border-gray-300"
                        />
                        <span className="text-xs text-[#2F2931]/75 leading-relaxed">
                          He leído y acepto la{' '}
                          <button
                            type="button"
                            onClick={() => onNavigate?.('privacidad')}
                            className="text-[#6E2F82] underline font-semibold hover:text-[#3F1F4D]"
                          >
                            política de privacidad
                          </button>{' '}
                          para recibir el boletín informativo mensual de Gema Guirao. Puedes darte de baja en cualquier momento.
                        </span>
                      </label>
                    </div>

                    {errorMessage && (
                      <p className="text-xs text-red-600 font-medium bg-red-50 p-2 rounded-lg border border-red-200">
                        {errorMessage}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      id="newsletter-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Registrando suscripción...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>UNIRME AL BOLETÍN Y DESCARGAR GUÍA</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Subtle administration trigger for Gema */}
                <div className="mt-4 pt-3 border-t border-[#EADFED]/60 flex items-center justify-between text-[11px] text-[#2F2931]/60">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#6E2F82]" />
                    <span>Datos protegidos · RGPD UE</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAdminModal(true)}
                    className="hover:text-[#6E2F82] hover:underline"
                    title="Panel privado de suscriptores para Gema"
                  >
                    Gestión suscriptores ({subscribersList.length})
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Welcome Guide Modal */}
      {showWelcomeGuide && (
        <div 
          id="newsletter-guide-modal"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#EADFED] text-left space-y-6">
            <div className="flex items-center justify-between border-b border-[#EADFED] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EADFED] text-[#6E2F82] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#3F1F4D]">
                    Guía Rápida: Pautas de Cuidado Vocal y Salud Comunicativa
                  </h3>
                  <p className="text-xs text-[#6E2F82]">Material exclusivo por Gema Guirao · Neurologopeda</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowWelcomeGuide(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-[#2F2931]/80 leading-relaxed">
              <p>
                ¡Gracias por sumarte a nuestra comunidad! Como regalo de bienvenida, aquí tienes 4 pautas clínicas clave recomendadas en consulta:
              </p>

              <div className="p-4 rounded-xl bg-[#FBF8F3] border border-[#EADFED] space-y-2">
                <h4 className="font-serif font-bold text-[#3F1F4D] text-base">
                  1. Hidratación y Humedad en Cuerdas Vocales
                </h4>
                <p className="text-xs text-[#2F2931]/80">
                  Las cuerdas vocales necesitan hidratación sistémica: bebe agua a sorbos frecuentes a lo largo del día en vez de grandes cantidades de golpe. Evita carraspear con fuerza; sustitúyelo por un trago de agua o una deglución voluntaria con saliva.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FBF8F3] border border-[#EADFED] space-y-2">
                <h4 className="font-serif font-bold text-[#3F1F4D] text-base">
                  2. Pautas Posturales en la Deglución
                </h4>
                <p className="text-xs text-[#2F2931]/80">
                  Para tragar con seguridad, mantén siempre la cabeza ligeramente inclinada hacia adelante (mentón al pecho), nunca extendida hacia atrás. Come en posición vertical de 90° y evita distracciones que aceleren la ingesta.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FBF8F3] border border-[#EADFED] space-y-2">
                <h4 className="font-serif font-bold text-[#3F1F4D] text-base">
                  3. Estimulación del Lenguaje en Casa
                </h4>
                <p className="text-xs text-[#2F2931]/80">
                  Tanto en niños como en adultos con afasia, prioriza la interacción cara a cara y da tiempo suficiente para formular la respuesta (espera al menos 5-8 segundos). Describe acciones cotidianas con frases claras y vocabulario rico.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FBF8F3] border border-[#EADFED] space-y-2">
                <h4 className="font-serif font-bold text-[#3F1F4D] text-base">
                  4. Signos de Alerta para Consulta Especializada
                </h4>
                <p className="text-xs text-[#2F2931]/80">
                  Disfonía persistente de más de 2 semanas, atragantamientos habituales con líquidos o cambios bruscos en la fluidez del habla requieren valoración clínica presencial e interdisciplinar.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EADFED] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#B68FC1] text-[#3F1F4D] text-xs font-semibold hover:bg-[#FBF8F3]"
              >
                <Download className="w-4 h-4 text-[#6E2F82]" />
                <span>Imprimir / Guardar como PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setShowWelcomeGuide(false)}
                className="px-5 py-2 rounded-xl bg-[#6E2F82] text-white text-xs font-semibold hover:bg-[#3F1F4D]"
              >
                Entendido, cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin / Subscribers Management Modal for Gema */}
      {showAdminModal && (
        <div 
          id="newsletter-admin-modal"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl border border-[#EADFED] text-left space-y-5">
            <div className="flex items-center justify-between border-b border-[#EADFED] pb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#6E2F82]" />
                <h3 className="font-serif text-lg font-bold text-[#3F1F4D]">
                  Panel de Suscriptores (Privado Gema)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#2F2931]/70">
              Aquí puedes revisar los nuevos suscriptores registrados desde la web y descargarlos en formato CSV para copiarlos a tu gestor de correo (Mailchimp, Brevo o Gmail).
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {subscribersList.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#2F2931]/60 bg-[#FBF8F3] rounded-xl border border-[#EADFED]">
                  Todavía no hay nuevos suscriptores registrados en este navegador. Las nuevas altas aparecerán aquí automáticamente.
                </div>
              ) : (
                subscribersList.map((s) => (
                  <div key={s.id} className="p-3 bg-[#FBF8F3] rounded-xl border border-[#EADFED] text-xs flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#3F1F4D]">{s.name}</p>
                      <p className="text-[#6E2F82]">{s.email}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{s.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#EADFED] text-[#3F1F4D]">
                        {s.topics.length} temas
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-[#EADFED] flex items-center justify-between">
              {subscribersList.length > 0 && (
                <button
                  type="button"
                  onClick={exportSubscribersCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6E2F82] text-white text-xs font-semibold hover:bg-[#3F1F4D]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar CSV</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="ml-auto px-4 py-1.5 rounded-lg bg-gray-100 text-[#3F1F4D] text-xs font-semibold hover:bg-gray-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
