/* =========================================================
   MELI PASTELES — LÓGICA DEL SITIO
   Todo el contenido de productos, precios y galería vive acá,
   centralizado en objetos/arrays. Para cambiar un precio o
   agregar una foto, se edita solo este archivo.

   FUTURA ETAPA 2 (Supabase + Google Calendar + panel privado):
   los arrays PRODUCTS, DESIGN_GALLERY y DEMO_REVIEWS de abajo
   son los que en la próxima etapa se reemplazarían por
   consultas a la base de datos (ej. supabase.from('products')...).
   Las funciones que los consumen (renderCatalog, renderGallery,
   renderReviews) ya están separadas de los datos, así que ese
   reemplazo no debería tocar el resto del código.
========================================================= */

const WHATSAPP_NUMBER = "543704415774";

/* ---------------------------------------------------------
   DATOS: PRODUCTOS DEL CATÁLOGO
--------------------------------------------------------- */
const PRODUCTS = [
  {
    id: "redonda",
    category: "redonda",
    name: "Torta redonda",
    tag: "Más elegida",
    shortDescription: "Nuestra clásica torta redonda, ideal para cumpleaños y celebraciones.",
    diameter: "18 cm de diámetro",
    weight: "~1.200 g (corte clásico)",
    servings: "~20 porciones",
    priceFrom: 23000,
    priceLabel: "Desde $23.000",
    priceIsEstimate: false,
    thumbnail: "img/disenos/redonda-1.png",
    detailRows: [
      ["Bizcochuelo", "Vainilla o chocolate (chocolate: pedir con 2 días de anticipación)"],
      ["Relleno", "A elección — dulce de leche, chantilly, mousse y más"],
      ["Cobertura", "Chantilly (no trabajamos con fondant)"],
      ["Topper", "\"Feliz Cumpleaños\" incluido si lo deseás"],
      ["Con 2 rellenos", "~2.300 g — aprox. $44.000"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar por una torta redonda de 18 cm, aproximadamente 1,2 kg y 20 porciones."
  },
  {
    id: "corazon",
    category: "corazon",
    name: "Torta corazón",
    tag: null,
    shortDescription: "Una opción especial para sorprender a alguien en un momento importante.",
    diameter: "18 cm aproximadamente",
    weight: "~1.200 g (corte clásico)",
    servings: "~20 porciones",
    priceFrom: 25000,
    priceLabel: "Desde $25.000",
    priceIsEstimate: false,
    thumbnail: "img/disenos/corazon-1.png",
    detailRows: [
      ["Bizcochuelo", "Vainilla o chocolate (chocolate: pedir con 2 días de anticipación)"],
      ["Relleno", "Los mismos disponibles para la torta redonda"],
      ["Cobertura", "Chantilly (no trabajamos con fondant)"],
      ["Topper", "\"Feliz Cumpleaños\" incluido si lo deseás"],
      ["Con 2 rellenos", "~2.300 g — aprox. $46.000"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar por una torta corazón de 18 cm aproximadamente, 1,2 kg y 20 porciones."
  },
  {
    id: "tematica",
    category: "tematica",
    name: "Tortas temáticas",
    tag: "Personalizable",
    shortDescription: "Elegí una temática, colores y decoración para crear una torta única.",
    diameter: "18 cm de diámetro (base redonda)",
    weight: "~1.200 g aprox.",
    servings: "~20 porciones aprox.",
    priceFrom: 23000,
    priceLabel: "Precio estimado desde $23.000",
    priceIsEstimate: true,
    thumbnail: "img/disenos/tematica-1.png",
    detailRows: [
      ["Decoración", "Toppers, colores y diseño según la temática elegida"],
      ["Imágenes impresas", "+$5.000 (papel fotográfico)"],
      ["Precio final", "Se confirma según el diseño y la personalización"],
      ["Referencia", "Podés enviarnos una foto de inspiración por WhatsApp"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar por una torta temática personalizada."
  },
  {
    id: "eventos",
    category: "eventos",
    name: "Tortas para eventos",
    tag: null,
    shortDescription: "Tortas de dos pisos para eventos grandes o celebraciones más elegantes.",
    diameter: "Dos pisos",
    weight: "Desde 3 kg",
    servings: "A pedido",
    priceFrom: null,
    priceLabel: "Consultar",
    priceIsEstimate: false,
    thumbnail: "img/disenos/eventos-1.png",
    detailRows: [
      ["Peso mínimo", "3 kg"],
      ["Ideal para", "Casamientos, XV años y eventos grandes"],
      ["Precio", "Se cotiza según diseño y cantidad de porciones"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar disponibilidad para una torta de dos pisos para un evento."
  }
];

/* ---------------------------------------------------------
   DATOS: GALERÍA DE DISEÑOS (deslizable, agrupada por tipo)
   Todas las fotos son PNG con fondo transparente: el fondo
   liso y la sombra se agregan con CSS (clase .photo-frame),
   no hace falta editarlas para que combinen con el sitio.
--------------------------------------------------------- */
const DESIGN_GALLERY = {
  redonda: {
    label: "Redondas",
    images: [
      { src: "img/disenos/redonda-1.png", alt: "Torta redonda con relleno de dulce de leche" },
      { src: "img/disenos/redonda-2.png", alt: "Torta redonda de chocolate" },
      { src: "img/disenos/redonda-3.png", alt: "Torta redonda con frutillas" },
      { src: "img/disenos/redonda-4.png", alt: "Torta redonda decorada con chantilly" }
    ]
  },
  corazon: {
    label: "Corazón",
    images: [
      { src: "img/disenos/corazon-1.png", alt: "Torta corazón clásica" },
      { src: "img/disenos/corazon-2.png", alt: "Torta corazón con dulce de leche" },
      { src: "img/disenos/corazon-3.png", alt: "Torta corazón decorada" },
      { src: "img/disenos/corazon-4.png", alt: "Torta corazón con frutillas" }
    ]
  },
  tematica: {
    label: "Temáticas",
    images: [
      { src: "img/disenos/tematica-1.png", alt: "Torta temática personalizada 1" },
      { src: "img/disenos/tematica-2.png", alt: "Torta temática personalizada 2" },
      { src: "img/disenos/tematica-3.png", alt: "Torta temática personalizada 3" },
      { src: "img/disenos/tematica-4.png", alt: "Torta temática personalizada 4" },
      { src: "img/disenos/tematica-5.png", alt: "Torta temática personalizada 5" },
      { src: "img/disenos/tematica-6.png", alt: "Torta temática personalizada 6" }
    ]
  },
  eventos: {
    label: "Eventos",
    images: [
      { src: "img/disenos/eventos-1.png", alt: "Torta de dos pisos para evento" },
      { src: "img/disenos/eventos-2.png", alt: "Torta de dos pisos elegante" },
      { src: "img/disenos/eventos-3.png", alt: "Torta de dos pisos decorada" }
    ]
  }
};

/* ---------------------------------------------------------
   DATOS: OPCIONES DEL CONFIGURADOR
--------------------------------------------------------- */
const SHAPES = [
  { value: "Redonda", price: 23000, label: "Redonda" },
  { value: "Corazón", price: 25000, label: "Corazón" }
];

const FILLING_COUNTS = [
  { value: 1, label: "1 relleno", extra: 0, weightHint: "~1,2 kg" },
  { value: 2, label: "2 rellenos", extra: 21000, weightHint: "~2,3 kg" }
];

const SPONGE_OPTIONS = ["Vainilla", "Chocolate"];

const FILLING_OPTIONS = [
  { value: "Dulce de leche con chips de chocolate", extra: 0 },
  { value: "Dulce de leche", extra: 0 },
  { value: "Crema chantilly", extra: 0 },
  { value: "Mousse de chocolate", extra: 0 },
  { value: "Mousse de dulce de leche", extra: 0 },
  { value: "Dulce de leche con frutillas", extra: 5000, labelSuffix: " (+$5.000)" },
  { value: "Dulce de leche con duraznos", extra: 5000, labelSuffix: " (+$5.000)" }
];

const DECORATION_OPTIONS = [
  { value: "Topper Feliz Cumpleaños incluido", extra: 0, label: "Topper \"Feliz Cumpleaños\" incluido" },
  { value: "Temática personalizada", extra: 0 },
  { value: "Imágenes impresas", extra: 5000, labelSuffix: " (+$5.000)" }
];

/* ---------------------------------------------------------
   DATOS: RESEÑAS DE DEMOSTRACIÓN
   Estas tarjetas son solo de demostración visual. No son
   reseñas reales de clientes. En la próxima etapa esta
   sección se conecta a Supabase: cada pedido ENTREGADO podrá
   generar un link para que el cliente deje su opinión, y
   Meli podrá aprobar o rechazar cada reseña antes de
   publicarla.
--------------------------------------------------------- */
const DEMO_REVIEWS = [
  { name: "Cliente de Meli Pasteles", text: "La torta quedó hermosa y estaba riquísima. Súper recomendable." },
  { name: "Cliente de Meli Pasteles", text: "Me encantó el resultado. La decoración quedó exactamente como la quería." },
  { name: "Cliente de Meli Pasteles", text: "Hermosa atención y una torta espectacular." }
];

/* ---------------------------------------------------------
   HELPERS GENERALES
--------------------------------------------------------- */
function formatPrice(number) {
  return "$" + Math.round(number).toLocaleString("es-AR");
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* Todos los enlaces genéricos de WhatsApp (header, hero, footer,
   contacto, botón flotante) apuntan al mismo mensaje base. */
function setupGenericWhatsappLinks() {
  const genericMessage = "Hola Meli! Quería consultar por una torta.";
  document.querySelectorAll(".js-whatsapp-general").forEach(link => {
    link.href = buildWhatsAppUrl(genericMessage);
    link.target = "_blank";
    link.rel = "noopener";
  });
}

/* Crea un .photo-frame reutilizable. Si la imagen no carga
   (todavía no se subieron las fotos reales), se muestra un
   placeholder elegante en vez de romper el diseño. */
function createPhotoFrame({ src, alt, withZoomHint }) {
  const frame = document.createElement("div");
  frame.className = "photo-frame";

  const img = document.createElement("img");
  img.src = src;
  img.alt = alt || "";
  img.loading = "lazy";
  img.onerror = () => {
    frame.classList.add("is-placeholder");
  };

  frame.appendChild(img);

  if (withZoomHint) {
    const hint = document.createElement("span");
    hint.className = "zoom-hint";
    hint.setAttribute("aria-hidden", "true");
    hint.textContent = "⤢";
    frame.appendChild(hint);
  }

  return frame;
}

/* ---------------------------------------------------------
   CATÁLOGO (se genera dinámicamente desde PRODUCTS)
--------------------------------------------------------- */
function renderCatalog() {
  const grid = document.getElementById("catalogGrid");
  grid.innerHTML = "";

  PRODUCTS.forEach(product => {
    const card = document.createElement("article");
    card.className = "cake-card";

    const frame = createPhotoFrame({ src: product.thumbnail, alt: product.name });

    if (product.tag) {
      const tag = document.createElement("span");
      tag.className = "cake-tag";
      tag.textContent = product.tag;
      frame.appendChild(tag);
    }

    const content = document.createElement("div");
    content.className = "cake-content";

    const priceHtml = product.priceIsEstimate
      ? `<div class="price">${product.priceLabel}<small>El precio final se confirma según diseño</small></div>`
      : `<div class="price">${product.priceLabel}</div>`;

    content.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.shortDescription}</p>
      <div class="cake-details">
        <span>${product.diameter}</span>
        <span>${product.weight}</span>
        <span>${product.servings}</span>
      </div>
      ${priceHtml}
      <div class="card-actions"></div>
    `;

    const actions = content.querySelector(".card-actions");

    const detailBtn = document.createElement("button");
    detailBtn.className = "outline-button";
    detailBtn.textContent = product.id === "eventos" ? "Consultar disponibilidad" : "Ver detalles";
    detailBtn.addEventListener("click", () => {
      if (product.id === "eventos") {
        window.open(buildWhatsAppUrl(product.whatsappMessage), "_blank", "noopener");
      } else {
        openCakeModal(product.id);
      }
    });

    actions.appendChild(detailBtn);

    card.appendChild(frame);
    card.appendChild(content);
    grid.appendChild(card);
  });
}

/* ---------------------------------------------------------
   MODAL DE DETALLE DE TORTA
--------------------------------------------------------- */
function openCakeModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  document.getElementById("modalTitle").textContent = product.name;

  const modalContent = document.getElementById("modalContent");
  modalContent.innerHTML = "";

  const frame = createPhotoFrame({ src: product.thumbnail, alt: product.name });
  frame.classList.add("modal-photo-frame");
  modalContent.appendChild(frame);

  const list = document.createElement("ul");
  list.className = "modal-list";

  product.detailRows.forEach(([label, value]) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${label}</strong><span>${value}</span>`;
    list.appendChild(li);
  });

  modalContent.appendChild(list);

  document.getElementById("modalWhatsapp").href = buildWhatsAppUrl(product.whatsappMessage);

  const modal = document.getElementById("cakeModal");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeCakeModal() {
  const modal = document.getElementById("cakeModal");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

/* ---------------------------------------------------------
   GALERÍA DE DISEÑOS (tabs + carrusel deslizable + lightbox)
--------------------------------------------------------- */
let currentGalleryCategory = "redonda";

function renderGalleryTabs() {
  const tabsContainer = document.getElementById("galleryTabs");
  tabsContainer.innerHTML = "";

  Object.keys(DESIGN_GALLERY).forEach(categoryKey => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "gallery-tab" + (categoryKey === currentGalleryCategory ? " active" : "");
    tab.textContent = DESIGN_GALLERY[categoryKey].label;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", categoryKey === currentGalleryCategory ? "true" : "false");

    tab.addEventListener("click", () => {
      currentGalleryCategory = categoryKey;
      renderGalleryTabs();
      renderGalleryTrack();
    });

    tabsContainer.appendChild(tab);
  });
}

function renderGalleryTrack() {
  const track = document.getElementById("galleryTrack");
  const dotsContainer = document.getElementById("galleryDots");
  track.innerHTML = "";
  dotsContainer.innerHTML = "";

  const images = DESIGN_GALLERY[currentGalleryCategory].images;

  images.forEach((image, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";

    const frame = createPhotoFrame({ src: image.src, alt: image.alt, withZoomHint: true });
    frame.addEventListener("click", () => openLightbox(currentGalleryCategory, index));

    item.appendChild(frame);
    track.appendChild(item);

    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });

  track.scrollLeft = 0;
}

/* Actualiza el punto activo según la posición del scroll */
function setupGalleryScrollTracking() {
  const track = document.getElementById("galleryTrack");
  const dotsContainer = document.getElementById("galleryDots");

  let scrollTimeout;
  track.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const items = track.querySelectorAll(".gallery-item");
      const dots = dotsContainer.querySelectorAll("span");
      if (!items.length) return;

      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      items.forEach((item, index) => {
        const itemCenter = item.offsetLeft + item.clientWidth / 2;
        const distance = Math.abs(itemCenter - trackCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === closestIndex);
      });
    }, 80);
  });
}

/* --- Lightbox --- */
let lightboxCategory = null;
let lightboxIndex = 0;

function openLightbox(category, index) {
  lightboxCategory = category;
  lightboxIndex = index;
  updateLightboxImage();

  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
}

function updateLightboxImage() {
  const images = DESIGN_GALLERY[lightboxCategory].images;
  const image = images[lightboxIndex];

  document.getElementById("lightboxImage").src = image.src;
  document.getElementById("lightboxImage").alt = image.alt || "";
  document.getElementById("lightboxCaption").textContent =
    `${DESIGN_GALLERY[lightboxCategory].label} — ${lightboxIndex + 1} de ${images.length}`;
}

function showNextLightboxImage() {
  const images = DESIGN_GALLERY[lightboxCategory].images;
  lightboxIndex = (lightboxIndex + 1) % images.length;
  updateLightboxImage();
}

function showPrevLightboxImage() {
  const images = DESIGN_GALLERY[lightboxCategory].images;
  lightboxIndex = (lightboxIndex - 1 + images.length) % images.length;
  updateLightboxImage();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
}

function setupLightboxControls() {
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxNext").addEventListener("click", showNextLightboxImage);
  document.getElementById("lightboxPrev").addEventListener("click", showPrevLightboxImage);

  const lightbox = document.getElementById("lightbox");

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("show")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showNextLightboxImage();
    if (event.key === "ArrowLeft") showPrevLightboxImage();
  });

  /* Deslizar con el dedo para pasar de foto */
  let touchStartX = 0;
  const stage = document.querySelector(".lightbox-stage");

  stage.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  stage.addEventListener("touchend", event => {
    const touchEndX = event.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) showNextLightboxImage();
    else showPrevLightboxImage();
  }, { passive: true });
}

/* ---------------------------------------------------------
   CONFIGURADOR DE TORTA
--------------------------------------------------------- */
let selectedShape = SHAPES[0];
let selectedFillingCount = FILLING_COUNTS[0];

function renderCustomizerOptions() {
  /* Forma */
  const shapeContainer = document.getElementById("shapeOptions");
  shapeContainer.innerHTML = "";
  SHAPES.forEach((shape, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option" + (index === 0 ? " active" : "");
    btn.innerHTML = `${shape.label}<small>${formatPrice(shape.price)}</small>`;
    btn.addEventListener("click", () => {
      selectedShape = shape;
      shapeContainer.querySelectorAll(".option").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
      updateEstimatedPrice();
    });
    shapeContainer.appendChild(btn);
  });

  /* Cantidad de rellenos */
  const fillingCountContainer = document.getElementById("fillingCountOptions");
  fillingCountContainer.innerHTML = "";
  FILLING_COUNTS.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option" + (index === 0 ? " active" : "");
    btn.innerHTML = `${option.label}<small>${option.weightHint}</small>`;
    btn.addEventListener("click", () => {
      selectedFillingCount = option;
      fillingCountContainer.querySelectorAll(".option").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");

      document.getElementById("secondFillingContainer").style.display =
        option.value === 2 ? "block" : "none";

      updateEstimatedPrice();
    });
    fillingCountContainer.appendChild(btn);
  });

  /* Bizcochuelo */
  const spongeSelect = document.getElementById("bizcochuelo");
  spongeSelect.innerHTML = SPONGE_OPTIONS
    .map(value => `<option value="${value}">${value}</option>`)
    .join("");
  spongeSelect.addEventListener("change", () => {
    document.getElementById("chocolateHint").style.display =
      spongeSelect.value === "Chocolate" ? "block" : "none";
  });

  /* Rellenos 1 y 2 */
  const fillingsHtml = FILLING_OPTIONS
    .map(option => `<option value="${option.value}">${option.value}${option.labelSuffix || ""}</option>`)
    .join("");
  document.getElementById("relleno1").innerHTML = fillingsHtml;
  document.getElementById("relleno2").innerHTML = fillingsHtml;

  /* Decoración */
  document.getElementById("decoracion").innerHTML = DECORATION_OPTIONS
    .map(option => `<option value="${option.value}">${option.label || option.value}${option.labelSuffix || ""}</option>`)
    .join("");

  /* Recalcular precio ante cualquier cambio en los selects */
  ["bizcochuelo", "relleno1", "relleno2", "decoracion"].forEach(id => {
    document.getElementById(id).addEventListener("change", updateEstimatedPrice);
  });

  document.getElementById("chocolateHint").style.display = "none";
}

function updateEstimatedPrice() {
  let price = selectedShape.price + selectedFillingCount.extra;

  const filling1Value = document.getElementById("relleno1").value;
  const filling2Value = document.getElementById("relleno2").value;
  const decorationValue = document.getElementById("decoracion").value;

  const filling1 = FILLING_OPTIONS.find(f => f.value === filling1Value);
  const filling2 = FILLING_OPTIONS.find(f => f.value === filling2Value);
  const decoration = DECORATION_OPTIONS.find(d => d.value === decorationValue);

  if (filling1) price += filling1.extra;
  if (selectedFillingCount.value === 2 && filling2) price += filling2.extra;
  if (decoration) price += decoration.extra;

  document.getElementById("estimatedPrice").textContent = formatPrice(price);
}

function sendCustomOrder() {
  const bizcochuelo = document.getElementById("bizcochuelo").value;
  const filling1 = document.getElementById("relleno1").value;
  const filling2 = document.getElementById("relleno2").value;
  const decoration = document.getElementById("decoracion").value;
  const estimatedPrice = document.getElementById("estimatedPrice").textContent;

  let message = `Hola Meli! Quiero consultar por una torta personalizada.

Forma: ${selectedShape.value}
Bizcochuelo: ${bizcochuelo}
Cantidad de rellenos: ${selectedFillingCount.value}
Relleno 1: ${filling1}`;

  if (selectedFillingCount.value === 2) {
    message += `\nRelleno 2: ${filling2}`;
  }

  message += `\nDecoración: ${decoration}\nPrecio estimado: ${estimatedPrice}\n\nQuería consultar disponibilidad y precio final.`;

  window.open(buildWhatsAppUrl(message), "_blank", "noopener");
}

/* ---------------------------------------------------------
   RESEÑAS (demo — ver comentario en DEMO_REVIEWS)
--------------------------------------------------------- */
function renderReviews() {
  const container = document.getElementById("reviewsContainer");
  container.innerHTML = "";

  DEMO_REVIEWS.forEach(review => {
    const card = document.createElement("article");
    card.className = "review-card";
    card.innerHTML = `
      <div class="review-stars" aria-hidden="true">★★★★★</div>
      <p>"${review.text}"</p>
      <span>${review.name}</span>
    `;
    container.appendChild(card);
  });
}

let selectedRating = 0;

function setupReviewModal() {
  document.getElementById("openReviewModalBtn").addEventListener("click", () => {
    document.getElementById("reviewModal").classList.add("show");
    document.getElementById("reviewModal").setAttribute("aria-hidden", "false");
  });

  document.getElementById("closeReviewModal").addEventListener("click", closeReviewModal);

  const ratingButtons = document.querySelectorAll("#ratingSelector button");
  ratingButtons.forEach(button => {
    button.addEventListener("click", () => {
      selectedRating = Number(button.dataset.rating);
      ratingButtons.forEach(star => {
        star.classList.toggle("selected", Number(star.dataset.rating) <= selectedRating);
      });
    });
  });

  document.getElementById("submitReviewBtn").addEventListener("click", submitReview);
}

function closeReviewModal() {
  document.getElementById("reviewModal").classList.remove("show");
  document.getElementById("reviewModal").setAttribute("aria-hidden", "true");
}

function submitReview() {
  const name = document.getElementById("reviewName").value.trim();
  const text = document.getElementById("reviewText").value.trim();
  const message = document.getElementById("reviewMessage");

  if (!selectedRating) {
    message.textContent = "Por favor, seleccioná una puntuación.";
    return;
  }
  if (!name || !text) {
    message.textContent = "Completá tu nombre y tu opinión.";
    return;
  }

  /* En esta primera versión la reseña no se guarda en una base
     de datos. En la etapa 2, este submit haría un insert en
     Supabase (tabla "reviews": nombre, puntuación, comentario,
     fecha, estado = "pendiente") y Meli podría aprobarla desde
     su panel privado antes de que se muestre acá. */

  message.textContent = "¡Gracias por compartir tu opinión!";
  document.getElementById("reviewName").value = "";
  document.getElementById("reviewText").value = "";
  selectedRating = 0;
  document.querySelectorAll("#ratingSelector button").forEach(star => star.classList.remove("selected"));
}

/* ---------------------------------------------------------
   MODALES: cierre general (botón X y click afuera)
--------------------------------------------------------- */
function setupCakeModalControls() {
  document.getElementById("closeCakeModal").addEventListener("click", closeCakeModal);

  const cakeModal = document.getElementById("cakeModal");
  cakeModal.addEventListener("click", event => {
    if (event.target === cakeModal) closeCakeModal();
  });

  const reviewModal = document.getElementById("reviewModal");
  reviewModal.addEventListener("click", event => {
    if (event.target === reviewModal) closeReviewModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (cakeModal.classList.contains("show")) closeCakeModal();
    if (reviewModal.classList.contains("show")) closeReviewModal();
  });
}

/* ---------------------------------------------------------
   INICIALIZACIÓN
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  setupGenericWhatsappLinks();

  renderCatalog();

  renderGalleryTabs();
  renderGalleryTrack();
  setupGalleryScrollTracking();
  setupLightboxControls();

  renderCustomizerOptions();
  updateEstimatedPrice();
  document.getElementById("sendCustomOrderBtn").addEventListener("click", sendCustomOrder);

  renderReviews();
  setupReviewModal();

  setupCakeModalControls();
});