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
    filename: 'logo_oficial.jpg',
    path: '/images/logo_oficial.jpg',
    alt: 'Logotipo Oficial Gema Guirao - Neurologopeda'
  },
  portrait: {
    filename: 'gema_portrait.jpg',
    path: '/images/gema_portrait.jpg',
    alt: 'Gema Guirao - Neurologopeda Colegiada 30/695'
  },
  consultation: {
    filename: 'consulta_cimm.jpg',
    path: '/images/consulta_cimm.jpg',
    alt: 'Gema Guirao en Consulta Clínica de Neurologopedia en CIMM Murcia'
  },
  despachoGema: {
    filename: 'despacho_gema.jpg',
    path: '/images/despacho_gema.jpg',
    alt: 'Gema Guirao en su Gabinete de Consulta y Trabajo Clínico'
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
      filename: 'gema_portrait.jpg',
      path: '/images/gema_portrait.jpg',
      title: 'Gema Guirao - Neurologopeda Colegiada',
      description: 'Colegiada Sanitaria Nº 30/695 con más de 10 años de experiencia clínica especializada.',
      category: 'portrait' as const
    },
    {
      id: 'gallery-consultation',
      filename: 'consulta_cimm.jpg',
      path: '/images/consulta_cimm.jpg',
      title: 'Atención e Intervención con Pacientes',
      description: 'Sesión clínica de neurorrehabilitación cognitiva y de la comunicación en CIMM Murcia.',
      category: 'clinic' as const
    },
    {
      id: 'gallery-despacho',
      filename: 'despacho_gema.jpg',
      path: '/images/despacho_gema.jpg',
      title: 'Gabinete y Planificación Asistencial',
      description: 'Espacio de trabajo presencial adaptado para valoración personalizada y seguimiento.',
      category: 'portrait' as const
    },
    {
      id: 'gallery-espacio-intervencion',
      filename: 'espacio_intervencion.jpg',
      path: '/images/espacio_intervencion.jpg',
      title: 'Espacio de Intervención CIMM',
      description: 'Ambiente tranquilo y acogedor para pacientes pediátricos y adultos.',
      category: 'clinic' as const
    },
    {
      id: 'gallery-materiales',
      filename: 'materiales_adaptados.jpg',
      path: '/images/materiales_adaptados.jpg',
      title: 'Materiales Adaptados y Fonoaudiología',
      description: 'Recursos lúdicos y clínicos para articulación, deglución y lectoescritura.',
      category: 'material' as const
    },
    {
      id: 'gallery-diagnostico',
      filename: 'diagnostico_seguimiento.jpg',
      path: '/images/diagnostico_seguimiento.jpg',
      title: 'Diagnóstico y Seguimiento',
      description: 'Evaluación rigurosa basada en evidencia y protocolos científicos.',
      category: 'clinic' as const
    }
  ]
};
