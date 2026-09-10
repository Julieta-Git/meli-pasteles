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

/* Extra: torta + 12 cupcakes a juego.*/
const CUPCAKES_ADDON_PRICE = 10000;

/* ---------------------------------------------------------
   DATOS: PRODUCTOS DEL CATÁLOGO
--------------------------------------------------------- */
const PRODUCTS = [
  {
    id: "redonda",
    category: "redondas",
    name: "Torta redonda",
    tag: "Más elegida",
    shortDescription: "Nuestra clásica torta redonda, ideal para cumpleaños y celebraciones.",
    diameter: "18 cm de diámetro",
    weight: "~1.200 g (corte clásico)",
    servings: "~20 porciones",
    priceFrom: 23000,
    priceLabel: "Desde $23.000",
    priceIsEstimate: false,
    thumbnail: "img/tortas-redondas/torta-redonda1.jpeg",
    detailRows: [
      ["Bizcochuelo", "Vainilla o chocolate (chocolate: pedir con 2 días de anticipación)"],
      ["Relleno", "A elección — dulce de leche, chantilly, mousse y más"],
      ["Cobertura", "Chantilly (no trabajamos con fondant)"],
      ["Topper y moño", "Opcionales, sin cargo. Color del moño sujeto a disponibilidad"],
      ["Con 2 rellenos", "~2.300 g — aprox. $44.000"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar por una torta redonda de 18 cm, aproximadamente 1,2 kg y 20 porciones."
  },
  {
    id: "corazon",
    category: "corazon",
    name: "Torta corazón",
    tag: "<3",
    shortDescription: "Una opción especial para sorprender a alguien en un momento importante.",
    diameter: "18 cm aproximadamente",
    weight: "~1.200 g (corte clásico)",
    servings: "~20 porciones",
    priceFrom: 25000,
    priceLabel: "Desde $25.000",
    priceIsEstimate: false,
    thumbnail: "img/tortas-corazon/torta-corazon1.jpeg",
    detailRows: [
      ["Bizcochuelo", "Vainilla o chocolate (chocolate: pedir con 2 días de anticipación)"],
      ["Relleno", "Los mismos disponibles para la torta redonda"],
      ["Cobertura", "Chantilly (no trabajamos con fondant)"],
      ["Topper y moño", "Opcionales, sin cargo. Color del moño sujeto a disponibilidad"],
      ["Con 2 rellenos", "~2.300 g — aprox. $46.000"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar por una torta corazón de 18 cm aproximadamente, 1,2 kg y 20 porciones."
  },
  {
  id: "club",
    category: "club",
    name: "Torta club",
    tag: "Nuevo",
    shortDescription: "Nuestra clásica torta redonda, ideal para cumpleaños y celebraciones.",
    diameter: "18 cm de diámetro",
    weight: "~1.200 g (corte clásico)",
    servings: "~20 porciones",
    priceFrom: 24000,
    priceLabel: "Desde $24.000",
    priceIsEstimate: false,
    /* TODO (Meli): subir fotos reales a img/tortas-club/ con estos
       nombres (club1.jpeg, club2.jpeg, club3.jpeg) para que
       reemplacen automáticamente el cartel de "Foto próximamente". */
    thumbnail: "img/tortas-club/club1.jpeg",
    detailRows: [
      ["Bizcochuelo", "Vainilla o chocolate (chocolate: pedir con 2 días de anticipación)"],
      ["Relleno", "A elección — dulce de leche, chantilly, mousse y más"],
      ["Cobertura", "Chantilly (no trabajamos con fondant)"],
      ["Topper y moño", "Opcionales, sin cargo. Color del moño sujeto a disponibilidad"],
      ["Con 2 rellenos", "~2.300 g — aprox. $45.000"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar por una torta club."
  },
  {
    id: "rectangular",
    category: "rectangulares",
    name: "Torta rectangular",
    tag: "Nuevo",
    shortDescription: "Ideal para mesas dulces y para compartir en cantidad.",
    /* TODO (Meli): reemplazar por la medida, el peso y las porciones reales. */
    diameter: "Medida a confirmar",
    weight: "+3 kg",
    servings: "+30 porciones",
    priceFrom: null,
    priceLabel: "Consultar",
    priceIsEstimate: false,
    thumbnail: "img/tortas-rectangulares/torta-rectangular1.jpeg",
    detailRows: [
      ["Bizcochuelo", "Vainilla o chocolate (chocolate: pedir con 2 días de anticipación)"],
      ["Relleno", "A elección — mismas opciones que las tortas redondas"],
      ["Cobertura", "Chantilly (no trabajamos con fondant)"],
      ["Precio", "A confirmar según medida y porciones"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar por una torta rectangular."
  },
  {
    id: "tematica",
    category: "tematicas",
    name: "Tortas temáticas",
    tag: "Personalizable",
    shortDescription: "Elegí una temática, colores y decoración para crear una torta única.",
    diameter: "18 cm de diámetro (base redonda o de corazón)",
    weight: "~1.200 g aprox.",
    servings: "~20 porciones aprox.",
    priceFrom: 23000,
    priceLabel: "Precio estimado desde $23.000",
    priceIsEstimate: true,
    thumbnail: "img/tortas-tematicas/torta-tematica1.jpeg",
    detailRows: [
      ["Decoración", "Toppers, moños, colores y diseño según la temática elegida"],
      ["Imágenes impresas", "+$5.000 (papel fotográfico)", "+$7000 lamina comestible"],
      ["Precio final", "Se confirma según el diseño y la personalización"],
      ["Referencia", "Podés enviarnos una foto de inspiración por WhatsApp"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar por una torta temática personalizada."
  },
  {
    id: "eventos",
    category: "evento",
    name: "Tortas para eventos",
    tag: null,
    shortDescription: "Tortas de dos pisos para eventos grandes o celebraciones más elegantes.",
    diameter: "Dos pisos",
    weight: "Desde 3 kg",
    servings: "A pedido",
    priceFrom: null,
    priceLabel: "Consultar",
    priceIsEstimate: false,
    thumbnail: "img/tortas%20evento/torta-evento1..jpeg",
    detailRows: [
      ["Peso mínimo", "3 kg"],
      ["Ideal para", "Casamientos, XV años y eventos grandes"],
      ["Precio", "Se cotiza según diseño y cantidad de porciones"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar disponibilidad para una torta de dos pisos para un evento."
  },
  {
    id: "cupcakes",
    category: "cupcakes",
    name: "Torta + 12 cupcakes a juego",
    tag: "Extra",
    shortDescription: "Sumale a cualquier torta una docena de cupcakes decorados a juego.",
    diameter: "Docena (12 unidades)",
    weight: "—",
    servings: "+12 porciones extra",
    priceFrom: CUPCAKES_ADDON_PRICE,
    priceLabel: `+${formatPrice(CUPCAKES_ADDON_PRICE)} sobre el precio de la torta`,
    priceIsEstimate: true,
    thumbnail: "img/tortas-corazon/cupcakes/cup1.jpeg",
    detailRows: [
      ["Qué incluye", "12 cupcakes decorados a juego con la torta elegida"],
      ["Cómo pedirlo", "Se agrega como extra sobre cualquier torta del catálogo"],
      ["Precio", "Se suma $10.000 al precio de la torta"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar por el extra de 12 cupcakes a juego con mi torta."
  }
];

/* ---------------------------------------------------------
   DATOS: GALERÍA DE DISEÑOS (deslizable, agrupada por tipo)
   Las carpetas de imágenes coinciden con las del repositorio
   de GitHub (tortas-redondas, tortas-corazon, tortas-rectangulares,
   tortas-tematicas, tortas-evento, cupcakes).
   Todas las fotos son PNG con fondo transparente: el fondo
   liso y la sombra se agregan con CSS (clase .photo-frame),
   no hace falta editarlas para que combinen con el sitio.
--------------------------------------------------------- */
const DESIGN_GALLERY = {

    redondas: {
        label: "Redondas",
        images: [
            { src: "img/tortas-redondas/torta-redonda1.jpeg", alt: "Torta redonda 1" },
            { src: "img/tortas-redondas/torta-redonda2.jpeg", alt: "Torta redonda 2" },
            { src: "img/tortas-redondas/torta-redonda3.jpeg", alt: "Torta redonda 3" },
            { src: "img/tortas-redondas/torta-redonda4.jpeg", alt: "Torta redonda 4" },
            { src: "img/tortas-redondas/torta-redonda5.jpeg", alt: "Torta redonda 5" },
            { src: "img/tortas-redondas/torta-redonda6.jpeg", alt: "Torta redonda 6" },
            { src: "img/tortas-redondas/torta-redonda7.jpeg", alt: "Torta redonda 7" },
            { src: "img/tortas-redondas/torta-redonda8.jpeg", alt: "Torta redonda 8" },
            { src: "img/tortas-redondas/torta-redonda9.jpeg", alt: "Torta redonda 9" },
            { src: "img/tortas-redondas/torta-redonda10.jpeg", alt: "Torta redonda 10" }
        ]
    },

    corazon: {
        label: "Corazón",
        images: [
            { src: "img/tortas-corazon/torta-corazon1.jpeg", alt: "Torta corazón 1" },
            { src: "img/tortas-corazon/torta-corazon2.jpeg", alt: "Torta corazón 2" },
            { src: "img/tortas-corazon/torta-corazon3.jpeg", alt: "Torta corazón 3" },
            { src: "img/tortas-corazon/torta-corazon4.jpeg", alt: "Torta corazón 4" },
            { src: "img/tortas-corazon/torta-corazon5.jpeg", alt: "Torta corazón 5" },
            { src: "img/tortas-corazon/torta-corazon6.jpeg", alt: "Torta corazón 6" }
        ]
    },

    club: {
    label: "Club",
    images: [
      { src: "img/tortas-club/club1.jpeg", alt: "Torta club 1" },
      { src: "img/tortas-club/club2.jpeg", alt: "Torta club 2" },
      { src: "img/tortas-club/club3.jpeg", alt: "Torta club 3" }
    ]
  },

    rectangulares: {
        label: "Rectangulares",
        images: [
            { src: "img/tortas-rectangulares/torta-rectangular1.jpeg", alt: "Torta rectangular 1" },
            { src: "img/tortas-rectangulares/torta-rectangular2.jpeg", alt: "Torta rectangular 2" }
        ]
    },

    tematicas: {
        label: "Temáticas",
        images: [
            { src: "img/tortas-tematicas/torta-tematica1.jpeg", alt: "Torta temática 1" },
            { src: "img/tortas-tematicas/torta-tematica2.jpeg", alt: "Torta temática 2" },
            { src: "img/tortas-tematicas/torta-tematica3.jpeg", alt: "Torta temática 3" },
            { src: "img/tortas-tematicas/torta-tematica4.jpeg", alt: "Torta temática 4" },
            { src: "img/tortas-tematicas/torta-tematica5.jpeg", alt: "Torta temática 5" },
            { src: "img/tortas-tematicas/torta-tematica6.jpeg", alt: "Torta temática 6" },
            { src: "img/tortas-tematicas/torta-tematica7.jpeg", alt: "Torta temática 7" },
            { src: "img/tortas-tematicas/torta-tematica8.jpeg", alt: "Torta temática 8" },
            { src: "img/tortas-tematicas/torta-tematica9.jpeg", alt: "Torta temática 9" },
            { src: "img/tortas-tematicas/torta-tematica10.jpeg", alt: "Torta temática 10" },
            { src: "img/tortas-tematicas/t.jpeg", alt: "Torta temática" }
        ]
    },

    evento: {
        label: "Eventos",
        images: [
            { src: "img/tortas%20evento/torta-evento1..jpeg", alt: "Torta de evento 1" },
            { src: "img/tortas%20evento/torta-evento2.jpeg", alt: "Torta de evento 2" },
            { src: "img/tortas%20evento/torta-evento3.jpeg", alt: "Torta de evento 3" },
            { src: "img/tortas%20evento/torta-evento4.jpeg", alt: "Torta de evento 4" }
        ]
    },

    cupcakes: {
        label: "Cupcakes",
        images: [
            { src: "img/tortas-corazon/cupcakes/cup1.jpeg", alt: "Cupcakes 1" },
            { src: "img/tortas-corazon/cupcakes/cup2.jpeg", alt: "Cupcakes 2" },
            { src: "img/tortas-corazon/cupcakes/cup3.jpeg", alt: "Cupcakes 3" },
            { src: "img/tortas-corazon/cupcakes/cup4.jpeg", alt: "Cupcakes 4" },
            { src: "img/tortas-corazon/cupcakes/cup5.jpeg", alt: "Cupcakes 5" }
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
  { value: "Topper Feliz Cumpleaños incluido", extra: 0, label: "Topper \"Feliz Cumpleaños\" y moño (opcionales, sin cargo)" },
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
--------------------------------------------------------- 
const DEMO_REVIEWS = [
  { name: "Cliente de Meli Pasteles", text: "La torta quedó hermosa y estaba riquísima. Súper recomendable." },
  { name: "Cliente de Meli Pasteles", text: "Me encantó el resultado. La decoración quedó exactamente como la quería." },
  { name: "Cliente de Meli Pasteles", text: "Hermosa atención y una torta espectacular." }
];
*/
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

/* =========================================================
   MELI PASTELES — CATÁLOGO
   Genera las tarjetas desde PRODUCTS (js/data.js). Cada
   tarjeta muestra la mini-galería deslizable de esa
   categoría, nombre, descripción corta y precio. El resto
   (peso, diámetro, porciones) se ve recién en "Ver detalles".
========================================================= */

function renderCatalog() {
  const grid = document.getElementById("catalogGrid");
  grid.innerHTML = "";

  PRODUCTS.forEach(product => {
    const card = document.createElement("article");
    card.className = "cake-card";

    const images = getCategoryImages(product);
    const photoWrapper = document.createElement("div");
    photoWrapper.className = "cake-photo";

    const gallery = createSwipeableGallery(images, product.category, "card");
    photoWrapper.appendChild(gallery);

    if (product.tag) {
      const tag = document.createElement("span");
      tag.className = "cake-tag";
      tag.textContent = product.tag;
      photoWrapper.appendChild(tag);
    }

    const content = document.createElement("div");
    content.className = "cake-content";

    const priceHtml = product.priceIsEstimate
      ? `<div class="price">${product.priceLabel}<small>El precio final se confirma según diseño</small></div>`
      : `<div class="price">${product.priceLabel}</div>`;

    content.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.shortDescription}</p>
      ${priceHtml}
      <div class="card-actions"></div>
    `;

    const actions = content.querySelector(".card-actions");

    const detailBtn = document.createElement("button");
    detailBtn.type = "button";
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

    card.appendChild(photoWrapper);
    card.appendChild(content);
    grid.appendChild(card);
  });
}

/* ---------------------------------------------------------
   MODAL DE DETALLE
   Ahora incluye, arriba de la lista de datos, la galería
   deslizable completa de esa categoría (todas sus fotos).
--------------------------------------------------------- */
function openCakeModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  document.getElementById("modalTitle").textContent = product.name;

  const galleryContainer = document.getElementById("modalGallery");
  galleryContainer.innerHTML = "";
  const images = getCategoryImages(product);
  galleryContainer.appendChild(createSwipeableGallery(images, product.category, "modal"));

  const modalContent = document.getElementById("modalContent");
  modalContent.innerHTML = "";

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

function setupCakeModalControls() {
  document.getElementById("closeCakeModal").addEventListener("click", closeCakeModal);

  const cakeModal = document.getElementById("cakeModal");
  cakeModal.addEventListener("click", event => {
    if (event.target === cakeModal) closeCakeModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && cakeModal.classList.contains("show")) closeCakeModal();
  });
}

/* ---------------------------------------------------------
   GALERÍA DE DISEÑOS (tabs + carrusel deslizable + lightbox)
--------------------------------------------------------- */

/* =========================================================
   MELI PASTELES — LIGHTBOX
   Ver una foto ampliada, con flechas y deslizar con el dedo.
   Lo usan tanto las mini-galerías de las tarjetas del
   catálogo como la galería del modal de detalle (ver
   createSwipeableGallery en utils.js).
========================================================= */

let lightboxImages = [];
let lightboxIndex = 0;
let lightboxLabel = "";

function openLightbox(categoryKey, images, index) {
  lightboxImages = images;
  lightboxIndex = index;
  lightboxLabel = (DESIGN_GALLERY[categoryKey] && DESIGN_GALLERY[categoryKey].label) || "";

  updateLightboxImage();

  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
}

function updateLightboxImage() {
  const image = lightboxImages[lightboxIndex];
  if (!image) return;

  document.getElementById("lightboxImage").src = image.src;
  document.getElementById("lightboxImage").alt = image.alt || "";

  const caption = lightboxLabel
    ? `${lightboxLabel} — ${lightboxIndex + 1} de ${lightboxImages.length}`
    : `${lightboxIndex + 1} de ${lightboxImages.length}`;

  document.getElementById("lightboxCaption").textContent = caption;
}

function showNextLightboxImage() {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  updateLightboxImage();
}

function showPrevLightboxImage() {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
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
  
/* =========================================================
   MELI PASTELES — CONFIGURADOR DE TORTA
   Arma las opciones a partir de SHAPES, FILLING_COUNTS,
   SPONGE_OPTIONS, FILLING_OPTIONS y DECORATION_OPTIONS
   (data.js) y calcula el precio estimado en vivo.

   ETAPA 3 (pedido con fecha + pago): hoy "Consultar por
   WhatsApp" abre un mensaje armado. Cuando el pedido se pueda
   cerrar desde la web (fecha, dirección, seña), el lugar para
   enganchar eso es sendCustomOrder(): antes de abrir WhatsApp
   se llamaría a CalendarService.checkAvailability(fecha) y,
   si hay lugar, a PaymentService.createDepositCheckout() para
   cobrar la seña (ver integrations.js).
========================================================= */

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

  message += `\nDecoración: ${decoration}`;


  message += `\nPrecio estimado: ${estimatedPrice}\n\nQuería consultar disponibilidad y precio final.`;

  window.open(buildWhatsAppUrl(message), "_blank", "noopener");
}

/* =========================================================
   MELI PASTELES — MENÚ MOBILE
   Abre/cierra el panel de navegación (hamburguesa) en celular.
   En pantallas grandes el menú de texto ya se ve en el header
   y este botón queda oculto por CSS.
========================================================= */

function setupMobileNav() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mobileNav");
  const backdrop = document.getElementById("mobileNavBackdrop");

  function openNav() {
    nav.classList.add("show");
    backdrop.classList.add("show");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    nav.setAttribute("aria-hidden", "false");
  }

  function closeNav() {
    nav.classList.remove("show");
    backdrop.classList.remove("show");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    nav.setAttribute("aria-hidden", "true");
  }

  toggle.addEventListener("click", () => {
    if (nav.classList.contains("show")) closeNav();
    else openNav();
  });

  backdrop.addEventListener("click", closeNav);

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav.classList.contains("show")) closeNav();
  });
}

/* ---------------------------------------------------------
   BARRA DE PROGRESO DE SCROLL
   Una tira fina arriba de todo que se va llenando según
   cuánto bajó la persona en la página.
--------------------------------------------------------- */
function setupScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = progress + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
}

/* =========================================================
   MELI PASTELES — UTILIDADES COMPARTIDAS
   Funciones chicas y sin estado que usan varios módulos.
   Se carga antes que data.js porque data.js usa formatPrice()
   para armar alguna etiqueta de precio.
========================================================= */

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

/* Crea una tarjeta de foto reutilizable (catálogo, galería y
   modal de detalle): recorte cover con esquinas redondeadas y
   sombra propia — pensado para fotos reales (jpeg/png con
   fondo). Si la imagen todavía no existe, muestra un
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
   GALERÍA DESLIZABLE REUTILIZABLE
   La usan tanto las tarjetas del catálogo (mini-galería con
   TODAS las fotos de esa categoría) como el modal de detalle
   (galería más grande). Cada foto abre el lightbox — para eso
   necesita "categoryKey" (la clave en DESIGN_GALLERY) y usa
   openLightbox(), definida en gallery.js.
--------------------------------------------------------- */
function createSwipeableGallery(images, categoryKey, size) {
  const wrapper = document.createElement("div");
  wrapper.className = "swipe-gallery swipe-gallery--" + (size || "md");

  const track = document.createElement("div");
  track.className = "swipe-track";

  const dots = document.createElement("div");
  dots.className = "swipe-dots";
  dots.setAttribute("aria-hidden", "true");

  images.forEach((image, index) => {
    const item = document.createElement("div");
    item.className = "swipe-item";

    const frame = createPhotoFrame({ src: image.src, alt: image.alt, withZoomHint: true });
    frame.addEventListener("click", () => openLightbox(categoryKey, images, index));

    item.appendChild(frame);
    track.appendChild(item);

    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active");
    dots.appendChild(dot);
  });

  wrapper.appendChild(track);
  if (images.length > 1) wrapper.appendChild(dots);

  if (images.length > 1) {
    let scrollTimeout;
    track.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const items = track.querySelectorAll(".swipe-item");
        const dotEls = dots.querySelectorAll("span");
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

        dotEls.forEach((dot, index) => {
          dot.classList.toggle("active", index === closestIndex);
        });
      }, 80);
    });
  }

  return wrapper;
}

/* Devuelve las fotos de una categoría para armar su galería.
   Si la categoría todavía no tiene fotos cargadas en
   DESIGN_GALLERY, usa la miniatura del producto como única
   foto (así nunca queda una tarjeta vacía). */
function getCategoryImages(product) {
  const category = DESIGN_GALLERY[product.category];
  if (category && category.images && category.images.length) {
    return category.images;
  }
  return [{ src: product.thumbnail, alt: product.name }];
}

/* ---------------------------------------------------------
   RESEÑAS (demo — ver comentario en DEMO_REVIEWS)
--------------------------------------------------------- */
/*function renderReviews() {
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
     su panel privado antes de que se muestre acá. 

  message.textContent = "¡Gracias por compartir tu opinión!";
  document.getElementById("reviewName").value = "";
  document.getElementById("reviewText").value = "";
  selectedRating = 0;
  document.querySelectorAll("#ratingSelector button").forEach(star => star.classList.remove("selected"));
}*/

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
/* =========================================================
   MELI PASTELES — INICIO
   Se carga último y solo orquesta: llama a la función de
   "render" de cada módulo. Si mañana se agrega un módulo
   nuevo (por ejemplo checkout.js), acá se suma una línea.

   IMPORTANTE: cada paso corre dentro de safeRun(). Así, si
   una sola parte falla (por ejemplo por un elemento del HTML
   que cambió de nombre), esa parte queda rota pero el resto
   de la página sigue funcionando — antes, un error temprano
   cortaba en seco todo lo que venía después (por eso a veces
   el precio no sumaba y el botón de cerrar tampoco andaba: un
   solo error tempranero tumbaba ambas cosas a la vez).
========================================================= */

function safeRun(label, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`[Meli Pasteles] Falló "${label}":`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  safeRun("scroll progress", setupScrollProgress);
  safeRun("whatsapp links", setupGenericWhatsappLinks);
  safeRun("menú mobile", setupMobileNav);

  safeRun("catálogo", renderCatalog);
  safeRun("modal de torta", setupCakeModalControls);
  safeRun("lightbox", setupLightboxControls);

  safeRun("configurador", () => {
    renderCustomizerOptions();
    updateEstimatedPrice();
    document.getElementById("sendCustomOrderBtn").addEventListener("click", sendCustomOrder);
  });
});