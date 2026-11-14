"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { containerClassName } from "@/components/ui/Container";
import Link from "next/link";
import { User, Mail, Phone, MapPin, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/cartSlice";
import { CountrySelect } from "@/components/checkout/CountrySelect";
import { formatPrice } from "@/lib/format";
import { parsePhoneNumberFromString } from "libphonenumber-js/min";
import { useCountryDetection } from "@/components/checkout/useCountryDetection";
import type { Order } from "@/types/store";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const cartTotal = useAppSelector((state) => state.cart.cartTotal);
  const [mounted, setMounted] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { country, selectCountry } = useCountryDetection();
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required";
    else if (name.trim().length > 120) errs.name = "Full name must be 120 characters or fewer";
    if (
      !email.trim() ||
      email.trim().length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      errs.email = "Please provide a valid email address";
    }
    if (!phone.trim()) {
      errs.phone = "Mobile number is required";
    } else {
      const parsedPhone = parsePhoneNumberFromString(phone.trim(), country.code);
      if (!parsedPhone || !parsedPhone.isValid() || parsedPhone.country !== country.code) {
        errs.phone = `Enter a valid ${country.name} mobile number`;
      }
    }
    if (address.trim().length > 300) {
      errs.address = "Address must be 300 characters or fewer";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot detection

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionError("");

    const parsedPhone = parsePhoneNumberFromString(phone.trim(), country.code);
    const fullPhone = parsedPhone?.number ?? `+${country.dialCode} ${phone.trim()}`;
    const namePrefix = name.trim().replace(/[^\p{L}]/gu, "").slice(0, 4).toUpperCase();
    const phoneSuffix = fullPhone.replace(/\D/g, "").slice(-4);
    const orderId = `${namePrefix || "NAME"}${phoneSuffix}`;

    const orderData: Order = {
      id: orderId,
      customerName: name.trim(),
      email: email.trim(),
      phoneNumber: fullPhone,
      ...(address.trim() ? { address: address.trim() } : {}),
      items: cart,
      total: cartTotal,
      subtotal: cartTotal,
      currency: "USD",
      orderDate: new Date().toISOString(),
      status: "pending",
    };
    try {
      const [emailResponse, sheetResponse] = await Promise.all([
        fetch("/api/orders/send-emails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: orderData }),
        }),
        fetch("/api/orders/save-to-sheets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: orderData }),
        }),
      ]);

      if (!emailResponse.ok || !sheetResponse.ok) {
        setSubmissionError(
          "We couldn’t complete your request. Please contact the studio before trying again."
        );
        return;
      }

      try {
        const storedOrders = localStorage.getItem("sumaira-arts-orders");
        const existing = storedOrders ? JSON.parse(storedOrders) : [];
        localStorage.setItem("sumaira-arts-orders", JSON.stringify([orderData, ...existing]));
        window.dispatchEvent(new Event("sumaira-orders-updated"));
      } catch (error) {
        console.warn("Could not cache order history in this browser.", error);
      }

      setOrderSuccess(orderData);
      dispatch(clearCart());
    } catch (err) {
      console.error("Order submission error:", err);
      setSubmissionError(
        "We couldn’t complete your request. Please contact the studio before trying again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-ice/30 py-16">
        <div className={`${containerClassName} animate-pulse`}>
          <div className="h-8 w-48 rounded bg-light mb-8" />
          <div className="h-96 rounded-xl bg-white border border-light" />
        </div>
      </div>
    );
  }

  // Success view
  if (orderSuccess) {
    return (
      <div className="min-h-[80vh] bg-ice/30 py-16 px-4">
        <div className="mx-auto max-w-xl rounded-2xl border border-light bg-white p-8 text-center shadow-raised">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-light text-deep">Request Received</h1>
          <p className="mt-2 text-sm text-steel">
            Thank you, <strong className="text-deep">{orderSuccess.customerName}</strong>. Your artwork request is under review.
          </p>

          <div className="mt-6 rounded-xl bg-ice/50 p-4 text-left text-xs text-steel space-y-1.5 border border-light">
            <p><strong>Order ID:</strong> <span className="font-mono">{orderSuccess.id}</span></p>
            <p><strong>Confirmation sent to:</strong> {orderSuccess.email}</p>
            <p><strong>Mobile number:</strong> {orderSuccess.phoneNumber}</p>
            {orderSuccess.address && <p><strong>Address:</strong> {orderSuccess.address}</p>}
            <p><strong>Request total:</strong> ${orderSuccess.total.toLocaleString()} USD</p>
            <p>Our studio will contact you after checking artwork availability.</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="rounded-lg bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-deep transition-colors"
            >
              Return to Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If empty and not submitting
  if (cart.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-[70vh] bg-ice/40 flex items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-serif text-3xl font-light text-deep">Your Bag is Empty</h1>
          <p className="mt-3 text-sm text-steel">
            Please select an artwork to proceed to checkout.
          </p>
          <div className="mt-6">
            <Link
              href="/#artwork"
              className="inline-block rounded-lg bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-deep transition-colors"
            >
              Browse Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ice/30 py-10 sm:py-16">
      <div className={containerClassName}>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-deep border-b border-light pb-6">
          Artwork Request
        </h1>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-xl border border-light bg-white p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="text-base font-semibold uppercase tracking-wider text-deep mb-4">
                  Contact Details
                </h2>
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="full-name" className="block text-xs font-medium uppercase tracking-wider text-steel mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steel" />
                      <input
                        id="full-name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sheikha Fatima"
                        autoComplete="name"
                        maxLength={120}
                        required
                        className={`h-12 w-full rounded-lg border pl-9 pr-3 text-sm text-deep transition-colors focus:border-brand focus:outline-none ${
                          errors.name ? "border-red-400 bg-red-50/20" : "border-light bg-white"
                        }`}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="mobile-number" className="block text-xs font-medium uppercase tracking-wider text-steel mb-1.5">
                      Mobile Number *
                    </label>
                    <div className="flex gap-3">
                      <div className="w-36 shrink-0">
                        <CountrySelect value={country.code} onChange={selectCountry} />
                      </div>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steel" />
                        <input
                          id="mobile-number"
                          name="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="33986777"
                          autoComplete="tel"
                          maxLength={30}
                          required
                          className={`h-12 w-full rounded-lg border pl-9 pr-3 text-sm text-deep transition-colors focus:border-brand focus:outline-none ${
                            errors.phone ? "border-red-400 bg-red-50/20" : "border-light bg-white"
                          }`}
                        />
                      </div>
                    </div>
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-steel mb-1.5">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steel" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="collector@example.com"
                        autoComplete="email"
                        maxLength={254}
                        required
                        className={`h-11 w-full rounded-lg border pl-9 pr-3 text-sm text-deep transition-colors focus:border-brand focus:outline-none ${
                          errors.email ? "border-red-400 bg-red-50/20" : "border-light bg-white"
                        }`}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Optional Address */}
              <div>
                <label htmlFor="address" className="block text-xs font-medium uppercase tracking-wider text-steel mb-1.5">
                  Address (Optional)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-steel" />
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, city, country"
                    autoComplete="street-address"
                    maxLength={300}
                    className={`h-11 w-full rounded-lg border pl-9 pr-3 text-sm text-deep transition-colors focus:border-brand focus:outline-none ${
                      errors.address ? "border-red-400 bg-red-50/20" : "border-light bg-white"
                    }`}
                  />
                </div>
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
              </div>

              {/* Bot honeypot */}
              <input
                type="text"
                name="company_website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {submissionError && (
                <p role="alert" className="text-sm text-red-600">
                  {submissionError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 text-xs font-semibold uppercase tracking-wider text-white shadow-raised hover:bg-deep disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <span>Submit Artwork Request ({formatPrice(cartTotal)})</span>
                )}
              </button>
            </form>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-xl border border-light bg-white p-6 shadow-sm">
              <h2 className="font-serif text-lg font-light text-deep border-b border-light pb-4">
                Selected Pieces ({cart.length})
              </h2>

              <div className="mt-4 divide-y divide-light max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 items-center">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-ice border border-light">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-xs font-medium text-deep truncate">{item.title}</p>
                      <p className="text-[10px] text-steel">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-deep">
                      {formatPrice(item.priceUSD * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-light pt-4 mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-steel">
                  <span>Artwork total</span>
                  <span className="font-semibold text-deep">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-deep border-t border-light pt-3">
                  <span>Request total</span>
                  <span className="text-brand font-serif">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2.5 rounded-lg bg-ice/60 p-3 text-[11px] text-steel">
                <ShieldCheck className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                <span>
                  Our studio will review availability and contact you to confirm your request. No purchase is confirmed at this stage.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
