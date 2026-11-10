"use client";

import { useEffect, useSyncExternalStore } from "react";

type Locale = "en-GB" | "ar" | "fr" | "es";
type Translation = Partial<Record<Exclude<Locale, "en-GB">, string>>;

const LOCALE_STORAGE_KEY = "sumaira-arts-locale";
const LOCALE_UPDATED_EVENT = "sumaira-locale-updated";

// Text is kept in the source language and translated at the page boundary. This lets server-rendered
// marketing sections, client controls and future content share one language switch without affecting values.
const copy: Record<string, Translation> = {
  "Products": { ar: "المنتجات", fr: "Produits", es: "Productos" },
  "About": { ar: "حول", fr: "À propos", es: "Acerca de" },
  "Contact Us": { ar: "اتصل بنا", fr: "Nous contacter", es: "Contacto" },
  "Cart": { ar: "السلة", fr: "Panier", es: "Carrito" },
  "My Orders": { ar: "طلباتي", fr: "Mes commandes", es: "Mis pedidos" },
  "Journal": { ar: "المجلة", fr: "Journal", es: "Revista" },
  "Language": { ar: "اللغة", fr: "Langue", es: "Idioma" },
  "Mixed Media Collections": { ar: "مجموعات الوسائط المختلطة", fr: "Collections multimédias", es: "Colecciones mixtas" },
  "Mixed Media Artworks": { ar: "أعمال الوسائط المختلطة", fr: "Œuvres multimédias", es: "Obras multimedia" },
  "All Products": { ar: "كل المنتجات", fr: "Tous les produits", es: "Todos los productos" },
  "Find an artwork": { ar: "ابحث عن عمل فني", fr: "Trouver une œuvre", es: "Buscar una obra" },
  "Sort": { ar: "ترتيب", fr: "Trier", es: "Ordenar" },
  "Filter": { ar: "تصفية", fr: "Filtrer", es: "Filtrar" },
  "Sort by:": { ar: "ترتيب حسب:", fr: "Trier par :", es: "Ordenar por:" },
  "Featured First": { ar: "المميزة أولاً", fr: "À la une", es: "Destacados primero" },
  "Price: Low to High": { ar: "السعر: من الأقل للأعلى", fr: "Prix : croissant", es: "Precio: de menor a mayor" },
  "Price: High to Low": { ar: "السعر: من الأعلى للأقل", fr: "Prix : décroissant", es: "Precio: de mayor a menor" },
  "Highest Rated": { ar: "الأعلى تقييماً", fr: "Les mieux notés", es: "Mejor valorados" },
  "Quick Add": { ar: "إضافة سريعة", fr: "Ajout rapide", es: "Añadir rápido" },
  "Added to Bag": { ar: "أضيف إلى السلة", fr: "Ajouté au panier", es: "Añadido al carrito" },
  "From": { ar: "ابتداءً من", fr: "À partir de", es: "Desde" },
  "Your selected edition": { ar: "إصدارك المختار", fr: "Votre édition sélectionnée", es: "Tu edición seleccionada" },
  "Style": { ar: "النمط", fr: "Style", es: "Estilo" },
  "Size": { ar: "المقاس", fr: "Taille", es: "Tamaño" },
  "Add to Cart": { ar: "أضف إلى السلة", fr: "Ajouter au panier", es: "Añadir al carrito" },
  "Added to Collection": { ar: "أضيف إلى المجموعة", fr: "Ajouté à la collection", es: "Añadido a la colección" },
  "About this artwork": { ar: "عن هذا العمل الفني", fr: "À propos de cette œuvre", es: "Sobre esta obra" },
  "Artwork highlights": { ar: "أبرز تفاصيل العمل", fr: "Points forts de l’œuvre", es: "Detalles destacados" },
  "Description": { ar: "الوصف", fr: "Description", es: "Descripción" },
  "Dimensions": { ar: "الأبعاد", fr: "Dimensions", es: "Dimensiones" },
  "Medium": { ar: "الخامة", fr: "Technique", es: "Técnica" },
  "Framing": { ar: "التأطير", fr: "Encadrement", es: "Enmarcado" },
  "Similar artworks": { ar: "أعمال فنية مشابهة", fr: "Œuvres similaires", es: "Obras similares" },
  "Shopping Bag": { ar: "حقيبة التسوق", fr: "Panier", es: "Bolsa de compra" },
  "Your Collection is Empty": { ar: "مجموعتك فارغة", fr: "Votre collection est vide", es: "Tu colección está vacía" },
  "Explore Artworks": { ar: "استكشف الأعمال الفنية", fr: "Explorer les œuvres", es: "Explorar obras" },
  "Remove": { ar: "إزالة", fr: "Retirer", es: "Eliminar" },
  "Artworks Subtotal": { ar: "المجموع الفرعي للأعمال", fr: "Sous-total des œuvres", es: "Subtotal de obras" },
  "Shipping & Handling": { ar: "الشحن والمناولة", fr: "Livraison et manutention", es: "Envío y gestión" },
  "Complimentary": { ar: "مجاني", fr: "Offert", es: "Gratuito" },
  "Certificate of Authenticity": { ar: "شهادة الأصالة", fr: "Certificat d’authenticité", es: "Certificado de autenticidad" },
  "Included": { ar: "مشمول", fr: "Inclus", es: "Incluido" },
  "Estimated Total": { ar: "الإجمالي التقديري", fr: "Total estimé", es: "Total estimado" },
  "Proceed to Checkout": { ar: "المتابعة إلى الدفع", fr: "Passer au paiement", es: "Ir al pago" },
  "Your cart is empty": { ar: "سلتك فارغة", fr: "Votre panier est vide", es: "Tu carrito está vacío" },
  "Shipping": { ar: "الشحن", fr: "Livraison", es: "Envío" },
  "Calculated at checkout": { ar: "يُحسب عند الدفع", fr: "Calculé au paiement", es: "Calculado al pagar" },
  "Subtotal": { ar: "المجموع الفرعي", fr: "Sous-total", es: "Subtotal" },
  "No Orders Found": { ar: "لا توجد طلبات", fr: "Aucune commande", es: "No se encontraron pedidos" },
  "Explore Gallery": { ar: "استكشف المعرض", fr: "Explorer la galerie", es: "Explorar la galería" },
  "Order Confirmed": { ar: "تم تأكيد الطلب", fr: "Commande confirmée", es: "Pedido confirmado" },
  "Artwork Order Received": { ar: "تم استلام طلب العمل الفني", fr: "Commande d’œuvre reçue", es: "Pedido de obra recibido" },
  "Your Bag is Empty": { ar: "حقيبتك فارغة", fr: "Votre panier est vide", es: "Tu bolsa está vacía" },
  "Collector & Shipping Details": { ar: "بيانات المقتني والشحن", fr: "Coordonnées du collectionneur et livraison", es: "Datos del coleccionista y envío" },
  "Collector Information": { ar: "بيانات المقتني", fr: "Informations du collectionneur", es: "Información del coleccionista" },
  "Delivery Destination": { ar: "وجهة التسليم", fr: "Destination de livraison", es: "Destino de entrega" },
  "Total Due": { ar: "الإجمالي المستحق", fr: "Total dû", es: "Total a pagar" },
  "Free": { ar: "مجاني", fr: "Gratuit", es: "Gratis" },
  "The Art of Living": { ar: "فن العيش", fr: "L’art de vivre", es: "El arte de vivir" },
  "Where Art, Heritage & Modern Design Meet": { ar: "حيث يلتقي الفن والتراث والتصميم الحديث", fr: "Là où l’art, le patrimoine et le design moderne se rencontrent", es: "Donde se unen arte, patrimonio y diseño moderno" },
  "Contemporary Art • Curated With Purpose": { ar: "فن معاصر • منتقى بعناية", fr: "Art contemporain • Sélectionné avec soin", es: "Arte contemporáneo • Seleccionado con propósito" },
  "Art That Gives Your Space": { ar: "فن يمنح مساحتك", fr: "Un art qui donne à votre espace", es: "Arte que da a tu espacio" },
  "Meaning.": { ar: "معنى.", fr: "du sens.", es: "significado." },
  "Discover refined contemporary artwork created to bring character, depth and timeless beauty into the spaces you live and work in.": { ar: "اكتشف أعمالاً فنية معاصرة راقية صُممت لتمنح المساحات التي تعيش وتعمل فيها شخصية وعمقاً وجمالاً خالداً.", fr: "Découvrez des œuvres contemporaines raffinées, créées pour apporter caractère, profondeur et beauté intemporelle à vos espaces de vie et de travail.", es: "Descubre arte contemporáneo refinado creado para aportar carácter, profundidad y belleza atemporal a los espacios donde vives y trabajas." },
  "Explore Artwork": { ar: "استكشف الأعمال الفنية", fr: "Explorer les œuvres", es: "Explorar obras" },
  "Discover Our Story": { ar: "اكتشف قصتنا", fr: "Découvrir notre histoire", es: "Descubre nuestra historia" },
  "Explore Mixed Media": { ar: "استكشف الوسائط المختلطة", fr: "Explorer les œuvres multimédias", es: "Explorar técnica mixta" },
  "View Collections": { ar: "عرض المجموعات", fr: "Voir les collections", es: "Ver colecciones" },
  "Bespoke Art": { ar: "فن حسب الطلب", fr: "Art sur mesure", es: "Arte a medida" },
  "Create Something Unique": { ar: "ابتكر شيئاً فريداً", fr: "Créez quelque chose d’unique", es: "Crea algo único" },
  "Start a Commission": { ar: "ابدأ طلباً خاصاً", fr: "Commander une œuvre", es: "Encargar una obra" },
  "Explore": { ar: "استكشف", fr: "Explorer", es: "Explorar" },
  "The Collections": { ar: "المجموعات", fr: "Les collections", es: "Las colecciones" },
  "The Artist": { ar: "الفنانة", fr: "L’artiste", es: "La artista" },
  "Meet the Artist": { ar: "تعرّف على الفنانة", fr: "Rencontrer l’artiste", es: "Conoce a la artista" },
  "The 99 Names Collection": { ar: "مجموعة الأسماء الحسنى", fr: "La collection des 99 noms", es: "La colección de los 99 nombres" },
  "Qur’anic Calligraphy for": { ar: "الخط القرآني من أجل", fr: "La calligraphie coranique pour", es: "Caligrafía coránica para" },
  "Modern Living.": { ar: "الحياة العصرية.", fr: "la vie moderne.", es: "la vida moderna." },
  "Hand-embellished canvas artworks that bring the beauty of Arabic script into contemporary interiors.": { ar: "أعمال قماشية مزينة يدوياً تجلب جمال الخط العربي إلى الديكورات المعاصرة.", fr: "Des toiles rehaussées à la main qui apportent la beauté de l’écriture arabe aux intérieurs contemporains.", es: "Obras en lienzo embellecidas a mano que llevan la belleza de la escritura árabe a interiores contemporáneos." },
  "Created For": { ar: "مصمم من أجل", fr: "Créé pour", es: "Creado para" },
  "Your Space.": { ar: "مساحتك.", fr: "votre espace.", es: "tu espacio." },
  "Commission artwork designed around your vision, preferred dimensions and interior, made specifically for your home or workspace.": { ar: "اطلب عملاً فنياً صُمم وفق رؤيتك وأبعادك المفضلة وديكورك، خصيصاً لمنزلك أو مساحة عملك.", fr: "Commandez une œuvre conçue selon votre vision, vos dimensions et votre intérieur, spécialement pour votre maison ou votre espace de travail.", es: "Encarga una obra diseñada según tu visión, dimensiones e interior, creada específicamente para tu hogar o espacio de trabajo." },
  "Featured work": { ar: "عمل مميز", fr: "Œuvre à la une", es: "Obra destacada" },
  "Featured collection": { ar: "مجموعة مميزة", fr: "Collection à la une", es: "Colección destacada" },
  "Explore a curated world of contemporary artwork and beautifully crafted pieces inspired by culture, creativity and modern living. Each collection is designed to bring a distinctive sense of character and expression to your space.": { ar: "استكشف عالماً مختاراً من الفن المعاصر والقطع المصنوعة بإتقان والمستوحاة من الثقافة والإبداع والحياة الحديثة. صُممت كل مجموعة لتمنح مساحتك طابعاً وتعبيراً مميزين.", fr: "Explorez un univers d’art contemporain et de pièces façonnées avec soin, inspirées par la culture, la créativité et la vie moderne. Chaque collection apporte caractère et expression à votre espace.", es: "Explora un mundo seleccionado de arte contemporáneo y piezas bellamente elaboradas inspiradas en la cultura, la creatividad y la vida moderna. Cada colección aporta carácter y expresión a tu espacio." },
  "Our Story": { ar: "قصتنا", fr: "Notre histoire", es: "Nuestra historia" },
  "Hand-Embellished Canvas": { ar: "قماش مزين يدوياً", fr: "Toile rehaussée à la main", es: "Lienzo embellecido a mano" },
  "Hand-Textured Originals": { ar: "أعمال أصلية ذات ملمس يدوي", fr: "Originaux texturés à la main", es: "Originales texturizados a mano" },
  "Original Texture Artworks": { ar: "أعمال فنية أصلية ذات ملمس", fr: "Œuvres originales texturées", es: "Obras originales texturizadas" },
  "Hand-embellished printed canvas artworks combining texture, detail, and Qur’anic calligraphy in a contemporary mixed media expression.": { ar: "أعمال قماشية مطبوعة ومزينة يدوياً تجمع بين الملمس والتفاصيل والخط القرآني في تعبير معاصر بالوسائط المختلطة.", fr: "Des toiles imprimées rehaussées à la main associant texture, détail et calligraphie coranique dans une expression contemporaine.", es: "Lienzos impresos embellecidos a mano que combinan textura, detalle y caligrafía coránica en una expresión contemporánea." },
  "One-of-a-kind textured artworks created by hand on raw canvas, incorporating Qur’anic verses, surahs, and Arabic letters through layers of sculptural texture.": { ar: "أعمال فنية فريدة ذات ملمس، صُنعت يدوياً على قماش خام وتدمج آيات وسوراً وحروفاً عربية عبر طبقات نحتية.", fr: "Des œuvres texturées uniques, créées à la main sur toile brute, intégrant versets coraniques, sourates et lettres arabes.", es: "Obras texturizadas únicas hechas a mano sobre lienzo crudo, con versos coránicos, suras y letras árabes en capas escultóricas." },
  "Explore Originals": { ar: "استكشف الأعمال الأصلية", fr: "Explorer les originaux", es: "Explorar originales" },
  "Where Heritage Meets Contemporary Expression": { ar: "حيث يلتقي التراث بالتعبير المعاصر", fr: "Là où le patrimoine rencontre l’expression contemporaine", es: "Donde el patrimonio se une a la expresión contemporánea" },
  "Discover the creative vision, artistic process and cultural influences behind the collection.": { ar: "اكتشف الرؤية الإبداعية والعملية الفنية والتأثيرات الثقافية وراء المجموعة.", fr: "Découvrez la vision créative, le processus artistique et les influences culturelles de la collection.", es: "Descubre la visión creativa, el proceso artístico y las influencias culturales de la colección." },
  "Art should not simply fill a wall. It should create atmosphere, express personality and become part of the story of a space.": { ar: "لا ينبغي للفن أن يملأ جداراً فحسب، بل أن يصنع أجواءً ويعبر عن الشخصية ويصبح جزءاً من قصة المكان.", fr: "L’art ne doit pas simplement remplir un mur. Il doit créer une atmosphère, exprimer une personnalité et devenir partie de l’histoire d’un lieu.", es: "El arte no debe limitarse a llenar una pared. Debe crear ambiente, expresar personalidad y formar parte de la historia de un espacio." },
  "Bring your vision to life with artwork created specifically for your home, office or commercial space. From concept and curation to the finished piece, create something that belongs uniquely to you.": { ar: "حوّل رؤيتك إلى واقع بعمل فني صُمم لمنزلك أو مكتبك أو مساحتك التجارية. من الفكرة والاختيار إلى القطعة النهائية، ابتكر شيئاً يخصك وحدك.", fr: "Donnez vie à votre vision avec une œuvre créée pour votre maison, bureau ou espace commercial. Du concept à la pièce finale, créez quelque chose qui vous ressemble.", es: "Da vida a tu visión con una obra creada para tu hogar, oficina o espacio comercial. Del concepto a la pieza final, crea algo que te pertenezca." },
  "Concept": { ar: "الفكرة", fr: "Concept", es: "Concepto" },
  "Curation": { ar: "الاختيار", fr: "Sélection", es: "Curaduría" },
  "The finished piece": { ar: "القطعة النهائية", fr: "La pièce finale", es: "La pieza terminada" },
  "Your vision, space and dimensions.": { ar: "رؤيتك ومساحتك وأبعادك.", fr: "Votre vision, votre espace et vos dimensions.", es: "Tu visión, espacio y dimensiones." },
  "Palette, form and materials chosen with you.": { ar: "الألوان والشكل والخامات المختارة معك.", fr: "Palette, forme et matériaux choisis avec vous.", es: "Paleta, forma y materiales elegidos contigo." },
  "Made by hand, finished and delivered.": { ar: "صُنع يدوياً وشُطب وسُلّم.", fr: "Fabriquée à la main, finalisée et livrée.", es: "Hecha a mano, terminada y entregada." },
  "Art in Your Space": { ar: "الفن في مساحتك", fr: "L’art dans votre espace", es: "Arte en tu espacio" },
  "See how carefully selected artwork transforms living rooms, bedrooms, offices and contemporary interiors.": { ar: "شاهد كيف تحول الأعمال المختارة بعناية غرف المعيشة وغرف النوم والمكاتب والديكورات المعاصرة.", fr: "Découvrez comment des œuvres choisies avec soin transforment salons, chambres, bureaux et intérieurs contemporains.", es: "Descubre cómo obras seleccionadas cuidadosamente transforman salas, dormitorios, oficinas e interiores contemporáneos." },
  "Explore Inspiration": { ar: "استكشف الإلهام", fr: "Explorer l’inspiration", es: "Explorar inspiración" },
  "Curated For You": { ar: "مختار لك", fr: "Sélectionné pour vous", es: "Seleccionado para ti" },
  "Explore a selection of distinctive artworks chosen for their beauty, craftsmanship and ability to transform a space.": { ar: "استكشف مجموعة من الأعمال المميزة المختارة لجمالها وحرفيتها وقدرتها على تغيير المساحة.", fr: "Explorez une sélection d’œuvres distinctives choisies pour leur beauté, leur savoir-faire et leur capacité à transformer un espace.", es: "Explora una selección de obras distintivas elegidas por su belleza, artesanía y capacidad de transformar un espacio." },
  "View All Artwork": { ar: "عرض كل الأعمال", fr: "Voir toutes les œuvres", es: "Ver todas las obras" },
  "Collector Stories": { ar: "قصص المقتنين", fr: "Témoignages de collectionneurs", es: "Historias de coleccionistas" },
  "Loved By Art Collectors": { ar: "محبوبة من مقتني الفن", fr: "Aimée des collectionneurs d’art", es: "Amada por coleccionistas de arte" },
  "from": { ar: "من", fr: "sur", es: "de" },
  "reviews": { ar: "مراجعة", fr: "avis", es: "reseñas" },
  "The piece changed how our living room feels. Quiet, considered and beautifully finished.": { ar: "لقد غيّرت هذه القطعة إحساس غرفة معيشتنا. هادئة ومدروسة ومصنوعة بإتقان جميل.", fr: "Cette pièce a transformé l’atmosphère de notre salon. Elle est calme, réfléchie et magnifiquement réalisée.", es: "La obra transformó la sensación de nuestra sala. Es serena, cuidada y está bellamente terminada." },
  "The craftsmanship is immediate. Every detail feels like it was made by hand, for us.": { ar: "تظهر الحرفية من اللحظة الأولى. يبدو كل تفصيل وكأنه صُنع يدوياً من أجلنا.", fr: "Le savoir-faire est évident. Chaque détail semble avoir été réalisé à la main, pour nous.", es: "La artesanía se percibe de inmediato. Cada detalle parece hecho a mano para nosotros." },
  "We commissioned a work for our office. It now anchors the entire space.": { ar: "طلبنا عملاً خاصاً لمكتبنا، وأصبح الآن محور المساحة بأكملها.", fr: "Nous avons commandé une œuvre pour notre bureau. Elle ancre désormais tout l’espace.", es: "Encargamos una obra para nuestra oficina. Ahora da unidad a todo el espacio." },
  "Art collector": { ar: "مقتنٍ فني", fr: "Collectionneur d’art", es: "Coleccionista de arte" },
  "Most Loved Artworks": { ar: "الأعمال الفنية الأكثر حباً", fr: "Œuvres les plus appréciées", es: "Obras más queridas" },
  "Designed To Belong": { ar: "مصممة لتنتمي إلى مساحتك", fr: "Conçues pour s’intégrer", es: "Diseñadas para pertenecer" },
  "Stories & Inspiration": { ar: "قصص وإلهام", fr: "Histoires et inspiration", es: "Historias e inspiración" },
  "Read Article": { ar: "اقرأ المقال", fr: "Lire l’article", es: "Leer artículo" },
  "A contemporary mixed media artwork thoughtfully created to bring texture, colour and character to modern interiors.": { ar: "عمل فني معاصر بالوسائط المختلطة صُمم بعناية ليمنح الديكورات الحديثة ملمساً ولوناً وشخصية.", fr: "Une œuvre contemporaine en techniques mixtes, créée avec soin pour apporter texture, couleur et caractère aux intérieurs modernes.", es: "Una obra contemporánea de técnica mixta creada cuidadosamente para aportar textura, color y carácter a interiores modernos." },
};

const getLocale = (): Locale => {
  const locale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return locale === "ar" || locale === "fr" || locale === "es" ? locale : "en-GB";
};

const subscribe = (onChange: () => void) => {
  const onStorage = (event: StorageEvent) => event.key === LOCALE_STORAGE_KEY && onChange();
  window.addEventListener("storage", onStorage);
  window.addEventListener(LOCALE_UPDATED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(LOCALE_UPDATED_EVENT, onChange);
  };
};

const ignoredTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG"]);
const originalText = new WeakMap<Text, string>();
const translationCache = new Map<string, Promise<string | null>>();

const shouldTranslate = (phrase: string) => {
  // Keep prices, quantities, identifiers and intentionally non-Latin artwork calligraphy intact.
  if (!/[A-Za-z]/.test(phrase) || /^[\d\s.,:+/€$£-]+$/.test(phrase)) return false;
  return phrase.length <= 420;
};

const machineTranslate = (phrase: string, locale: Exclude<Locale, "en-GB">) => {
  const cacheKey = `${locale}:${phrase}`;
  const existing = translationCache.get(cacheKey);
  if (existing) return existing;

  const request = fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${locale}&dt=t&q=${encodeURIComponent(phrase)}`,
  )
    .then(async (response) => {
      if (!response.ok) return null;
      const payload = await response.json() as [Array<[string]>];
      return payload[0]?.map(([text]) => text).join("") ?? null;
    })
    .catch(() => null);

  translationCache.set(cacheKey, request);
  return request;
};

export function LanguageTranslator() {
  const locale = useSyncExternalStore<Locale>(subscribe, getLocale, () => "en-GB");

  useEffect(() => {
    let active = true;
    const translate = (node: Text) => {
      if (!node.parentElement || ignoredTags.has(node.parentElement.tagName)) return;
      const source = originalText.get(node) ?? node.nodeValue ?? "";
      originalText.set(node, source);
      const leading = source.match(/^\s*/)?.[0] ?? "";
      const trailing = source.match(/\s*$/)?.[0] ?? "";
      const phrase = source.trim();
      const translated = locale === "en-GB" ? phrase : copy[phrase]?.[locale];
      if (translated) {
        node.nodeValue = `${leading}${translated}${trailing}`;
      } else if (locale === "en-GB") {
        node.nodeValue = source;
      } else if (shouldTranslate(phrase)) {
        void machineTranslate(phrase, locale).then((machineCopy) => {
          if (active && machineCopy && originalText.get(node) === source) {
            node.nodeValue = `${leading}${machineCopy}${trailing}`;
          }
        });
      }
    };

    const translateTree = (root: Node) => {
      if (root.nodeType === Node.TEXT_NODE) {
        translate(root as Text);
        return;
      }
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        translate(node as Text);
        node = walker.nextNode();
      }
    };

    translateTree(document.body);
    const observer = new MutationObserver((changes) => {
      changes.forEach((change) => change.addedNodes.forEach((node) => translateTree(node)));
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [locale]);

  return null;
}
