import React, { useState, useMemo } from 'react';
import { PageRoute, TherapyMaterial } from '../types';
import { useShop } from '../context/ShopContext';
import { MATERIAL_CATEGORIES } from '../data/materialsData';
import { ShopCard } from '../components/ShopCard';
import { MaterialModal } from '../components/MaterialModal';
import { AddMaterialModal } from '../components/AddMaterialModal';
import { ShopCartDrawer } from '../components/ShopCartDrawer';
import { SafeImage } from '../components/SafeImage';
import {
  Search,
  ShoppingCart,
  Plus,
  Sparkles,
  Filter,
  CheckCircle2,
  FileText,
  Download,
  ShieldCheck,
  Printer,
  Heart,
  SlidersHorizontal,
  X,
  MessageCircle,
  HelpCircle,
  Lock,
  CreditCard,
  ExternalLink,
  Settings
} from 'lucide-react';

interface ShopViewProps {
  onNavigate: (route: PageRoute) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ onNavigate }) => {
  const {
    materials,
    cartCount,
    cartTotal,
    openCart,
    openAddModal,
    isAddModalOpen,
    closeAddModal,
    editingMaterial,
    gatewayUrl,
    setGatewayUrl
  } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [activeMaterial, setActiveMaterial] = useState<TherapyMaterial | null>(null);

  // Filtered and sorted materials
  const filteredMaterials = useMemo(() => {
    let list = [...materials];

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'evaluacion') {
        list = list.filter((m) => m.category === 'evaluacion' || m.isFree);
      } else {
        list = list.filter((m) => m.category === selectedCategory);
      }
    }

    // Format filter
    if (selectedFormat !== 'all') {
      list = list.filter((m) => m.format === selectedFormat);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.subtitle.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.id > a.id ? 1 : -1);
      return 0;
    });

    return list;
  }, [materials, selectedCategory, selectedFormat, searchQuery, sortBy]);

  // Featured hero material (first featured item or first in list)
  const heroMaterial = useMemo(() => {
    return materials.find((m) => m.isFeatured) || materials[0];
  }, [materials]);

  return (
    <div className="space-y-12 py-8">
      {/* Header & Breadcrumb */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6E2F82]">
              <button
                onClick={() => onNavigate('inicio')}
                className="hover:underline text-[#3F1F4D]"
              >
                Inicio
              </button>
              <span>/</span>
              <span className="text-[#6E2F82]">Tienda de Materiales</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3F1F4D] tracking-tight">
              Materiales y Recursos Clínicos
            </h1>
            <p className="text-sm sm:text-base text-[#2F2931]/80 max-w-2xl mt-1 leading-relaxed">
              Recursos de estimulación cognitiva, cuadernos de afasia, ruletas fonológicas y guías de deglución diseñadas y testadas en consulta por <strong>Gema Guirao</strong>.
            </p>
          </div>

          {/* Top Actions: Creator Upload button, Gateway config & Cart */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Pasarela de pago status button */}
            <button
              id="shop-gateway-status-btn"
              type="button"
              onClick={openCart}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs shadow-xs transition-all cursor-pointer"
              title="Pasarela de pago 100% activa para cobro con tarjeta o enlace"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pasarela de Pago Activa</span>
            </button>

            {/* Add Material Button for Gema */}
            <button
              id="shop-add-material-btn"
              type="button"
              onClick={() => openAddModal()}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-[#EADFED] hover:bg-[#B68FC1] text-[#3F1F4D] font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer border border-[#B68FC1]/50"
              title="Panel de creación para Gema"
            >
              <Plus className="w-4 h-4 text-[#6E2F82]" />
              <span className="hidden sm:inline">Subir material</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="shop-cart-header-btn"
              type="button"
              onClick={openCart}
              className="relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-[#EADFED]" />
              <span className="hidden sm:inline">Cesta</span>
              {cartCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-white text-[#6E2F82] text-xs font-extrabold shadow-inner">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Featured Hero Banner if there's a hero material and no active search */}
      {heroMaterial && !searchQuery && selectedCategory === 'all' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3F1F4D] via-[#4F2561] to-[#3F1F4D] text-white p-6 sm:p-10 shadow-xl border border-[#6E2F82]/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#EADFED]">
                  <Sparkles className="w-3.5 h-3.5 text-[#B68FC1]" />
                  <span>Material Destacado en Consulta</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FBF8F3] leading-tight">
                  {heroMaterial.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#EADFED]/90 leading-relaxed max-w-xl">
                  {heroMaterial.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                  <span className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-xs font-medium">
                    {heroMaterial.format} ({heroMaterial.pages} págs.)
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-xs font-medium">
                    Edad: {heroMaterial.ageRange}
                  </span>
                  <span className="font-serif text-xl font-bold text-white">
                    {heroMaterial.isFree ? 'GRATIS' : `${heroMaterial.price.toFixed(2)} €`}
                  </span>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveMaterial(heroMaterial)}
                    className="px-5 py-2.5 rounded-xl bg-white text-[#3F1F4D] hover:bg-[#FBF8F3] text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer"
                  >
                    Ver detalles y muestra
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const phone = '34624718369';
                      const text = encodeURIComponent(
                        `Hola Gema, me interesa adquirir tu material destacado: "${heroMaterial.title}". ¿Cómo puedo recibirlo?`
                      );
                      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pedir por WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div
                  onClick={() => setActiveMaterial(heroMaterial)}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 cursor-pointer group"
                >
                  <SafeImage
                    src={heroMaterial.imageUrl}
                    alt={heroMaterial.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-lg">
                    Clic para ver fotos y páginas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Search input and Sort */}
        <div className="bg-white rounded-2xl border border-[#EADFED] p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#6E2F82] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por fonema, afasia, disfagia, edad..."
              className="w-full pl-10 pr-9 py-2 rounded-xl border border-[#EADFED] text-xs sm:text-sm text-[#2F2931] placeholder-[#2F2931]/40 focus:outline-none focus:ring-2 focus:ring-[#6E2F82]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            {/* Format Filter */}
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:ring-2 focus:ring-[#6E2F82] bg-white"
            >
              <option value="all">Todos los formatos</option>
              <option value="Material Imprimible">Material Imprimible</option>
              <option value="PDF Descargable">PDF Descargable</option>
              <option value="Guía Clínica">Guías y Manuales</option>
            </select>

            {/* Sort by */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:ring-2 focus:ring-[#6E2F82] bg-white"
            >
              <option value="featured">Recomendados / Destacados</option>
              <option value="newest">Más recientes</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MATERIAL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#6E2F82] text-white shadow-xs'
                    : 'bg-white text-[#3F1F4D] border border-[#EADFED] hover:border-[#B68FC1] hover:bg-[#FBF8F3]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Materials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 text-left">
          <p className="text-xs sm:text-sm text-[#2F2931]/70">
            Mostrando <strong>{filteredMaterials.length}</strong> {filteredMaterials.length === 1 ? 'material' : 'materiales disponibles'}
          </p>

          <button
            type="button"
            onClick={() => openAddModal()}
            className="text-xs text-[#6E2F82] hover:underline font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>¿Eres Gema? Añade otro material aquí</span>
          </button>
        </div>

        {filteredMaterials.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#EADFED] p-12 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FBF8F3] border border-[#EADFED] text-[#6E2F82] flex items-center justify-center">
              <Search className="w-6 h-6 opacity-40" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#3F1F4D]">
              No se han encontrado materiales con esos filtros
            </h3>
            <p className="text-xs sm:text-sm text-[#2F2931]/70 max-w-sm mx-auto">
              Prueba a cambiar el término de búsqueda o selecciona otra área clínica para ver más recursos.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedFormat('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#6E2F82] text-white text-xs font-bold"
            >
              Ver todos los materiales
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredMaterials.map((material) => (
              <ShopCard
                key={material.id}
                material={material}
                onSelect={(m) => setActiveMaterial(m)}
                onEdit={(m) => openAddModal(m)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Trust & Guarantee Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-[#FBF8F3] rounded-3xl border border-[#EADFED] p-8 sm:p-10 space-y-6 text-left">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6E2F82]">
              GARANTÍA PROFESIONAL
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#3F1F4D] mt-1">
              ¿Por qué elegir los materiales clínicos de Gema Guirao?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#EADFED] text-[#6E2F82] flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-[#3F1F4D] text-base">
                Rigor Basado en Evidencia
              </h3>
              <p className="text-xs text-[#2F2931]/80 leading-relaxed">
                Cada material nace de las necesidades reales observadas en sesión clínica con pacientes neurológicos, infantiles y de voz, no de bancos de imágenes genéricos.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#EADFED] text-[#6E2F82] flex items-center justify-center shadow-xs">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-[#3F1F4D] text-base">
                Formatos Flexibles y Listos
              </h3>
              <p className="text-xs text-[#2F2931]/80 leading-relaxed">
                Archivos PDF en alta resolución con instrucciones precisas de recorte, plastificado o uso digital en iPad y tabletas con lápiz óptico.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#EADFED] text-[#6E2F82] flex items-center justify-center shadow-xs">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-[#3F1F4D] text-base">
                Atención Directa y Bizum
              </h3>
              <p className="text-xs text-[#2F2931]/80 leading-relaxed">
                Si tienes dudas sobre qué material se adapta mejor al caso de tu familiar o alumno, puedes consultarme directamente por WhatsApp antes de comprar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom Cart Bar for Mobile/Desktop when items are in cart */}
      {cartCount > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-md animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#3F1F4D] text-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/20 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#EADFED]">
                  {cartCount} {cartCount === 1 ? 'material' : 'materiales'} en tu cesta
                </p>
                <p className="font-serif text-sm font-bold text-white">
                  Total: {cartTotal.toFixed(2)} €
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openCart}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
            >
              Ver Cesta y Pedir
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <MaterialModal
        material={activeMaterial}
        onClose={() => setActiveMaterial(null)}
      />

      <AddMaterialModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        materialToEdit={editingMaterial}
      />

      <ShopCartDrawer />
    </div>
  );
};
