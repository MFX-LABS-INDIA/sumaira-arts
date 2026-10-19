import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProducts } from "@/data/products";
import { ProductDetailsClient } from "@/components/products/ProductDetailsClient";

export async function generateStaticParams() {
  return allProducts.map((p) => ({
    slug: p.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Artwork Not Found | Sumaira Arts",
    };
  }

  return {
    title: `${product.title} | Sumaira Arts`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
