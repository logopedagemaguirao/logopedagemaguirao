import { TherapyMaterial } from '../types';

export const INITIAL_MATERIALS: TherapyMaterial[] = [
  {
    id: 'mat-ruleta-fonologica',
    title: 'Ruleta Fonológica y Cuaderno de Articulación Lúdica',
    subtitle: 'Discriminación auditiva, puntos articulatorios y conciencia fonológica',
    description: 'Material manipulativo y descargable compuesto por ruletas de sonido, tarjetas con pictogramas reales y hojas de registro para trabajar dificultades de habla y dislalias.',
    longDescription: [
      'Diseñado a partir del material empleado en consulta clínica presencial por Gema Guirao.',
      'Contiene 24 ruletas fonéticas clasificadas por puntos articulatorios (fonemas rotacismos /r/, sinfones, velares y palatales).',
      'Incluye 120 tarjetas con imágenes a todo color e instrucciones clínicas para familias y logopedas.',
      'Formato digital listo para imprimir, recortar y plastificar con encuadernación en espiral.'
    ],
    price: 14.50,
    category: 'lenguaje',
    format: 'Material Imprimible',
    pages: 48,
    ageRange: 'Infantil (4 a 10 años)',
    imageUrl: '/WhatsApp Image 2026-09-09 at 19.22.02 (1).jpeg',
    isFeatured: true,
    rating: 4.9,
    tags: ['Conciencia Fonológica', 'Dislalias', 'Habla Infantil', 'Imprimible'],
    createdDate: '12 Sep 2026'
  },
  {
    id: 'mat-afasia-estimulacion',
    title: 'Cuaderno de Neuroestimulación y Rehabilitación de la Afasia (Nivel I y II)',
    subtitle: 'Reactivación del léxico, denominación, fluidez semántica y comprensión',
    description: 'Programa completo de ejercicios estructurados para pacientes adultos con daño cerebral adquirido, ictus o afasias motoras y sensoriales.',
    longDescription: [
      'Estructurado en 6 bloques progresivos: denominación por confrontación visual, evocación categorial, discriminación semántica, juicio de veracidad y lectura comprensiva.',
      'Diseño limpio, tipografía de gran tamaño y alto contraste, apto para personas con déficit atencional o hemianopsia.',
      'Pautas para coterapeutas y familiares sobre cómo brindar apoyos verbales o fonéticos sin generar frustración.',
      'Hoja de seguimiento cuantitativo para medir avances semanales.'
    ],
    price: 18.00,
    category: 'neurologopedia',
    format: 'PDF Descargable',
    pages: 65,
    ageRange: 'Adultos y Tercera Edad',
    imageUrl: '/ChatGPT Image 9 sept 2026, 20_14_36.png',
    isFeatured: true,
    rating: 5.0,
    tags: ['Neurologopedia', 'Afasia', 'Ictus', 'Daño Cerebral', 'Adultos'],
    createdDate: '08 Sep 2026'
  },
  {
    id: 'mat-disfagia-guia-familias',
    title: 'Manual de Deglución Segura y Adaptación de Texturas en el Hogar',
    subtitle: 'Guía práctica ilustrada para cuidadores y familias de pacientes con disfagia',
    description: 'Guía clínica esencial para prevenir atragantamientos, neumonías aspirativas y deshidratación, con tablas de espesantes y clasificación IDDSI.',
    longDescription: [
      'Protocolo postural paso a paso: flexión cervical anterior, maniobras de deglución con esfuerzo y control de la velocidad.',
      'Tabla gráfica con ejemplos reales de alimentos seguros vs. alimentos de riesgo por textura mixta.',
      'Cómo utilizar los espesantes comerciales y conseguir texturas néctar, miel y pudin sin grumos.',
      'Hoja de signos de alerta para colgar en la cocina o junto a la mesa del paciente.'
    ],
    price: 9.90,
    category: 'disfagia',
    format: 'Guía Clínica',
    pages: 32,
    ageRange: 'Todas las edades / Cuidadores',
    imageUrl: '/WhatsApp Image 2026-09-09 at 19.22.01 (4).jpeg',
    isFeatured: false,
    rating: 4.8,
    tags: ['Disfagia', 'Deglución Segura', 'Nutrición', 'Cuidadores'],
    createdDate: '01 Sep 2026'
  },
  {
    id: 'mat-higiene-vocal-docentes',
    title: 'Kit de Entrenamiento y Salud Vocal para Docentes y Oradores',
    subtitle: 'Rutinas de calentamiento vocal en 5 minutos, relajación laríngea y diario acústico',
    description: 'Manual intensivo de técnica vocal aplicado al esfuerzo docente. Ejercicios con tracto vocal semiocluido (tubos de resonancia), hidratación y proyección sin sobreesfuerzo.',
    longDescription: [
      'Audio-guías descargables y fichas visuales para realizar en el coche o antes de entrar al aula.',
      'Técnicas con pajita o tubo Lax Vox para resetear la tensión cordal y aliviar la sensación de bolo faríngeo.',
      'Diario de registro de fatiga vocal semanal para identificar picos de sobreesfuerzo.',
      'Apto para maestros de infantil, secundaria, cantantes y opositores.'
    ],
    price: 12.00,
    category: 'voz',
    format: 'PDF Descargable',
    pages: 36,
    ageRange: 'Adultos / Profesionales de la Voz',
    imageUrl: '/WhatsApp Image 2026-09-09 at 19.22.01 (7).jpeg',
    isFeatured: false,
    rating: 4.9,
    tags: ['Voz', 'Docentes', 'Disfonía', 'Tracto Vocal Semiocluido'],
    createdDate: '25 Ago 2026'
  },
  {
    id: 'mat-terapia-miofuncional-respiracion',
    title: 'Cuaderno de Praxias y Reeducación de la Respiración Oral y Deglución Atípica',
    subtitle: 'Fichas ilustradas para sellado labial, postura lingual de reposo y tono perioral',
    description: 'Material visual motivador para niños y adolescentes con deglución disfuncional, respiración bucal, interposición lingual o en tratamiento ortodóncico.',
    longDescription: [
      '40 ejercicios con ilustraciones claras para tono de maseteros, orbicular de los labios y ápice lingual.',
      'Tabla de retos diarios con pegatinas y marcadores de logro.',
      'Pautas de coordinación con odontopediatras y ortodoncistas para consolidar resultados estables.',
      'Incluye versión para imprimir y versión interactiva para tableta.'
    ],
    price: 11.50,
    category: 'miofuncional',
    format: 'Material Imprimible',
    pages: 44,
    ageRange: 'Infantil y Juvenil (5 a 16 años)',
    imageUrl: '/WhatsApp Image 2026-09-09 at 19.22.01 (1).jpeg',
    isFeatured: false,
    rating: 4.7,
    tags: ['Terapia Miofuncional', 'Respiración Oral', 'Deglución Atípica', 'Ortodoncia'],
    createdDate: '18 Ago 2026'
  },
  {
    id: 'mat-guia-gratuita-registro-habla',
    title: 'Plantilla Clínica de Registro de Articulación y Observación del Lenguaje',
    subtitle: 'Recurso gratuito de bienvenida para profesionales y familias',
    description: 'Protocolo rápido de cribado de puntos de articulación, inteligibilidad y repertorio léxico en edad preescolar y escolar.',
    longDescription: [
      'Cuadro sinóptico con edades cronológicas de adquisición fonológica estándar en castellano.',
      'Lista de verificación de errores articulatorios: sustitución, omisión, distorsión y adición.',
      'Plantilla imprimible en PDF con espacio para observaciones y firma del evaluador.'
    ],
    price: 0,
    isFree: true,
    category: 'evaluacion',
    format: 'Guía Clínica',
    pages: 12,
    ageRange: 'Todas las edades',
    imageUrl: '/WhatsApp Image 2026-09-09 at 19.22.01 (2).jpeg',
    isFeatured: false,
    rating: 5.0,
    tags: ['Gratuito', 'Evaluación', 'Cribado', 'Profesionales'],
    createdDate: '10 Ago 2026'
  }
];

export const MATERIAL_CATEGORIES = [
  { id: 'all', label: 'Todos los Materiales', icon: '✨' },
  { id: 'neurologopedia', label: 'Neurologopedia y Daño Cerebral', icon: '🧠' },
  { id: 'lenguaje', label: 'Lenguaje y Habla Infantil', icon: '🎨' },
  { id: 'disfagia', label: 'Disfagia', icon: '🥣' },
  { id: 'voz', label: 'Voz y Técnica Vocal', icon: '🎙️' },
  { id: 'miofuncional', label: 'Terapia Miofuncional', icon: '👅' },
  { id: 'evaluacion', label: 'Evaluación y Recursos Gratuitos', icon: '📋' }
];
