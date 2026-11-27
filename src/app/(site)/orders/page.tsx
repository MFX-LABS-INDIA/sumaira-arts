"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { Package, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { Container } from "@/components/atoms/Container";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { OrdersPageSkeleton } from "@/components/molecules/PageSkeletons";
import type { Order } from "@/types/store";

const emptySubscribe = () => () => {};

function readStoredOrders(): Order[] {
  try {
    const stored = localStorage.getItem("sumaira-arts-orders");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export default function MyOrdersPage() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const orders = useMemo(() => (mounted ? readStoredOrders() : []), [mounted]);
  const loading = !mounted;

  const sortedOrders = useMemo(
    () =>
      [...orders].sort(
        (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      ),
    [orders]
  );

  if (loading) {
    return <OrdersPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-ice/30 py-8 sm:py-14">
      <Container>
        {/* Header */}
        <div className="border-b border-light pb-6 sm:pb-8 mb-8">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-4xl font-light text-deep">
              My Artwork Orders
            </h1>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-brand px-2 font-mono text-xs font-bold text-white">
              {orders.length}
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-steel">
            View your artwork requests and the pieces you selected.
          </p>
        </div>

        {sortedOrders.length === 0 ? (
          <div className="rounded-card border border-light bg-white py-16 px-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ice text-mist">
              <Package className="h-8 w-8" />
            </div>
            <h2 className="mt-4 font-serif text-xl font-normal text-deep">No Orders Found</h2>
            <p className="mt-2 text-xs sm:text-sm text-steel max-w-sm mx-auto">
              You haven&apos;t placed any artwork acquisition orders yet. Explore our curated collections.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-card bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-raised hover:bg-deep transition-colors"
            >
              <span>Explore Gallery</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-card border border-light bg-white p-5 sm:p-6 hover:border-soft transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-light/60 pb-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-brand">Order ID: {order.id}</span>
                    <p className="text-xs text-steel mt-0.5 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{new Date(order.orderDate).toLocaleDateString("en-US", { dateStyle: "medium", timeStyle: "short" })}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "pending"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{order.status === "pending" ? "Under Review" : "Order Confirmed"}</span>
                    </span>
                    <span className="font-serif text-lg font-normal text-deep">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="mt-4 divide-y divide-light/50">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-3 flex items-center gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-control bg-ice border border-light">
                        <SkeletonImage src={item.image} alt={item.title} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-sm font-medium text-deep truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-steel">Quantity: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-deep">
                        {formatPrice(item.priceUSD * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer details */}
                <div className="mt-4 pt-3 border-t border-light/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-steel gap-2">
                  <span>Contact: {order.email} · {order.phoneNumber}</span>
                  <span className="text-brand font-medium">
                    {order.status === "pending" ? "Our studio will contact you after review" : "We’ll be in touch with updates"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
