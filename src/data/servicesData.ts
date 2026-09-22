import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'neurologopedia',
    slug: 'neurologopedia',
    name: 'Neurologopedia',
    shortTitle: 'Neurologopedia',
    summary:
      'Evaluación y rehabilitación de alteraciones de la comunicación, el lenguaje y el habla asociadas a daño neurológico adquirido o enfermedad neurológica.',
    subtitle:
      'Evaluación y rehabilitación de la comunicación, el lenguaje y el habla cuando existe afectación neurológica.',
    description: [
      'Se dirige a personas con alteraciones adquiridas del lenguaje, el habla o la comunicación asociadas a lesiones o enfermedades del sistema nervioso.',
      'El perfil puede variar ampliamente según la localización y extensión de la afectación, la evolución clínica y las capacidades preservadas.'
    ],
    assessment:
      'La evaluación puede explorar comprensión, expresión, denominación, repetición, lectura, escritura, inteligibilidad, control motor del habla y comunicación funcional, seleccionando las tareas según el motivo de consulta.',
    intervention:
      'La intervención puede orientarse a recuperar funciones alteradas, potenciar capacidades conservadas, entrenar estrategias compensatorias y mejorar la comunicación en actividades de la vida diaria.',
    includes: [
      'Afasia',
      'Disartria',
      'Daño cerebral adquirido',
      'Ictus',
      'Parkinson',
      'Esclerosis múltiple',
      'Enfermedades neurodegenerativas',
      'Alteraciones cognitivo-comunicativas',
      'Estrategias de comunicación con familiares'
    ],
    clinicalNotice:
      'En patología neurológica, la intervención se coordina activamente con neurología, medicina física y rehabilitación, neuropsicología y el equipo terapéutico global.',
    iconName: 'Brain'
  },
  {
    id: 'lenguaje-habla',
    slug: 'lenguaje-habla',
    name: 'Lenguaje y habla',
    shortTitle: 'Lenguaje y habla',
    summary:
      'Evaluación e intervención en dificultades de articulación, inteligibilidad, comprensión, expresión y organización lingüística.',
    subtitle:
      'Evaluación e intervención en dificultades de comprensión, expresión, articulación e inteligibilidad.',
    description: [
      'Esta área incluye perfiles evolutivos y adquiridos en los que pueden verse afectadas la organización fonológica, el vocabulario, la morfosintaxis, el discurso, la articulación o la inteligibilidad.',
      'Se atiende tanto el desarrollo comunicativo en etapas infantiles como dificultades persistentes en etapas posteriores.'
    ],
    assessment:
      'La valoración analiza el lenguaje en diferentes niveles y situaciones, teniendo en cuenta la edad, el desarrollo, el contexto y la repercusión funcional.',
    intervention:
      'El tratamiento se diseña a partir del perfil obtenido, priorizando objetivos que favorezcan una comunicación más eficaz y generalizable a contextos cotidianos.',
    includes: [
      'Desarrollo del lenguaje',
      'Fonología',
      'Articulación',
      'Vocabulario',
      'Morfosintaxis',
      'Discurso',
      'Inteligibilidad'
    ],
    iconName: 'MessageSquare'
  },
  {
    id: 'voz',
    slug: 'voz',
    name: 'Voz',
    shortTitle: 'Voz',
    summary:
      'Evaluación funcional y terapia vocal en alteraciones de la calidad, intensidad, tono, resistencia o coordinación fonorrespiratoria.',
    subtitle:
      'Valoración funcional e intervención en alteraciones de la calidad, resistencia y eficiencia vocal.',
    description: [
      'Las alteraciones vocales pueden manifestarse como ronquera, fatiga, esfuerzo, pérdida de intensidad, cambios de tono o dificultades para sostener el uso profesional o cotidiano de la voz.',
      'La terapia aborda de manera integral la fisiología de la fonación y los patrones de demanda acústica habituales.'
    ],
    assessment:
      'La valoración logopédica puede incluir análisis perceptivo, coordinación respiración-fonación, hábitos vocales, demanda comunicativa y, cuando procede, parámetros acústicos.',
    intervention:
      'La terapia vocal busca mejorar la eficiencia fonatoria, reducir conductas de sobreesfuerzo, optimizar la coordinación respiratoria y favorecer hábitos de higiene vocal.',
    includes: [
      'Disfonía',
      'Fatiga vocal',
      'Sobreesfuerzo',
      'Alteraciones del tono',
      'Alteraciones de intensidad',
      'Voz profesional',
      'Alteraciones neurológicas de la voz'
    ],
    clinicalNotice:
      'La exploración médica otorrinolaringológica es fundamental cuando existe sospecha de lesión laríngea.',
    iconName: 'Mic'
  },
  {
    id: 'disfagia',
    slug: 'disfagia',
    name: 'Disfagia',
    shortTitle: 'Disfagia',
    summary:
      'Valoración clínica e intervención en dificultades para tragar, atendiendo especialmente a la seguridad, eficacia y funcionalidad de la deglución.',
    subtitle:
      'Valoración clínica e intervención en dificultades para tragar con atención prioritaria a la seguridad y la eficacia.',
    description: [
      'La disfagia puede comprometer la seguridad de la vía aérea y/o la eficacia del transporte del bolo.',
      'Puede aparecer en enfermedades neurológicas, tras daño cerebral, en procesos estructurales o en otros cuadros clínicos.'
    ],
    assessment:
      'La valoración clínica examina antecedentes, signos de alarma, estado oromotor, manejo de secreciones y desempeño durante la deglución. Cuando la situación lo requiere, deben considerarse pruebas instrumentales y valoración médica.',
    intervention:
      'El abordaje puede incluir medidas compensatorias, adaptación de la forma de ingesta, entrenamiento de estrategias y ejercicios específicos cuando estén indicados para el perfil funcional.',
    includes: [
      'Disfagia neurológica',
      'Alteraciones tras ictus',
      'Enfermedades neurodegenerativas',
      'Seguridad de la deglución',
      'Eficacia de la deglución',
      'Estrategias compensatorias',
      'Rehabilitación deglutoria'
    ],
    clinicalNotice:
      'Aviso clínico importante: La disfagia requiere especial atención por sus posibles complicaciones respiratorias y nutricionales. La información de esta web no sustituye una valoración clínica.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'terapia-miofuncional',
    slug: 'terapia-miofuncional',
    name: 'Terapia miofuncional',
    shortTitle: 'Terapia miofuncional',
    summary:
      'Evaluación de estructuras y funciones orofaciales relacionadas con respiración, masticación, deglución, habla y equilibrio muscular orofacial.',
    subtitle:
      'Evaluación de estructuras y funciones orofaciales relacionadas con respiración, masticación, deglución y habla.',
    description: [
      'El sistema estomatognático participa en funciones coordinadas como respiración, masticación, deglución y articulación.',
      'Las alteraciones funcionales pueden coexistir con cambios estructurales o adaptaciones orofaciales.'
    ],
    assessment:
      'La exploración considera postura y movilidad de labios, lengua, mandíbula, paladar y musculatura facial, además de las funciones de respiración, masticación y deglución.',
    intervention:
      'Entrenamiento de la musculatura orofacial, reeducación de patrones de deglución y respiración funcional, y coordinación de la motricidad implicada en las funciones orales cotidianas.',
    includes: [
      'Respiración oral',
      'Postura lingual',
      'Masticación',
      'Deglución',
      'Funciones orofaciales',
      'Coordinación muscular'
    ],
    iconName: 'Activity'
  },
  {
    id: 'lectoescritura',
    slug: 'lectoescritura',
    name: 'Lectura y escritura',
    shortTitle: 'Lectura y escritura',
    summary:
      'Evaluación de los procesos implicados en el lenguaje escrito e intervención según el perfil lingüístico y cognitivo de cada persona.',
    subtitle:
      'Evaluación e intervención en los procesos que sostienen el lenguaje escrito.',
    description: [
      'Las dificultades del lenguaje escrito pueden afectar a la precisión, la fluidez, la comprensión, la ortografía o la producción escrita, y deben analizarse atendiendo a los procesos específicos implicados.',
      'La intervención se enfoca en desgranar los componentes de acceso al léxico y de razonamiento lingüístico.'
    ],
    assessment:
      'La valoración puede explorar reconocimiento de palabras, rutas de lectura, comprensión, procesamiento fonológico, ortografía, escritura al dictado y producción escrita.',
    intervention:
      'Diseño de tareas dirigidas a fortalecer el procesamiento fonológico, la fluidez lectora, las estrategias de comprensión textual y la organización del discurso escrito.',
    includes: [
      'Lectura',
      'Escritura',
      'Comprensión lectora',
      'Procesamiento fonológico',
      'Ortografía',
      'Producción escrita'
    ],
    iconName: 'BookOpen'
  }
];
