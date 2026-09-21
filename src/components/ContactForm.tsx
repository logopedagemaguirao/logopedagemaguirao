import { useState, FormEvent } from 'react';
import { PageRoute } from '../types';
import { Send, CheckCircle2, AlertCircle, Mail, ExternalLink } from 'lucide-react';

interface ContactFormProps {
  onNavigate?: (route: PageRoute) => void;
}

export const ContactForm = ({ onNavigate }: ContactFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preparedNotice, setPreparedNotice] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Por favor, introduce tu nombre completo.';
    if (!phone.trim()) newErrors.phone = 'Por favor, introduce un número de teléfono de contacto.';
    if (!email.trim()) {
      newErrors.email = 'Por favor, introduce tu correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'El formato del correo electrónico no es válido.';
    }
    if (!reason.trim()) newErrors.reason = 'Por favor, indica brevemente el motivo de tu consulta.';
    if (!privacyAccepted) newErrors.privacy = 'Debes aceptar la política de privacidad para continuar.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    // According to specification:
    // "El formulario debe quedar técnicamente preparado para conectarlo posteriormente a un servicio de envío de correo o backend.
    // No simular que se ha enviado si todavía no existe backend."
    setPreparedNotice(true);
  };

  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(`Consulta Logopedia: ${name}`);
    const body = encodeURIComponent(
      `Nombre: ${name}\nTeléfono: ${phone}\nEmail: ${email}\n\nMotivo de consulta:\n${reason}`
    );
    window.location.href = `mailto:LogopedaGemaguirao@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div id="contact-form-container" className="bg-white rounded-2xl border border-[#EADFED] p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-serif font-bold text-[#3F1F4D]">Formulario de consulta</h3>
        <p className="text-xs text-[#2F2931]/70 mt-1">
          Completa los datos y nos pondremos en contacto contigo para valorar la consulta.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Nombre */}
        <div>
          <label htmlFor="form-nombre" className="block text-xs font-semibold uppercase tracking-wider text-[#3F1F4D] mb-1.5">
            Nombre <span className="text-[#6E2F82]">*</span>
          </label>
          <input
            type="text"
            id="form-nombre"
            name="nombre"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            placeholder="Nombre y apellidos"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#2F2931] placeholder-[#2F2931]/40 bg-[#FBF8F3]/50 focus:bg-white focus:outline-none transition-colors ${
              errors.name ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-[#EADFED] focus:border-[#6E2F82] focus:ring-2 focus:ring-[#EADFED]'
            }`}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'error-nombre' : undefined}
          />
          {errors.name && (
            <p id="error-nombre" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="form-telefono" className="block text-xs font-semibold uppercase tracking-wider text-[#3F1F4D] mb-1.5">
            Teléfono <span className="text-[#6E2F82]">*</span>
          </label>
          <input
            type="tel"
            id="form-telefono"
            name="telefono"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            placeholder="Ej: 600 000 000"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#2F2931] placeholder-[#2F2931]/40 bg-[#FBF8F3]/50 focus:bg-white focus:outline-none transition-colors ${
              errors.phone ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-[#EADFED] focus:border-[#6E2F82] focus:ring-2 focus:ring-[#EADFED]'
            }`}
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'error-telefono' : undefined}
          />
          {errors.phone && (
            <p id="error-telefono" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Correo electrónico */}
        <div>
          <label htmlFor="form-email" className="block text-xs font-semibold uppercase tracking-wider text-[#3F1F4D] mb-1.5">
            Correo electrónico <span className="text-[#6E2F82]">*</span>
          </label>
          <input
            type="email"
            id="form-email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            placeholder="ejemplo@correo.com"
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#2F2931] placeholder-[#2F2931]/40 bg-[#FBF8F3]/50 focus:bg-white focus:outline-none transition-colors ${
              errors.email ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-[#EADFED] focus:border-[#6E2F82] focus:ring-2 focus:ring-[#EADFED]'
            }`}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'error-email' : undefined}
          />
          {errors.email && (
            <p id="error-email" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Motivo de consulta */}
        <div>
          <label htmlFor="form-motivo" className="block text-xs font-semibold uppercase tracking-wider text-[#3F1F4D] mb-1.5">
            Motivo de consulta <span className="text-[#6E2F82]">*</span>
          </label>
          <textarea
            id="form-motivo"
            name="motivo"
            rows={4}
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (errors.reason) setErrors({ ...errors, reason: '' });
            }}
            placeholder="Describe brevemente la dificultad, edad de la persona o diagnóstico previo si lo hubiera..."
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#2F2931] placeholder-[#2F2931]/40 bg-[#FBF8F3]/50 focus:bg-white focus:outline-none transition-colors resize-y ${
              errors.reason ? 'border-rose-400 focus:ring-2 focus:ring-rose-200' : 'border-[#EADFED] focus:border-[#6E2F82] focus:ring-2 focus:ring-[#EADFED]'
            }`}
            aria-required="true"
            aria-invalid={!!errors.reason}
            aria-describedby={errors.reason ? 'error-motivo' : undefined}
          />
          {errors.reason && (
            <p id="error-motivo" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.reason}
            </p>
          )}
        </div>

        {/* Checkbox política de privacidad */}
        <div className="pt-1">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="form-privacidad"
              name="privacidad"
              checked={privacyAccepted}
              onChange={(e) => {
                setPrivacyAccepted(e.target.checked);
                if (errors.privacy) setErrors({ ...errors, privacy: '' });
              }}
              className="mt-1 w-4 h-4 text-[#6E2F82] rounded border-[#B68FC1] focus:ring-[#6E2F82] focus:ring-offset-1"
              aria-required="true"
              aria-invalid={!!errors.privacy}
              aria-describedby={errors.privacy ? 'error-privacidad' : undefined}
            />
            <label htmlFor="form-privacidad" className="text-xs text-[#2F2931]/80 leading-snug cursor-pointer select-none">
              He leído y acepto la{' '}
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('privacidad')}
                className="text-[#6E2F82] underline font-medium hover:text-[#3F1F4D]"
              >
                política de privacidad
              </button>{' '}
              para el tratamiento de los datos aportados en esta consulta sanitaria.
            </label>
          </div>
          {errors.privacy && (
            <p id="error-privacidad" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.privacy}
            </p>
          )}
        </div>

        {/* Action Button: ENVIAR CONSULTA */}
        <div className="pt-2">
          <button
            type="submit"
            id="form-btn-enviar-consulta"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white text-sm font-semibold tracking-wide transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E2F82] focus:ring-offset-2"
          >
            <Send className="w-4 h-4 text-[#EADFED]" />
            <span>ENVIAR CONSULTA</span>
          </button>
        </div>
      </form>

      {/* Notice box when form validation is executed */}
      {preparedNotice && (
        <div
          id="form-technical-notice"
          className="mt-6 p-4 rounded-xl bg-[#EADFED]/60 border border-[#B68FC1]/50 text-xs text-[#3F1F4D] space-y-2 animate-fadeIn"
          role="status"
        >
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#6E2F82]" />
            <span>Campos validados correctamente</span>
          </div>
          <p className="text-[#2F2931]/80 leading-relaxed">
            Este formulario está técnicamente preparado con validación accesible y listo para vincularse al servicio de backend o mensajería de la consulta. No se simula un envío ficticio sin backend activo.
          </p>
          <div className="pt-1">
            <button
              type="button"
              id="form-btn-open-email-client"
              onClick={handleOpenMailClient}
              className="inline-flex items-center gap-1.5 font-semibold text-[#6E2F82] hover:text-[#3F1F4D] underline underline-offset-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Enviar consulta directamente por correo (LogopedaGemaguirao@gmail.com)</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
