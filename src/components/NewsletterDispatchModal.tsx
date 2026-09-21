import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { BlogPost } from '../types';
import { X, Mail, Send, CheckCircle2, Users, Copy, Sparkles, ExternalLink } from 'lucide-react';

export const NewsletterDispatchModal: React.FC = () => {
  const { isNewsletterModalOpen, closeNewsletterModal, activePost, totalSubscribers, campaigns, dispatchPostToNewsletter } = useBlog();
  const [copied, setCopied] = useState(false);
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);

  if (!isNewsletterModalOpen || !activePost) return null;

  const emailSubject = `[Newsletter Gema Guirao] ${activePost.title}`;
  const emailPreview = `Hola,\n\nAcabamos de publicar una nueva entrega clínica en el blog de Gema Guirao:\n\n"${activePost.title}"\nCategoría: ${activePost.category}\n\n${activePost.excerpt}\n\n👉 Puedes leer el artículo completo aquí:\nhttps://logopedagemaguirao.es/blog/${activePost.slug}\n\n---\nGema Guirao · Neurologopeda Clínica (Colegiada Nº 30/695)\nCentro CIMM Murcia / Modalidad Online\nTeléfono / WhatsApp: 624 71 83 69\n\nSi no deseas recibir más comunicaciones, puedes cancelar tu suscripción en cualquier momento.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Asunto: ${emailSubject}\n\n${emailPreview}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDispatchNow = () => {
    dispatchPostToNewsletter(activePost.id);
    setDispatchedSuccess(true);
    setTimeout(() => {
      setDispatchedSuccess(false);
      closeNewsletterModal();
    }, 2000);
  };

  return (
    <div
      id="newsletter-dispatch-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={closeNewsletterModal}
    >
      <div
        id="newsletter-dispatch-modal"
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#EADFED] my-8 text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#FBF8F3] border-b border-[#EADFED] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EADFED] text-[#6E2F82] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
                Enlace con Newsletter y Envío
              </h2>
              <p className="text-xs text-[#2F2931]/70 flex items-center gap-1.5 mt-0.5">
                <Users className="w-3.5 h-3.5 text-[#6E2F82]" />
                <span>Audiencia actual: <strong>{totalSubscribers} suscriptores</strong> verificados</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeNewsletterModal}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div className="p-4 rounded-2xl bg-[#EADFED]/40 border border-[#B68FC1]/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#6E2F82] uppercase tracking-wider">
                Artículo seleccionado del Blog
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white text-[#3F1F4D] font-semibold text-[11px]">
                {activePost.category}
              </span>
            </div>
            <h3 className="font-serif font-bold text-base text-[#3F1F4D]">
              {activePost.title}
            </h3>
            <p className="text-xs text-[#2F2931]/80 leading-relaxed">
              {activePost.excerpt}
            </p>
          </div>

          {/* Email Preview Mockup */}
          <div className="border border-[#EADFED] rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-gray-100 px-4 py-2 border-b border-[#EADFED] flex items-center justify-between text-[11px] text-gray-600">
              <span className="font-mono">De: Gema Guirao &lt;LogopedaGemaguirao@gmail.com&gt;</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Plantilla Newsletter Lista</span>
              </span>
            </div>
            <div className="bg-white p-4 space-y-2 text-xs">
              <div className="text-[#3F1F4D] font-bold border-b border-gray-100 pb-2">
                Asunto: {emailSubject}
              </div>
              <div className="whitespace-pre-line text-[#2F2931]/80 font-sans leading-relaxed text-[11px] pt-2">
                {emailPreview}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#EADFED] text-xs font-semibold text-[#3F1F4D] hover:bg-[#FBF8F3] transition-colors"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado al portapapeles!' : 'Copiar texto para Mailchimp/Gmail'}</span>
            </button>

            <button
              type="button"
              onClick={handleDispatchNow}
              disabled={dispatchedSuccess}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white text-xs font-bold shadow-sm transition-all"
            >
              {dispatchedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>¡Envío completado a {totalSubscribers} suscriptores!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#EADFED]" />
                  <span>Enviar ahora a los {totalSubscribers} suscriptores</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
