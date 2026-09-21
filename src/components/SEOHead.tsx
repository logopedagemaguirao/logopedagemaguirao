import { useEffect } from 'react';
import { PageRoute } from '../types';

interface SEOProps {
  route: PageRoute;
  title?: string;
  description?: string;
}

const SEO_MAP: Record<PageRoute, { title: string; description: string }> = {
  inicio: {
    title: 'Gema Guirao - Neurologopeda | Logopedia Clínica y Neurorrehabilitación',
    description: 'Consulta especializada de logopedia y neurologopedia para niños, jóvenes y adultos. Más de 10 años de experiencia clínica personalizada en habla, lenguaje, voz y deglución.'
  },
  'sobre-mi': {
    title: 'Sobre Mí | Gema Guirao - Neurologopeda con más de 10 años de experiencia',
    description: 'Conoce la trayectoria y enfoque clínico de Gema Guirao. Atención personalizada en neurologopedia, logopedia clínica y terapia miofuncional basada en la evidencia.'
  },
  servicios: {
    title: 'Áreas de Intervención Logopédica y Neurologopédica | Gema Guirao',
    description: 'Servicios especializados en neurologopedia, lenguaje y habla, voz, disfagia, terapia miofuncional y lectoescritura para niños y adultos.'
  },
  neurologopedia: {
    title: 'Neurologopedia | Evaluación y Rehabilitación en Daño Neurológico - Gema Guirao',
    description: 'Rehabilitación del lenguaje, habla y comunicación en afasia, disartria, ictus, traumatismo craneoencefálico y enfermedades neurodegenerativas.'
  },
  'lenguaje-habla': {
    title: 'Lenguaje y Habla | Evaluación e Intervención Clínica - Gema Guirao',
    description: 'Intervención en dificultades de articulación, inteligibilidad, comprensión, expresión y organización lingüística en infancia y adultos.'
  },
  voz: {
    title: 'Terapia de Voz y Rehabilitación Vocal | Gema Guirao - Logopeda',
    description: 'Valoración funcional y terapia vocal para disfonía, fatiga vocal, sobreesfuerzo y alteraciones neurológicas de la voz. Coordinación con ORL.'
  },
  disfagia: {
    title: 'Deglución y Disfagia | Valoración Clínica de Seguridad y Eficacia - Gema Guirao',
    description: 'Atención prioritaria a la seguridad y eficacia en dificultades para tragar tras ictus, daño cerebral o patología neurológica.'
  },
  'terapia-miofuncional': {
    title: 'Terapia Miofuncional Orofacial | Respiración, Masticación y Deglución - Gema Guirao',
    description: 'Evaluación y reeducación de estructuras y funciones orofaciales: deglución atípica, respiración oral y tono muscular orofacial.'
  },
  lectoescritura: {
    title: 'Lectura y Escritura | Dificultades del Lenguaje Escrito - Gema Guirao',
    description: 'Evaluación e intervención en los procesos cognitivos y lingüísticos que sostienen la lectura, ortografía y producción escrita.'
  },
  'como-trabajo': {
    title: 'Cómo Trabajo | Proceso Clínico: Evaluar, Priorizar e Intervenir - Gema Guirao',
    description: 'Proceso asistencial transparente: Primera entrevista, evaluación logopédica, devolución, plan terapéutico individualizado y seguimiento.'
  },
  'preguntas-frecuentes': {
    title: 'Preguntas Frecuentes | Consultas sobre Logopedia y Neurologopedia - Gema Guirao',
    description: 'Respuestas a dudas habituales sobre la primera entrevista, duración de la valoración, atención a adultos, sesiones online y coordinación.'
  },
  contacto: {
    title: 'Contacto y Cita Previa | Gema Guirao - Neurologopeda',
    description: 'Solicita tu primera entrevista o consulta clínica. Atención presencial y online. Reserva directa a través de Google Calendar o formulario.'
  },
  blog: {
    title: 'Blog y Artículos Clínicos | Gema Guirao - Neurologopeda',
    description: 'Artículos, pautas prácticas y novedades clínicas de neurologopedia, deglución, habla y voz publicadas por Gema Guirao y enlazadas con su boletín.'
  },
  newsletter: {
    title: 'Blog y Boletín Clínico de Neurologopedia y Voz | Gema Guirao',
    description: 'Suscríbete al boletín mensual de Gema Guirao. Pautas prácticas para familias, ejercicios preventivos de voz y recursos en disfagia y daño cerebral.'
  },
  tienda: {
    title: 'Tienda de Materiales y Recursos Terapéuticos | Gema Guirao',
    description: 'Cuadernos de estimulación cognitiva, ruletas fonológicas, guías de disfagia y materiales de logopedia creados y testados por Gema Guirao.'
  },
  'aviso-legal': {
    title: 'Aviso Legal | Gema Guirao - Neurologopeda',
    description: 'Información legal, términos de uso e identificación de la consulta de logopedia de Gema Guirao.'
  },
  privacidad: {
    title: 'Política de Privacidad | Protección de Datos - Gema Guirao',
    description: 'Información sobre el tratamiento de datos personales y confidencialidad en el ámbito sanitario según el RGPD.'
  },
  cookies: {
    title: 'Política de Cookies | Gema Guirao - Neurologopeda',
    description: 'Información sobre el uso de cookies técnicas y analíticas en la web de Gema Guirao.'
  }
};

export const SEOHead = ({ route, title, description }: SEOProps) => {
  useEffect(() => {
    const meta = SEO_MAP[route] || SEO_MAP.inicio;
    const finalTitle = title || meta.title;
    const finalDesc = description || meta.description;

    document.title = finalTitle;

    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', finalDesc);
    }

    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', finalTitle);
    }

    const ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) {
      ogDescTag.setAttribute('content', finalDesc);
    }

    // Scroll to top upon page navigation
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [route, title, description]);

  return null;
};
