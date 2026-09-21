export interface AttachedImage {
  id: string;
  filename: string;
  title: string;
  description: string;
  category: 'logo' | 'portrait' | 'clinic' | 'therapy' | 'material';
  path: string;
}

export const USER_ATTACHED_IMAGES = {
  logo: {
    filename: 'Mi_logo-sin fondo.png',
    path: '/Mi_logo-sin fondo.png',
    alt: 'Logotipo Oficial Gema Guirao - Neurologopeda'
  },
  portrait: {
    filename: 'ChatGPT Image 9 sept 2026, 20_11_11 (1).png',
    path: '/ChatGPT Image 9 sept 2026, 20_11_11 (1).png',
    alt: 'Gema Guirao - Neurologopeda Colegiada 30/695'
  },
  consultation: {
    filename: 'ChatGPT Image 9 sept 2026, 20_14_36.png',
    path: '/ChatGPT Image 9 sept 2026, 20_14_36.png',
    alt: 'Gema Guirao en Consulta Clínica de Neurologopedia en CIMM'
  },
  gallery: [
    {
      id: 'user-logo-transparent',
      filename: 'Mi_logo-sin fondo.png',
      path: '/Mi_logo-sin fondo.png',
      title: 'Logotipo Oficial Transparente',
      description: 'Identidad corporativa con el hemisferio cerebral, sinapsis y onda acústica.',
      category: 'logo' as const
    },
    {
      id: 'user-portrait-1',
      filename: 'ChatGPT Image 9 sept 2026, 20_11_11 (1).png',
      path: '/ChatGPT Image 9 sept 2026, 20_11_11 (1).png',
      title: 'Retrato Profesional con Distintivo',
      description: 'Gema Guirao, neurologopeda colegiada con más de 10 años de trayectoria.',
      category: 'portrait' as const
    },
    {
      id: 'user-clinic-office',
      filename: 'ChatGPT Image 9 sept 2026, 20_14_36.png',
      path: '/ChatGPT Image 9 sept 2026, 20_14_36.png',
      title: 'Gema Guirao en el Gabinete Clínico',
      description: 'Consulta presencial en CIMM Murcia equipada para la práctica clínica.',
      category: 'clinic' as const
    },
    {
      id: 'user-portrait-clean',
      filename: 'ChatGPT Image 9 sept 2026, 20_11_58.png',
      path: '/ChatGPT Image 9 sept 2026, 20_11_58.png',
      title: 'Retrato de Consulta',
      description: 'Atención personalizada en logopedia, daño neurológico y deglución.',
      category: 'portrait' as const
    },
    {
      id: 'user-portrait-alt',
      filename: 'ChatGPT Image 9 sept 2026, 20_11_11.png',
      path: '/ChatGPT Image 9 sept 2026, 20_11_11.png',
      title: 'Perfil Profesional de Neurologopedia',
      description: 'Evaluación e intervención clínica en patologías de la comunicación.',
      category: 'portrait' as const
    },
    {
      id: 'clinic-wa-1',
      filename: 'WhatsApp Image 2026-09-09 at 19.22.01 (1).jpeg',
      path: '/WhatsApp Image 2026-09-09 at 19.22.01 (1).jpeg',
      title: 'Gabinete y Espacio Asistencial',
      description: 'Instalaciones de la consulta para el tratamiento individualizado.',
      category: 'clinic' as const
    },
    {
      id: 'clinic-wa-2',
      filename: 'WhatsApp Image 2026-09-09 at 19.22.01 (2).jpeg',
      path: '/WhatsApp Image 2026-09-09 at 19.22.01 (2).jpeg',
      title: 'Atención Clínica Presencial',
      description: 'Ambiente tranquilo y acogedor para pacientes pediátricos y adultos.',
      category: 'clinic' as const
    },
    {
      id: 'clinic-wa-3',
      filename: 'WhatsApp Image 2026-09-09 at 19.22.01 (3).jpeg',
      path: '/WhatsApp Image 2026-09-09 at 19.22.01 (3).jpeg',
      title: 'Primer Plano en Consulta',
      description: 'Cercanía y empatía profesional en cada sesión de trabajo terapéutico.',
      category: 'portrait' as const
    },
    {
      id: 'clinic-wa-4',
      filename: 'WhatsApp Image 2026-09-09 at 19.22.01 (4).jpeg',
      path: '/WhatsApp Image 2026-09-09 at 19.22.01 (4).jpeg',
      title: 'Despacho de Valoración Clínica',
      description: 'Espacio adaptado para entrevistas diagnósticas y seguimiento de casos.',
      category: 'clinic' as const
    },
    {
      id: 'clinic-wa-5',
      filename: 'WhatsApp Image 2026-09-09 at 19.22.01 (5).jpeg',
      path: '/WhatsApp Image 2026-09-09 at 19.22.01 (5).jpeg',
      title: 'Mesa de Exploración y Evaluación',
      description: 'Entorno de trabajo clínico para el análisis exhaustivo de cada perfil.',
      category: 'clinic' as const
    },
    {
      id: 'clinic-wa-6',
      filename: 'WhatsApp Image 2026-09-09 at 19.22.01 (6).jpeg',
      path: '/WhatsApp Image 2026-09-09 at 19.22.01 (6).jpeg',
      title: 'Compromiso y Rigor Asistencial',
      description: 'Intervención fundamentada en evidencia científica y calidez humana.',
      category: 'portrait' as const
    },
    {
      id: 'clinic-wa-7',
      filename: 'WhatsApp Image 2026-09-09 at 19.22.01 (7).jpeg',
      path: '/WhatsApp Image 2026-09-09 at 19.22.01 (7).jpeg',
      title: 'Área de Trabajo Terapéutico',
      description: 'Espacio funcional para la rehabilitación del habla, voz y deglución.',
      category: 'clinic' as const
    },
    {
      id: 'clinic-wa-base',
      filename: 'WhatsApp Image 2026-09-09 at 19.22.01.jpeg',
      path: '/WhatsApp Image 2026-09-09 at 19.22.01.jpeg',
      title: 'Consulta de Neurologopedia CIMM',
      description: 'Ubicación presencial en el Centro de Iniciativas Municipales de Murcia.',
      category: 'clinic' as const
    },
    {
      id: 'clinic-wa-therapy-materials',
      filename: 'WhatsApp Image 2026-09-09 at 19.22.02 (1).jpeg',
      path: '/WhatsApp Image 2026-09-09 at 19.22.02 (1).jpeg',
      title: 'Materiales Terapéuticos y Fonoaudiología',
      description: 'Recursos lúdicos y clínicos como ruleta fonológica y software de estimulación.',
      category: 'material' as const
    }
  ]
};
