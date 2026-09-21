import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { BlogPost } from '../types';
import { X, Send, Sparkles, Image as ImageIcon, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';

export const BlogEditorModal: React.FC = () => {
  const { isEditorOpen, closeEditor, savePost, totalSubscribers } = useBlog();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<BlogPost['category']>('Neurologopedia');
  const [imageUrl, setImageUrl] = useState('');
  const [readTime, setReadTime] = useState('4 min de lectura');
  const [tagsInput, setTagsInput] = useState('Neurologopedia, Pautas clínicas');
  const [sendToNewsletter, setSendToNewsletter] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isEditorOpen) return null;

  const categories: BlogPost['category'][] = [
    'Neurologopedia',
    'Voz',
    'Disfagia',
    'Lenguaje Infantil',
    'Terapia Miofuncional',
    'Lectoescritura'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError('Introduce un título para el artículo.');
      return;
    }
    if (!excerpt.trim()) {
      setFormError('Introduce un resumen breve que servirá como introducción y preview.');
      return;
    }
    if (!content.trim()) {
      setFormError('Escribe el contenido del artículo.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    savePost(
      {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        category,
        author: 'Gema Guirao',
        authorRole: 'Neurologopeda Col. 30/695',
        date: new Date().toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        readTime: readTime.trim() || '4 min de lectura',
        imageUrl: imageUrl.trim() || undefined,
        tags: tags.length > 0 ? tags : ['Logopedia', category],
        sentToNewsletter: sendToNewsletter
      },
      undefined,
      sendToNewsletter
    );

    // Reset and close
    setTitle('');
    setExcerpt('');
    setContent('');
    setImageUrl('');
    setTagsInput('');
  };

  return (
    <div
      id="blog-editor-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={closeEditor}
    >
      <div
        id="blog-editor-modal"
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#EADFED] my-8 text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#FBF8F3] border-b border-[#EADFED] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#EADFED] text-[#6E2F82] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
                Redactar Nuevo Artículo para el Blog
              </h2>
              <p className="text-xs text-[#2F2931]/70">
                Publica en la web y difunde a los suscriptores de la Newsletter
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeEditor}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {formError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
              Título del artículo <span className="text-[#6E2F82]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Nuevas pautas de estimulación del lenguaje en casa"
              className="w-full px-4 py-2.5 rounded-xl border border-[#EADFED] text-sm text-[#2F2931] focus:ring-2 focus:ring-[#6E2F82]"
            />
          </div>

          {/* Category & Read time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
                Categoría clínica
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BlogPost['category'])}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADFED] text-xs font-medium text-[#2F2931] bg-white focus:ring-2 focus:ring-[#6E2F82]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
                Tiempo estimado de lectura
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="Ej: 4 min de lectura"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:ring-2 focus:ring-[#6E2F82]"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
              Resumen breve / Entradilla <span className="text-[#6E2F82]">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Breve párrafo introductorio que enganche a los lectores y servirá de vista previa en el correo de la newsletter."
              className="w-full px-4 py-2 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:ring-2 focus:ring-[#6E2F82]"
            />
          </div>

          {/* Full Content */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
              Cuerpo completo del artículo <span className="text-[#6E2F82]">*</span>
            </label>
            <textarea
              required
              rows={7}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe las pautas clínicas, explicaciones y recomendaciones. Puedes usar títulos con ### o viñetas con guiones."
              className="w-full px-4 py-3 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:ring-2 focus:ring-[#6E2F82] font-mono leading-relaxed"
            />
          </div>

          {/* Image & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
                URL de imagen de cabecera (opcional)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:ring-2 focus:ring-[#6E2F82]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
                Etiquetas (separadas por coma)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Ej: Deglución, Ictus, Familias"
                className="w-full px-3.5 py-2 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:ring-2 focus:ring-[#6E2F82]"
              />
            </div>
          </div>

          {/* Big Newsletter Connection Toggle */}
          <div className="p-4 rounded-2xl bg-[#EADFED]/60 border border-[#B68FC1]/40 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={sendToNewsletter}
                onChange={(e) => setSendToNewsletter(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-[#6E2F82] focus:ring-[#6E2F82]"
              />
              <div>
                <span className="font-bold text-xs sm:text-sm text-[#3F1F4D] flex items-center gap-1.5">
                  <Send className="w-4 h-4 text-[#6E2F82]" />
                  <span>Enlazar y enviar a los suscriptores de la Newsletter</span>
                </span>
                <p className="text-xs text-[#2F2931]/75 mt-0.5">
                  Al marcar esta casilla, este artículo quedará registrado como la última entrega de tu boletín mensual y se enviará automáticamente a los <strong>{totalSubscribers} suscriptores</strong> de tu lista.
                </p>
              </div>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EADFED]">
            <button
              type="button"
              onClick={closeEditor}
              className="px-4 py-2.5 rounded-xl border border-[#EADFED] text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#EADFED]" />
              <span>Publicar en Blog {sendToNewsletter ? 'y Enviar a Newsletter' : ''}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
