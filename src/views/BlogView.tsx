import React, { useState } from 'react';
import { PageRoute, BlogPost } from '../types';
import { useBlog } from '../context/BlogContext';
import { BlogCard } from '../components/BlogCard';
import { BlogEditorModal } from '../components/BlogEditorModal';
import { NewsletterDispatchModal } from '../components/NewsletterDispatchModal';
import { NewsletterSection } from '../components/NewsletterSection';
import { SafeImage } from '../components/SafeImage';
import { 
  BookOpen, 
  Search, 
  PlusCircle, 
  Mail, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  Share2, 
  Users, 
  ExternalLink,
  Sparkles,
  MessageCircle,
  Linkedin,
  Facebook
} from 'lucide-react';

interface BlogViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onNavigate }) => {
  const { 
    posts, 
    activePost, 
    setActivePost, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    openEditor,
    openNewsletterModal,
    totalSubscribers,
    campaigns
  } = useBlog();

  const [shareSuccess, setShareSuccess] = useState(false);

  const categories = [
    'Todos',
    'Neurologopedia',
    'Voz',
    'Disfagia',
    'Lenguaje Infantil',
    'Terapia Miofuncional'
  ];

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleShare = (network?: 'whatsapp' | 'linkedin' | 'facebook') => {
    if (!activePost) return;
    const url = window.location.href;
    const text = `Te recomiendo este artículo de Gema Guirao: "${activePost.title}"`;

    if (network === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${text} - ${url}`)}`, '_blank');
    } else if (network === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (network === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else {
      navigator.clipboard.writeText(url);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  return (
    <div id="blog-page-view" className="space-y-16 py-8">
      {/* Blog Editor Modal & Dispatch Modal */}
      <BlogEditorModal />
      <NewsletterDispatchModal />

      {/* Breadcrumb navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#6E2F82] mb-3">
          <button 
            type="button"
            onClick={() => {
              setActivePost(null);
              onNavigate('inicio');
            }}
            className="hover:underline text-[#3F1F4D] cursor-pointer"
          >
            Inicio
          </button>
          <span>/</span>
          {activePost ? (
            <>
              <button 
                type="button"
                onClick={() => setActivePost(null)}
                className="hover:underline text-[#6E2F82] cursor-pointer"
              >
                Blog
              </button>
              <span>/</span>
              <span className="text-[#3F1F4D] truncate max-w-xs">{activePost.title}</span>
            </>
          ) : (
            <span className="text-[#6E2F82]">Blog Clínico & Newsletter</span>
          )}
        </div>

        {!activePost && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADFED]/80 text-xs font-semibold text-[#6E2F82]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>DIVULGACIÓN Y ACTUALIDAD CLÍNICA</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3F1F4D] tracking-tight">
                Blog de Logopedia y Neurologopedia
              </h1>
              <p className="text-base sm:text-lg text-[#2F2931]/80 leading-relaxed">
                Artículos profesionales, pautas prácticas para familias y cuidadores, y recursos clínicos elaborados por <strong>Gema Guirao</strong>. Todo lo publicado aquí se enlaza directamente con nuestra Newsletter mensual.
              </p>
            </div>

            {/* Quick Actions: Write post & Newsletter stats */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openEditor()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white text-xs font-bold tracking-wide shadow-sm transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-[#EADFED]" />
                <span>Redactar nuevo artículo</span>
              </button>

              <div className="px-4 py-2.5 rounded-xl bg-white border border-[#EADFED] text-xs text-[#3F1F4D] flex items-center gap-2 shadow-2xs">
                <Users className="w-4 h-4 text-[#6E2F82]" />
                <span><strong>{totalSubscribers}</strong> suscriptores conectados</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SINGLE ARTICLE READING VIEW */}
      {activePost ? (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left animate-in fade-in duration-300">
          <button
            type="button"
            onClick={() => setActivePost(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#6E2F82] hover:text-[#3F1F4D] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al índice de artículos del blog</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#EADFED] text-[#6E2F82] font-bold">
                {activePost.category}
              </span>
              <span className="flex items-center gap-1 text-[#2F2931]/60">
                <Calendar className="w-3.5 h-3.5 text-[#B68FC1]" />
                <span>{activePost.date}</span>
              </span>
              <span className="flex items-center gap-1 text-[#2F2931]/60">
                <Clock className="w-3.5 h-3.5 text-[#B68FC1]" />
                <span>{activePost.readTime}</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3F1F4D] leading-tight">
              {activePost.title}
            </h1>

            <p className="text-base sm:text-xl text-[#2F2931]/80 font-serif italic border-l-3 border-[#6E2F82] pl-4 py-1">
              {activePost.excerpt}
            </p>

            {/* Newsletter dispatch status indicator */}
            <div className="p-4 rounded-2xl bg-[#F5ECDF]/70 border border-[#B68FC1]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#3F1F4D]">
                <Send className="w-4 h-4 text-[#6E2F82]" />
                <span>
                  {activePost.sentToNewsletter ? (
                    <>
                      Este artículo ha sido <strong>enviado a los {activePost.subscribersNotifiedCount || totalSubscribers} suscriptores</strong> de la Newsletter de Gema Guirao.
                    </>
                  ) : (
                    <>Artículo pendiente de enviar a los suscriptores de la Newsletter.</>
                  )}
                </span>
              </div>
              <button
                type="button"
                onClick={() => openNewsletterModal(activePost)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EADFED] text-[#6E2F82] hover:bg-[#EADFED] font-semibold text-[11px] shrink-0 cursor-pointer shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Ver plantilla de envío</span>
              </button>
            </div>
          </div>

          {/* Article Image */}
          {activePost.imageUrl && (
            <div className="rounded-3xl overflow-hidden aspect-[16/9] border border-[#EADFED] shadow-sm">
              <SafeImage
                src={activePost.imageUrl}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Body Content */}
          <div className="prose prose-purple max-w-none text-[#2F2931] space-y-6 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
            {activePost.content}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-[#EADFED] flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#3F1F4D] mr-2">Temas clínicos:</span>
            {activePost.tags.map((tag, idx) => (
              <span key={idx} className="text-xs px-3 py-1 rounded-lg bg-white border border-[#EADFED] text-[#6E2F82]">
                #{tag}
              </span>
            ))}
          </div>

          {/* Social Share & Author Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Author */}
            <div className="p-6 rounded-2xl bg-[#FBF8F3] border border-[#EADFED] flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#EADFED] flex items-center justify-center font-serif font-bold text-xl text-[#6E2F82] border-2 border-[#B68FC1]/40 shrink-0">
                GG
              </div>
              <div>
                <p className="font-serif font-bold text-base text-[#3F1F4D]">{activePost.author}</p>
                <p className="text-xs text-[#6E2F82] font-semibold">Neurologopeda · Colegiada Nº 30/695</p>
                <p className="text-[11px] text-[#2F2931]/70 mt-1">Especialista en neurorrehabilitación, disfagia y voz clínica.</p>
              </div>
            </div>

            {/* Share buttons */}
            <div className="p-6 rounded-2xl bg-white border border-[#EADFED] flex flex-col justify-between space-y-3">
              <p className="text-xs font-bold text-[#3F1F4D] uppercase tracking-wider">
                Compartir este artículo clínico:
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShare('whatsapp')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366]/10 text-[#075e54] text-xs font-semibold hover:bg-[#25D366]/20 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleShare('linkedin')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0077b5]/10 text-[#0077b5] text-xs font-semibold hover:bg-[#0077b5]/20 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleShare('facebook')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1877f2]/10 text-[#1877f2] text-xs font-semibold hover:bg-[#1877f2]/20 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleShare()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{shareSuccess ? '¡Enlace copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Inline Newsletter Callout inside the article */}
          <div className="pt-8">
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#F5ECDF] via-[#EADFED]/60 to-[#F5ECDF] border border-[#B68FC1]/40 text-center space-y-4">
              <span className="text-xs font-bold tracking-widest text-[#6E2F82] uppercase">
                NEWSLETTER CLÍNICA MENSUAL
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#3F1F4D]">
                ¿Quieres recibir los nuevos artículos del blog directamente en tu email?
              </h3>
              <p className="text-xs sm:text-sm text-[#2F2931]/80 max-w-lg mx-auto">
                Sin spam, solo divulgación rigurosa, pautas de intervención y novedades de la consulta de Gema Guirao.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActivePost(null);
                  const el = document.getElementById('newsletter-subscription-box');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6E2F82] text-white text-xs font-bold hover:bg-[#3F1F4D] transition-all cursor-pointer shadow-sm"
              >
                <Mail className="w-4 h-4 text-[#EADFED]" />
                <span>Suscribirme a la Newsletter</span>
              </button>
            </div>
          </div>
        </article>
      ) : (
        /* BLOG INDEX VIEW WITH FILTERS AND ARTICLES GRID */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Search bar & Category filters */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#6E2F82] text-white shadow-xs'
                        : 'bg-white border border-[#EADFED] text-[#2F2931]/80 hover:bg-[#FBF8F3]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar artículos o temas..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#EADFED] bg-white text-xs text-[#2F2931] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6E2F82]"
                />
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onRead={(p) => {
                    setActivePost(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#EADFED] p-8 space-y-3">
              <p className="text-sm font-semibold text-[#3F1F4D]">
                No se han encontrado artículos con ese criterio de búsqueda.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-[#6E2F82] hover:underline"
              >
                Restablecer filtros y ver todos
              </button>
            </div>
          )}

          {/* Linked Newsletter System Showcase */}
          <div className="border-t border-[#EADFED] pt-12">
            <div className="bg-[#3F1F4D] text-[#FBF8F3] rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden text-left space-y-6">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6E2F82]/60 text-xs font-semibold text-[#EADFED]">
                  <Send className="w-3.5 h-3.5" />
                  <span>Sincronización Automática Blog & Newsletter</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                  Cada nuevo artículo del blog se envía a la comunidad de suscriptores
                </h2>
                <p className="text-xs sm:text-sm text-[#EADFED]/85 leading-relaxed">
                  Gema Guirao redacta y sube nuevos contenidos sobre neurologopedia, disfagia y voz. Al publicarse, se enlaza directamente con la base de datos de suscriptores para que reciban la entrega en su bandeja de entrada sin spam ni intermediarios.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#6E2F82]/30 border border-[#EADFED]/20">
                  <p className="text-2xl font-bold font-serif text-white">{totalSubscribers}</p>
                  <p className="text-xs text-[#EADFED]/80">Suscriptores activos</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#6E2F82]/30 border border-[#EADFED]/20">
                  <p className="text-2xl font-bold font-serif text-white">{posts.length}</p>
                  <p className="text-xs text-[#EADFED]/80">Artículos publicados</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#6E2F82]/30 border border-[#EADFED]/20">
                  <p className="text-2xl font-bold font-serif text-white">{campaigns.length}</p>
                  <p className="text-xs text-[#EADFED]/80">Entregas enviadas</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Newsletter Subscription Hero / Box */}
      <div id="newsletter-subscription-box" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterSection onNavigate={onNavigate} variant="full" />
      </div>
    </div>
  );
};
