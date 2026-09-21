import { PageRoute, ServiceItem } from '../types';
import { SERVICES } from '../data/servicesData';
import {
  Calendar,
  ArrowRight,
  Brain,
  MessageSquare,
  Mic,
  ShieldCheck,
  Activity,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

interface ServiceDetailViewProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const ServiceDetailView = ({ currentRoute, onNavigate }: ServiceDetailViewProps) => {
  const AGENDA_URL = 'https://calendar.app.google/Sk8VZ8WyWi6maxdN6';

  const isAllServicesOverview = currentRoute === 'servicios';

  // Find active service if route matches a specific service slug
  const activeService = SERVICES.find((s) => s.slug === currentRoute) || SERVICES[0];

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

  if (isAllServicesOverview) {
    return (
      <div id="services-overview-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6E2F82]">
            ESPECIALIZACIÓN SANITARIA
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3F1F4D] tracking-tight">
            Áreas de intervención
          </h1>
          <p className="text-base sm:text-lg text-[#2F2931]/80 leading-relaxed">
            La valoración clínica permite definir qué procesos están afectados, cuáles se conservan y qué objetivos terapéuticos deben priorizarse.
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((serv) => (
            <article
              key={serv.id}
              className="bg-white rounded-2xl border border-[#EADFED] p-8 flex flex-col justify-between hover:border-[#B68FC1] hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#EADFED]/60 flex items-center justify-center">
                  {getServiceIcon(serv.iconName)}
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#3F1F4D]">{serv.name}</h2>
                <p className="text-sm text-[#2F2931]/80 leading-relaxed">{serv.summary}</p>

                <div className="pt-3 border-t border-[#EADFED]">
                  <p className="text-[11px] font-semibold text-[#6E2F82] uppercase tracking-wider mb-2">
                    Puede incluir:
                  </p>
                  <ul className="space-y-1 text-xs text-[#2F2931]/80">
                    {serv.includes.slice(0, 5).map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B68FC1]" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EADFED]/60">
                <button
                  id={`btn-acceder-${serv.slug}`}
                  onClick={() => onNavigate(serv.slug)}
                  className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-[#F5ECDF] hover:bg-[#EADFED] text-[#3F1F4D] text-xs font-semibold tracking-wide transition-colors"
                >
                  <span>Ver {serv.shortTitle} en detalle</span>
                  <ArrowRight className="w-4 h-4 text-[#6E2F82]" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  // Specific Service Page
  return (
    <div id={`service-detail-${activeService.slug}`} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Service Selector / Horizontal breadcrumbs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#EADFED] scrollbar-none text-xs">
        <span className="text-[#6E2F82] font-semibold pr-2 shrink-0">Áreas:</span>
        {SERVICES.map((s) => (
          <button
            key={s.id}
            id={`tab-serv-${s.slug}`}
            onClick={() => onNavigate(s.slug)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              s.slug === activeService.slug
                ? 'bg-[#3F1F4D] text-white font-semibold'
                : 'bg-white border border-[#EADFED] text-[#2F2931]/80 hover:bg-[#F5ECDF]'
            }`}
          >
            {s.shortTitle}
          </button>
        ))}
      </div>

      {/* Main Service Content */}
      <article className="max-w-4xl space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADFED]/60 text-xs font-bold uppercase tracking-wider text-[#6E2F82]">
            ÁREA DE INTERVENCIÓN CLÍNICA
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3F1F4D] tracking-tight">
            {activeService.name}
          </h1>

          <p className="text-lg sm:text-xl font-medium text-[#6E2F82] leading-relaxed">
            {activeService.subtitle}
          </p>
        </div>

        {/* Clinical Notice / Disclaimer if applicable */}
        {activeService.clinicalNotice && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#EADFED]/50 border border-[#B68FC1]/50 text-xs sm:text-sm text-[#3F1F4D] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#6E2F82] shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">{activeService.clinicalNotice}</p>
          </div>
        )}

        {/* Description / ¿En qué consiste? */}
        <section className="space-y-4 text-sm sm:text-base text-[#2F2931]/85 leading-relaxed bg-white rounded-3xl border border-[#EADFED] p-6 sm:p-10 shadow-sm">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#3F1F4D]">
            ¿En qué consiste?
          </h2>
          {activeService.description.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </section>

        {/* Valoración & Intervención 2-columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Valoración */}
          <section className="bg-white rounded-3xl border border-[#EADFED] p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F5ECDF] text-xs font-bold text-[#3F1F4D] uppercase">
              Valoración
            </div>
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              Exploración diagnóstica
            </h2>
            <p className="text-sm text-[#2F2931]/80 leading-relaxed">
              {activeService.assessment}
            </p>
          </section>

          {/* Intervención */}
          <section className="bg-white rounded-3xl border border-[#EADFED] p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EADFED]/70 text-xs font-bold text-[#6E2F82] uppercase">
              Intervención
            </div>
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              Abordaje terapéutico
            </h2>
            <p className="text-sm text-[#2F2931]/80 leading-relaxed">
              {activeService.intervention}
            </p>
          </section>
        </div>

        {/* Áreas y patologías incluidas */}
        <section className="bg-white rounded-3xl border border-[#EADFED] p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
            Procesos y condiciones atendidas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {activeService.includes.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FBF8F3] border border-[#EADFED]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#6E2F82] shrink-0" />
                <span className="text-xs sm:text-sm text-[#2F2931]/90 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA banner specific to the service */}
        <section className="bg-[#3F1F4D] text-[#FBF8F3] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-serif text-2xl font-bold">
              ¿Deseas solicitar valoración en {activeService.shortTitle.toLowerCase()}?
            </h3>
            <p className="text-xs sm:text-sm text-[#EADFED]/80">
              Inicia el proceso con una primera entrevista clínica para analizar las necesidades particulares del caso.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <a
              id={`service-cta-agenda-${activeService.slug}`}
              href={AGENDA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6E2F82] hover:bg-[#B68FC1] hover:text-[#3F1F4D] text-white text-xs font-semibold tracking-wide shadow transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>RESERVAR ENTREVISTA</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </section>
      </article>
    </div>
  );
};
