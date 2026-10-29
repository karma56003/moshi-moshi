import React, { useState } from 'react';
import { X, QrCode, Banknote, MapPin, Store, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { CartItem, OrderData } from '../types/moshi';
import { STORE_ADDRESS } from '../data/moshiData';
import { playPop, playChime } from '../utils/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCreated: (order: OrderData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCreated,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState('');
  const [reference, setReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'cash'>('qr');
  const [cashAmount, setCashAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    if (fulfillment === 'delivery' && !address.trim()) return;

    setIsSubmitting(true);
    playChime();

    // Generate clean unique order ID
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `MM-${randomCode}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-BO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: OrderData = {
      orderNumber,
      createdAt: formattedDate,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      fulfillment,
      address: fulfillment === 'delivery' ? address.trim() : undefined,
      reference: fulfillment === 'delivery' ? reference.trim() : undefined,
      paymentMethod,
      cashAmount: paymentMethod === 'cash' ? cashAmount.trim() : undefined,
      notes: notes.trim() || undefined,
      items,
      subtotal,
      deliveryFee: fulfillment === 'delivery' ? 0 : 0, // Tarija delivery rate calculated on dispatch or included
      total: subtotal,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderCreated(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden my-auto flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-pink-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold">
              ♡
            </span>
            <div>
              <h3 className="font-black text-lg text-slate-900">Finalizar mi Pedido Moshi</h3>
              <span className="text-xs text-slate-500">Datos para preparar tu ticket</span>
            </div>
          </div>

          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
          
          {/* Section 1: Customer Info */}
          <div className="bg-pink-50/40 rounded-2xl p-4 sm:p-5 border border-pink-100/80 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-700">
              <span className="w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center text-[11px]">
                1
              </span>
              <span>Tus Datos de Contacto</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="checkoutName" className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  id="checkoutName"
                  type="text"
                  required
                  placeholder="¿Cómo te llamas?"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 bg-white"
                />
              </div>

              <div>
                <label htmlFor="checkoutPhone" className="block text-xs font-bold text-slate-700 mb-1">
                  Número de WhatsApp *
                </label>
                <input
                  id="checkoutPhone"
                  type="tel"
                  required
                  placeholder="Ej. 76543210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery vs Pickup */}
          <div className="bg-pink-50/40 rounded-2xl p-4 sm:p-5 border border-pink-100/80 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-700">
              <span className="w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center text-[11px]">
                2
              </span>
              <span>¿Cómo deseas recibirlo?</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  playPop();
                  setFulfillment('pickup');
                }}
                className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${
                  fulfillment === 'pickup'
                    ? 'border-pink-500 bg-white shadow-sm'
                    : 'border-slate-200 bg-white/60 hover:bg-white text-slate-600'
                }`}
              >
                <Store className={`w-5 h-5 shrink-0 mt-0.5 ${fulfillment === 'pickup' ? 'text-pink-600' : 'text-slate-400'}`} />
                <div>
                  <strong className="block text-sm font-bold text-slate-900">Recojo en el Local</strong>
                  <span className="text-xs text-slate-500 block mt-0.5">Barrio San Roque, Tarija</span>
                  <span className="inline-block mt-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Sin costo adicional
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  playPop();
                  setFulfillment('delivery');
                }}
                className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${
                  fulfillment === 'delivery'
                    ? 'border-pink-500 bg-white shadow-sm'
                    : 'border-slate-200 bg-white/60 hover:bg-white text-slate-600'
                }`}
              >
                <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${fulfillment === 'delivery' ? 'text-pink-600' : 'text-slate-400'}`} />
                <div>
                  <strong className="block text-sm font-bold text-slate-900">Delivery a Domicilio</strong>
                  <span className="text-xs text-slate-500 block mt-0.5">En toda la ciudad de Tarija</span>
                  <span className="inline-block mt-1 text-[11px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                    Empaque térmico sellado
                  </span>
                </div>
              </button>
            </div>

            {/* Delivery address conditional inputs */}
            {fulfillment === 'delivery' && (
              <div className="pt-2 space-y-3 animate-in fade-in duration-200">
                <div>
                  <label htmlFor="delAddress" className="block text-xs font-bold text-slate-700 mb-1">
                    Dirección de Entrega *
                  </label>
                  <input
                    id="delAddress"
                    type="text"
                    required
                    placeholder="Calle, número, zona o barrio en Tarija"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="delReference" className="block text-xs font-bold text-slate-700 mb-1">
                    Punto de Referencia (Opcional)
                  </label>
                  <input
                    id="delReference"
                    type="text"
                    placeholder="Color de reja, frente a qué negocio, esquina..."
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-pink-50/40 rounded-2xl p-4 sm:p-5 border border-pink-100/80 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-700">
              <span className="w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center text-[11px]">
                3
              </span>
              <span>Forma de Pago</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  playPop();
                  setPaymentMethod('qr');
                }}
                className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'qr'
                    ? 'border-pink-500 bg-white shadow-sm'
                    : 'border-slate-200 bg-white/60 hover:bg-white text-slate-600'
                }`}
              >
                <QrCode className={`w-5 h-5 shrink-0 mt-0.5 ${paymentMethod === 'qr' ? 'text-pink-600' : 'text-slate-400'}`} />
                <div>
                  <strong className="block text-sm font-bold text-slate-900">Pago QR Simple</strong>
                  <span className="text-xs text-slate-500 block mt-0.5">Cualquier banco o billetera móvil</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  playPop();
                  setPaymentMethod('cash');
                }}
                className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'cash'
                    ? 'border-pink-500 bg-white shadow-sm'
                    : 'border-slate-200 bg-white/60 hover:bg-white text-slate-600'
                }`}
              >
                <Banknote className={`w-5 h-5 shrink-0 mt-0.5 ${paymentMethod === 'cash' ? 'text-pink-600' : 'text-slate-400'}`} />
                <div>
                  <strong className="block text-sm font-bold text-slate-900">Efectivo al Recibir</strong>
                  <span className="text-xs text-slate-500 block mt-0.5">Pagas al momento de la entrega</span>
                </div>
              </button>
            </div>

            {/* QR Payment visual preview */}
            {paymentMethod === 'qr' && (
              <div className="p-4 rounded-2xl bg-white border border-pink-200 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in duration-200">
                <div className="w-28 h-28 rounded-xl bg-white p-2 border border-slate-200 shadow-sm shrink-0 flex items-center justify-center">
                  <img
                    src="/assets/qr-demo.png"
                    alt="Código QR de Pago Moshi Moshi"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs text-slate-600 space-y-1 text-center sm:text-left">
                  <span className="font-bold text-pink-700 block text-sm">
                    QR Oficial de Cobro Moshi Moshi
                  </span>
                  <p>Escaneable desde BCP, Banco Unión, BNB, Banco FIE, Tigo Money y cualquier app bancaria de Bolivia.</p>
                  <p className="text-slate-500 text-[11px]">
                    Al generar tu ticket podrás guardar el comprobante y enviarlo directamente con tu pedido.
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div className="pt-2 animate-in fade-in duration-200">
                <label htmlFor="cashAmount" className="block text-xs font-bold text-slate-700 mb-1">
                  ¿Con cuánto billete pagarás? (Opcional, para llevar cambio)
                </label>
                <input
                  id="cashAmount"
                  type="text"
                  placeholder="Ej. Pagaré con billete de Bs 100"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 bg-white"
                />
              </div>
            )}
          </div>

          {/* Section 4: Kitchen / Maid Notes */}
          <div>
            <label htmlFor="kitchenNotes" className="block text-xs font-bold text-slate-700 mb-1">
              Indicaciones adicionales o dedicatoria maid (Opcional)
            </label>
            <textarea
              id="kitchenNotes"
              rows={2}
              placeholder="Ej. Por favor enviar palillos extra, mensaje de cumpleaños para mi hermano..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-500 bg-slate-50"
            />
          </div>

          {/* Order Summary Recap */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-700 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900 text-sm pb-2 border-b border-slate-200">
              <span>Resumen de platillos ({items.length})</span>
              <span>Total: Bs {subtotal}</span>
            </div>
            <div className="max-h-28 overflow-y-auto space-y-1 text-slate-600">
              {items.map((it) => (
                <div key={it.key} className="flex justify-between">
                  <span>
                    {it.quantity} × {it.name} {it.variantLabel ? `(${it.variantLabel})` : ''}
                  </span>
                  <span className="font-semibold text-slate-900">
                    Bs {it.price * it.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-pink-500/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generando Ticket Oficial...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Confirmar Pedido · Bs {subtotal}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
