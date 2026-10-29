const WHATSAPP_NUMBER = "59169316271";
const products = [
  {
    id: "ramen-clasico", name: "Ramen clásico", category: "ramen", image: "assets/ramen-clasico.jpg", tag: "Favorito", description: "Sopa de fideo al estilo japonés, con cerdo, zanahoria, cebollín y huevo.",
    variants: [{ label: "Chibi (pequeño)", price: 15 }, { label: "Sempai (grande)", price: 25 }]
  },
  {
    id: "ramen-especial", name: "Ramen especial", category: "ramen", image: "assets/ramen-picante.jpg", tag: "Especial", description: "Una opción especial para disfrutar el sabor de la casa.",
    variants: [{ label: "Chibi (pequeño)", price: 17 }, { label: "Sempai (grande)", price: 27 }]
  },
  {
    id: "soseji-ramen", name: "Soseji ramen", category: "ramen", image: "assets/ramen-soseji.jpg", tag: "Sabor de la casa", description: "Ramen con salchicha en forma de pulpo, huevo, verduras y semillas de sésamo.",
    variants: [{ label: "Chibi (pequeño)", price: 17 }, { label: "Sempai (grande)", price: 27 }]
  },
  {
    id: "ramen-bekon", name: "Ramen Bekon", category: "ramen", image: "assets/ramen-chashu.jpg", tag: "Intenso", description: "Ramen con tocino, huevo, verduras, champiñones y semillas de sésamo.",
    variants: [{ label: "Chibi (pequeño)", price: 20 }, { label: "Sempai (grande)", price: 30 }]
  },
  {
    id: "ramen-mixto-soseji", name: "Ramen mixto soseji", category: "ramen", image: "assets/ramen-soseji.jpg", tag: "Premium", description: "Una combinación contundente para disfrutar en tamaño pequeño o grande.",
    variants: [{ label: "Chibi (pequeño)", price: 25 }, { label: "Sempai (grande)", price: 35 }]
  },
  {
    id: "ramen-inosuke", name: "Ramen Inosuke", category: "ramen", image: "assets/ramen-chashu.jpg", tag: "Premium", description: "Ramen de la casa con cerdo, tocino, huevo, verduras, champiñones y sésamo.",
    variants: [{ label: "Chibi (pequeño)", price: 25 }, { label: "Sempai (grande)", price: 35 }]
  },
  {
    id: "ramen-p-chan", name: "Ramen P-Chan", category: "ramen", image: "assets/ramen-soseji.jpg", tag: "Premium", description: "Ramen con salchicha en forma de pulpo, tocino, huevo, verduras, choclo y sésamo.",
    variants: [{ label: "Chibi (pequeño)", price: 25 }, { label: "Sempai (grande)", price: 35 }]
  },
  {
    id: "ramen-titan-colosal", name: "Ramen Titán Colosal", category: "ramen", image: "assets/ramen-picante.jpg", tag: "Anime edition", description: "El precio no se distingue con claridad en la imagen del menú. Consúltalo antes de pedir.",
    variants: [{ label: "Chibi (pequeño)", price: null }, { label: "Sempai (grande)", price: null }], consultOnly: true
  },
  {
    id: "pollo-agridulce", name: "Pollo en salsa agridulce", category: "platos", image: "assets/pollo-agridulce.jpg", tag: "Plato fuerte", description: "Presa de pollo en salsa agridulce, acompañada de papas fritas y bolitas de arroz.",
    variants: [{ label: "Chibi (pequeño)", price: 18 }, { label: "Sempai (grande)", price: 28 }]
  },
  {
    id: "burger-moshi", name: "Burger Moshi", category: "burgers", image: "assets/burger-moshi.jpg", tag: "Burger", description: "Hamburguesa en forma de ratón, con queso, huevo y ensalada acompañada de papas fritas.", price: 20
  },
  {
    id: "hawk-burger", name: "Hawk Burger", category: "burgers", image: "assets/burger-moshi.jpg", tag: "Burger", description: "Hamburguesa con ingredientes de la casa y papas fritas.", price: 25
  },
  {
    id: "papas", name: "Papas", category: "extras", image: "assets/papas-postre.jpg", tag: "Extra", description: "Porción de papas bañadas con queso rallado y acompañadas con mayonesa y ketchup.", price: 6
  },
  {
    id: "postre", name: "Porción extra de postre", category: "extras", image: "assets/papas-postre.jpg", tag: "Algo dulce", description: "Una porción dulce para cerrar tu experiencia Moshi.", price: 5
  },
  {
    id: "coca-cola", name: "Coca-Cola", category: "bebidas", image: "assets/bebidas.jpg", tag: "Bebida", description: "Bebida fría para acompañar tu pedido.", price: 5
  },
  {
    id: "fanta", name: "Fanta", category: "bebidas", image: "assets/bebidas.jpg", tag: "Bebida", description: "Bebida fría de naranja.", price: 5
  }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const productGrid = $("#productGrid");
const cartDrawer = $("#cartDrawer");
const drawerBackdrop = $("#drawerBackdrop");
const checkoutOverlay = $("#checkoutOverlay");
const confirmationOverlay = $("#confirmationOverlay");
const cartItemsContainer = $("#cartItems");
const cartCount = $("#cartCount");
const cartTotal = $("#cartTotal");
const checkoutSummaryItems = $("#checkoutSummaryItems");
const checkoutSubtotal = $("#checkoutSubtotal");
const checkoutDelivery = $("#checkoutDelivery");
const checkoutDeliveryNote = $("#checkoutDeliveryNote");
const checkoutTotal = $("#checkoutTotal");
const deliveryFields = $("#deliveryFields");
const paymentInfo = $("#paymentInfo");
const continuePaymentBtn = $("#continuePaymentBtn");
const sendOrderWhatsApp = $("#sendOrderWhatsApp");

let activeCategory = "todos";
let cart = [];
let currentOrder = null;

function money(value) {
  return `Bs ${Number(value).toFixed(0)}`;
}

function getProductPrice(product, variantLabel) {
  if (product.variants) {
    const variant = product.variants.find((item) => item.label === variantLabel) || product.variants[0];
    return variant.price;
  }
  return product.price;
}

function renderProducts() {
  const visibleProducts = activeCategory === "todos"
    ? products
    : products.filter((product) => product.category === activeCategory);

  productGrid.innerHTML = visibleProducts.map((product) => {
    const hasVariants = Boolean(product.variants);
    const initialVariant = hasVariants ? product.variants[0] : null;
    const initialPrice = hasVariants ? initialVariant.price : product.price;
    const options = hasVariants ? `
      <div class="product-options">
        <label for="variant-${product.id}">Tamaño</label>
        <select id="variant-${product.id}" data-variant-select="${product.id}" ${product.consultOnly ? 'aria-label="Tamaño para consultar precio"' : ''}>
          ${product.variants.map((variant) => `<option value="${variant.label}" data-price="${variant.price === null ? '' : variant.price}">${variant.label}${variant.price === null ? ' · consultar precio' : ` · ${money(variant.price)}`}</option>`).join("")}
        </select>
      </div>` : "";
    const priceMarkup = product.consultOnly
      ? `<strong data-price-display="${product.id}">Consultar</strong><small>Precio por confirmar</small>`
      : `<strong data-price-display="${product.id}">${money(initialPrice)}</strong><small>${hasVariants ? 'Según tamaño' : 'Precio publicado'}</small>`;
    const buttonMarkup = product.consultOnly
      ? `<button class="add-button consult-button" data-consult="${product.id}">Consultar</button>`
      : `<button class="add-button" data-add="${product.id}">${hasVariants ? 'Agregar' : '+ Agregar'}</button>`;

    return `
      <article class="product-card group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-kawaii">
        <div class="product-photo relative overflow-hidden">
          <img class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="${product.image}" alt="${product.name}" loading="lazy" />
          <span class="product-tag">${product.tag}</span>
        </div>
        <div class="product-content">
          <h3>${product.name}</h3>
          <p class="product-description">${product.description}</p>
          ${options}
          <div class="product-buy-row">
            <div class="product-price">${priceMarkup}</div>
            ${buttonMarkup}
          </div>
        </div>
      </article>`;
  }).join("");
}

function addProduct(productId, variantLabel = null) {
  const product = products.find((item) => item.id === productId);
  if (!product || product.consultOnly) return;
  const variant = product.variants ? product.variants.find((item) => item.label === variantLabel) || product.variants[0] : null;
  const price = variant ? variant.price : product.price;
  if (price === null || price === undefined) return;
  const itemKey = `${product.id}::${variant ? variant.label : 'regular'}`;
  const existing = cart.find((item) => item.key === itemKey);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      key: itemKey,
      productId: product.id,
      name: product.name,
      image: product.image,
      price,
      variantLabel: variant ? variant.label : null,
      quantity: 1
    });
  }
  renderCart();
  openCart();
}

function updateQuantity(key, delta) {
  cart = cart.map((item) => item.key === key ? { ...item, quantity: item.quantity + delta } : item)
    .filter((item) => item.quantity > 0);
  renderCart();
  renderCheckoutSummary();
}

function removeItem(key) {
  cart = cart.filter((item) => item.key !== key);
  renderCart();
  renderCheckoutSummary();
}

function getSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function renderCart() {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = itemCount;
  cartTotal.textContent = money(getSubtotal());

  if (!cart.length) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart"><span>🍜</span><h3>Tu carrito está esperando</h3><p>Agrega tus platos favoritos para empezar.</p><a href="#menu" class="button button-pink" id="emptyCartShop">Ver menú</a></div>`;
    const emptyShop = $("#emptyCartShop");
    emptyShop?.addEventListener("click", closeCart);
  } else {
    cartItemsContainer.innerHTML = cart.map((item) => `
      <article class="cart-line">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-line-info">
          <h4>${item.name}</h4>
          <small>${item.variantLabel || 'Porción individual'}</small>
          <div class="quantity-control">
            <button type="button" data-minus="${item.key}" aria-label="Restar uno">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-plus="${item.key}" aria-label="Agregar uno">+</button>
          </div>
          <button type="button" class="remove-item" data-remove="${item.key}">Quitar</button>
        </div>
        <div class="cart-line-price">${money(item.price * item.quantity)}</div>
      </article>`).join("");
  }
  const checkoutBtn = $("#checkoutBtn");
  checkoutBtn.disabled = cart.length === 0;
  checkoutBtn.style.opacity = cart.length === 0 ? ".5" : "1";
  renderCheckoutSummary();
}

function openCart() {
  cartDrawer.classList.add("open");
  drawerBackdrop.classList.add("show");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  drawerBackdrop.classList.remove("show");
  cartDrawer.setAttribute("aria-hidden", "true");
  if (!checkoutOverlay.classList.contains("show") && !confirmationOverlay.classList.contains("show")) {
    document.body.classList.remove("locked");
  }
}

function openModal(modal) {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
}

function closeModal(modal) {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  if (!cartDrawer.classList.contains("open") && !checkoutOverlay.classList.contains("show") && !confirmationOverlay.classList.contains("show")) {
    document.body.classList.remove("locked");
  }
}

function getFulfillment() {
  return $("input[name='fulfillment']:checked")?.value || "pickup";
}
function getPayment() {
  return $("input[name='payment']:checked")?.value || "qr";
}

function renderCheckoutSummary() {
  if (!checkoutSummaryItems) return;
  checkoutSummaryItems.innerHTML = cart.length ? cart.map((item) => `
    <div class="summary-item"><span>${item.quantity} × ${item.name}${item.variantLabel ? `<br><small>${item.variantLabel}</small>` : ''}</span><strong>${money(item.price * item.quantity)}</strong></div>`).join("") : `<p class="summary-footnote">No hay productos en el carrito.</p>`;
  const subtotal = getSubtotal();
  checkoutSubtotal.textContent = money(subtotal);
  checkoutTotal.textContent = money(subtotal);
  if (getFulfillment() === "delivery") {
    checkoutDelivery.textContent = "A confirmar";
    checkoutDeliveryNote.textContent = "El costo de envío se confirma por WhatsApp según tu zona.";
  } else {
    checkoutDelivery.textContent = money(0);
    checkoutDeliveryNote.textContent = "Recojo en el local, sin costo de envío.";
  }
}

function updateFulfillmentUI() {
  const isDelivery = getFulfillment() === "delivery";
  const addressInput = $("#deliveryAddress");
  const referenceInput = $("#deliveryReference");
  deliveryFields.classList.toggle("hidden", !isDelivery);
  // En recojo no se solicita ni valida dirección de entrega.
  addressInput.required = isDelivery;
  addressInput.disabled = !isDelivery;
  referenceInput.disabled = !isDelivery;
  if (!isDelivery) {
    addressInput.value = "";
    referenceInput.value = "";
  }
  renderCheckoutSummary();
}

function updatePaymentUI() {
  const isQR = getPayment() === "qr";
  paymentInfo.classList.toggle("hidden", !isQR);
  continuePaymentBtn.innerHTML = isQR
    ? 'Registrar pedido · QR pendiente <span>→</span>'
    : 'Registrar pedido en efectivo <span>→</span>';
}

function makeOrderMessage(order) {
  const itemsText = order.items.map((item) => `• ${item.quantity} x ${item.name}${item.variantLabel ? ` (${item.variantLabel})` : ''} — ${money(item.price * item.quantity)}`).join("\n");
  const fulfillmentText = order.fulfillment === "delivery"
    ? `Delivery a: ${order.address}\nReferencia: ${order.reference || 'No especificada'}\nCosto de envío: por confirmar según zona`
    : "Recojo en el local: Barrio San Roque, calle Fray Manuel Mingo N.º 589, Tarija";
  const paymentText = order.payment === "qr"
    ? "Pago elegido: QR; pendiente de recibir y verificar el QR bancario oficial. No se realizó ningún cobro."
    : `Pago elegido: efectivo al ${order.fulfillment === "pickup" ? "recoger" : "recibir"}.`;
  return [
    `¡Hola, Moshi Moshi Maid Café! Quiero confirmar el pedido ${order.number}.`,
    "",
    `Nombre: ${order.name}`,
    `WhatsApp: ${order.phone}`,
    fulfillmentText,
    paymentText,
    "",
    "Mi pedido:",
    itemsText,
    "",
    `Subtotal de productos: ${money(order.subtotal)}`,
    `Nota: ${order.notes || 'Sin notas'}`,
    "",
    "Por favor, confirmen disponibilidad, tarifa de delivery (si corresponde) y detalles de pago."
  ].join("\n");
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function showConfirmation(order) {
  currentOrder = order;
  const isPickup = order.fulfillment === "pickup";
  const isQR = order.payment === "qr";
  $("#orderNumber").textContent = order.number;
  $("#confirmationTitle").textContent = isPickup ? "¡Tu ticket está listo!" : "¡Tu pedido está preparado!";
  $("#confirmationMessage").textContent = isQR
    ? `Tu ${isPickup ? "ticket de recojo" : "resumen de delivery"} está listo. El pago QR queda pendiente de confirmar con Moshi Moshi.`
    : `Tu ${isPickup ? "ticket de recojo" : "resumen de delivery"} está listo. Elegiste pagar en efectivo ${isPickup ? "al recoger" : "al recibir"}.`;

  const createdAt = order.createdAt instanceof Date ? order.createdAt : new Date(order.createdAt || Date.now());
  const dateLabel = createdAt.toLocaleString("es-BO", { dateStyle: "medium", timeStyle: "short" });
  const fulfillmentLabel = isPickup
    ? "Recojo en el local"
    : `Delivery a ${escapeHTML(order.address)}${order.reference ? ` · Referencia: ${escapeHTML(order.reference)}` : ""}`;
  const paymentLabel = isQR
    ? "QR elegido · PENDIENTE DE CONFIRMACIÓN"
    : `Efectivo al ${isPickup ? "recoger" : "recibir"}`;
  const itemsHTML = order.items.map((item) => `
    <div class="ticket-item-row">
      <span><b>${item.quantity} ×</b> ${escapeHTML(item.name)}${item.variantLabel ? `<small>${escapeHTML(item.variantLabel)}</small>` : ""}</span>
      <strong>${money(item.price * item.quantity)}</strong>
    </div>`).join("");
  const addressHTML = isPickup
    ? `<p><b>Local:</b> Barrio San Roque, calle Fray Manuel Mingo N.º 589, Tarija</p>`
    : `<p><b>Dirección de entrega:</b> ${escapeHTML(order.address)}</p>`;
  const notesHTML = order.notes ? `<div class="ticket-notes"><b>Nota:</b> ${escapeHTML(order.notes)}</div>` : "";
  $("#ticketPrintable").innerHTML = `
    <div class="ticket-brand"><img src="assets/moshi-logo.png" alt="Moshi Moshi Maid Café"><span>MAID CAFÉ · TARIJA</span></div>
    <div class="ticket-heading"><span aria-hidden="true">♡ ✿ ♡</span><h3>${isPickup ? "TICKET DE RECOJO" : "COMPROBANTE DE PEDIDO"}</h3><p>${isPickup ? "Presenta este número al llegar al local" : "Guarda este resumen de tu pedido"}</p></div>
    <div class="ticket-meta"><div><small>N.º de pedido</small><strong>${escapeHTML(order.number)}</strong></div><div><small>Fecha</small><strong>${escapeHTML(dateLabel)}</strong></div></div>
    <div class="ticket-customer"><p><b>Cliente:</b> ${escapeHTML(order.name)}</p><p><b>WhatsApp:</b> ${escapeHTML(order.phone)}</p><p><b>Modalidad:</b> ${isPickup ? "Recojo en local" : "Delivery"}</p>${addressHTML}<p><b>Pago:</b> ${paymentLabel}</p></div>
    <div class="ticket-items"><div class="ticket-items-title">♡ Tu pedido</div>${itemsHTML}</div>
    <div class="ticket-total"><span>Subtotal de productos</span><strong>${money(order.subtotal)}</strong></div>
    ${notesHTML}
    <div class="ticket-footer"><strong>¡Gracias por elegir Moshi Moshi! ♡</strong><small>${isQR ? "Pago QR pendiente: confirma los datos por WhatsApp. " : ""}Este ticket pertenece a una demostración web; envía el pedido por WhatsApp para que el local lo confirme.</small></div>`;
  $("#printTicketBtn").textContent = isPickup ? "🧾 Imprimir ticket de recojo" : "🧾 Imprimir resumen del pedido";
  sendOrderWhatsApp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(makeOrderMessage(order))}`;
  closeModal(checkoutOverlay);
  closeCart();
  openModal(confirmationOverlay);
}

// Filtros del menú
$$(".category-tab").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".category-tab").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.category;
    renderProducts();
  });
});

// Delegación de eventos para productos y controles del carrito
productGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const consultButton = event.target.closest("[data-consult]");
  if (addButton) {
    const productId = addButton.dataset.add;
    const select = $(`[data-variant-select="${productId}"]`);
    addProduct(productId, select?.value || null);
  }
  if (consultButton) {
    const product = products.find((item) => item.id === consultButton.dataset.consult);
    const select = $(`[data-variant-select="${product.id}"]`);
    const variant = select?.value || "tamaño por confirmar";
    const message = `Hola, Moshi Moshi. ¿Me confirman el precio del ${product.name} (${variant})?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  }
});

productGrid.addEventListener("change", (event) => {
  const select = event.target.closest("[data-variant-select]");
  if (!select) return;
  const product = products.find((item) => item.id === select.dataset.variantSelect);
  const price = getProductPrice(product, select.value);
  const display = $(`[data-price-display="${product.id}"]`);
  if (display) display.textContent = price === null ? "Consultar" : money(price);
});

cartItemsContainer.addEventListener("click", (event) => {
  const plus = event.target.closest("[data-plus]");
  const minus = event.target.closest("[data-minus]");
  const remove = event.target.closest("[data-remove]");
  if (plus) updateQuantity(plus.dataset.plus, 1);
  if (minus) updateQuantity(minus.dataset.minus, -1);
  if (remove) removeItem(remove.dataset.remove);
});

$("#openCartBtn").addEventListener("click", openCart);
$("#closeCartBtn").addEventListener("click", closeCart);
drawerBackdrop.addEventListener("click", closeCart);
$("#continueShoppingBtn").addEventListener("click", closeCart);
$("#checkoutBtn").addEventListener("click", () => {
  if (!cart.length) return;
  closeCart();
  renderCheckoutSummary();
  updateFulfillmentUI();
  updatePaymentUI();
  openModal(checkoutOverlay);
});
$("#closeCheckoutBtn").addEventListener("click", () => closeModal(checkoutOverlay));
$("#backToCartBtn").addEventListener("click", () => {
  closeModal(checkoutOverlay);
  openCart();
});
checkoutOverlay.addEventListener("click", (event) => {
  if (event.target === checkoutOverlay) closeModal(checkoutOverlay);
});
confirmationOverlay.addEventListener("click", (event) => {
  if (event.target === confirmationOverlay) closeModal(confirmationOverlay);
});

$$("input[name='fulfillment']").forEach((input) => input.addEventListener("change", updateFulfillmentUI));
$$("input[name='payment']").forEach((input) => input.addEventListener("change", updatePaymentUI));

$("#checkoutForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!cart.length) return;
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const fulfillment = getFulfillment();
  const payment = getPayment();
  const order = {
    number: `MM-${String(Date.now()).slice(-6)}`,
    name: $("#customerName").value.trim(),
    phone: $("#customerPhone").value.trim(),
    fulfillment,
    address: fulfillment === "delivery" ? $("#deliveryAddress").value.trim() : "",
    reference: fulfillment === "delivery" ? $("#deliveryReference").value.trim() : "",
    payment,
    notes: $("#orderNotes").value.trim(),
    items: cart.map((item) => ({ ...item })),
    subtotal: getSubtotal(),
    createdAt: new Date()
  };
  showConfirmation(order);
});

$("#closeConfirmationBtn").addEventListener("click", () => closeModal(confirmationOverlay));
$("#printTicketBtn").addEventListener("click", () => {
  if (currentOrder) window.print();
});

$$("[data-promo]").forEach((button) => {
  button.addEventListener("click", () => {
    const promoName = button.dataset.promo;
    const message = `Hola, Moshi Moshi Maid Café ♡. ¿Me pueden contar más sobre ${promoName}, confirmar si está vigente y decirme sus precios y condiciones?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });
});
$("#newOrderBtn").addEventListener("click", () => {
  cart = [];
  currentOrder = null;
  renderCart();
  $("#checkoutForm").reset();
  updateFulfillmentUI();
  updatePaymentUI();
  closeModal(confirmationOverlay);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$("#mobileMenuButton").addEventListener("click", () => {
  $("#mainNav").classList.toggle("open");
});
$$("#mainNav a").forEach((link) => link.addEventListener("click", () => $("#mainNav").classList.remove("open")));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
    closeModal(checkoutOverlay);
    closeModal(confirmationOverlay);
  }
});

renderProducts();
renderCart();
updateFulfillmentUI();
updatePaymentUI();
