import { useState, useEffect } from 'react';
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
import { CustomImageProvider } from './context/CustomImageContext';
import { ShopProvider } from './context/ShopContext';
import { BlogProvider } from './context/BlogContext';
import { FloatingContactDock } from './components/FloatingContactDock';

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
