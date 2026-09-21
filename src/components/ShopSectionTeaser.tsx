import React from 'react';
import { PageRoute } from '../types';
import { useShop } from '../context/ShopContext';
import { ShopCard } from './ShopCard';
import { ShoppingBag, ArrowRight, Sparkles, Plus } from 'lucide-react';

interface ShopSectionTeaserProps {
  onNavigate: (route: PageRoute) => void;
}

export const ShopSectionTeaser: React.FC<ShopSectionTeaserProps> = ({ onNavigate }) => {
  const { materials, openAddModal } = useShop();

  // Take first 3 materials
  const previewMaterials = materials.slice(0, 3);

  return (
    <section 
      id="tienda-materiales-seccion" 
      aria-labelledby="tienda-materiales-title"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="space-y-8 text-left">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EADFED] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EADFED] text-[#6E2F82] text-xs font-bold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5 text-[#6E2F82]" />
              <span>TIENDA CLÍNICA ONLINE</span>
            </div>
            <h2 id="tienda-materiales-title" className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3F1F4D]">
              Materiales y Cuadernos de Estimulación
            </h2>
            <p className="text-xs sm:text-sm text-[#2F2931]/75 max-w-2xl">
              Recursos manipulativos, ruletas fonológicas, programas de afasia y guías prácticas para familias, escuelas y terapeutas creados por Gema Guirao.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('tienda')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Ver toda la tienda</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewMaterials.map((material) => (
            <ShopCard
              key={material.id}
              material={material}
              onSelect={() => onNavigate('tienda')}
            />
          ))}
        </div>

        {/* Bottom banner for Gema & buyers */}
        <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#EADFED] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#3F1F4D]">
            <Sparkles className="w-4 h-4 text-[#6E2F82]" />
            <span>
              ¿Creas tus propios materiales? Puedes añadir nuevos cuadernos o juegos para venderlos online.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onNavigate('tienda');
                setTimeout(() => openAddModal(), 100);
              }}
              className="text-[#6E2F82] font-bold hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Subir nuevo material</span>
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => onNavigate('tienda')}
              className="font-bold text-[#3F1F4D] hover:text-[#6E2F82]"
            >
              Explorar catálogo completo →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
