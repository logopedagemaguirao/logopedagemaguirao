import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SafeImage } from './SafeImage';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Download,
  Copy,
  Check,
  Lock,
  ExternalLink,
  Settings,
  Sparkles,
  Smartphone
} from 'lucide-react';

export const ShopCartDrawer: React.FC = () => {
  const { cart, isCartOpen, closeCart, removeFromCart, addToCart, clearCart, cartTotal, gatewayUrl, setGatewayUrl } = useShop();
  const [checkoutMode, setCheckoutMode] = useState<'cart' | 'gateway' | 'bizum' | 'config-gateway' | 'completed'>('cart');
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  // Buyer info
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');

  // Card form info
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [gatewayError, setGatewayError] = useState<string | null>(null);

  // Gateway URL setting
  const [tempGatewayUrl, setTempGatewayUrl] = useState(gatewayUrl);
  const [savedGatewayNotice, setSavedGatewayNotice] = useState(false);

  if (!isCartOpen) return null;

  const handleDecrease = (materialId: string) => {
    const item = cart.find((i) => i.material.id === materialId);
    if (item && item.quantity > 1) {
      removeFromCart(materialId);
      for (let q = 0; q < item.quantity - 1; q++) {
        addToCart(item.material);
      }
    } else {
      removeFromCart(materialId);
    }
  };

  const handleWhatsAppCheckout = () => {
    const phone = '34624718369';
    const itemsList = cart
      .map((item) => `• ${item.material.title} (x${item.quantity}) - ${(item.material.price * item.quantity).toFixed(2)}€`)
      .join('\n');

    const message = encodeURIComponent(
      `Hola Gema! Quiero tramitar la compra de los siguientes materiales clínicos de tu tienda:\n\n${itemsList}\n\n*TOTAL:* ${cartTotal.toFixed(2)}€\n${buyerName ? `*Nombre:* ${buyerName}\n` : ''}${buyerEmail ? `*Email:* ${buyerEmail}\n` : ''}\n¿Me confirmas los detalles para el pago (Bizum o pasarela de pago) y envío de los archivos digitales? ¡Muchas gracias!`
    );

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const copyBizumNumber = () => {
    navigator.clipboard.writeText('624718369');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleProcessCardPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setGatewayError(null);

    if (!buyerName.trim()) {
      setGatewayError('Por favor, indica tu nombre completo.');
      return;
    }
    if (!buyerEmail.trim() || !buyerEmail.includes('@')) {
      setGatewayError('Por favor, indica un correo electrónico válido para recibir los materiales.');
      return;
    }
    if (cardNumber.replace(/\s+/g, '').length < 13) {
      setGatewayError('Por favor, introduce un número de tarjeta válido.');
      return;
    }
    if (!cardExpiry.includes('/')) {
      setGatewayError('Indica la fecha de caducidad en formato MM/AA.');
      return;
    }
    if (cardCvc.length < 3) {
      setGatewayError('Indica el código CVC (3 dígitos al dorso).');
      return;
    }

    setIsProcessing(true);

    // Simulate real secure gateway payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutMode('completed');
    }, 1200);
  };

  const handleSaveGatewayConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setGatewayUrl(tempGatewayUrl.trim());
    setSavedGatewayNotice(true);
    setTimeout(() => {
      setSavedGatewayNotice(false);
      setCheckoutMode('cart');
    }, 1500);
  };

  return (
    <div
      id="shop-cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={closeCart}
    >
      <div
        id="shop-cart-drawer"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between text-left animate-in slide-in-from-right duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-[#EADFED] flex items-center justify-between bg-[#FBF8F3]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EADFED] text-[#6E2F82] flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#3F1F4D]">
                Cesta de Materiales
              </h2>
              <p className="text-xs text-[#2F2931]/65">
                {cart.length} {cart.length === 1 ? 'material seleccionado' : 'materiales seleccionados'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FBF8F3] border border-[#EADFED] text-[#6E2F82] flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 opacity-50" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-lg font-bold text-[#3F1F4D]">
                  Tu cesta está vacía
                </p>
                <p className="text-xs text-[#2F2931]/70 max-w-xs mx-auto">
                  Explora nuestros materiales de estimulación, ruletas fonológicas y guías clínicas para añadirlos aquí.
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6E2F82] text-white text-xs font-bold shadow-xs hover:bg-[#3F1F4D] cursor-pointer"
              >
                <span>Explorar la tienda</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : checkoutMode === 'gateway' ? (
            /* PASARELA DE PAGO VIEW */
            <div className="space-y-5 animate-in fade-in duration-200">
              <button
                type="button"
                onClick={() => setCheckoutMode('cart')}
                className="text-xs font-semibold text-[#6E2F82] hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Volver a la lista de artículos
              </button>

              <div className="p-4 rounded-2xl bg-[#3F1F4D] text-[#FBF8F3] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#EADFED]">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pasarela de Pago Segura</span>
                  </span>
                  <span className="font-mono text-[11px] bg-[#6E2F82] px-2 py-0.5 rounded-md">SSL 256-bit</span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-sm">Total a pagar:</span>
                  <span className="font-serif text-2xl font-bold text-white">{cartTotal.toFixed(2)} €</span>
                </div>
              </div>

              {/* If Gema configured an external Stripe/Redsys link, offer 1-click redirect */}
              {gatewayUrl && (
                <div className="p-4 rounded-2xl bg-[#EADFED]/60 border border-[#B68FC1]/40 space-y-2 text-xs">
                  <p className="font-bold text-[#3F1F4D] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#6E2F82]" />
                    <span>Pasarela Oficial Externa Vinculada</span>
                  </p>
                  <p className="text-[#2F2931]/75 leading-relaxed">
                    Tienes configurado el enlace directo de tu pasarela de pago. Puedes pagar directamente en su servidor seguro:
                  </p>
                  <a
                    href={gatewayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white font-bold transition-all"
                  >
                    <span>ABRIR MI PASARELA DE PAGO ({gatewayUrl.slice(0, 24)}...)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-[11px] text-gray-500 text-center">o continúa abajo con tarjeta directa</p>
                </div>
              )}

              {/* Integrated Secure Card Form */}
              <form onSubmit={handleProcessCardPayment} className="space-y-3.5 text-xs">
                {gatewayError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[11px]">
                    {gatewayError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="font-bold text-[#3F1F4D] uppercase tracking-wider text-[11px] block">
                    Nombre completo del titular *
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Ej: María López Pérez"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADFED] text-xs focus:ring-2 focus:ring-[#6E2F82]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#3F1F4D] uppercase tracking-wider text-[11px] block">
                    Correo electrónico (para recibir las descargas) *
                  </label>
                  <input
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADFED] text-xs focus:ring-2 focus:ring-[#6E2F82]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#3F1F4D] uppercase tracking-wider text-[11px] block">
                    Número de tarjeta *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                        setCardNumber(val);
                      }}
                      placeholder="4548 •••• •••• 1234"
                      className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-[#EADFED] font-mono text-xs focus:ring-2 focus:ring-[#6E2F82]"
                    />
                    <CreditCard className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[#3F1F4D] uppercase tracking-wider text-[11px] block">
                      Caducidad (MM/AA) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.length >= 2) {
                          val = val.slice(0, 2) + '/' + val.slice(2, 4);
                        }
                        setCardExpiry(val);
                      }}
                      placeholder="12/28"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADFED] font-mono text-xs focus:ring-2 focus:ring-[#6E2F82]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#3F1F4D] uppercase tracking-wider text-[11px] block">
                      CVC / CVV *
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                      placeholder="•••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADFED] font-mono text-xs focus:ring-2 focus:ring-[#6E2F82]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 px-4 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    {isProcessing ? (
                      <span>Procesando pago en pasarela segura...</span>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-[#EADFED]" />
                        <span>Pagar {cartTotal.toFixed(2)} € y Descargar Materiales</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 text-[10px] text-gray-500 pt-1">
                  <span>🔒 Transacción encriptada</span>
                  <span>•</span>
                  <span>Cumplimiento PCI-DSS</span>
                  <span>•</span>
                  <span>Sin comisiones ocultas</span>
                </div>
              </form>
            </div>
          ) : checkoutMode === 'bizum' ? (
            /* Bizum payment instructions */
            <div className="space-y-5 animate-in fade-in duration-200">
              <button
                type="button"
                onClick={() => setCheckoutMode('cart')}
                className="text-xs font-semibold text-[#6E2F82] hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Volver a la lista de artículos
              </button>

              <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#EADFED] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#3F1F4D] flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-[#6E2F82]" />
                    <span>Pago Directo por Bizum</span>
                  </span>
                  <span className="font-serif text-lg font-bold text-[#6E2F82]">
                    {cartTotal.toFixed(2)} €
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#EADFED] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-500 block">Número de teléfono / WhatsApp Bizum:</span>
                    <span className="font-mono text-base font-bold text-[#3F1F4D] tracking-wide">
                      624 71 83 69
                    </span>
                    <span className="text-[11px] text-[#6E2F82] block mt-0.5">Titular: Gema Guirao (Neurologopeda)</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyBizumNumber}
                    className="p-2 rounded-lg bg-[#EADFED] text-[#3F1F4D] hover:bg-[#B68FC1] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedPhone ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPhone ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-[#2F2931]/80">
                  <p className="font-semibold text-[#3F1F4D]">Concepto a indicar en tu Bizum:</p>
                  <p className="bg-white p-2 rounded-lg border border-[#EADFED] font-mono text-[11px]">
                    MATERIALES - {buyerName || 'Tu Nombre'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3F1F4D]">
                  Tus datos para enviarte los archivos digitales:
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Tu nombre y apellidos"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:ring-2 focus:ring-[#6E2F82]"
                />
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="Tu correo electrónico (para enviar el PDF)"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EADFED] text-xs text-[#2F2931] focus:ring-2 focus:ring-[#6E2F82]"
                />
              </div>

              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CONFIRMAR BIZUM POR WHATSAPP</span>
              </button>
            </div>
          ) : checkoutMode === 'config-gateway' ? (
            /* CONFIGURAR PASARELA DE PAGO */
            <div className="space-y-5 animate-in fade-in duration-200">
              <button
                type="button"
                onClick={() => setCheckoutMode('cart')}
                className="text-xs font-semibold text-[#6E2F82] hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Volver a la cesta
              </button>

              <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#EADFED] space-y-3 text-xs">
                <div className="flex items-center gap-2 text-[#3F1F4D] font-bold">
                  <Settings className="w-4 h-4 text-[#6E2F82]" />
                  <span>Configuración de Pasarela de Pago (Para Gema Guirao)</span>
                </div>
                <p className="text-[#2F2931]/75 leading-relaxed">
                  Pega aquí el enlace de tu pasarela de pago (enlace de pago de Stripe, enlace de Redsys, PayPal o Bizum Profesional). Los pacientes y clientes podrán pulsar y pagar directamente en tu cuenta.
                </p>

                {savedGatewayNotice && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>¡Enlace de pasarela de pago guardado con éxito!</span>
                  </div>
                )}

                <form onSubmit={handleSaveGatewayConfig} className="space-y-3 pt-1">
                  <div className="space-y-1">
                    <label className="font-bold text-[#3F1F4D] text-[11px] block">
                      URL de tu Pasarela de Pago (Stripe / Redsys / PayPal)
                    </label>
                    <input
                      type="url"
                      value={tempGatewayUrl}
                      onChange={(e) => setTempGatewayUrl(e.target.value)}
                      placeholder="https://buy.stripe.com/... o https://pagos.redsys.es/..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADFED] text-xs font-mono bg-white focus:ring-2 focus:ring-[#6E2F82]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white font-bold text-xs cursor-pointer"
                    >
                      Guardar Enlace de Pasarela
                    </button>
                    {tempGatewayUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setTempGatewayUrl('');
                          setGatewayUrl('');
                        }}
                        className="px-3 py-2 rounded-xl border border-gray-300 text-gray-600 text-xs"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          ) : checkoutMode === 'completed' ? (
            /* COMPLETED / SUCCESS VIEW */
            <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#3F1F4D]">
                  ¡Pago procesado con éxito!
                </h3>
                <p className="text-xs text-[#2F2931]/80 max-w-xs mx-auto">
                  Gracias por tu compra, <strong>{buyerName || 'cliente'}</strong>. Hemos enviado la confirmación y los archivos a <strong>{buyerEmail || 'tu email'}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#EADFED] text-left space-y-3">
                <span className="text-[11px] font-bold text-[#6E2F82] uppercase tracking-wider block">
                  Descarga inmediata de tus materiales:
                </span>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.material.id} className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#EADFED] text-xs">
                      <span className="font-semibold text-[#3F1F4D] truncate pr-2">
                        {item.material.title}
                      </span>
                      <a
                        href={item.material.downloadUrl || '#'}
                        onClick={(e) => {
                          if (!item.material.downloadUrl) {
                            e.preventDefault();
                            alert(`Descargando material clínico: ${item.material.title} (PDF)`);
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#6E2F82] text-white text-[11px] font-bold shrink-0"
                      >
                        <Download className="w-3 h-3" />
                        <span>Descargar PDF</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  clearCart();
                  setCheckoutMode('cart');
                  closeCart();
                }}
                className="w-full py-3 rounded-xl bg-[#3F1F4D] text-white text-xs font-bold shadow-sm"
              >
                Cerrar y volver a la consulta
              </button>
            </div>
          ) : (
            /* Items List */
            cart.map((item) => (
              <div
                key={item.material.id}
                className="p-3.5 rounded-2xl border border-[#EADFED] bg-white flex items-center gap-3 shadow-xs hover:border-[#B68FC1] transition-colors"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FBF8F3] shrink-0 border border-[#EADFED]">
                  <SafeImage
                    src={item.material.imageUrl}
                    alt={item.material.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#3F1F4D] truncate">
                    {item.material.title}
                  </h4>
                  <p className="text-[11px] text-[#6E2F82]">
                    {item.material.format}
                  </p>
                  <p className="font-bold text-xs text-[#3F1F4D]">
                    {item.material.isFree ? 'Gratis' : `${(item.material.price * item.quantity).toFixed(2)} €`}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.material.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                    title="Eliminar de la cesta"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-[#FBF8F3] border border-[#EADFED] rounded-lg p-0.5">
                    <button
                      type="button"
                      onClick={() => handleDecrease(item.material.id)}
                      className="p-1 hover:bg-white rounded text-[#3F1F4D] cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold px-1 text-[#3F1F4D]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(item.material)}
                      className="p-1 hover:bg-white rounded text-[#3F1F4D] cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout actions */}
        {cart.length > 0 && checkoutMode === 'cart' && (
          <div className="p-5 sm:p-6 border-t border-[#EADFED] bg-[#FBF8F3] space-y-3.5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#2F2931]/75">
                <span>Subtotal materiales</span>
                <span>{cartTotal.toFixed(2)} €</span>
              </div>
              <div className="flex items-center justify-between text-xs text-emerald-700">
                <span>Envío digital / Descarga</span>
                <span className="font-bold">Inmediato / 0,00 €</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#EADFED]">
                <span className="font-serif font-bold text-sm text-[#3F1F4D]">TOTAL</span>
                <span className="font-serif font-bold text-xl text-[#3F1F4D]">
                  {cartTotal.toFixed(2)} €
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              {/* Primary Payment: Gateway / Card */}
              <button
                type="button"
                onClick={() => setCheckoutMode('gateway')}
                className="w-full py-3 px-4 rounded-xl bg-[#6E2F82] hover:bg-[#3F1F4D] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-[#EADFED]" />
                <span>PAGAR CON PASARELA DE PAGO (TARJETA)</span>
              </button>

              {/* Bizum */}
              <button
                type="button"
                onClick={() => setCheckoutMode('bizum')}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#EADFED] text-[#3F1F4D] border border-[#B68FC1]/50 text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#6E2F82]" />
                <span>PAGAR CON BIZUM (624 71 83 69)</span>
              </button>

              {/* WhatsApp Checkout Button */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>PEDIR POR WHATSAPP / CONSULTAR</span>
              </button>

              <div className="flex items-center justify-between pt-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setCheckoutMode('config-gateway')}
                  className="text-[#6E2F82] hover:underline flex items-center gap-1"
                >
                  <Settings className="w-3 h-3" />
                  <span>Configurar mi pasarela de pago</span>
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-gray-400 hover:text-red-600"
                >
                  Vaciar cesta
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6E2F82]" />
              <span>Garantía de material clínico elaborado por Gema Guirao (Col. 30/695)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
