"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguageStore, useCartStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

function CheckoutContent() {
  const { lang } = useLanguageStore();
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [workerId, setWorkerId] = useState<string | null>(null);
  const [workerName, setWorkerName] = useState("");

  useEffect(() => {
    const wid = localStorage.getItem("worker_id");
    const wname = localStorage.getItem("worker_name");
    if (wid) {
      setWorkerId(wid);
      setWorkerName(wname || "");
      setForm((f) => ({ ...f, name: wname || f.name }));
    }
    const paymentStatus = searchParams.get("payment");
    if (paymentStatus === "success") {
      toast.success(lang === "bn" ? "পেমেন্ট সফল হয়েছে!" : "Payment successful!");
    } else if (paymentStatus === "failed") {
      toast.error(lang === "bn" ? "পেমেন্ট ব্যর্থ হয়েছে" : "Payment failed");
    } else if (paymentStatus === "cancelled") {
      toast(lang === "bn" ? "পেমেন্ট বাতিল করা হয়েছে" : "Payment cancelled");
    } else if (paymentStatus === "error") {
      toast.error(lang === "bn" ? "পেমেন্ট এ সমস্যা হয়েছে" : "Payment error occurred");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerId) {
      toast.error(lang === "bn" ? "দয়া করে লগইন করুন" : "Please login first");
      router.push("/login");
      return;
    }
    if (!form.name || !form.phone || !form.address) {
      toast.error(lang === "bn" ? "সব তথ্য পূরণ করুন" : "Fill all fields");
      return;
    }
    if (items.length === 0) {
      toast.error(lang === "bn" ? "কার্ট খালি" : "Cart is empty");
      return;
    }

    setLoading(true);
    try {
      const totalAmount = items.reduce((s, i) => s + i.price * i.quantity, 0);
      const firstItem = items[0];
      const res = await fetch("/api/payment/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workerId,
          productId: firstItem.productId,
          productName: items.map((i) => i.name).join(", "),
          quantity: items.reduce((s, i) => s + i.quantity, 0),
          totalAmount,
          currency: firstItem.currency || "BDT",
          shippingAddress: form.address,
          cusName: form.name,
          cusPhone: form.phone,
          cusEmail: "",
        }),
      });

      const data = await res.json() as { gatewayUrl?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Payment init failed");

      clearCart();
      window.location.href = data.gatewayUrl!;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!workerId) {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <h2 className="text-xl font-bold text-primary mb-4">
              {lang === "bn" ? "লগইন প্রয়োজন" : "Login Required"}
            </h2>
            <p className="text-text-secondary mb-6">
              {lang === "bn" ? "অর্ডার করার জন্য লগইন করুন" : "Please login to place an order"}
            </p>
            <Link href="/login">
              <Button className="w-full">{lang === "bn" ? "লগইন করুন" : "Login"}</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-primary mb-8">{lang === "bn" ? "চেকআউট" : "Checkout"}</h1>

        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3 space-y-4">
            <Card>
              <h3 className="font-bold text-primary mb-4">{lang === "bn" ? "শিপিং তথ্য" : "Shipping Info"}</h3>
              <div className="space-y-3">
                <input type="text" placeholder={lang === "bn" ? "আপনার নাম" : "Your Name"} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
                <input type="tel" placeholder={lang === "bn" ? "ফোন নম্বর" : "Phone Number"} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" required />
                <textarea placeholder={lang === "bn" ? "ঠিকানা" : "Address"} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="input-field min-h-[80px]" required />
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-primary mb-4">{lang === "bn" ? "পেমেন্ট মেথড" : "Payment Method"}</h3>
              <div className="p-3 rounded-xl border-2 border-action bg-action/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-action flex items-center justify-center text-white text-xs font-bold">SSL</div>
                  <span className="font-medium text-sm text-primary">SSLCommerz</span>
                </div>
                <p className="text-xs text-text-secondary mt-2 ml-11">
                  {lang === "bn" ? "ক্রেডিট/ডেবিট কার্ড, মোবাইল ব্যাংকিং, ইন্টারনেট ব্যাংকিং" : "Credit/Debit Card, Mobile Banking, Internet Banking"}
                </p>
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="sticky top-24">
              <h3 className="font-bold text-primary mb-4">{lang === "bn" ? "অর্ডার সারাংশ" : "Order Summary"}</h3>
              {items.length === 0 ? (
                <p className="text-sm text-text-secondary">{lang === "bn" ? "কার্ট খালি" : "Cart is empty"}</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span className="text-text-secondary">{item.name} × {item.quantity}</span>
                        <span className="font-medium text-primary">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-px bg-border my-3" />
                  <div className="flex justify-between mb-6">
                    <span className="font-bold text-primary">{lang === "bn" ? "মোট" : "Total"}</span>
                    <span className="font-bold text-lg text-action">{formatCurrency(items.reduce((s, i) => s + i.price * i.quantity, 0))}</span>
                  </div>
                  <Button onClick={handleSubmit} loading={loading} className="w-full !py-4">
                    {lang === "bn" ? "SSLCommerz দিয়ে পেমেন্ট করুন" : "Pay with SSLCommerz"}
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-action border-t-transparent rounded-full" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
