import { PageRoute } from '../types';
import { USER_ATTACHED_IMAGES } from '../data/userImages';
import { SafeImage } from '../components/SafeImage';
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  HeartPulse,
  Brain,
  Award,
  Sparkles,
  Images,
  FolderHeart
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutView = ({ onNavigate }: AboutViewProps) => {
  const AGENDA_URL = 'https://calendar.app.google/Sk8VZ8WyWi6maxdN6';

  const BLOCKS = [
    {
      num: '01',
      title: 'Evaluar antes de intervenir',
      description:
        'La exploración permite identificar procesos alterados, capacidades conservadas y factores que influyen en el desempeño.',
      icon: <Brain className="w-5 h-5 text-[#6E2F82]" />
    },
    {
      num: '02',
      title: 'Trabajar con objetivos funcionales',
      description:
        'La intervención se dirige a cambios que tengan impacto en la comunicación, la autonomía y la participación.',
      icon: <HeartPulse className="w-5 h-5 text-[#6E2F82]" />
    },
    {
      num: '03',
      title: 'Adaptar el tratamiento',
      description:
        'La frecuencia, las tareas y la dificultad se ajustan al perfil clínico, la evolución y la tolerancia.',
      icon: <ShieldCheck className="w-5 h-5 text-[#6E2F82]" />
    },
    {
      num: '04',
      title: 'Revisar la evolución',
      description:
        'Los objetivos se actualizan cuando aparecen nuevas necesidades o se alcanzan los hitos previstos.',
      icon: <CheckCircle2 className="w-5 h-5 text-[#6E2F82]" />
    }
  ];

  return (
    <div id="about-page-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      {/* Header / Hero of About with Professional Portrait */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADFED]/70 border border-[#B68FC1]/40 text-xs font-semibold uppercase tracking-widest text-[#6E2F82]">
            <Award className="w-3.5 h-3.5" />
            <span>PERFIL PROFESIONAL SANITARIO</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#3F1F4D] tracking-tight leading-tight">
            Gema Guirao, neurologopeda
          </h1>

          <p className="text-lg sm:text-xl font-medium text-[#6E2F82] leading-relaxed">
            Más de 10 años de experiencia acompañando procesos de evaluación, rehabilitación y mejora de la comunicación.
          </p>

          <div className="space-y-4 text-sm sm:text-base text-[#2F2931]/85 leading-relaxed pt-1">
            <p>
              La logopedia permite intervenir sobre funciones esenciales para la vida diaria: comunicarse, comprender, expresarse, hablar, usar la voz, leer, escribir o deglutir con seguridad.
            </p>
            <p>
              El trabajo se plantea desde una valoración individualizada, evitando protocolos rígidos y adaptando los objetivos a la situación clínica y al contexto real de cada persona.
            </p>
            <p>
              En neurologopedia, la intervención se orienta especialmente a conservar, recuperar o compensar funciones afectadas por daño cerebral adquirido o por enfermedades neurológicas.
            </p>
          </div>

          {/* Clinical credential badges */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-white border border-[#EADFED] text-xs font-semibold text-[#3F1F4D] shadow-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#6E2F82]" />
              <span>Nº Colegiada: 30/695 (Colegio Oficial de Murcia)</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-white border border-[#EADFED] text-xs font-semibold text-[#3F1F4D] shadow-sm">
              Consulta en CIMM (Murcia) y Online
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-white border border-[#EADFED] text-xs font-semibold text-[#3F1F4D] shadow-sm">
              Especialidad en Neurologopedia
            </div>
          </div>
        </div>

        {/* Right side: Authentic Gema Guirao Portrait */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md">
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#6E2F82]/20 to-[#B68FC1]/30 rounded-3xl blur-lg" />
            <div className="relative bg-white p-3 sm:p-4 rounded-3xl border border-[#EADFED] shadow-lg">
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#EADFED]/30 relative">
                <SafeImage
                  id="about-portrait-gema"
                  src={USER_ATTACHED_IMAGES.portrait.path}
                  slotKey="portrait"
                  alt={USER_ATTACHED_IMAGES.portrait.alt}
                  captionTitle="Gema Guirao"
                  captionSubtitle="Neurologopeda Clínica"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-4 pb-1 text-center">
                <p className="font-serif font-bold text-lg text-[#3F1F4D]">Gema Guirao</p>
                <p className="text-xs text-[#6E2F82] font-semibold tracking-wider uppercase">Neurologopeda Clínica</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Core Clinical Blocks */}
      <section className="space-y-8" aria-labelledby="bloques-title">
        <div className="border-t border-[#EADFED] pt-12">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6E2F82]">
            PILOTES DE LA PRÁCTICA CLÍNICA
          </span>
          <h2 id="bloques-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1F4D] mt-2">
            Principios asistenciales en cada intervención
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {BLOCKS.map((block) => (
            <div
              key={block.num}
              className="bg-white rounded-2xl border border-[#EADFED] p-8 space-y-4 shadow-sm hover:border-[#B68FC1] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EADFED]/60 flex items-center justify-center">
                  {block.icon}
                </div>
                <span className="font-serif text-xl font-bold text-[#B68FC1]">{block.num}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#3F1F4D]">{block.title}</h3>
              <p className="text-sm text-[#2F2931]/80 leading-relaxed">{block.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Focus: Clinical practice in consultation */}
      <section className="bg-gradient-to-br from-[#F5ECDF]/60 via-white to-[#EADFED]/40 rounded-3xl p-8 sm:p-12 lg:p-14 border border-[#B68FC1]/30 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="bg-white p-2.5 rounded-2xl border border-[#EADFED] shadow-md">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                <SafeImage
                  id="about-img-consulta-clinica"
                  src={USER_ATTACHED_IMAGES.consultation.path}
                  slotKey="consultation"
                  alt={USER_ATTACHED_IMAGES.consultation.alt}
                  captionTitle="Consulta Clínica y Neurorehabilitación"
                  captionSubtitle="Gema Guirao · Práctica asistencial"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-white text-left">
                <p className="text-xs font-bold text-[#3F1F4D]">Práctica Clínica Asistencial</p>
                <p className="text-[11px] text-[#6E2F82]">Materiales diagnósticos y de estimulación cognitiva adaptada</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-semibold text-[#6E2F82] border border-[#B68FC1]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RIGOR CIENTÍFICO Y CALIDEZ HUMANA</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1F4D]">
              Acompañamiento individualizado a lo largo del ciclo vital
            </h2>
            <p className="text-sm sm:text-base text-[#2F2931]/80 leading-relaxed">
              Cada proceso terapéutico se estructura con rigor científico y sensibilidad humana. Ya sea en niños en etapa de desarrollo del habla o en adultos en proceso de neurorehabilitación, la persona y su entorno familiar constituyen el centro de las decisiones clínicas.
            </p>
            <p className="text-sm text-[#2F2931]/75 leading-relaxed">
              La consulta dispone de espacios acondicionados para garantizar la serenidad, la concentración y la privacidad en cada sesión terapéutica.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                id="about-cta-reservar"
                href={AGENDA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white text-sm font-semibold tracking-wide shadow-sm transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>RESERVAR PRIMERA ENTREVISTA</span>
              </a>
              <button
                id="about-cta-servicios"
                onClick={() => onNavigate('servicios')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#FBF8F3] text-[#3F1F4D] text-sm font-semibold border border-[#B68FC1]/40 transition-all"
              >
                <span>Conocer las áreas de intervención</span>
                <ArrowRight className="w-4 h-4 text-[#6E2F82]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Real Clinical Gallery: Attached Clinic and Therapy Photos */}
      <section id="galeria-clinica" className="space-y-8" aria-labelledby="galeria-title">
        <div className="border-t border-[#EADFED] pt-12 text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADFED]/60 text-xs font-semibold text-[#6E2F82] border border-[#B68FC1]/30 mb-2">
              <Images className="w-3.5 h-3.5" />
              <span>ESPACIO Y MATERIALES CLÍNICOS</span>
            </div>
            <h2 id="galeria-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1F4D]">
              Consulta, recursos diagnósticos y material terapéutico
            </h2>
            <p className="text-sm text-[#2F2931]/80 max-w-2xl mt-2">
              Espacios diseñados para ofrecer un entorno cálido, profesional y adaptado a las necesidades de cada paciente en rehabilitación y estimulación.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USER_ATTACHED_IMAGES.gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#EADFED] overflow-hidden shadow-sm hover:border-[#B68FC1] hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-[#EADFED]/20 overflow-hidden">
                <SafeImage
                  id={`gallery-img-${item.id}`}
                  src={item.path}
                  alt={item.title}
                  captionTitle={item.title}
                  captionSubtitle={item.description}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between text-left bg-white">
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#3F1F4D]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#2F2931]/70 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#EADFED]/60 flex items-center justify-between text-[11px] text-[#6E2F82] font-medium">
                  <span className="flex items-center gap-1">
                    <FolderHeart className="w-3 h-3" />
                    <span>Consulta Gema Guirao</span>
                  </span>
                  <span className="text-[10px] text-[#2F2931]/50 font-mono">
                    {item.filename.length > 22 ? `${item.filename.slice(0, 20)}...` : item.filename}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
