import React, { useState } from 'react';
import { TherapyMaterial } from '../types';
import { SafeImage } from './SafeImage';
import { useShop } from '../context/ShopContext';
import {
  X,
  FileText,
  Download,
  ShoppingCart,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Share2,
  ShieldCheck,
  Printer,
  Users,
  Star,
  Check,
  ArrowRight
} from 'lucide-react';

interface MaterialModalProps {
  material: TherapyMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  const { addToCart, cart, openCart } = useShop();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!material) return null;

  const isInCart = cart.some((item) => item.material.id === material.id);

  const handleWhatsAppOrder = () => {
    const phone = '34624718369';
    const msg = encodeURIComponent(
      `Hola Gema, estoy interesado/a en adquirir tu material clínico "${material.title}" (${material.price > 0 ? `${material.price.toFixed(2)}€` : 'Recurso Gratuito'}). ¿Me podrías indicar los pasos de envío o descarga?`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const handleSimulateDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      // In a real backend, this would download the PDF file.
      // Here we generate an informational summary document
      const content = `MATERIAL CLÍNICO - LOGOPEDIA GEMA GUIRAO\n\nTítulo: ${material.title}\nSubtítulo: ${material.subtitle}\nFormato: ${material.format}\nPáginas: ${material.pages || 'N/A'}\nEdad recomendada: ${material.ageRange}\n\nDescripción:\n${material.description}\n\nDetalles del contenido:\n${(material.longDescription || []).join('\n• ')}\n\nContacto clínico: logopedagemaguirao@gmail.com | Teléfono/WhatsApp: +34 624 71 83 69`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${material.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-gema-guirao.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 600);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: material.title,
          text: material.subtitle,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div
      id="material-detail-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#EADFED] text-left relative my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md transition-all cursor-pointer"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Cover */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#FBF8F3]">
          <SafeImage
            src={material.imageUrl}
            alt={material.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-8 sm:right-8 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#EADFED] text-[#3F1F4D] text-xs font-bold uppercase tracking-wider shadow-xs">
                {material.category.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-medium flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-[#EADFED]" />
                <span>{material.format}</span>
              </span>
              {material.pages && (
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-medium">
                  {material.pages} Páginas
                </span>
              )}
            </div>

            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight drop-shadow-sm">
              {material.title}
            </h2>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Subtitle & Price summary bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#EADFED]">
            <div>
              <p className="text-sm sm:text-base text-[#3F1F4D] font-medium leading-snug">
                {material.subtitle}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-[#6E2F82]">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-[#B68FC1]" />
                  <span>Edad recomendada: <strong>{material.ageRange}</strong></span>
                </span>
                {material.rating && (
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{material.rating.toFixed(1)} / 5.0</span>
                  </span>
                )}
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs text-[#2F2931]/60 block">Precio único</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#3F1F4D]">
                {material.isFree ? 'GRATUITO' : `${material.price.toFixed(2)} €`}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#3F1F4D] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6E2F82]" />
              <span>¿Qué incluye este material terapéutico?</span>
            </h3>

            <p className="text-sm text-[#2F2931]/85 leading-relaxed">
              {material.description}
            </p>

            {material.longDescription && material.longDescription.length > 0 && (
              <div className="bg-[#FBF8F3] rounded-2xl p-5 border border-[#EADFED] space-y-2.5">
                {material.longDescription.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2F2931]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#6E2F82] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clinical Assurance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#2F2931]/80">
            <div className="p-3 rounded-xl bg-white border border-[#EADFED] flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#6E2F82] shrink-0" />
              <span>Diseñado y testado en consulta real</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#EADFED] flex items-center gap-2.5">
              <Printer className="w-5 h-5 text-[#6E2F82] shrink-0" />
              <span>Listo para imprimir y plastificar</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#EADFED] flex items-center gap-2.5">
              <Download className="w-5 h-5 text-[#6E2F82] shrink-0" />
              <span>Descarga digital inmediata sin esperas</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-xs text-[#2F2931]/60 mr-1">Etiquetas:</span>
            {material.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-[#EADFED]/60 text-[#3F1F4D] text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Download success banner */}
          {downloadSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                ¡Descarga iniciada con éxito! Revisa la carpeta de descargas de tu dispositivo.
              </span>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="pt-4 border-t border-[#EADFED] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-[#EADFED] text-xs font-semibold text-[#3F1F4D] hover:bg-[#FBF8F3] transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#6E2F82]" />
                <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir'}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {material.isFree ? (
                <button
                  type="button"
                  onClick={handleSimulateDownload}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>DESCARGAR GRATIS AHORA</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (isInCart) {
                      onClose();
                      openCart();
                    } else {
                      addToCart(material);
                    }
                  }}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer ${
                    isInCart
                      ? 'bg-[#3F1F4D] text-white'
                      : 'bg-[#6E2F82] hover:bg-[#3F1F4D] text-white'
                  }`}
                >
                  {isInCart ? (
                    <>
                      <Check className="w-4 h-4 text-[#EADFED]" />
                      <span>YA EN LA CESTA · VER PEDIDO</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>AÑADIR A LA CESTA ({material.price.toFixed(2)}€)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
