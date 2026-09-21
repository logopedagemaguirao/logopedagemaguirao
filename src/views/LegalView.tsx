import { PageRoute } from '../types';
import { Shield, Lock, Cookie, FileText, ArrowLeft } from 'lucide-react';

interface LegalViewProps {
  type: 'aviso-legal' | 'privacidad' | 'cookies';
  onNavigate: (route: PageRoute) => void;
}

export const LegalView = ({ type, onNavigate }: LegalViewProps) => {
  return (
    <div id={`legal-page-${type}`} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <button
        onClick={() => onNavigate('inicio')}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6E2F82] hover:text-[#3F1F4D] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al inicio</span>
      </button>

      {/* AVISO LEGAL */}
      {type === 'aviso-legal' && (
        <article className="space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#EADFED] shadow-sm text-[#2F2931]/85 text-sm sm:text-base leading-relaxed">
          <div className="space-y-2 border-b border-[#EADFED] pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6E2F82] uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Marco Jurídico y LSSI-CE</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3F1F4D]">
              Aviso Legal
            </h1>
            <p className="text-xs text-[#2F2931]/60">
              Última actualización: Septiembre 2026. Documento preparado para revisión antes de publicación definitiva.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              1. Datos identificativos del titular
            </h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se ponen a disposición los datos de la titular del sitio web:
            </p>
            <ul className="space-y-1.5 bg-[#FBF8F3] p-4 rounded-xl border border-[#EADFED] text-xs sm:text-sm">
              <li><strong>Titular:</strong> Gema Guirao</li>
              <li><strong>Profesión:</strong> Neurologopeda / Logopeda colegiada</li>
              <li><strong>Número de colegiación:</strong> 30/695 (Colegio Oficial de Logopedas de la Región de Murcia)</li>
              <li><strong>NIF/DNI:</strong> Disponible a petición del interesado conforme a ley</li>
              <li><strong>Domicilio profesional / consulta:</strong> CIMM (Centro de Iniciativas Municipales de Murcia), Ctra. de Churra, 96, 30007 Santiago y Zaraíche, Murcia</li>
              <li><strong>Correo electrónico de contacto:</strong> LogopedaGemaguirao@gmail.com</li>
              <li><strong>Teléfono de contacto:</strong> 624 71 83 69</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              2. Objeto y ámbito de aplicación
            </h2>
            <p>
              El presente sitio web tiene por objeto informar sobre los servicios de logopedia, neurologopedia y terapia miofuncional ofrecidos por Gema Guirao, así como facilitar la solicitud de citas y consultas.
            </p>
            <p>
              El acceso a esta web atribuye la condición de persona usuaria e implica la aceptación plena de todas las condiciones aquí recogidas.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              3. Información sanitaria y exención de diagnóstico
            </h2>
            <p>
              Los contenidos informativos publicados en esta web tienen carácter orientativo y divulgativo. En ningún caso sustituyen la evaluación clínica directa, el diagnóstico formal ni la prescripción terapéutica de un profesional sanitario cualificado. En patologías como disfagia, alteraciones vocales orgánicas o afecciones neurológicas agudas, se requerirá la preceptiva coordinación con los especialistas médicos pertinentes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              4. Propiedad intelectual e industrial
            </h2>
            <p>
              Todos los contenidos de este sitio web (textos, logotipo “LOGOPEDA GEMA GUIRAO”, grafismos, estructura y diseño) están protegidos por derechos de propiedad intelectual e industrial, titularidad exclusiva de Gema Guirao o de terceros autorizados. Queda prohibida su reproducción o distribución sin autorización expresa.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              5. Legislación aplicable y jurisdicción
            </h2>
            <p>
              Para la resolución de cualquier controversia o cuestión relativa a este sitio web o a las actividades en él desarrolladas, será de aplicación la legislación española vigente, sometiéndose las partes expresamente a los Juzgados y Tribunales competentes de la ciudad de Murcia.
            </p>
          </section>
        </article>
      )}

      {/* POLÍTICA DE PRIVACIDAD */}
      {type === 'privacidad' && (
        <article className="space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#EADFED] shadow-sm text-[#2F2931]/85 text-sm sm:text-base leading-relaxed">
          <div className="space-y-2 border-b border-[#EADFED] pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6E2F82] uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>RGPD & LOPDGDD</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3F1F4D]">
              Política de Privacidad
            </h1>
            <p className="text-xs text-[#2F2931]/60">
              Última actualización: Septiembre 2026. Cumplimiento del Reglamento (UE) 2016/679 (RGPD) y Ley Orgánica 3/2018.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              1. Responsable del tratamiento de datos
            </h2>
            <ul className="space-y-1.5 bg-[#FBF8F3] p-4 rounded-xl border border-[#EADFED] text-xs sm:text-sm">
              <li><strong>Identidad:</strong> Gema Guirao (Neurologopeda colegiada 30/695)</li>
              <li><strong>Dirección:</strong> CIMM (Centro de Iniciativas Municipales de Murcia), Ctra. de Churra, 96, 30007 Santiago y Zaraíche, Murcia</li>
              <li><strong>Teléfono:</strong> 624 71 83 69</li>
              <li><strong>Correo electrónico de privacidad:</strong> LogopedaGemaguirao@gmail.com</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              2. Finalidad del tratamiento de datos sanitarios
            </h2>
            <p>
              Los datos personales facilitados a través del formulario de consulta, correo electrónico o reservas de agenda se tratarán con las siguientes finalidades:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Gestionar solicitudes de primera entrevista y asignación de citas previas.</li>
              <li>Responder a consultas clínicas formuladas por el paciente o sus representantes legales.</li>
              <li>En caso de iniciar intervención terapéutica, apertura de la correspondiente historia clínica conforme a la Ley 41/2002 de Autonomía del Paciente.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              3. Legitimación para el tratamiento
            </h2>
            <p>
              La base legal para el tratamiento de datos es el consentimiento explícito del interesado al remitir el formulario o agendar cita (art. 6.1.a RGPD). Para el tratamiento de categorías especiales de datos de salud en el marco asistencial, la legitimación se fundamenta en los artículos 9.2.a y 9.2.h del RGPD (prestación de asistencia sanitaria o tratamientos médicos por profesional sujeto a deber de secreto).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              4. Conservación y confidencialidad
            </h2>
            <p>
              Los datos de mera consulta se conservarán durante el tiempo necesario para resolver la solicitud. Los datos relativos a historias clínicas se conservarán durante los plazos legalmente fijados por la normativa sanitaria aplicable (un mínimo de cinco años tras el alta del proceso).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              5. Ejercicio de derechos
            </h2>
            <p>
              Cualquier persona puede ejercer sus derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición dirigiéndose mediante correo electrónico a <strong>LogopedaGemaguirao@gmail.com</strong> indicando el derecho que desea ejercer y acreditando su identidad. Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).
            </p>
          </section>
        </article>
      )}

      {/* POLÍTICA DE COOKIES */}
      {type === 'cookies' && (
        <article className="space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#EADFED] shadow-sm text-[#2F2931]/85 text-sm sm:text-base leading-relaxed">
          <div className="space-y-2 border-b border-[#EADFED] pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6E2F82] uppercase tracking-wider">
              <Cookie className="w-4 h-4" />
              <span>Transparencia Web</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3F1F4D]">
              Política de Cookies
            </h1>
            <p className="text-xs text-[#2F2931]/60">
              Última actualización: Septiembre 2026. Directiva e-Privacy y Guía de Cookies de la AEPD.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              1. ¿Qué son las cookies?
            </h2>
            <p>
              Una cookie es un pequeño archivo que se almacena en el navegador del usuario al acceder a determinadas páginas web con el fin de recordar preferencias de navegación o recopilar información estadística estrictamente anónima.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              2. Cookies utilizadas en este sitio web
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#FBF8F3] border border-[#EADFED]">
                <h3 className="font-semibold text-sm text-[#3F1F4D]">Cookies técnicas estrictamente necesarias</h3>
                <p className="text-xs text-[#2F2931]/75 mt-1">
                  Son indispensables para el correcto funcionamiento del sitio, la navegación segura y la carga fluida de recursos. No requieren consentimiento conforme a la legislación aplicable.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FBF8F3] border border-[#EADFED]">
                <h3 className="font-semibold text-sm text-[#3F1F4D]">Servicios externos (Google Calendar)</h3>
                <p className="text-xs text-[#2F2931]/75 mt-1">
                  Al enlazar a la agenda de Google Calendar (calendar.app.google), la interacción en dicho dominio se rige bajo la política de privacidad y cookies propia de Google Inc.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#3F1F4D]">
              3. Gestión y desactivación de cookies
            </h2>
            <p>
              Puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador o dispositivo móvil:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Configuración de cookies en Google Chrome</li>
              <li>Configuración de cookies en Mozilla Firefox</li>
              <li>Configuración de cookies en Apple Safari</li>
              <li>Configuración de cookies en Microsoft Edge</li>
            </ul>
          </section>
        </article>
      )}
    </div>
  );
};
