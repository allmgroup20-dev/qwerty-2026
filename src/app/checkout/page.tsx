"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguageStore, useCartStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

type PageStep = "loading" | "login-required" | "form" | "review" | "ssl-success" | "ssl-failed" | "ssl-cancelled" | "ssl-error" | "cod-confirmed";

const bdDivisions = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"];

function CheckoutContent() {
  const { lang } = useLanguageStore();
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<PageStep>("loading");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", division: "", district: "", thana: "", notes: "" });
  const [workerId, setWorkerId] = useState<string | null>(null);
  const [productTypes, setProductTypes] = useState<Record<number, string>>({});
  const [hasPhysical, setHasPhysical] = useState(false);
  const [sslEnabled, setSslEnabled] = useState(true);
  const [codEnabled, setCodEnabled] = useState(true);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const wid = localStorage.getItem("worker_id");
    const token = localStorage.getItem("worker_token");

    const paymentStatus = searchParams.get("payment");
    if (paymentStatus === "success") {
      const oid = searchParams.get("order");
      setOrderId(oid);
      setStep("ssl-success");
      return;
    } else if (paymentStatus === "failed") {
      const oid = searchParams.get("order");
      setOrderId(oid);
      setStep("ssl-failed");
      return;
    } else if (paymentStatus === "cancelled") {
      setStep("ssl-cancelled");
      return;
    } else if (paymentStatus === "error") {
      setStep("ssl-error");
      return;
    }

    if (!wid || !token) {
      setStep("login-required");
      return;
    }

    setWorkerId(wid);
    fetch(`/api/workers/profile?workerId=${wid}`)
      .then(r => r.json() as Promise<{ name?: string; phone?: string; email?: string }>)
      .then(data => {
        setForm(f => ({
          ...f,
          name: data.name || f.name,
          phone: data.phone || f.phone,
          email: data.email || f.email,
        }));
      })
      .catch(() => {})
      .finally(() => {
        const productId = searchParams.get("product");
        if (productId && items.length === 0) {
          (async () => {
            try {
              const res = await fetch("/api/products");
              const data = await res.json() as { products?: { id: number; name: string; nameBn?: string; price: number; currency: string; productType: string }[] };
              const p = data.products?.find(x => x.id === parseInt(productId));
              if (p) {
                useCartStore.getState().addItem({
                  productId: p.id,
                  name: lang === "bn" && p.nameBn ? p.nameBn : p.name,
                  price: p.price,
                  currency: p.currency || "BDT",
                  quantity: 1,
                  productType: p.productType,
                });
              }
            } catch {}
          })();
        }
        setStep("form");
      });
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      (async () => {
        try {
          const res = await fetch("/api/products");
          const data = await res.json() as { products?: { id: number; productType: string; enableSslcommerz: number; enableCod: number }[] };
          const types: Record<number, string> = {};
          let physical = false;
          if (data.products) {
            data.products.forEach(p => { types[p.id] = p.productType || "physical"; });
            items.forEach(item => {
              const t = types[item.productId] || "physical";
              types[item.productId] = t;
              if (t === "physical") physical = true;
            });
            const first = data.products.find(x => x.id === items[0].productId);
            if (first) {
              setSslEnabled(first.enableSslcommerz === 1);
              setCodEnabled(first.enableCod === 1);
            }
          } else {
            items.forEach(() => { physical = true; });
          }
          setProductTypes(types);
          setHasPhysical(physical);
        } catch { setHasPhysical(true); }
      })();
    }
  }, [items]);

  const doPayment = async (method: string) => {
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
          productName: items.map(i => i.name).join(", "),
          quantity: items.reduce((s, i) => s + i.quantity, 0),
          totalAmount,
          currency: firstItem.currency || "BDT",
          shippingAddress: hasPhysical ? `${form.address}, ${form.thana}, ${form.district}, ${form.division}` : "",
          cusName: form.name,
          cusPhone: form.phone,
          cusEmail: form.email || "",
          paymentMethod: method,
          orderNotes: form.notes || null,
        }),
      });

      const data = await res.json() as { gatewayUrl?: string; orderId?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Payment init failed");

      if (method === "cod") {
        setOrderId(data.orderId || "");
        clearCart();
        setStep("cod-confirmed");
      } else if (data.gatewayUrl) {
        clearCart();
        window.location.href = data.gatewayUrl;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally { setLoading(false); }
  };

  const totalAmount = items.reduce((s, i) => s + i.price * i.quantity, 0);

  if (step === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-action border-t-transparent rounded-full" />
      </div>
    );
  }

  if (step === "login-required") {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-xl font-bold text-primary mb-4">
              {lang === "bn" ? "অ্যাকাউন্ট প্রয়োজন" : "Account Required"}
            </h2>
            <p className="text-text-secondary mb-6">
              {lang === "bn"
                ? "অর্ডার করার জন্য আপনাকে একটি অ্যাকাউন্ট খুলতে হবে"
                : "You need to create an account to place an order"}
            </p>
            <div className="space-y-3">
              <Link href="/register">
                <Button className="w-full">{lang === "bn" ? "নতুন অ্যাকাউন্ট খুলুন" : "Create Account"}</Button>
              </Link>
              <div className="text-sm text-text-secondary">
                {lang === "bn" ? "ইতিমধ্যে অ্যাকাউন্ট আছে?" : "Already have an account?"}{" "}
                <Link href="/login" className="text-action hover:underline font-medium">
                  {lang === "bn" ? "লগইন করুন" : "Login"}
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (step === "ssl-success") {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-lg mx-auto text-center">
          <Card>
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              {lang === "bn" ? "পেমেন্ট সফল হয়েছে!" : "Payment Successful!"}
            </h2>
            <p className="text-text-secondary mb-4">
              {lang === "bn" ? "আপনার অর্ডার কনফার্ম করা হয়েছে।" : "Your order has been confirmed."}
            </p>
            {orderId && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-xs text-text-secondary mb-1">{lang === "bn" ? "অর্ডার নম্বর" : "Order ID"}</p>
                <p className="text-lg font-bold text-action">{orderId}</p>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard/orders"><Button>{lang === "bn" ? "অর্ডার দেখুন" : "View Orders"}</Button></Link>
              <Link href="/"><Button variant="ghost">{lang === "bn" ? "হোম পেইজ" : "Home"}</Button></Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (step === "ssl-failed") {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-lg mx-auto text-center">
          <Card>
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              {lang === "bn" ? "পেমেন্ট ব্যর্থ হয়েছে" : "Payment Failed"}
            </h2>
            <p className="text-text-secondary mb-6">
              {lang === "bn"
                ? "আপনার পেমেন্ট প্রক্রিয়াকরণের সময় একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।"
                : "There was an issue processing your payment. Please try again."}
            </p>
            {orderId && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-xs text-text-secondary mb-1">{lang === "bn" ? "অর্ডার নম্বর" : "Order ID"}</p>
                <p className="text-lg font-bold text-primary">{orderId}</p>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <Button onClick={() => setStep("form")}>{lang === "bn" ? "পুনরায় চেষ্টা করুন" : "Try Again"}</Button>
              <Link href="/"><Button variant="ghost">{lang === "bn" ? "হোম পেইজ" : "Home"}</Button></Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (step === "ssl-cancelled") {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-lg mx-auto text-center">
          <Card>
            <div className="text-6xl mb-4">↩️</div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              {lang === "bn" ? "পেমেন্ট বাতিল করা হয়েছে" : "Payment Cancelled"}
            </h2>
            <p className="text-text-secondary mb-6">
              {lang === "bn"
                ? "আপনি পেমেন্ট প্রক্রিয়া বাতিল করেছেন। আপনার কার্টের আইটেমগুলো সংরক্ষিত আছে।"
                : "You have cancelled the payment process. Your cart items are saved."}
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => setStep("form")}>{lang === "bn" ? "পুনরায় চেষ্টা করুন" : "Try Again"}</Button>
              <Link href="/cart"><Button variant="ghost">{lang === "bn" ? "কার্ট দেখুন" : "View Cart"}</Button></Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (step === "ssl-error") {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-lg mx-auto text-center">
          <Card>
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              {lang === "bn" ? "পেমেন্ট এ সমস্যা হয়েছে" : "Payment Error"}
            </h2>
            <p className="text-text-secondary mb-6">
              {lang === "bn"
                ? "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।"
                : "An unexpected error occurred. Please try again."}
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => setStep("form")}>{lang === "bn" ? "পুনরায় চেষ্টা করুন" : "Try Again"}</Button>
              <Link href="/"><Button variant="ghost">{lang === "bn" ? "হোম পেইজ" : "Home"}</Button></Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (step === "cod-confirmed") {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-lg mx-auto text-center">
          <Card>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              {lang === "bn" ? "অর্ডার কনফার্মড!" : "Order Confirmed!"}
            </h2>
            <p className="text-text-secondary mb-4">
              {lang === "bn"
                ? "আপনার অর্ডার সফলভাবে প্লেস করা হয়েছে। পণ্য হাতে পেয়ে পেমেন্ট করুন।"
                : "Your order has been placed successfully. Pay when you receive the product."}
            </p>
            {orderId && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-xs text-text-secondary mb-1">{lang === "bn" ? "অর্ডার নম্বর" : "Order ID"}</p>
                <p className="text-lg font-bold text-action">{orderId}</p>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard/orders"><Button>{lang === "bn" ? "অর্ডার দেখুন" : "View Orders"}</Button></Link>
              <Link href="/"><Button variant="ghost">{lang === "bn" ? "হোম পেইজ" : "Home"}</Button></Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const cartEmpty = items.length === 0;

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/cart" className="text-sm text-action hover:underline">
            ← {lang === "bn" ? "কার্টে ফিরুন" : "Back to Cart"}
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-2xl font-bold text-primary">{lang === "bn" ? "চেকআউট" : "Checkout"}</h1>
        </div>

        {cartEmpty ? (
          <Card className="text-center py-12">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-xl font-bold text-primary mb-2">
              {lang === "bn" ? "কার্ট খালি" : "Cart is Empty"}
            </h2>
            <p className="text-text-secondary mb-6">
              {lang === "bn" ? "আপনার কার্টে কোনো পণ্য নেই।" : "Your cart is empty."}
            </p>
            <Link href="/product-list"><Button>{lang === "bn" ? "পণ্য দেখুন" : "Browse Products"}</Button></Link>
          </Card>
        ) : step === "form" ? (
          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-4">
              <Card>
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-action text-white text-xs font-bold flex items-center justify-center">1</span>
                  {lang === "bn" ? "ক্রেতার তথ্য" : "Customer Info"}
                </h3>
                <div className="space-y-3">
                  <input type="text" placeholder={lang === "bn" ? "আপনার নাম" : "Your Name"} value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" required />
                  <input type="tel" placeholder={lang === "bn" ? "ফোন নম্বর" : "Phone Number"} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-field" required />
                  <input type="email" placeholder={lang === "bn" ? "ইমেইল (ঐচ্ছিক)" : "Email (optional)"} value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" />
                </div>
              </Card>

              {hasPhysical && (
                <Card>
                  <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-action text-white text-xs font-bold flex items-center justify-center">2</span>
                    {lang === "bn" ? "শিপিং তথ্য" : "Shipping Info"}
                  </h3>
                  <div className="space-y-3">
                    <textarea placeholder={lang === "bn" ? "ঠিকানা" : "Address"} value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="input-field min-h-[60px]" required />
                    <select value={form.division} onChange={e => setForm({...form, division: e.target.value, district: "", thana: ""})} className="input-field">
                      <option value="">{lang === "bn" ? "বিভাগ নির্বাচন করুন" : "Select Division"}</option>
                      {bdDivisions.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder={lang === "bn" ? "জেলা" : "District"} value={form.district} onChange={e => setForm({...form, district: e.target.value})} className="input-field" />
                      <input type="text" placeholder={lang === "bn" ? "থানা" : "Thana"} value={form.thana} onChange={e => setForm({...form, thana: e.target.value})} className="input-field" />
                    </div>
                  </div>
                </Card>
              )}

              {!hasPhysical && (
                <Card>
                  <div className="text-center py-4">
                    <div className="text-3xl mb-2">🎉</div>
                    <p className="text-sm text-text-secondary">
                      {lang === "bn"
                        ? "এটি একটি ডিজিটাল পণ্য — ডেলিভারির প্রয়োজন নেই। অর্ডার সম্পন্ন হলে আপনার অ্যাকাউন্টে স্বয়ংক্রিয়ভাবে যুক্ত হবে।"
                        : "This is a digital product — no delivery needed. It will be added to your account automatically after purchase."}
                    </p>
                  </div>
                </Card>
              )}

              <Card>
                <h3 className="font-bold text-primary mb-4">{lang === "bn" ? "অর্ডার নোট (ঐচ্ছিক)" : "Order Notes (optional)"}</h3>
                <textarea placeholder={lang === "bn" ? "বিশেষ নির্দেশনা থাকলে লিখুন" : "Write any special instructions"} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="input-field min-h-[60px]" />
              </Card>

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    if (!form.name || !form.phone) {
                      toast.error(lang === "bn" ? "নাম ও ফোন নম্বর আবশ্যক" : "Name and phone are required");
                      return;
                    }
                    if (hasPhysical && (!form.address || !form.division || !form.district || !form.thana)) {
                      toast.error(lang === "bn" ? "সব শিপিং তথ্য পূরণ করুন" : "Fill all shipping fields");
                      return;
                    }
                    setStep("review");
                  }}
                >
                  {lang === "bn" ? "পরবর্তী: অর্ডার রিভিউ" : "Next: Review Order"} →
                </Button>
              </div>
            </div>

            <div className="md:col-span-2">
              <Card className="sticky top-24">
                <h3 className="font-bold text-primary mb-4">{lang === "bn" ? "অর্ডার সারাংশ" : "Order Summary"}</h3>
                <div className="space-y-3 mb-4">
                  {items.map(item => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-text-secondary">
                        {item.name} × {item.quantity}
                        {productTypes[item.productId] === "virtual" && (
                          <span className="ml-1.5 text-[10px] text-purple-500 font-medium">(Digital)</span>
                        )}
                      </span>
                      <span className="font-medium text-primary">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-border my-3" />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>{lang === "bn" ? "সাবটোটাল" : "Subtotal"}</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                  {hasPhysical && (
                    <div className="flex justify-between text-text-secondary">
                      <span>{lang === "bn" ? "শিপিং" : "Shipping"}</span>
                      <span>{lang === "bn" ? "পরে নির্ধারণ" : "To be determined"}</span>
                    </div>
                  )}
                </div>
                <div className="h-px bg-border my-3" />
                <div className="flex justify-between">
                  <span className="font-bold text-primary">{lang === "bn" ? "মোট" : "Total"}</span>
                  <span className="font-bold text-lg text-action">{formatCurrency(totalAmount)}</span>
                </div>
              </Card>
            </div>
          </div>
        ) : step === "review" ? (
          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-4">
              <Card>
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">✓</span>
                  {lang === "bn" ? "ক্রেতার তথ্য" : "Customer Info"}
                </h3>
                <div className="text-sm space-y-1 text-text-secondary">
                  <p><span className="font-medium text-primary">{lang === "bn" ? "নাম" : "Name"}:</span> {form.name}</p>
                  <p><span className="font-medium text-primary">{lang === "bn" ? "ফোন" : "Phone"}:</span> {form.phone}</p>
                  {form.email && <p><span className="font-medium text-primary">Email:</span> {form.email}</p>}
                </div>
                <button onClick={() => setStep("form")} className="text-xs text-action hover:underline mt-2">
                  {lang === "bn" ? "সম্পাদনা করুন" : "Edit"}
                </button>
              </Card>

              {hasPhysical && (
                <Card>
                  <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">✓</span>
                    {lang === "bn" ? "শিপিং ঠিকানা" : "Shipping Address"}
                  </h3>
                  <div className="text-sm space-y-1 text-text-secondary">
                    <p>{form.address}</p>
                    <p>{form.thana}, {form.district}, {form.division}</p>
                  </div>
                  <button onClick={() => setStep("form")} className="text-xs text-action hover:underline mt-2">
                    {lang === "bn" ? "সম্পাদনা করুন" : "Edit"}
                  </button>
                </Card>
              )}

              {form.notes && (
                <Card>
                  <h3 className="font-bold text-primary mb-2">{lang === "bn" ? "অর্ডার নোট" : "Order Notes"}</h3>
                  <p className="text-sm text-text-secondary">{form.notes}</p>
                </Card>
              )}

              <Card>
                <h3 className="font-bold text-primary mb-4">{lang === "bn" ? "পণ্যের তালিকা" : "Products"}</h3>
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <div>
                        <span className="text-primary font-medium">{item.name}</span>
                        <span className="text-text-secondary"> × {item.quantity}</span>
                        {productTypes[item.productId] === "virtual" && (
                          <span className="ml-1.5 text-[10px] text-purple-500 font-medium">(Digital)</span>
                        )}
                      </div>
                      <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-primary" />
                <span className="text-sm text-text-secondary">
                  {lang === "bn"
                    ? "আমি শর্তাবলী এবং রিফান্ড পলিসি পড়েছি এবং সম্মত আছি।"
                    : "I have read and agree to the Terms & Conditions and Refund Policy."}
                </span>
              </label>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setStep("form")}>
                  ← {lang === "bn" ? "পিছনে" : "Back"}
                </Button>
              </div>
            </div>

            <div className="md:col-span-2">
              <Card className="sticky top-24">
                <h3 className="font-bold text-primary mb-4">{lang === "bn" ? "অর্ডার সারাংশ" : "Order Summary"}</h3>
                <div className="space-y-3 mb-4">
                  {items.map(item => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-text-secondary">{item.name} × {item.quantity}</span>
                      <span className="font-medium text-primary">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-border my-3" />
                <div className="space-y-1 text-sm mb-4">
                  <div className="flex justify-between text-text-secondary">
                    <span>{lang === "bn" ? "সাবটোটাল" : "Subtotal"}</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
                <div className="h-px bg-border my-3" />
                <div className="flex justify-between mb-6">
                  <span className="font-bold text-primary">{lang === "bn" ? "মোট" : "Total"}</span>
                  <span className="font-bold text-lg text-action">{formatCurrency(totalAmount)}</span>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => doPayment("sslcommerz")}
                    disabled={loading || !sslEnabled || !agreed}
                    loading={loading}
                    className="w-full !py-4 !bg-action hover:!bg-action/90"
                  >
                    {lang === "bn" ? "SSLCommerz দিয়ে পেমেন্ট করুন" : "Pay with SSLCommerz"}
                  </Button>
                  <Button
                    onClick={() => doPayment("cod")}
                    disabled={loading || !codEnabled || !agreed}
                    loading={loading}
                    variant="outline"
                    className="w-full !py-4 !border-green-500 !text-green-600 hover:!bg-green-50"
                  >
                    {lang === "bn" ? "ক্যাশ অন ডেলিভারি" : "Cash on Delivery"}
                  </Button>
                  {!sslEnabled && (
                    <p className="text-xs text-red-500 text-center">
                      {lang === "bn" ? "SSLCommerz উপলব্ধ নেই" : "SSLCommerz not available"}
                    </p>
                  )}
                  {!codEnabled && (
                    <p className="text-xs text-red-500 text-center">
                      {lang === "bn" ? "COD উপলব্ধ নেই" : "COD not available"}
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        ) : null}
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
