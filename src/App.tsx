import { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { HowIWorkView } from './views/HowIWorkView';
import { FaqView } from './views/FaqView';
import { ContactView } from './views/ContactView';
import { LegalView } from './views/LegalView';
import { NewsletterView } from './views/NewsletterView';
import { BlogView } from './views/BlogView';
import { ShopView } from './views/ShopView';
import { CustomImageProvider, useCustomImages } from './context/CustomImageContext';
import { ShopProvider } from './context/ShopContext';
import { BlogProvider } from './context/BlogContext';
import { ImageUploadModal } from './components/ImageUploadModal';
import { FloatingContactDock } from './components/FloatingContactDock';

function TopPhotoBanner() {
  const { openUploadModal, customImages } = useCustomImages();
  const [dismissed, setDismissed] = useState(false);
  const count = Object.keys(customImages).length;

  if (dismissed || count > 0) return null;

  return (
    <div id="top-photo-banner" className="bg-gradient-to-r from-[#3F1F4D] via-[#6E2F82] to-[#3F1F4D] text-white px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">📸</span>
          <span>
            <strong>Personalizar fotos y logotipo:</strong> No necesitas buscar ninguna carpeta; puedes subirlas directamente en pantalla.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openUploadModal()}
            className="px-3 py-1 rounded-lg bg-[#F5ECDF] hover:bg-white text-[#3F1F4D] font-bold text-xs transition-colors cursor-pointer"
          >
            Subir mis fotos aquí
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/70 hover:text-white px-1 font-bold text-sm"
            title="Ocultar aviso"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

function FloatingUploadTrigger() {
  const { openUploadModal, customImages } = useCustomImages();
  const count = Object.keys(customImages).length;

  return (
    <button
      id="floating-upload-btn"
      onClick={() => openUploadModal()}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#6E2F82] hover:bg-[#3F1F4D] text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all border border-white/30 cursor-pointer"
      title="Subir fotos o cambiar las imágenes de la web"
    >
      <Camera className="w-4 h-4" />
      <span>{count > 0 ? `Fotos (${count}) · Gestionar` : '📷 Subir mis fotos'}</span>
    </button>
  );
}

function MainApp() {
  const parseRouteFromLocation = (): PageRoute => {
    const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    const target = path || hash;

    if (target.includes('neurologopedia')) return 'neurologopedia';
    if (target.includes('disfagia')) return 'disfagia';
    if (target.includes('voz')) return 'voz';
    if (target.includes('terapia-miofuncional') || target.includes('miofuncional')) return 'terapia-miofuncional';
    if (target.includes('lenguaje-habla') || target.includes('lenguaje')) return 'lenguaje-habla';
    if (target.includes('lectoescritura') || target.includes('lectura')) return 'lectoescritura';
    if (target.includes('sobre-mi')) return 'sobre-mi';
    if (target.includes('servicios')) return 'servicios';
    if (target.includes('como-trabajo')) return 'como-trabajo';
    if (target.includes('preguntas-frecuentes') || target.includes('faq')) return 'preguntas-frecuentes';
    if (target.includes('contacto')) return 'contacto';
    if (target.includes('blog')) return 'blog';
    if (target.includes('newsletter') || target.includes('boletin')) return 'blog';
    if (target.includes('tienda') || target.includes('materiales') || target.includes('shop')) return 'tienda';
    if (target.includes('aviso-legal')) return 'aviso-legal';
    if (target.includes('privacidad')) return 'privacidad';
    if (target.includes('cookies')) return 'cookies';

    return 'inicio';
  };

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(parseRouteFromLocation);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(parseRouteFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    const targetPath = route === 'inicio' ? '/' : `/${route}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#2F2931]">
      <SEOHead route={currentRoute} />
      <TopPhotoBanner />

      <Header currentRoute={currentRoute} onNavigate={handleNavigate} />

      <main id="main-content" className="flex-grow">
        {currentRoute === 'inicio' && <HomeView onNavigate={handleNavigate} />}

        {currentRoute === 'sobre-mi' && <AboutView onNavigate={handleNavigate} />}

        {[
          'servicios',
          'neurologopedia',
          'lenguaje-habla',
          'voz',
          'disfagia',
          'terapia-miofuncional',
          'lectoescritura'
        ].includes(currentRoute) && (
          <ServiceDetailView currentRoute={currentRoute} onNavigate={handleNavigate} />
        )}

        {currentRoute === 'como-trabajo' && <HowIWorkView onNavigate={handleNavigate} />}

        {currentRoute === 'preguntas-frecuentes' && <FaqView onNavigate={handleNavigate} />}

        {currentRoute === 'contacto' && <ContactView onNavigate={handleNavigate} />}

        {(currentRoute === 'blog' || currentRoute === 'newsletter') && (
          <BlogView onNavigate={handleNavigate} />
        )}

        {currentRoute === 'tienda' && <ShopView onNavigate={handleNavigate} />}

        {(currentRoute === 'aviso-legal' || currentRoute === 'privacidad' || currentRoute === 'cookies') && (
          <LegalView type={currentRoute} onNavigate={handleNavigate} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <FloatingContactDock />
      <FloatingUploadTrigger />
      <ImageUploadModal />
    </div>
  );
}

export default function App() {
  return (
    <CustomImageProvider>
      <ShopProvider>
        <BlogProvider>
          <MainApp />
        </BlogProvider>
      </ShopProvider>
    </CustomImageProvider>
  );
}
