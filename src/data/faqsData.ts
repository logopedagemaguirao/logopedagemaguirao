import { FaqItem } from '../types';

export const FAQS: FaqItem[] = [
  {
    id: 'primera-entrevista',
    question: '¿En qué consiste la primera entrevista?',
    answer:
      'Se revisan el motivo de consulta, los antecedentes relevantes, la evolución de la dificultad, la repercusión en la vida diaria y los objetivos de la persona o la familia. A partir de esa información se decide si es necesaria una valoración específica y qué áreas conviene explorar.'
  },
  {
    id: 'duracion-valoracion',
    question: '¿La valoración se realiza en una sola sesión?',
    answer:
      'Depende de la complejidad del caso, la edad, la tolerancia y las áreas que sea necesario explorar. Algunas valoraciones pueden completarse en una sesión y otras requieren varias.'
  },
  {
    id: 'atencion-adultos',
    question: '¿Se atiende a adultos?',
    answer:
      'Sí. Se trabaja con población infantil, joven y adulta, incluyendo alteraciones neurológicas adquiridas y dificultades de voz o deglución.'
  },
  {
    id: 'atencion-online',
    question: '¿Hay atención online?',
    answer:
      'Sí, cuando el tipo de intervención y las características del caso permiten una atención telemática adecuada. Determinadas exploraciones requieren presencialidad.'
  },
  {
    id: 'informes',
    question: '¿Se realizan informes?',
    answer:
      'Cuando procede, pueden elaborarse informes de valoración o seguimiento con los resultados relevantes, la interpretación clínica y las recomendaciones.'
  },
  {
    id: 'coordinacion',
    question: '¿Se coordina el tratamiento con otros profesionales?',
    answer:
      'Sí, cuando es necesario para el caso y con las autorizaciones correspondientes. La coordinación puede ser especialmente importante en disfagia, voz, motricidad orofacial, neurologopedia y dificultades del desarrollo.'
  },
  {
    id: 'ubicacion-consulta',
    question: '¿Dónde se encuentra la consulta presencial y cómo contactar?',
    answer:
      'La consulta presencial se encuentra ubicada en el CIMM (Centro de Iniciativas Municipales de Murcia), en Carretera de Churra, 96, 30007 Santiago y Zaraíche, Murcia. También disponemos de atención telemática online y puedes contactar directamente en el teléfono 624 71 83 69 o por WhatsApp.'
  }
];

export const WORK_STEPS = [
  {
    number: '01',
    title: 'Primera entrevista',
    description: 'Recogida de historia clínica, motivo de consulta, necesidades actuales y objetivos.'
  },
  {
    number: '02',
    title: 'Evaluación logopédica',
    description: 'Exploración estructurada de las áreas implicadas y análisis funcional del desempeño.'
  },
  {
    number: '03',
    title: 'Plan de intervención',
    description: 'Definición de objetivos prioritarios, frecuencia y estrategias terapéuticas.'
  },
  {
    number: '04',
    title: 'Seguimiento',
    description: 'Revisión periódica de objetivos y adaptación de la intervención según la evolución.'
  }
];

export const WORK_PRINCIPLES = [
  {
    title: 'Objetivos funcionales',
    description: 'Se priorizan cambios que puedan trasladarse a la vida diaria, no únicamente el rendimiento dentro de la sesión.'
  },
  {
    title: 'Coordinación',
    description: 'Cuando resulta necesario, el abordaje se integra con la información de otros profesionales sanitarios o educativos.'
  },
  {
    title: 'Seguimiento',
    description: 'La evolución se revisa periódicamente para mantener, modificar o cerrar objetivos.'
  },
  {
    title: 'Familia y entorno',
    description: 'En muchos casos, entrenar estrategias con familiares o cuidadores mejora la generalización de los cambios.'
  }
];
