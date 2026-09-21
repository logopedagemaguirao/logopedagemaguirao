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
    filename: 'gema_portrait.jpg',
    path: '/images/gema_portrait.jpg',
    alt: 'Gema Guirao - Neurologopeda Colegiada 30/695'
  },
  consultation: {
    filename: 'consulta_cimm.jpg',
    path: '/images/consulta_cimm.jpg',
    alt: 'Consulta Clínica de Neurologopedia en CIMM Murcia'
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
      title: 'Gema Guirao - Neurologopeda',
      description: 'Colegiada Sanitaria Nº 30/695 con más de 10 años de experiencia clínica.',
      category: 'portrait' as const
    },
    {
      id: 'gallery-consultation',
      filename: 'consulta_cimm.jpg',
      path: '/images/consulta_cimm.jpg',
      title: 'Despacho de Valoración CIMM',
      description: 'Consulta presencial en el Centro de Iniciativas Municipales de Murcia.',
      category: 'clinic' as const
    },
    {
      id: 'gallery-espacio-intervencion',
      filename: 'espacio_intervencion.jpg',
      path: '/images/espacio_intervencion.jpg',
      title: 'Espacio de Intervención',
      description: 'Ambiente tranquilo y acogedor para pacientes pediátricos y adultos.',
      category: 'clinic' as const
    },
    {
      id: 'gallery-materiales',
      filename: 'materiales_adaptados.jpg',
      path: '/images/materiales_adaptados.jpg',
      title: 'Materiales Adaptados',
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
