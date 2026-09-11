/* =========================================================
   MELI PASTELES — LÓGICA DEL SITIO
   Todo el contenido de productos, precios y galería vive acá,
   centralizado en objetos/arrays. Para cambiar un precio o
   agregar una foto, se edita solo este archivo.

   FUTURA ETAPA 2 (Supabase + Google Calendar + panel privado):
   PRODUCTS y DESIGN_GALLERY son los que en la próxima etapa se
   reemplazarían por consultas a la base de datos (ej.
   supabase.from('products')...). Las funciones que los
   consumen (renderCatalog, renderCustomizerOptions) ya están
   separadas de los datos, así que ese reemplazo no debería
   tocar el resto del código.

   RESEÑAS: la sección se sacó del sitio hasta poder moderarlas
   de verdad. Si en algún momento se reactiva, hay que volver a
   sumar: los datos (reviews desde Supabase), el HTML de la
   sección + el modal para dejar una opinión, y las funciones
   renderReviews/setupReviewModal/submitReview.
========================================================= */

const WHATSAPP_NUMBER = "543704415774";

/* Extra: torta + 12 cupcakes a juego. */
const CUPCAKES_ADDON_PRICE = 10000;

/* ---------------------------------------------------------
   UTILIDADES COMPARTIDAS
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

/* Crea una tarjeta de foto reutilizable (catálogo, galería y
   modal de detalle): recorte cover con esquinas redondeadas y
   sombra propia — pensado para fotos reales. Si la imagen
   todavía no existe, muestra un placeholder elegante en vez de
   romper el diseño. */
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

/* Galería deslizable reutilizable (tarjetas del catálogo y
   modal). "categoryKey" es la clave en DESIGN_GALLERY — se usa
   para mostrar el nombre correcto en el pie del lightbox. */
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

/* Devuelve las fotos de un producto para armar su galería.
   Usa "galleryKey" si el producto lo tiene (necesario cuando
   dos productos comparten "category" pero tienen carpetas de
   fotos distintas, como las dos variantes de torta temática);
   si no, usa "category". Si esa clave todavía no tiene fotos
   en DESIGN_GALLERY, cae en la miniatura del producto. */
function getCategoryImages(product) {
  const key = product.galleryKey || product.category;
  const category = DESIGN_GALLERY[key];

  if (category && category.images && category.images.length) {
    return category.images;
  }

  return [{ src: product.thumbnail, alt: product.name }];
}

/* ---------------------------------------------------------
   PRODUCTOS DEL CATÁLOGO
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
    thumbnail: "img/tortas-redondas/torta-redonda1.jpg",
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
    id: "redonda-frutal",
    category: "redondas",
    galleryKey: "redonda_frutal",
    name: "Torta redonda frutal",
    tag: "Nueva",
    shortDescription: "Torta redonda con una combinación fresca y delicada de frutas.",
    diameter: "18 cm de diámetro",
    weight: "~1.200 g",
    servings: "~20 porciones",
    priceFrom: 28000,
    priceLabel: "Desde $28.000",
    priceIsEstimate: false,
    thumbnail: "img/tortas-redondas/torta-redonda-frutal.jpeg",
    detailRows: [
      ["Tamaño", "18 cm de diámetro"],
      ["Peso", "~1.200 g"],
      ["Porciones", "~20 porciones"],
      ["Decoración", "Diseño frutal"],
      ["Cobertura", "Chantilly"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar por una torta redonda frutal de 18 cm."
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
    thumbnail: "img/tortas-corazon/torta-corazon1.jpg",
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
    id: "tematica-toppers",
    category: "tematicas",
    galleryKey: "tematicas_toppers",
    name: "Torta temática con toppers",
    tag: "Personalizable",
    shortDescription: "Torta temática decorada con toppers, colores y detalles personalizados.",
    diameter: "18 cm de diámetro",
    weight: "~1.200 g",
    servings: "~20 porciones",
    priceFrom: 28000,
    priceLabel: "Desde $28.000",
    priceIsEstimate: true,
    thumbnail: "img/tortas-tematicas/torta-tematica1.jpeg",
    detailRows: [
      ["Base", "Torta redonda o de corazón de 18 cm"],
      ["Decoración", "Toppers, colores y detalles según la temática"],
      ["Precio", "Desde $28.000"],
      ["Personalización", "Podés enviar una foto de referencia"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar por una torta temática con toppers."
  },
  {
    id: "tematica-lamina",
    category: "tematicas",
    galleryKey: "tematicas_lamina",
    name: "Torta temática con lámina comestible",
    tag: "Personalizable",
    shortDescription: "Torta temática personalizada con lámina comestible y decoración a juego.",
    diameter: "18 cm de diámetro",
    weight: "~1.200 g",
    servings: "~20 porciones",
    priceFrom: 30000,
    priceLabel: "Desde $30.000",
    priceIsEstimate: true,
    thumbnail: "img/tortas-tematicas/torta-tematica2.jpeg",
    detailRows: [
      ["Base", "Torta redonda o de corazón de 18 cm"],
      ["Decoración", "Lámina comestible y detalles según la temática"],
      ["Precio", "Desde $30.000"],
      ["Personalización", "Podés enviar una foto de referencia"]
    ],
    whatsappMessage: "Hola Meli! Quería consultar por una torta temática con lámina comestible."
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
    thumbnail: "img/tortas-club/club1(1).jpg",
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
    /* OJO: esta ruta tiene un espacio ("tortas evento", con %20) y
       la galería de abajo usa "tortas-evento" con guion — son dos
       carpetas distintas. Si tenés una sola carpeta real, dejá
       las dos rutas iguales (te recomiendo la que tiene guion). */
    thumbnail: "img/tortas-evento/torta-evento1.jpeg",
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
   GALERÍA DE DISEÑOS (deslizable, agrupada por tipo)
--------------------------------------------------------- */
const DESIGN_GALLERY = {
  redondas: {
    label: "Redondas",
    images: [
      { src: "img/tortas-redondas/torta-redonda1.jpg", alt: "Torta redonda 1" },
      { src: "img/tortas-redondas/torta-redonda2(1).jpg", alt: "Torta redonda 2" },
      { src: "img/tortas-redondas/torta-redonda2(2).jpg", alt: "Torta redonda 3" },
      { src: "img/tortas-redondas/torta-redonda2(3).jpg", alt: "Torta redonda 4" },
      { src: "img/tortas-redondas/torta-redonda2(4).jpg", alt: "Torta redonda 5" },
      { src: "img/tortas-redondas/torta-redonda2(5).jpg", alt: "Torta redonda 6" },
      { src: "img/tortas-redondas/torta-redonda2(6).jpg", alt: "Torta redonda 7" },
      { src: "img/tortas-redondas/torta-redonda2(7).jpg", alt: "Torta redonda 8" },
      { src: "img/tortas-redondas/torta-redonda2(8).jpg", alt: "Torta redonda 9" },
      { src: "img/tortas-redondas/torta-redonda2(9).jpg", alt: "Torta redonda 10" },
      { src: "img/tortas-redondas/torta-redonda2(10).jpg", alt: "Torta redonda 11" },
      { src: "img/tortas-redondas/torta-redonda2(11).jpg", alt: "Torta redonda 12" },
      { src: "img/tortas-redondas/torta-redonda2(12).jpg", alt: "Torta redonda 13" },
      { src: "img/tortas-redondas/torta-redonda2(13).jpg", alt: "Torta redonda 14" },
      { src: "img/tortas-redondas/torta-redonda2(14).jpg", alt: "Torta redonda 15" },
      { src: "img/tortas-redondas/torta-redonda2(15).jpg", alt: "Torta redonda 16" },
      { src: "img/tortas-redondas/torta-redonda2(16).jpg", alt: "Torta redonda 17" },
      { src: "img/tortas-redondas/torta-redonda2(17).jpg", alt: "Torta redonda 18" },
      { src: "img/tortas-redondas/torta-redonda2(18).jpg", alt: "Torta redonda 19" },
      { src: "img/tortas-redondas/torta-redonda2(19).jpg", alt: "Torta redonda 20" },
      { src: "img/tortas-redondas/torta-redonda2(20).jpg", alt: "Torta redonda 21" },
      { src: "img/tortas-redondas/torta-redonda2(21).jpg", alt: "Torta redonda 22" },
      { src: "img/tortas-redondas/torta-redonda2(22).jpg", alt: "Torta redonda 23" },
      { src: "img/tortas-redondas/torta-redonda2(23).jpg", alt: "Torta redonda 24" }
    ]
  },
  redonda_frutal: {
    label: "Torta redonda frutal",
    images: [
      { src: "img/tortas-redondas/torta-redonda-frutal/torta-redonda-frutal.jpg", alt: "Torta redonda frutal 1" },
      { src: "img/tortas-redondas/torta-redonda-frutal/torta-redonda-frutal2.jpg", alt: "Torta redonda frutal 2" },
      { src: "img/tortas-redondas/torta-redonda-frutal/torta-redonda-frutal1.jpg", alt: "Torta redonda frutal 3" },
      { src: "img/tortas-redondas/torta-redonda-frutal/torta-redonda-frutal3.jpg", alt: "Torta redonda frutal 4" },
      { src: "img/tortas-redondas/torta-redonda-frutal/torta-redonda-frutal4.jpg", alt: "Torta redonda frutal 5" }
    ]
  },
  corazon: {
    label: "Corazón",
    images: [
      { src: "img/tortas-corazon/torta-corazon1.jpg", alt: "Torta corazón 1" },
      { src: "img/tortas-corazon/torta-corazon2.jpg", alt: "Torta corazón 2" },
      { src: "img/tortas-corazon/torta-corazon3.jpg", alt: "Torta corazón 3" },
      { src: "img/tortas-corazon/torta-corazon4.jpg", alt: "Torta corazón 4" },
      { src: "img/tortas-corazon/torta-corazon5.jpg", alt: "Torta corazón 5" },
      { src: "img/tortas-corazon/torta-corazon6.jpg", alt: "Torta corazón 6" },
      { src: "img/tortas-corazon/torta-corazon7.jpg", alt: "Torta corazón 7" },
      { src: "img/tortas-corazon/torta-corazon8.jpg", alt: "Torta corazón 8" },
      { src: "img/tortas-corazon/torta-corazon9.jpg", alt: "Torta corazón 9" },
      { src: "img/tortas-corazon/torta-corazon10.jpg", alt: "Torta corazón 10" },
      { src: "img/tortas-corazon/torta-corazon11.jpg", alt: "Torta corazón 11" },
      { src: "img/tortas-corazon/torta-corazon12.jpg", alt: "Torta corazón 12" },
      { src: "img/tortas-corazon/torta-corazon13.jpg", alt: "Torta corazón 13" },
      { src: "img/tortas-corazon/torta-corazon14.jpg", alt: "Torta corazón 14" }
    ]
  },
  club: {
    label: "Club",
    images: [
      { src: "img/tortas-club/club1(1).jpg", alt: "Torta club 1" },
      { src: "img/tortas-club/club1(2).jpg", alt: "Torta club 2" },
      { src: "img/tortas-club/club1(3).jpg", alt: "Torta club 3" },
      { src: "img/tortas-club/club1(4).jpg", alt: "Torta club 4" },
      { src: "img/tortas-club/club1(5).jpg", alt: "Torta club 5" }
    ]
  },
  rectangulares: {
    label: "Rectangulares",
    images: [
      { src: "img/tortas-rectangulares/torta-rectangular1.jpeg", alt: "Torta rectangular 1" },
      { src: "img/tortas-rectangulares/torta-rectangular2.jpeg", alt: "Torta rectangular 2" }
    ]
  },
  tematicas_toppers: {
    label: "Temáticas · Toppers",
    images: [
      { src: "img/tortas-tematicas/toppers/torta-tematica1.jpeg", alt: "Torta temática con toppers 1" },
      { src: "img/tortas-tematicas/toppers/torta-tematica2.jpeg", alt: "Torta temática con toppers 2" },
      { src: "img/tortas-tematicas/toppers/torta-tematica3.jpeg", alt: "Torta temática con toppers 3" },
      { src: "img/tortas-tematicas/toppers/torta-tematica4.jpeg", alt: "Torta temática con toppers 4" },
      { src: "img/tortas-tematicas/toppers/torta-tematica5.jpg", alt: "Torta temática con toppers 5" },
      { src: "img/tortas-tematicas/toppers/torta-tematica6.jpeg", alt: "Torta temática con toppers 6" },
      { src: "img/tortas-tematicas/toppers/torta-tematica7.jpeg", alt: "Torta temática con toppers 7" },
      { src: "img/tortas-tematicas/toppers/torta-tematica8.jpg", alt: "Torta temática con toppers 8" }
    ]
  },
  tematicas_lamina: {
    label: "Temáticas · Lámina comestible",
    images: [
      { src: "img/tortas-tematicas/lamina/tematica-lamina1.jpeg", alt: "Torta temática con lámina comestible 1" },
      { src: "img/tortas-tematicas/lamina/tematica-lamina2.jpg", alt: "Torta temática con lámina comestible 2" },
      { src: "img/tortas-tematicas/lamina/tematica-lamina3.jpg", alt: "Torta temática con lámina comestible 3" }
    ]
  },
  evento: {
    label: "Eventos",
    images: [
      { src: "img/tortas-evento/torta-evento1..jpeg", alt: "Torta de evento 1" },
      { src: "img/tortas-evento/torta-evento2.jpeg", alt: "Torta de evento 2" },
      { src: "img/tortas-evento/torta-evento3.jpeg", alt: "Torta de evento 3" },
      { src: "img/tortas-evento/torta-evento4.jpeg", alt: "Torta de evento 4" }
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
   OPCIONES DEL CONFIGURADOR
--------------------------------------------------------- */
const SHAPES = [
  { value: "Redonda", price: 23000, label: "Redonda" },
  { value: "Corazón", price: 25000, label: "Corazón" },
  { value: "Rectangular", price: 50000, label: "Rectangular" }
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
  {
    value: "Topper Feliz Cumpleaños incluido",
    extra: 0,
    label: "Topper \"Feliz Cumpleaños\" y moño (opcionales, sin cargo)"
  },
  {
    value: "Temática con toppers",
    extra: 5000,
    label: "Temática con toppers",
    labelSuffix: " (+$5.000)"
  },
  {
    value: "Temática con lámina comestible",
    extra: 7000,
    label: "Temática con lámina comestible",
    labelSuffix: " (+$7.000)"
  }
];

/* ---------------------------------------------------------
   CATÁLOGO (se genera dinámicamente desde PRODUCTS)
--------------------------------------------------------- */
function renderCatalog() {
  const grid = document.getElementById("catalogGrid");
  grid.innerHTML = "";

  PRODUCTS.forEach(product => {
    const card = document.createElement("article");
    card.className = "cake-card";

    const images = getCategoryImages(product);
    const photoWrapper = document.createElement("div");
    photoWrapper.className = "cake-photo";

    const galleryKey = product.galleryKey || product.category;
    const gallery = createSwipeableGallery(images, galleryKey, "card");
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
--------------------------------------------------------- */
function openCakeModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  document.getElementById("modalTitle").textContent = product.name;

  const galleryContainer = document.getElementById("modalGallery");
  galleryContainer.innerHTML = "";
  const images = getCategoryImages(product);
  const galleryKey = product.galleryKey || product.category;
  galleryContainer.appendChild(createSwipeableGallery(images, galleryKey, "modal"));

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
   LIGHTBOX
--------------------------------------------------------- */
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

  const spongeSelect = document.getElementById("bizcochuelo");
  spongeSelect.innerHTML = SPONGE_OPTIONS
    .map(value => `<option value="${value}">${value}</option>`)
    .join("");
  spongeSelect.addEventListener("change", () => {
    document.getElementById("chocolateHint").style.display =
      spongeSelect.value === "Chocolate" ? "block" : "none";
  });

  const fillingsHtml = FILLING_OPTIONS
    .map(option => `<option value="${option.value}">${option.value}${option.labelSuffix || ""}</option>`)
    .join("");
  document.getElementById("relleno1").innerHTML = fillingsHtml;
  document.getElementById("relleno2").innerHTML = fillingsHtml;

  document.getElementById("decoracion").innerHTML = DECORATION_OPTIONS
    .map(option => `<option value="${option.value}">${option.label || option.value}${option.labelSuffix || ""}</option>`)
    .join("");

  const cupcakesAddon = document.getElementById("cupcakesAddon");
  const cupcakesAddonPrice = document.getElementById("cupcakesAddonPrice");
  if (cupcakesAddonPrice) {
    cupcakesAddonPrice.textContent = `+${formatPrice(CUPCAKES_ADDON_PRICE)} sobre el precio de la torta`;
  }
  if (cupcakesAddon) {
    cupcakesAddon.addEventListener("change", updateEstimatedPrice);
  }

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
  const cupcakesAddon = document.getElementById("cupcakesAddon");

  const filling1 = FILLING_OPTIONS.find(f => f.value === filling1Value);
  const filling2 = FILLING_OPTIONS.find(f => f.value === filling2Value);
  const decoration = DECORATION_OPTIONS.find(d => d.value === decorationValue);

  if (filling1) price += filling1.extra;
  if (selectedFillingCount.value === 2 && filling2) price += filling2.extra;
  if (decoration) price += decoration.extra;
  if (cupcakesAddon && cupcakesAddon.checked) price += CUPCAKES_ADDON_PRICE;

  document.getElementById("estimatedPrice").textContent = formatPrice(price);
}

function sendCustomOrder() {
  const bizcochuelo = document.getElementById("bizcochuelo").value;
  const filling1 = document.getElementById("relleno1").value;
  const filling2 = document.getElementById("relleno2").value;
  const decoration = document.getElementById("decoracion").value;
  const estimatedPrice = document.getElementById("estimatedPrice").textContent;
  const cupcakesAddon = document.getElementById("cupcakesAddon");

  let message = `Hola Meli! Quiero consultar por una torta personalizada.

Forma: ${selectedShape.value}
Bizcochuelo: ${bizcochuelo}
Cantidad de rellenos: ${selectedFillingCount.value}
Relleno 1: ${filling1}`;

  if (selectedFillingCount.value === 2) {
    message += `\nRelleno 2: ${filling2}`;
  }

  message += `\nDecoración: ${decoration}`;

  if (cupcakesAddon && cupcakesAddon.checked) {
    message += `\nExtra: 12 cupcakes a juego (+${formatPrice(CUPCAKES_ADDON_PRICE)})`;
  }

  message += `\nPrecio estimado: ${estimatedPrice}\n\nQuería consultar disponibilidad y precio final.`;

  window.open(buildWhatsAppUrl(message), "_blank", "noopener");
}

/* ---------------------------------------------------------
   MENÚ MOBILE
--------------------------------------------------------- */
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

/* ---------------------------------------------------------
   INICIALIZACIÓN
   Cada paso corre dentro de safeRun(): si uno se rompe (por
   ejemplo por un id de HTML que cambió), queda aislado y el
   resto de la página sigue funcionando.
--------------------------------------------------------- */
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