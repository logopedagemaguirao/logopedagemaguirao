import React, { useState, useEffect } from 'react';
import { TherapyMaterial } from '../types';
import { useShop } from '../context/ShopContext';
import { useCustomImages } from '../context/CustomImageContext';
import { USER_ATTACHED_IMAGES } from '../data/userImages';
import {
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Plus,
  Trash2,
  Sparkles,
  Info,
  DollarSign,
  Tag
} from 'lucide-react';

interface AddMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialToEdit?: TherapyMaterial | null;
}

export const AddMaterialModal: React.FC<AddMaterialModalProps> = ({
  isOpen,
  onClose,
  materialToEdit
}) => {
  const { saveMaterial } = useShop();
  const { customImages } = useCustomImages();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<TherapyMaterial['category']>('lenguaje');
  const [format, setFormat] = useState<TherapyMaterial['format']>('Material Imprimible');
  const [price, setPrice] = useState('12.50');
  const [isFree, setIsFree] = useState(false);
  const [pages, setPages] = useState('30');
  const [ageRange, setAgeRange] = useState('Infantil (4 a 10 años)');
  const [description, setDescription] = useState('');
  const [bulletPoints, setBulletPoints] = useState<string[]>([
    'Listo para imprimir, plastificar y utilizar en sesión clínica o en casa.',
    'Incluye hojas de registro y pautas de estimulación para familias.'
  ]);
  const [newBullet, setNewBullet] = useState('');
  const [tagsInput, setTagsInput] = useState('Logopedia, Estimulación, Descargable');
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('/WhatsApp Image 2026-09-09 at 19.22.02 (1).jpeg');
  const [previewCustomUpload, setPreviewCustomUpload] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'gallery' | 'upload'>('gallery');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Available stock / clinic images
  const clinicImages = [
    { url: '/WhatsApp Image 2026-09-09 at 19.22.02 (1).jpeg', label: 'Ruleta Fonológica' },
    { url: '/WhatsApp Image 2026-09-09 at 19.22.01 (1).jpeg', label: 'Tarjetas Terapéuticas' },
    { url: '/WhatsApp Image 2026-09-09 at 19.22.01 (2).jpeg', label: 'Gabinete y Mesa de Trabajo' },
    { url: '/WhatsApp Image 2026-09-09 at 19.22.01 (4).jpeg', label: 'Materiales Clínicos' },
    { url: '/WhatsApp Image 2026-09-09 at 19.22.01 (7).jpeg', label: 'Recursos en Consulta' },
    { url: '/ChatGPT Image 9 sept 2026, 20_14_36.png', label: 'Neurologopedia e Ictus' }
  ];

  // Also include custom uploaded images from CustomImageContext if available
  const userUploadedGallery = Object.entries(customImages).map(([key, dataUrl]) => ({
    url: dataUrl,
    label: `Foto subida (${key})`
  }));

  const allAvailableImages = [...clinicImages, ...userUploadedGallery];

  useEffect(() => {
    if (materialToEdit) {
      setTitle(materialToEdit.title);
      setSubtitle(materialToEdit.subtitle);
      setCategory(materialToEdit.category);
      setFormat(materialToEdit.format);
      setPrice(materialToEdit.price.toString());
      setIsFree(!!materialToEdit.isFree);
      setPages(materialToEdit.pages ? materialToEdit.pages.toString() : '');
      setAgeRange(materialToEdit.ageRange);
      setDescription(materialToEdit.description);
      setBulletPoints(materialToEdit.longDescription || []);
      setTagsInput(materialToEdit.tags.join(', '));
      setIsFeatured(!!materialToEdit.isFeatured);
      setSelectedImage(materialToEdit.imageUrl);
    } else {
      // Reset form
      setTitle('');
      setSubtitle('');
      setCategory('lenguaje');
      setFormat('Material Imprimible');
      setPrice('12.50');
      setIsFree(false);
      setPages('30');
      setAgeRange('Infantil (4 a 10 años)');
      setDescription('');
      setBulletPoints([
        'Listo para imprimir, plastificar y utilizar en sesión clínica o en casa.',
        'Incluye hojas de registro y pautas de estimulación para familias.'
      ]);
      setTagsInput('Logopedia, Estimulación, Descargable');
      setIsFeatured(false);
      setSelectedImage('/WhatsApp Image 2026-09-09 at 19.22.02 (1).jpeg');
      setPreviewCustomUpload(null);
    }
  }, [materialToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor, selecciona un archivo de imagen válido (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewCustomUpload(result);
      setSelectedImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddBullet = () => {
    if (newBullet.trim()) {
      setBulletPoints([...bulletPoints, newBullet.trim()]);
      setNewBullet('');
    }
  };

  const handleRemoveBullet = (index: number) => {
    setBulletPoints(bulletPoints.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim()) {
      setErrorMsg('Por favor, introduce el título del material.');
      return;
    }

    if (!description.trim()) {
      setErrorMsg('Por favor, redacta una breve descripción del contenido.');
      return;
    }

    const numericPrice = isFree ? 0 : parseFloat(price) || 0;
    const splitTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    saveMaterial(
      {
        title: title.trim(),
        subtitle: subtitle.trim() || 'Material terapéutico diseñado por Gema Guirao',
        description: description.trim(),
        longDescription: bulletPoints,
        price: numericPrice,
        isFree: isFree || numericPrice === 0,
        category,
        format,
        pages: parseInt(pages) || undefined,
        ageRange: ageRange.trim() || 'Todas las edades',
        imageUrl: selectedImage,
        isFeatured,
        rating: 5.0,
        tags: splitTags.length > 0 ? splitTags : ['Logopedia', 'Material Clínico']
      },
      materialToEdit?.id
    );
  };

  return (
    <div
      id="add-material-modal"
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#EADFED] text-left relative my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EADFED] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EADFED] text-[#6E2F82] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#3F1F4D]">
                {materialToEdit ? 'Editar Material de la Tienda' : 'Subir y Publicar Nuevo Material'}
              </h2>
              <p className="text-xs text-[#2F2931]/70">
                Gestionado por Gema Guirao · Aparecerá inmediatamente en tu tienda online
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* Title & Subtitle */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D] mb-1.5">
                Título del material *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Cuaderno de Loto Fonológico y Sinartrosis"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#EADFED] text-sm text-[#2F2931] placeholder-[#2F2931]/40 focus:outline-none focus:ring-2 focus:ring-[#6E2F82]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D] mb-1.5">
                Subtítulo o resumen clínico (1 frase)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ej. Estimulación articulatoria progresiva para fonemas /r/ y /l/"
                className="w-full px-4 py-2.5 rounded-xl border border-[#EADFED] text-sm text-[#2F2931] placeholder-[#2F2931]/40 focus:outline-none focus:ring-2 focus:ring-[#6E2F82]"
              />
            </div>
          </div>

          {/* Category, Format, Age */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D] mb-1.5">
                Área Clínica
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TherapyMaterial['category'])}
                className="w-full px-3 py-2.5 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:outline-none focus:ring-2 focus:ring-[#6E2F82] bg-white"
              >
                <option value="lenguaje">Lenguaje y Habla Infantil</option>
                <option value="neurologopedia">Neurologopedia y Daño Cerebral</option>
                <option value="disfagia">Disfagia</option>
                <option value="voz">Voz y Técnica Vocal</option>
                <option value="miofuncional">Terapia Miofuncional</option>
                <option value="lectoescritura">Lectoescritura</option>
                <option value="evaluacion">Evaluación / Protocolos</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D] mb-1.5">
                Formato de Entrega
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as TherapyMaterial['format'])}
                className="w-full px-3 py-2.5 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:outline-none focus:ring-2 focus:ring-[#6E2F82] bg-white"
              >
                <option value="Material Imprimible">Material Imprimible y Fichas</option>
                <option value="PDF Descargable">PDF Descargable</option>
                <option value="Juego Terapéutico">Juego Terapéutico Manipulativo</option>
                <option value="Guía Clínica">Guía Clínica / Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D] mb-1.5">
                Público / Edad
              </label>
              <input
                type="text"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                placeholder="Ej. Infantil (3-7 años) o Adultos"
                className="w-full px-3 py-2.5 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:outline-none focus:ring-2 focus:ring-[#6E2F82]"
              />
            </div>
          </div>

          {/* Pricing & Free Option */}
          <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#EADFED] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
                Precio y Condiciones
              </span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                  className="rounded text-[#6E2F82] focus:ring-[#6E2F82] w-4 h-4"
                />
                <span className="text-xs font-semibold text-[#6E2F82]">
                  Ofrecer como recurso GRATUITO
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-[11px] text-[#2F2931]/70 mb-1">
                  Precio en Euros (€)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-[#6E2F82] font-bold">€</span>
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    disabled={isFree}
                    value={isFree ? '0.00' : price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 rounded-xl border border-[#EADFED] text-sm text-[#2F2931] disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6E2F82]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#2F2931]/70 mb-1">
                  Número de Páginas (Opcional)
                </label>
                <input
                  type="number"
                  min="1"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  placeholder="Ej. 24"
                  className="w-full px-4 py-2 rounded-xl border border-[#EADFED] text-sm text-[#2F2931] focus:outline-none focus:ring-2 focus:ring-[#6E2F82]"
                />
              </div>
            </div>
          </div>

          {/* Image Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
              Fotografía de Portada del Material
            </label>

            {/* Sub-tabs */}
            <div className="flex gap-2 border-b border-[#EADFED] pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  activeTab === 'gallery'
                    ? 'bg-[#6E2F82] text-white'
                    : 'text-[#3F1F4D] hover:bg-[#FBF8F3]'
                }`}
              >
                Fotos de la consulta ({allAvailableImages.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1 ${
                  activeTab === 'upload'
                    ? 'bg-[#6E2F82] text-white'
                    : 'text-[#3F1F4D] hover:bg-[#FBF8F3]'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Subir foto desde tu dispositivo</span>
              </button>
            </div>

            {activeTab === 'gallery' ? (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 max-h-48 overflow-y-auto p-1">
                {allAvailableImages.map((img, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setSelectedImage(img.url)}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer group ${
                      selectedImage === img.url
                        ? 'border-[#6E2F82] ring-2 ring-[#6E2F82]/40 scale-95'
                        : 'border-transparent hover:border-[#B68FC1]'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === img.url && (
                      <div className="absolute inset-0 bg-[#6E2F82]/30 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <label className="block border-2 border-dashed border-[#B68FC1] hover:border-[#6E2F82] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-[#FBF8F3]">
                  <Upload className="w-8 h-8 text-[#6E2F82] mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#3F1F4D]">
                    Haz clic para elegir foto o arrastra el archivo aquí
                  </p>
                  <p className="text-[11px] text-[#2F2931]/60 mt-1">
                    PNG, JPG o WebP de tu material terapéutico o ruleta
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {previewCustomUpload && (
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#EADFED]">
                    <img
                      src={previewCustomUpload}
                      alt="Vista previa"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-[#3F1F4D]">Imagen cargada con éxito</p>
                      <p className="text-[#6E2F82]">Seleccionada como portada</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D] mb-1.5">
              Descripción completa del material *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explica qué objetivos terapéuticos trabaja, qué incluye el pack y cómo aplicarlo en consulta o en el hogar..."
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#EADFED] text-sm text-[#2F2931] placeholder-[#2F2931]/40 focus:outline-none focus:ring-2 focus:ring-[#6E2F82]"
            />
          </div>

          {/* Feature Bullets */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
              Puntos clave o contenidos incluidos
            </label>

            <div className="space-y-2">
              {bulletPoints.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs bg-[#FBF8F3] p-2.5 rounded-xl border border-[#EADFED]">
                  <CheckCircle2 className="w-4 h-4 text-[#6E2F82] shrink-0" />
                  <span className="flex-1 text-[#2F2931]">{b}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBullet(idx)}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newBullet}
                onChange={(e) => setNewBullet(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddBullet();
                  }
                }}
                placeholder="Añade otra característica (ej. Incluye 24 ruletas a color)"
                className="flex-1 px-3 py-2 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:outline-none focus:ring-2 focus:ring-[#6E2F82]"
              />
              <button
                type="button"
                onClick={handleAddBullet}
                className="px-3 py-2 rounded-xl bg-[#EADFED] hover:bg-[#B68FC1] text-[#3F1F4D] text-xs font-bold cursor-pointer transition-colors"
              >
                + Añadir punto
              </button>
            </div>
          </div>

          {/* Tags & Featured Checkbox */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D] mb-1">
                Etiquetas (separadas por comas)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Ej. Fonología, Dislalias, Adultos, Estimulación"
                className="w-full px-4 py-2 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:outline-none focus:ring-2 focus:ring-[#6E2F82]"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded text-[#6E2F82] focus:ring-[#6E2F82] w-4 h-4"
              />
              <span className="text-xs font-semibold text-[#3F1F4D]">
                Marcar como producto <strong>Destacado</strong> en la cabecera de la tienda
              </span>
            </label>
          </div>

          {/* Submit / Cancel Buttons */}
          <div className="pt-4 border-t border-[#EADFED] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#EADFED] text-xs font-semibold text-[#2F2931]/70 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {materialToEdit ? 'Guardar Cambios' : 'PUBLICAR EN LA TIENDA'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
