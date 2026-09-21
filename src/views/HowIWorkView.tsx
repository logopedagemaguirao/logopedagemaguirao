import { PageRoute } from '../types';
import { WORK_PRINCIPLES } from '../data/faqsData';
import { Calendar, CheckCircle2, FileText, Stethoscope, MessageCircle, Layers, Users } from 'lucide-react';

interface HowIWorkViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const HowIWorkView = ({ onNavigate }: HowIWorkViewProps) => {
  const AGENDA_URL = 'https://calendar.app.google/Sk8VZ8WyWi6maxdN6';

  const STEPS = [
    {
      num: '01',
      title: 'ENTREVISTA',
      desc: 'Historia clínica, motivo de consulta, evolución, antecedentes, contexto y objetivos.',
      icon: <MessageCircle className="w-5 h-5 text-[#6E2F82]" />
    },
    {
      num: '02',
      title: 'EVALUACIÓN',
      desc: 'Selección de pruebas y tareas según el área afectada y el perfil de la persona.',
      icon: <Stethoscope className="w-5 h-5 text-[#6E2F82]" />
    },
    {
      num: '03',
      title: 'DEVOLUCIÓN',
      desc: 'Explicación comprensible de los resultados y de las prioridades terapéuticas.',
      icon: <FileText className="w-5 h-5 text-[#6E2F82]" />
    },
    {
      num: '04',
      title: 'INTERVENCIÓN',
      desc: 'Tratamiento individualizado con objetivos funcionales y revisión periódica.',
      icon: <Layers className="w-5 h-5 text-[#6E2F82]" />
    }
  ];

  return (
    <div id="how-i-work-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <section className="max-w-4xl space-y-4">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6E2F82]">
          METODOLOGÍA Y PROCESO ASISTENCIAL
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3F1F4D] tracking-tight leading-tight">
          Evaluar, priorizar, intervenir y revisar.
        </h1>
        <p className="text-lg sm:text-xl font-medium text-[#6E2F82] leading-relaxed">
          La intervención comienza antes de la primera tarea terapéutica: empieza comprendiendo bien el caso.
        </p>
      </section>

      {/* 4 Pasos principales */}
      <section className="space-y-6" aria-labelledby="pasos-title">
        <h2 id="pasos-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1F4D]">
          El itinerario clínico en cuatro etapas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl border border-[#EADFED] p-6 sm:p-7 space-y-3 shadow-sm hover:border-[#B68FC1] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EADFED]/60 flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="font-serif text-xl font-bold text-[#B68FC1]">{step.num}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#3F1F4D]">{step.title}</h3>
              <p className="text-xs sm:text-sm text-[#2F2931]/80 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Principios */}
      <section className="bg-white rounded-3xl border border-[#EADFED] p-8 sm:p-12 shadow-sm space-y-8" aria-labelledby="principios-title">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6E2F82]">
            CRITERIOS ÉTICOS Y CIENTÍFICOS
          </span>
          <h2 id="principios-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1F4D] mt-2">
            Principios que fundamentan la práctica
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WORK_PRINCIPLES.map((prin, idx) => (
            <div key={idx} className="space-y-2 border-l-2 border-[#B68FC1] pl-4">
              <h3 className="font-serif text-lg font-bold text-[#3F1F4D]">{prin.title}</h3>
              <p className="text-xs sm:text-sm text-[#2F2931]/80 leading-relaxed">{prin.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#3F1F4D] text-[#FBF8F3] rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold max-w-xl mx-auto">
          Un abordaje claro desde el primer encuentro
        </h2>
        <p className="text-xs sm:text-sm text-[#EADFED]/80 max-w-lg mx-auto">
          Solicita tu primera entrevista para evaluar tu situación o la de tu familiar de forma individualizada.
        </p>
        <div>
          <a
            href={AGENDA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6E2F82] hover:bg-[#B68FC1] hover:text-[#3F1F4D] text-white text-xs font-semibold tracking-wide shadow transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>SOLICITAR PRIMERA ENTREVISTA</span>
          </a>
        </div>
      </section>
    </div>
  );
};
