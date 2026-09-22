export interface Testimonial {
  id: string;
  name: string;
  relation: string;
  category: 'neurologopedia' | 'disfagia' | 'voz' | 'miofuncional' | 'infantil';
  categoryLabel: string;
  rating: number;
  highlight: string;
  quote: string;
  outcome: string;
  modality: string;
  duration: string;
  verified: boolean;
  avatarInitial: string;
  colorAccent: string;
}

export const TESTIMONIAL_CATEGORIES = [
  { id: 'all', label: 'Todos los Testimonios' },
  { id: 'neurologopedia', label: 'Neurologopedia & Ictus' },
  { id: 'disfagia', label: 'Disfagia' },
  { id: 'voz', label: 'Voz Profesional' },
  { id: 'miofuncional', label: 'Terapia Miofuncional' },
  { id: 'infantil', label: 'Lenguaje y Familia' }
] as const;

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Mari Carmen R.',
    relation: 'Hija de paciente con Afasia post-ictus (68 años)',
    category: 'neurologopedia',
    categoryLabel: 'Neurologopedia & Ictus',
    rating: 5,
    highlight: '«Gema nos devolvió la capacidad de conectar y entendernos en casa»',
    quote:
      'Tras el ictus de mi padre estábamos perdidos y con mucha angustia. Gema no solo diseñó un plan de rehabilitación con un rigor clínico impresionante, sino que nos enseñó a toda la familia a cómo hablarle y estimularle sin frustrarle. Su paciencia, cercanía y humanidad son excepcionales.',
    outcome: 'Recuperación de la intención comunicativa y lenguaje funcional cotidiano',
    modality: 'CIMM Murcia · Presencial',
    duration: 'Rehabilitación continuada (9 meses)',
    verified: true,
    avatarInitial: 'M',
    colorAccent: '#6E2F82'
  },
  {
    id: 'test-2',
    name: 'Carlos M. S.',
    relation: 'Paciente en rehabilitación de disfagia neurógena (61 años)',
    category: 'disfagia',
    categoryLabel: 'Disfagia',
    rating: 5,
    highlight: '«Volver a comer sin miedo a atragantarme me ha devuelto la vida»',
    quote:
      'Al salir del hospital con una disfagia severa cada comida era un momento de tensión constante. Gema evaluó mi deglución minuciosamente, coordinó las texturas con espesantes y me entrenó en maniobras posturales concretas. Gracias a ella volví a compartir la mesa con mi familia con total seguridad.',
    outcome: 'Deglución segura sin complicaciones respiratorias y reintroducción de alimentos',
    modality: 'CIMM Murcia · Presencial',
    duration: 'Tratamiento intensivo y seguimiento (6 meses)',
    verified: true,
    avatarInitial: 'C',
    colorAccent: '#3F1F4D'
  },
  {
    id: 'test-3',
    name: 'Laura V.',
    relation: 'Profesora de Educación Secundaria · Problemas de voz recurrente',
    category: 'voz',
    categoryLabel: 'Voz Profesional',
    rating: 5,
    highlight: '«Terminaba cada trimestre sin voz; ahora enseño sin fatiga ni dolor»',
    quote:
      'Como docente dependía de mi voz y sufría disfonías constantes que me obligaban a parar. Con Gema entendí por fin la biomecánica vocal, corregí tensiones en cuello y laringe y aprendí recursos de proyección que uso a diario en clase. Ha sido una inversión esencial en mi salud laboral.',
    outcome: 'Voz estable, eliminación del sobreesfuerzo laríngeo y alta satisfacción',
    modality: 'Presencial & Pautas personalizadas',
    duration: '12 sesiones clínicas',
    verified: true,
    avatarInitial: 'L',
    colorAccent: '#B68FC1'
  },
  {
    id: 'test-4',
    name: 'Patricia y Andrés',
    relation: 'Padres de Mateo (7 años) · Deglución atípica y respiración oral',
    category: 'miofuncional',
    categoryLabel: 'Terapia Miofuncional',
    rating: 5,
    highlight: '«Las sesiones fueron divertidas y el cambio en su postura lingual ha sido increíble»',
    quote:
      'Nuestro ortodoncista nos recomendó acudir a logopedia antes de poner brackets. Gema conectó enseguida con Mateo; los ejercicios eran lúdicos, prácticos y fáciles de reforzar en casa. En pocos meses corrigió el empuje de la lengua al tragar y ahora respira por la nariz de forma natural.',
    outcome: 'Patrón de deglución maduro, sellado labial y éxito en el tratamiento ortodóncico',
    modality: 'CIMM Murcia · Presencial',
    duration: 'Tratamiento miofuncional (5 meses)',
    verified: true,
    avatarInitial: 'P',
    colorAccent: '#6E2F82'
  },
  {
    id: 'test-5',
    name: 'José Ignacio B.',
    relation: 'Paciente con afectación vocal y articulatoria por Parkinson (72 años)',
    category: 'neurologopedia',
    categoryLabel: 'Neurologopedia & Habla',
    rating: 5,
    highlight: '«Mis nietos y amigos vuelven a entenderme sin que tenga que repetir las cosas diez veces»',
    quote:
      'Con el avance de la enfermedad mi voz se había vuelto muy baja y monótona, y tendía a aislarme en las reuniones sociales. El entrenamiento intensivo de volumen y ritmo respiratorio con Gema me ha devuelto la seguridad para participar activamente en la vida social y familiar.',
    outcome: 'Mayor volumen de habla, articulación clara y reducción del aislamiento comunicativo',
    modality: 'CIMM Murcia · Presencial',
    duration: 'Programa intensivo de mantenimiento',
    verified: true,
    avatarInitial: 'J',
    colorAccent: '#3F1F4D'
  },
  {
    id: 'test-6',
    name: 'Sonia G.',
    relation: 'Madre de Claudia (5 años) · Retraso del lenguaje y articulación',
    category: 'infantil',
    categoryLabel: 'Lenguaje y Familia',
    rating: 5,
    highlight: '«Claudia entra feliz a cada sesión y su vocabulario se ha disparado»',
    quote:
      'Nos preocupaba mucho que a Claudia le costara hacerse entender por otros niños en el colegio. La empatía de Gema y sus materiales interactivos hicieron que para ella fuera un juego, mientras que a nosotros nos dio herramientas valiosísimas para el día a día. Estamos profundamente agradecidos.',
    outcome: 'Adquisición de fonemas diana, mejora notable de la fluidez y seguridad en el colegio',
    modality: 'CIMM Murcia · Presencial',
    duration: 'Seguimiento pedagógico y clínico (7 meses)',
    verified: true,
    avatarInitial: 'S',
    colorAccent: '#6E2F82'
  },
  {
    id: 'test-7',
    name: 'Marta C.',
    relation: 'Familiar de paciente con Daño Cerebral Adquirido · Modalidad Online',
    category: 'neurologopedia',
    categoryLabel: 'Neurologopedia Online',
    rating: 5,
    highlight: '«La modalidad online funcionó con una precisión y calidez impecables»',
    quote:
      'Vivimos en una localidad donde no hay especialistas en neurologopedia clínica. Hicimos las sesiones por videoconferencia y la preparación de cada ejercicio, el seguimiento de las tareas y el apoyo a la familia superaron con creces todas nuestras expectativas.',
    outcome: 'Progreso medible en anomia y memoria de trabajo sin necesidad de desplazamientos',
    modality: 'Online · Videoconsulta especializada',
    duration: 'Tratamiento telemático continuado',
    verified: true,
    avatarInitial: 'M',
    colorAccent: '#B68FC1'
  }
];
