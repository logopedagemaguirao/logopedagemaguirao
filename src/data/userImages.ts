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
    path: '/images/logo_oficial.png',
    alt: 'Logotipo Oficial Gema Guirao - Neurologopeda'
  },
  portrait: {
    filename: 'ChatGPT Image 9 sept 2026, 20_14_36.png',
    path: '/images/consulta_cimm.png',
    alt: 'Gema Guirao - Neurologopeda Colegiada en Intervención Clínica'
  },
  consultation: {
    filename: 'ChatGPT Image 9 sept 2026, 19_45_17.png',
    path: '/images/gema_profesional.png',
    alt: 'Gema Guirao - Atención e Intervención Clínica'
  },
  gemaProfesional: {
    filename: 'ChatGPT Image 9 sept 2026, 20_11_11.png',
    path: '/images/gema_portrait.png',
    alt: 'Gema Guirao - Neurologopeda Colegiada 30/695'
  },
  gemaWhatsapp: {
    filename: 'WhatsApp Image 2026-09-09 at 19.07.21.jpeg',
    path: '/images/gema_whatsapp.jpg',
    alt: 'Gema Guirao - Ejercicio Sanitario Asistencial'
  },
  despachoGema: {
    filename: 'despacho_cimm_murcia.jpg',
    path: '/images/despacho_cimm_murcia.jpg',
    alt: 'Despacho de Consulta y Trabajo Clínico CIMM Murcia'
  },
  espacioIntervencion: {
    filename: 'espacio_intervencion.jpg',
    path: '/images/espacio_intervencion.jpg',
    alt: 'Espacio de Intervención y Rehabilitación Fonoaudiológica'
  },
  materialesAdaptados: {
    filename: 'materiales_adaptados.jpg',
    path: '/images/materiales_adaptados.jpg',
    alt: 'Materiales Terapéuticos Adaptados y Fonoaudiología'
  },
  diagnosticoSeguimiento: {
    filename: 'diagnostico_seguimiento.jpg',
    path: '/images/diagnostico_seguimiento.jpg',
    alt: 'Diagnóstico y Seguimiento Clínico de Neurologopedia'
  },
  gallery: [
    {
      id: 'gallery-portrait',
      filename: 'ChatGPT Image 9 sept 2026, 20_14_36.png',
      path: '/images/consulta_cimm.png',
      title: 'Gema Guirao - Neurologopeda Colegiada',
      description: 'Colegiada Sanitaria Nº 30/695 con más de 10 años de experiencia clínica especializada.',
      category: 'portrait' as const
    },
    {
      id: 'gallery-consultation',
      filename: 'ChatGPT Image 9 sept 2026, 19_45_17.png',
      path: '/images/gema_profesional.png',
      title: 'Atención e Intervención con Pacientes',
      description: 'Sesión clínica de neurorrehabilitación cognitiva y de la comunicación en CIMM Murcia.',
      category: 'clinic' as const
    },
    {
      id: 'gallery-profesional',
      filename: 'ChatGPT Image 9 sept 2026, 20_11_11.png',
      path: '/images/gema_portrait.png',
      title: 'Gema Guirao - Práctica Clínica',
      description: 'Enfoque terapéutico individualizado, cercano y basado en evidencia científica.',
      category: 'clinic' as const
    },
    {
      id: 'gallery-despacho',
      filename: 'despacho_cimm_murcia.jpg',
      path: '/images/despacho_cimm_murcia.jpg',
      title: 'Despacho de Consulta CIMM Murcia',
      description: 'Espacio de trabajo presencial adaptado para valoración personalizada y seguimiento.',
      category: 'clinic' as const
    },
    {
      id: 'gallery-materiales',
      filename: 'materiales_adaptados.jpg',
      path: '/images/materiales_adaptados.jpg',
      title: 'Materiales Logopédicos',
      description: 'Recursos lúdicos y clínicos para articulación, deglución y lectoescritura.',
      category: 'material' as const
    }
  ]
};
