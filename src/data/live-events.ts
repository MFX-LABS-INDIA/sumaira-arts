import type { EventCategoryId } from "@/types/event-booking";
import { site } from "@/constants/site";

export interface LiveEventService {
  id: EventCategoryId;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  alt: string;
}

export interface EventGalleryItem {
  id: string;
  title: string;
  category: "Engraving" | "Products" | "Station" | "Live Sketching";
  image: string;
  alt: string;
}

export interface CollaboratedBrand {
  name: string;
  logo: string;
  darkSurface?: boolean;
}

export const liveEventsData = {
  hero: {
    eyebrow: "Live Calligraphy & Luxury Activations",
    title: "Bespoke live artistry for unforgettable events.",
    description:
      "UAE-licensed professional calligraphy and engraving artist Sumaira Mohammed Ashik brings live personalization, hand-lettered keepsakes, and portrait sketching to luxury brand launches, Emirati weddings, royal gatherings, and corporate activations across the UAE and GCC.",
    primaryCta: { label: "Book Live Event", href: "#book-event" },
    secondaryCta: { label: "Explore Services", href: "#services" },
    image: "/assets/images/events/live-event-hero.webp",
    imageAlt:
      "Sumaira Mohammed Ashik performing live calligraphy and engraving at a UAE activation podium",
    highlights: [
      { value: "Licensed", label: "UAE Calligraphy Artist" },
      { value: "35+", label: "Global & Regional Brands" },
      { value: "EN & AR", label: "Bilingual Script Artistry" },
      {
        value: "@sumevents.ae",
        label: "Dedicated Events Portfolio",
        href: site.instagram.events,
      },
    ],
  },
  navPills: [
    { label: "Services", href: "#services" },
    { label: "Event Gallery", href: "#gallery" },
    { label: "Collaborated Brands", href: "#brands" },
    { label: "Book Event", href: "#book-event" },
  ],
  servicesIntro: {
    eyebrow: "On-Site Activations",
    title: "Four live experiences tailored to your guests.",
    description:
      "From delicate diamond-tip engraving on fragrance flacons to live coffee-cup calligraphy and framed guest portraits, every station is crafted around your event aesthetic.",
  },
  services: [
    {
      id: "on-site-engraving",
      eyebrow: "Perfume · Glass · Crystal",
      title: "On-Site Engraving",
      description:
        "Precision hand-held diamond-tip engraving on perfume bottles (including Kayali, Guerlain, Rasasi, and oud flacons), crystal flutes, double-walled glass mugs, and metallic surfaces finished in luminous gold or silver.",
      highlights: [
        "Arabic & English names, monograms & event dates",
        "Custom floral & botanical glass etching",
        "Metallic gold or silver wax-ink infill",
      ],
      image: "/assets/images/events/service-engraving.webp",
      alt: "Kayali and black luxury perfume bottles hand-engraved with Arabic calligraphy in gold",
    },
    {
      id: "live-calligraphy-station",
      eyebrow: "Finjan · Mugs · VIP Cards",
      title: "Live Calligraphy Station",
      description:
        "An interactive calligraphy bar where guests watch their names written live in expressive Arabic or English script on Arabic Finjan coffee cups, ceramic mugs, glass bottles, leather tags, and metallic place cards.",
      highlights: [
        "Live personalized Arabic & English lettering",
        "Instant keepsakes finished with signature detailing",
        "Branded desktop display stand & station styling",
      ],
      image: "/assets/images/events/service-station.webp",
      alt: "Artist hand-lettering Arabic names onto white and orange ceramic coffee mugs at a live station",
    },
    {
      id: "calligraphy-on-products",
      eyebrow: "Weddings · Retail · Corporate",
      title: "Calligraphy on Products",
      description:
        "Elevated hand-lettered customization for retail activations, VIP gifting, and traditional Emirati celebrations—spanning clay mabkhara incense burners, terracotta vessels, wedding hand fans, luxury diffusers, gift bags, and wooden keepsake boxes.",
      highlights: [
        "Clay mabkhara, pottery, diffusers & hand fans",
        "Corporate merchandise & luxury retail packaging",
        "Bespoke palette matching event decor",
      ],
      image: "/assets/images/events/service-products.webp",
      alt: "Handcrafted terracotta cup personalized with black Arabic calligraphy and a red heart accent",
    },
    {
      id: "live-sketching-station",
      eyebrow: "Digital & Original Portraits",
      title: "Live Sketching Station",
      description:
        "Live bespoke illustration capturing guests and wedding couples in elegant stylized detail—available as instant digital keepsakes or hand-painted framed originals accented with 24K gold shimmer and Arabic name calligraphy.",
      highlights: [
        "Available in Digital or hand-painted Original formats",
        "Emirati wedding & royal gala portrait keepsakes",
        "Custom Arabic couple names & gold embellishments",
      ],
      image: "/assets/images/events/service-sketching.webp",
      alt: "Framed live portrait sketch of an Emirati wedding couple with gold dress details and Arabic calligraphy",
    },
  ] satisfies LiveEventService[],
  galleryIntro: {
    eyebrow: "Portfolio Highlights",
    title: "Crafted live across weddings, luxury retail & galas.",
    description:
      "A glimpse into real perfume engravings, personalized Finjan cups, wedding keepsakes, and live illustrated portraits.",
  },
  gallery: [
    {
      id: "ev-gal-0",
      title: "Luxury Gala Perfume Engraving",
      category: "Engraving",
      image: "/assets/images/events/gallery-gala-perfume-engraving.webp",
      alt: "Sumaira Mohammed Ashik engraving Arabic calligraphy onto crystal fragrance flacons at a candlelit Emirati evening gala",
    },
    {
      id: "ev-gal-0a",
      title: "On-Site Diamond Perfume Engraving",
      category: "Engraving",
      image: "/assets/images/events/gallery-live-engraving-artist.webp",
      alt: "Sumaira Mohammed Ashik hand-engraving a luxury fragrance bottle live using a precision diamond-tip micro-engraver",
    },
    {
      id: "ev-gal-1",
      title: "Floral Diamond Engraving",
      category: "Engraving",
      image: "/assets/images/events/gallery-perfume-floral.webp",
      alt: "Botanical floral motif finely diamond-engraved onto an amber perfume flacon",
    },
    {
      id: "ev-gal-2",
      title: "Arabic Script on Amber Oud",
      category: "Engraving",
      image: "/assets/images/events/gallery-perfume-oud.webp",
      alt: "Minimalist gold Arabic monogram engraved onto an amber glass fragrance bottle",
    },
    {
      id: "ev-gal-3",
      title: "Bespoke Event Crystal Flutes",
      category: "Engraving",
      image: "/assets/images/events/gallery-glasses.webp",
      alt: "Row of crystal stemmed glasses engraved in gold calligraphy for an 18th celebration",
    },
    {
      id: "ev-gal-4",
      title: "Arabic Finjan Hospitality Cups",
      category: "Station",
      image: "/assets/images/events/gallery-finjan.webp",
      alt: "Traditional white Arabic Finjan coffee cups hand-lettered with guest names",
    },
    {
      id: "ev-gal-5",
      title: "Cork-Base Ceramic Keepsakes",
      category: "Products",
      image: "/assets/images/events/gallery-cork-mugs.webp",
      alt: "Cork-base ceramic mugs customized live with bold black Arabic calligraphy",
    },
    {
      id: "ev-gal-6",
      title: "Emirati Wedding Hand Fans",
      category: "Products",
      image: "/assets/images/events/gallery-wedding-fans.webp",
      alt: "Pleated white wedding hand fans inscribed with bride and groom Arabic calligraphy",
    },
    {
      id: "ev-gal-7",
      title: "Textured Black & Gold Bowl",
      category: "Products",
      image: "/assets/images/events/gallery-diffusers.webp",
      alt: "Matte black decorative vessel hand-painted with swirling metallic gold Arabic calligraphy",
    },
    {
      id: "ev-gal-8",
      title: "Gold-Embellished Couple Portrait",
      category: "Live Sketching",
      image: "/assets/images/events/gallery-sketch-green.webp",
      alt: "Original framed wedding portrait with shimmering olive-gold textured bridal dress and Arabic backdrop",
    },
  ] satisfies EventGalleryItem[],
  brandsIntro: {
    eyebrow: "Trusted Across the Region",
    title: "Our Collaborated Brands.",
    description:
      "Partnering with 36+ international luxury houses, five-star hospitality destinations, cultural foundations, and regional leaders across the UAE and GCC.",
  },
  brands: [
    { name: "St. Regis Saadiyat Island Abu Dhabi", logo: "/assets/images/brands/st-regis.webp" },
    { name: "Qasr Al Sarab Desert Resort by Anantara", logo: "/assets/images/brands/qasr-al-sarab.webp" },
    { name: "Bassam Freiha Art Foundation", logo: "/assets/images/brands/bassam-freiha.webp", darkSurface: true },
    { name: "Guerlain Paris", logo: "/assets/images/brands/guerlain.webp" },
    { name: "Rasasi", logo: "/assets/images/brands/rasasi.webp" },
    { name: "L'Oréal", logo: "/assets/images/brands/loreal.webp" },
    { name: "Graff", logo: "/assets/images/brands/graff.webp" },
    { name: "Google", logo: "/assets/images/brands/google.webp" },
    { name: "Thameen London", logo: "/assets/images/brands/thameen.webp" },
    { name: "Saint Honoré Paris", logo: "/assets/images/brands/saint-honore.webp" },
    { name: "KIKO Milano", logo: "/assets/images/brands/kiko-milano.webp" },
    { name: "Maison Luxe", logo: "/assets/images/brands/maison-luxe.webp" },
    { name: "Home Box", logo: "/assets/images/brands/home-box.webp" },
    { name: "Landmark Group", logo: "/assets/images/brands/landmark-group.webp" },
    { name: "Nakheel", logo: "/assets/images/brands/nakheel.webp" },
    { name: "Sobha", logo: "/assets/images/brands/sobha.webp" },
    { name: "Al Tayer", logo: "/assets/images/brands/al-tayer.webp" },
    { name: "ADNEC", logo: "/assets/images/brands/adnec.webp" },
    { name: "Abu Dhabi International Boat Show", logo: "/assets/images/brands/adibs.webp" },
    { name: "Al Habtoor Grand Resort", logo: "/assets/images/brands/al-habtoor.webp" },
    { name: "Mövenpick Resort Al Marjan Island", logo: "/assets/images/brands/movenpick.webp" },
    { name: "Lattafa", logo: "/assets/images/brands/lattafa.webp" },
    { name: "Ford", logo: "/assets/images/brands/ford.webp" },
    { name: "Lincoln", logo: "/assets/images/brands/lincoln.webp" },
    { name: "RAK Ceramics", logo: "/assets/images/brands/rak-ceramics.webp" },
    { name: "Casa Milano", logo: "/assets/images/brands/casa-milano.webp" },
    { name: "UAE Tour", logo: "/assets/images/brands/uae-tour.webp" },
    { name: "AIS Dubai", logo: "/assets/images/brands/ais-dubai.webp" },
    { name: "AS Marine", logo: "/assets/images/brands/as-marine.webp" },
    { name: "Vimto", logo: "/assets/images/brands/vimto.webp" },
    { name: "Transmed", logo: "/assets/images/brands/transmed.webp" },
    { name: "University Hospital Sharjah (UHS)", logo: "/assets/images/brands/uhs.webp" },
    { name: "Sharjah Research Technology & Innovation Park", logo: "/assets/images/brands/srtip.webp" },
    { name: "GTCA", logo: "/assets/images/brands/gtca.webp" },
    { name: "Plenum", logo: "/assets/images/brands/plenum.webp" },
    { name: "Ecosplash", logo: "/assets/images/brands/ecosplash.webp" },
  ] satisfies CollaboratedBrand[],
  bookingSection: {
    eyebrow: "Reserve Your Date",
    title: "Live Event Booking Request",
    description:
      "Share your event date, venue, and preferred live calligraphy, engraving, or sketching station. Your request goes directly to Sumaira Arts Studio for availability confirmation.",
    assurances: [
      "Instant email confirmation & studio logging",
      "Available across Dubai, Abu Dhabi, Sharjah & GCC",
      "English & Arabic calligraphy tailored to your brand or wedding",
      "Custom multi-station & full-day packages available",
    ],
  },
  cta: {
    eyebrow: "Book Your Date",
    title: "Bring live calligraphy & engraving to your next gathering.",
    description:
      "Reserve your date above or explore Sumaira's guided Arabic calligraphy and textured canvas workshops for teams and private groups.",
    primary: { label: "Complete Booking Form", href: "#book-event" },
    secondary: { label: "Explore Calligraphy Workshops", href: "/workshops" },
    handles: ["@sumevents.ae", "@sumaira_arts"],
  },
};
