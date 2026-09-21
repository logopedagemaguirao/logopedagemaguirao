import React, { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  CheckCircle2, 
  Image as ImageIcon, 
  FolderSearch, 
  Trash2, 
  Sparkles, 
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { useCustomImages } from '../context/CustomImageContext';
import { USER_ATTACHED_IMAGES } from '../data/userImages';

export const ImageUploadModal: React.FC = () => {
  const { 
    isModalOpen, 
    closeUploadModal, 
    uploadMultipleFiles, 
    uploadFile, 
    customImages, 
    removeImage,
    resetAllImages,
    activeSlot 
  } = useCustomImages();

  const [dragOver, setDragOver] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showFolderHelp, setShowFolderHelp] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const slotInputRef = useRef<HTMLInputElement>(null);
  const [targetSlotForUpload, setTargetSlotForUpload] = useState<string | null>(null);

  if (!isModalOpen) return null;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    try {
      const count = await uploadMultipleFiles(files);
      setSuccessMessage(`¡Se han cargado y guardado ${count} imagen(es) correctamente en tu web!`);
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch {
      setSuccessMessage('Hubo un error al procesar las fotos. Por favor inténtalo de nuevo.');
    }
  };

  const handleSingleSlotUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !targetSlotForUpload) return;
    const file = e.target.files[0];
    await uploadFile(file, targetSlotForUpload);
    setSuccessMessage(`Imagen asignada correctamente a: ${targetSlotForUpload}`);
    setTargetSlotForUpload(null);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const triggerSlotUpload = (slot: string) => {
    setTargetSlotForUpload(slot);
    if (slotInputRef.current) {
      slotInputRef.current.click();
    }
  };

  const countUploaded = Object.keys(customImages).length;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeUploadModal}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#EADFED] p-6 sm:p-8 text-[#2F2931]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-start justify-between pb-4 border-b border-[#EADFED]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADFED]/60 text-[#6E2F82] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gestor directo de imágenes</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#3F1F4D]">
              Subir fotos de tu consulta y logotipo
            </h2>
            <p className="text-sm text-[#2F2931]/75 mt-1">
              Sube tus imágenes directamente desde aquí. Se guardarán en tu navegador y aparecerán al instante en la web sin tocar ningún archivo ni carpeta.
            </p>
          </div>
          <button 
            onClick={closeUploadModal}
            className="p-2 rounded-full hover:bg-[#F5ECDF] text-[#6E2F82] transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="my-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Zona Drag & Drop */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-6 border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
            dragOver 
              ? 'border-[#6E2F82] bg-[#EADFED]/40 scale-[1.01]' 
              : 'border-[#B68FC1]/50 hover:border-[#6E2F82] bg-[#FBF8F3]/70 hover:bg-[#F5ECDF]/50'
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => handleFiles(e.target.files)} 
            multiple 
            accept="image/png,image/jpeg,image/webp,image/jpg" 
            className="hidden" 
          />
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-[#EADFED] text-[#6E2F82] flex items-center justify-center mx-auto mb-3">
            <UploadCloud className="w-7 h-7" />
          </div>
          <p className="font-serif font-bold text-base text-[#3F1F4D]">
            Haz clic aquí para seleccionar tus fotos o arrástralas
          </p>
          <p className="text-xs text-[#2F2931]/70 mt-1 max-w-md mx-auto">
            Puedes seleccionar a la vez tu logotipo (<code className="text-[#6E2F82]">Mi_logo</code>), tus retratos de ChatGPT y las fotos de WhatsApp de tu consulta y materiales.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6E2F82] text-white text-xs font-semibold hover:bg-[#3F1F4D] transition-colors">
            <ImageIcon className="w-4 h-4" />
            <span>Elegir fotos de mi ordenador o móvil</span>
          </div>
        </div>

        {/* Input oculto para carga directa a un slot específico */}
        <input 
          type="file" 
          ref={slotInputRef} 
          onChange={handleSingleSlotUpload} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Secciones clave de imágenes */}
        <div className="mt-6 space-y-4">
          <h3 className="font-serif text-sm font-bold text-[#3F1F4D] uppercase tracking-wider">
            Imágenes principales de la web
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Slot Logotipo */}
            <div className="p-3 rounded-2xl border border-[#EADFED] bg-white flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-[#3F1F4D]">Logotipo Oficial</p>
                <p className="text-[11px] text-[#2F2931]/60">Cabecera y pie</p>
              </div>
              <div className="h-20 my-2 rounded-xl bg-[#FBF8F3] border border-dashed border-[#EADFED] flex items-center justify-center overflow-hidden">
                {customImages['logo'] || customImages['Mi_logo-sin fondo.png'] ? (
                  <img 
                    src={customImages['logo'] || customImages['Mi_logo-sin fondo.png']} 
                    alt="Logo" 
                    className="max-h-16 max-w-full object-contain" 
                  />
                ) : (
                  <span className="text-[11px] text-[#6E2F82] font-medium text-center px-2">Pendiente</span>
                )}
              </div>
              <button 
                onClick={() => triggerSlotUpload('logo')}
                className="w-full py-1.5 px-2 rounded-lg bg-[#F5ECDF] hover:bg-[#EADFED] text-[#6E2F82] text-xs font-semibold transition-colors"
              >
                {customImages['logo'] ? 'Reemplazar' : 'Subir logo'}
              </button>
            </div>

            {/* Slot Retrato Principal */}
            <div className="p-3 rounded-2xl border border-[#EADFED] bg-white flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-[#3F1F4D]">Retrato de Portada</p>
                <p className="text-[11px] text-[#2F2931]/60">Gema Guirao</p>
              </div>
              <div className="h-20 my-2 rounded-xl bg-[#FBF8F3] border border-dashed border-[#EADFED] flex items-center justify-center overflow-hidden">
                {customImages['portrait'] || customImages['ChatGPT Image 9 sept 2026, 20_11_11 (1).png'] ? (
                  <img 
                    src={customImages['portrait'] || customImages['ChatGPT Image 9 sept 2026, 20_11_11 (1).png']} 
                    alt="Retrato" 
                    className="h-full w-full object-cover" 
                  />
                ) : (
                  <span className="text-[11px] text-[#6E2F82] font-medium text-center px-2">Pendiente</span>
                )}
              </div>
              <button 
                onClick={() => triggerSlotUpload('portrait')}
                className="w-full py-1.5 px-2 rounded-lg bg-[#F5ECDF] hover:bg-[#EADFED] text-[#6E2F82] text-xs font-semibold transition-colors"
              >
                {customImages['portrait'] ? 'Reemplazar' : 'Subir retrato'}
              </button>
            </div>

            {/* Slot Consulta CIMM */}
            <div className="p-3 rounded-2xl border border-[#EADFED] bg-white flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-[#3F1F4D]">Consulta CIMM</p>
                <p className="text-[11px] text-[#2F2931]/60">Gabinete presencial</p>
              </div>
              <div className="h-20 my-2 rounded-xl bg-[#FBF8F3] border border-dashed border-[#EADFED] flex items-center justify-center overflow-hidden">
                {customImages['consultation'] || customImages['ChatGPT Image 9 sept 2026, 20_14_36.png'] ? (
                  <img 
                    src={customImages['consultation'] || customImages['ChatGPT Image 9 sept 2026, 20_14_36.png']} 
                    alt="Consulta" 
                    className="h-full w-full object-cover" 
                  />
                ) : (
                  <span className="text-[11px] text-[#6E2F82] font-medium text-center px-2">Pendiente</span>
                )}
              </div>
              <button 
                onClick={() => triggerSlotUpload('consultation')}
                className="w-full py-1.5 px-2 rounded-lg bg-[#F5ECDF] hover:bg-[#EADFED] text-[#6E2F82] text-xs font-semibold transition-colors"
              >
                {customImages['consultation'] ? 'Reemplazar' : 'Subir consulta'}
              </button>
            </div>
          </div>
        </div>

        {/* Explicación de dónde está la carpeta 'public' en AI Studio si prefiere buscarla */}
        <div className="mt-6 pt-4 border-t border-[#EADFED]">
          <button 
            type="button"
            onClick={() => setShowFolderHelp(!showFolderHelp)}
            className="flex items-center justify-between w-full text-left text-xs font-semibold text-[#6E2F82] hover:text-[#3F1F4D]"
          >
            <span className="flex items-center gap-2">
              <FolderSearch className="w-4 h-4" />
              ¿Dónde está la carpeta <code>public</code> en la pantalla de Google AI Studio?
            </span>
            <span>{showFolderHelp ? '▲ Ocultar guía' : '▼ Ver guía con pasos'}</span>
          </button>

          {showFolderHelp && (
            <div className="mt-3 p-4 rounded-2xl bg-[#FBF8F3] border border-[#EADFED] text-xs text-[#2F2931]/80 space-y-2">
              <p className="font-bold text-[#3F1F4D]">
                Pasos para localizar la carpeta <code className="bg-white px-1.5 py-0.5 rounded border">public</code> en el editor de Google AI Studio:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 pl-1">
                <li>
                  Arriba a la derecha de la ventana verás dos pestañas principales: <strong>"Preview" (Vista previa)</strong> y <strong>"Code" (Código)</strong>.
                </li>
                <li>
                  Haz clic en <strong>"Code"</strong>.
                </li>
                <li>
                  Aparecerá a la izquierda el árbol o explorador de archivos con carpetas como <code className="bg-white px-1 py-0.5 rounded">src</code>, <code className="bg-white px-1 py-0.5 rounded">public</code> y archivos como <code className="bg-white px-1 py-0.5 rounded">index.html</code>.
                </li>
                <li>
                  La carpeta <strong>`public`</strong> es la que está justo ahí. Si arrastras tus archivos dentro de ella, se integran en el servidor.
                </li>
              </ol>
              <p className="pt-1 text-[#6E2F82] font-medium">
                💡 No obstante, <strong>no es obligatorio que vayas allí</strong>: el botón de arriba de esta ventana te permite subir tus fotos directamente con un clic sin tocar nada de código.
              </p>
            </div>
          )}
        </div>

        {/* Pie de modal */}
        <div className="mt-6 pt-4 border-t border-[#EADFED] flex items-center justify-between text-xs">
          <span className="text-[#2F2931]/60">
            {countUploaded > 0 ? `${countUploaded} foto(s) guardada(s)` : 'Aún no has subido fotos'}
          </span>
          <div className="flex items-center gap-3">
            {countUploaded > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('¿Deseas restablecer y borrar las fotos personalizadas que has subido?')) {
                    resetAllImages();
                  }
                }}
                className="text-red-600 hover:text-red-700 flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Restablecer fotos</span>
              </button>
            )}
            <button
              onClick={closeUploadModal}
              className="px-4 py-2 rounded-xl bg-[#3F1F4D] hover:bg-[#6E2F82] text-white font-semibold transition-colors"
            >
              Listo / Ver en la web
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
