import React from 'react';
import { TherapyMaterial } from '../types';
import { SafeImage } from './SafeImage';
import { 
  FileText, 
  Download, 
  ShoppingCart, 
  Check, 
  Sparkles, 
  Star, 
  Eye, 
  MessageCircle, 
  Edit3, 
  Trash2,
  Tag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface ShopCardProps {
  material: TherapyMaterial;
  onSelect: (material: TherapyMaterial) => void;
  onEdit?: (material: TherapyMaterial) => void;
}

export const ShopCard: React.FC<ShopCardProps> = ({ material, onSelect, onEdit }) => {
  const { addToCart, cart, deleteMaterial, openCart } = useShop();

  const isInCart = cart.some((item) => item.material.id === material.id);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'neurologopedia':
        return 'Neurologopedia';
      case 'lenguaje':
        return 'Lenguaje y Habla';
      case 'disfagia':
        return 'Disfagia';
      case 'voz':
        return 'Voz y Respiración';
      case 'miofuncional':
        return 'Miofuncional';
      case 'evaluacion':
        return 'Evaluación';
      default:
        return 'Logopedia';
    }
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const phone = '34624718369';
    const text = encodeURIComponent(
      `Hola Gema, me interesa adquirir tu material clínico: "${material.title}" (${material.price > 0 ? `${material.price.toFixed(2)}€` : 'Gratuito'}). ¿Cómo puedo proceder?`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás segura de eliminar "${material.title}" de la tienda?`)) {
      deleteMaterial(material.id);
    }
  };

  return (
    <article
      id={`material-card-${material.id}`}
      onClick={() => onSelect(material)}
      className="group relative bg-white rounded-3xl border border-[#EADFED] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#B68FC1] transition-all duration-300 flex flex-col cursor-pointer text-left"
    >
      {/* Top badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FBF8F3]">
        <SafeImage
          src={material.imageUrl}
          alt={material.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70 group-hover:opacity-40 transition-opacity" />

        {/* Top bar badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold tracking-wide uppercase text-[#3F1F4D] shadow-xs">
            {getCategoryLabel(material.category)}
          </span>

          <div className="flex items-center gap-1.5">
            {material.isFeatured && (
              <span className="px-2 py-0.5 rounded-full bg-[#EADFED] text-[#6E2F82] text-[10px] font-bold flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3" />
                <span>Destacado</span>
              </span>
            )}
            {material.isFree ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-xs">
                GRATIS
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-[#3F1F4D] text-white text-xs font-bold shadow-md">
                {material.price.toFixed(2)} €
              </span>
            )}
          </div>
        </div>

        {/* Bottom image overlay specs */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium drop-shadow-sm">
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <FileText className="w-3.5 h-3.5 text-[#EADFED]" />
            <span>{material.format}</span>
          </span>

          {material.pages && (
            <span className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md text-[11px]">
              {material.pages} págs.
            </span>
          )}
        </div>
      </div>

      {/* Content body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6E2F82]">
            <span className="font-semibold text-[11px] uppercase tracking-wider">
              {material.ageRange}
            </span>
            {material.rating && (
              <div className="flex items-center gap-1 text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{material.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          <h3 className="font-serif text-base sm:text-lg font-bold text-[#3F1F4D] leading-snug group-hover:text-[#6E2F82] transition-colors line-clamp-2">
            {material.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#2F2931]/75 line-clamp-2 leading-relaxed">
            {material.subtitle}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {material.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FBF8F3] text-[10px] text-[#3F1F4D] border border-[#EADFED]"
            >
              <Tag className="w-2.5 h-2.5 text-[#B68FC1]" />
              <span>{tag}</span>
            </span>
          ))}
        </div>

        {/* Actions footer */}
        <div className="pt-3 border-t border-[#EADFED]/60 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(material);
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#6E2F82] hover:text-[#3F1F4D] transition-colors p-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Detalles</span>
          </button>

          <div className="flex items-center gap-1.5">
            {/* Quick WhatsApp order */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              title="Pedir o consultar por WhatsApp"
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Cart Button */}
            {material.isFree ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(material);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isInCart) {
                    openCart();
                  } else {
                    addToCart(material);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  isInCart
                    ? 'bg-[#3F1F4D] text-white'
                    : 'bg-[#6E2F82] hover:bg-[#3F1F4D] text-white hover:shadow-md'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#EADFED]" />
                    <span>En cesta</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Añadir</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Administration tools if it's a custom or editable material */}
        {onEdit && (
          <div className="pt-2 border-t border-dashed border-[#EADFED] flex items-center justify-between text-[11px] text-gray-500">
            <span>Gestión:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(material);
                }}
                className="text-[#6E2F82] hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>Editar</span>
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-500 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Borrar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
