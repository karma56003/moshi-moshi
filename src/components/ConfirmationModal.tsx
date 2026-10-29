import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Printer, MessageCircle, CheckCircle2, Heart, Share2, Sparkles, X } from 'lucide-react';
import { OrderData } from '../types/moshi';
import { WHATSAPP_PHONE, STORE_ADDRESS } from '../data/moshiData';
import { playChime, playPop } from '../utils/audio';

interface ConfirmationModalProps {
  order: OrderData | null;
  onClose: () => void;
  onNewOrder: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  order,
  onClose,
  onNewOrder,
}) => {
  useEffect(() => {
    if (order) {
      playChime();
      // Burst celebratory confetti
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff2d7a', '#ff70a6', '#c084fc', '#fbbf24', '#ffffff'],
      });
    }
  }, [order]);

  if (!order) return null;

  const handlePrint = () => {
    playPop();
    window.print();
  };

  // Generate clean WhatsApp message
  const makeWhatsAppMessage = (): string => {
    const itemsLines = order.items
      .map(
        (it) =>
          `• ${it.quantity}x ${it.name}${it.variantLabel ? ` (${it.variantLabel})` : ''}${
            it.spiceLevel ? ` [Picante: ${it.spiceLevel}]` : ''
          } = Bs ${it.price * it.quantity}`
      )
      .join('\n');

    const fulfillmentDetails =
      order.fulfillment === 'delivery'
        ? `🛵 *Modalidad:* Delivery a domicilio\n📍 *Dirección:* ${order.address}\n📌 *Referencia:* ${
            order.reference || 'Sin referencia'
          }`
        : `🏮 *Modalidad:* Recojo en local (San Roque, Fray Manuel Mingo N.º 589)`;

    const paymentDetails =
      order.paymentMethod === 'qr'
        ? `▦ *Pago:* QR Simple (Adjunto comprobante)`
        : `💵 *Pago:* Efectivo al recibir${
            order.cashAmount ? ` (Paga con: ${order.cashAmount})` : ''
          }`;

    return [
      `¡Hola, Moshi Moshi Maid Café! Quiero confirmar mi pedido *#${order.orderNumber}* ♡`,
      ``,
      `👤 *Cliente:* ${order.customerName}`,
      `📱 *WhatsApp:* ${order.customerPhone}`,
      fulfillmentDetails,
      paymentDetails,
      order.notes ? `📝 *Nota:* ${order.notes}` : '',
      ``,
      `🍜 *Detalle de platillos:*`,
      itemsLines,
      ``,
      `💰 *Total:* Bs ${order.total}`,
      ``,
      `¡Muchas gracias! Arigatō gozaimasu ♡`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    makeWhatsAppMessage()
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden my-auto flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl">
              ♡
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-200 block">
                ¡ARIGATŌ GOZAIMASU! · ありがとう
              </span>
              <h3 className="text-xl font-black">¡Pedido Registrado con Éxito!</h3>
            </div>
          </div>

          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Receipt Area */}
        <div className="overflow-y-auto p-6 space-y-5">
          
          {/* Order Code Callout Banner */}
          <div className="bg-pink-50 rounded-2xl p-4 border border-pink-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="text-xs text-pink-600 font-bold uppercase tracking-wider">
                Número Oficial de Pedido
              </span>
              <div className="text-3xl font-black text-slate-900 tracking-tight font-mono">
                #{order.orderNumber}
              </div>
              <span className="text-xs text-slate-500">{order.createdAt}</span>
            </div>

            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Listo para Confirmar</span>
            </div>
          </div>

          {/* Printable Ticket Box */}
          <div
            id="printableTicket"
            className="bg-white rounded-2xl p-5 border-2 border-dashed border-pink-200 font-mono text-xs text-slate-800 space-y-3 shadow-inner"
          >
            {/* Ticket Header */}
            <div className="text-center pb-3 border-b border-dashed border-slate-200">
              <span className="font-bold text-sm block">MOSHI MOSHI MAID CAFÉ</span>
              <span className="text-[11px] text-slate-500 block">Ramen & Kawaii Experience</span>
              <span className="text-[10px] text-slate-400 block">{STORE_ADDRESS}</span>
            </div>

            {/* Ticket Metadata */}
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">TICKET:</span>
                <span className="font-bold">#{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CLIENTE:</span>
                <span className="font-bold">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">TELÉFONO:</span>
                <span>{order.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">MODALIDAD:</span>
                <span className="font-bold uppercase">
                  {order.fulfillment === 'delivery' ? 'Delivery a Domicilio' : 'Recojo en Local'}
                </span>
              </div>
              {order.address && (
                <div className="flex justify-between">
                  <span className="text-slate-500">DIRECCIÓN:</span>
                  <span className="text-right max-w-[200px]">{order.address}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">PAGO:</span>
                <span className="font-bold uppercase">
                  {order.paymentMethod === 'qr' ? 'Pago QR Simple' : 'Efectivo'}
                </span>
              </div>
            </div>

            {/* Item Breakdown */}
            <div className="py-2 border-t border-b border-dashed border-slate-200 space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <span>CANT / PRODUCTO</span>
                <span>TOTAL</span>
              </div>
              {order.items.map((it) => (
                <div key={it.key} className="flex justify-between text-[11px]">
                  <span>
                    {it.quantity}x {it.name} {it.variantLabel ? `(${it.variantLabel})` : ''}
                  </span>
                  <span className="font-bold">Bs {it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between text-sm font-black pt-1">
              <span>TOTAL A PAGAR:</span>
              <span className="text-pink-600">Bs {order.total}</span>
            </div>

            <div className="text-center pt-2 text-[10px] text-slate-400">
              ¡Moe Moe Kyun! Bendecido con amor por las Maids ♡
            </div>
          </div>

          {/* Action: Send to WhatsApp */}
          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playPop}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-emerald-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Enviar Pedido por WhatsApp Ahora ↗</span>
            </a>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Ticket</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playPop();
                  onNewOrder();
                }}
                className="py-3 px-4 bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>Hacer Otro Pedido</span>
              </button>
            </div>
          </div>

          <p className="text-[11px] text-center text-slate-400">
            Puedes presentar este ticket en caja al llegar a nuestro local en San Roque o mostrar tu confirmación de WhatsApp al repartidor.
          </p>
        </div>
      </div>
    </div>
  );
};
