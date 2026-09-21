export type PageRoute =
  | 'inicio'
  | 'sobre-mi'
  | 'servicios'
  | 'neurologopedia'
  | 'lenguaje-habla'
  | 'voz'
  | 'disfagia'
  | 'terapia-miofuncional'
  | 'lectoescritura'
  | 'como-trabajo'
  | 'preguntas-frecuentes'
  | 'contacto'
  | 'blog'
  | 'newsletter'
  | 'tienda'
  | 'aviso-legal'
  | 'privacidad'
  | 'cookies';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Neurologopedia' | 'Voz' | 'Disfagia' | 'Lenguaje Infantil' | 'Terapia Miofuncional' | 'Lectoescritura';
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  tags: string[];
  sentToNewsletter: boolean;
  newsletterSentDate?: string;
  subscribersNotifiedCount?: number;
}

export interface TherapyMaterial {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string[];
  price: number; // in euros, 0 for free
  category: 'neurologopedia' | 'lenguaje' | 'voz' | 'disfagia' | 'miofuncional' | 'lectoescritura' | 'evaluacion';
  format: 'PDF Descargable' | 'Material Imprimible' | 'Juego Terapéutico' | 'Guía Clínica';
  pages?: number;
  ageRange: string;
  imageUrl: string;
  isFeatured?: boolean;
  isFree?: boolean;
  rating?: number;
  tags: string[];
  whatsAppMsg?: string;
  downloadUrl?: string;
  createdDate?: string;
}

export interface CartItem {
  material: TherapyMaterial;
  quantity: number;
}

export interface ServiceItem {
  id: string;
  slug: PageRoute;
  name: string;
  shortTitle: string;
  summary: string;
  subtitle: string;
  description: string[];
  assessment: string;
  intervention: string;
  includes: string[];
  clinicalNotice?: string;
  iconName: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface PrincipleItem {
  title: string;
  description: string;
}
