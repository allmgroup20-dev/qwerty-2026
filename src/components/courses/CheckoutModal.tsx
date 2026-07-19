"use client";

import { useState } from "react";

interface CheckoutModalProps {
  workerId: string;
  cusName?: string;
  cusPhone?: string;
  cusEmail?: string;
  onClose: () => void;
}

const BASE_PRICE = 99;

export default function CheckoutModal({ workerId, cusName, cusPhone, cusEmail, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<"select" | "bargain" | "pay">("select");
  const [resourceCount, setResourceCount] = useState(1);
  const [finalAmount, setFinalAmount] = useState(BASE_PRICE);
  const [finalCount, setFinalCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [bargainSessionId, setBargainSessionId] = useState<number | null>(null);
  const [bargainMessages, setBargainMessages] = useState<{ role: "ai" | "user"; text: string }[]>([]);
  const [userPriceInput, setUserPriceInput] = useState("");
  const [canBargain, setCanBargain] = useState(true);

  const basePrice = resourceCount * BASE_PRICE;

  const handleStartBargain = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/bargain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId, resourceCount }),
      });
      const data = await res.json() as { sessionId: number; currentOffer: number; message: string; canBargain: boolean; error?: string };
      if (!res.ok) throw new Error(data.error || "Failed");
      setBargainSessionId(data.sessionId);
      setBargainMessages([{ role: "ai", text: data.message }]);
      setFinalAmount(data.currentOffer);
      setCanBargain(data.canBargain);
      setStep("bargain");
    } catch (err) {
      setError(err instanceof Error ? err.message : "বার্গেনিং শুরু করতে ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  const handleBargainRespond = async () => {
    const desiredPrice = parseInt(userPriceInput);
    if (!desiredPrice || desiredPrice < 60 || desiredPrice > finalAmount) {
      setError("দয়া করে একটি বৈধ মূল্য লিখুন (৬০-বর্তমান অফারের মধ্যে)");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/bargain/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: bargainSessionId, desiredPrice }),
      });
      const data = await res.json() as { accepted: boolean; offer: number | null; message: string; canContinue?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error || "Failed");

      const newMessages = [...bargainMessages, { role: "user" as const, text: `আমি ৳${desiredPrice.toLocaleString()} দিতে চাই` }];

      if (data.accepted) {
        newMessages.push({ role: "ai", text: data.message });
        setBargainMessages(newMessages);
        setFinalAmount(data.offer || desiredPrice);
        setTimeout(() => setStep("pay"), 1500);
      } else if (data.offer) {
        newMessages.push({ role: "ai", text: data.message });
        setBargainMessages(newMessages);
        setFinalAmount(data.offer);
        setCanBargain(data.canContinue !== false);
      } else {
        newMessages.push({ role: "ai", text: data.message });
        setBargainMessages(newMessages);
        setCanBargain(false);
      }
      setBargainMessages(newMessages);
      setUserPriceInput("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "বার্গেনিং ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptDeal = async () => {
    if (bargainSessionId) {
      try {
        await fetch("/api/ai/bargain/accept", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: bargainSessionId }),
        });
      } catch {}
    }
    setStep("pay");
  };

  const handlePay = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/resource-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workerId,
          resourceCount: finalCount,
          amount: finalAmount,
          cusName: cusName || "Resource User",
          cusPhone: cusPhone || "01XXXXXXXXX",
          cusEmail: cusEmail || "user@example.com",
        }),
      });
      const data = await res.json() as { gatewayUrl?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Payment initiation failed");
      if (data.gatewayUrl) {
        window.location.href = data.gatewayUrl;
      } else {
        throw new Error("No gateway URL returned");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "পেমেন্ট শুরু করতে ব্যর্থ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-primary to-primary/80 p-5 text-white sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {step === "bargain" ? "💰 দাম দরকরুন" : step === "pay" ? "💳 পেমেন্ট" : "🛒 রিসোর্স আনলক"}
            </h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors text-lg">✕</button>
          </div>
          <p className="text-white/80 text-sm mt-1">
            {step === "select" ? `প্রতি রিসোর্স মাত্র ${BASE_PRICE} ৳` : `${finalCount}টি রিসোর্স = ৳${finalAmount.toLocaleString()}`}
          </p>
        </div>

        <div className="p-5 space-y-3">
          {step === "select" && (
            <>
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border-2 border-primary/20">
                <span className="text-sm font-bold text-text shrink-0">{resourceCount}টি</span>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={resourceCount}
                  onChange={(e) => { const v = parseInt(e.target.value); setResourceCount(v); setFinalAmount(v * BASE_PRICE); setFinalCount(v); }}
                  className="flex-1 accent-primary"
                />
                <span className="text-sm font-bold text-text shrink-0">৫০টি</span>
              </div>

              <div className="flex items-center justify-between px-2">
                <button
                  onClick={() => { const v = Math.max(1, resourceCount - 1); setResourceCount(v); setFinalAmount(v * BASE_PRICE); setFinalCount(v); }}
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg font-bold text-primary hover:bg-gray-200 transition-all"
                >−</button>
                <div className="text-center">
                  <p className="text-2xl font-black text-primary">{basePrice.toLocaleString()} ৳</p>
                  <p className="text-xs text-text-secondary">{resourceCount}টি × {BASE_PRICE} ৳</p>
                </div>
                <button
                  onClick={() => { const v = Math.min(50, resourceCount + 1); setResourceCount(v); setFinalAmount(v * BASE_PRICE); setFinalCount(v); }}
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg font-bold text-primary hover:bg-gray-200 transition-all"
                >+</button>
              </div>

              {resourceCount >= 2 && (
                <button
                  onClick={handleStartBargain}
                  disabled={loading}
                  className="w-full py-3 bg-amber-50 border-2 border-amber-200 text-amber-700 font-bold rounded-xl hover:bg-amber-100 transition-all disabled:opacity-50"
                >
                  💰 দাম দরকরুন
                </button>
              )}

              {resourceCount === 1 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-blue-700 text-sm text-center font-medium">
                  ⚡ ১টি রিসোর্সের জন্য দাম ফিক্সড — বার্গেনিং শুধু ২টি বা তার বেশি রিসোর্সের জন্য
                </div>
              )}

              <button
                onClick={() => { setFinalAmount(basePrice); setFinalCount(resourceCount); setStep("pay"); }}
                className="w-full py-3.5 bg-gradient-to-r from-primary to-primary/80 text-white font-bold rounded-xl text-lg hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                💳 {basePrice.toLocaleString()} ৳ পেমেন্ট করুন
              </button>
            </>
          )}

          {step === "bargain" && (
            <>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 max-h-60 overflow-y-auto text-sm">
                {bargainMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.role === "ai"
                        ? "bg-white border border-gray-200 text-text"
                        : "bg-primary text-white"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {canBargain && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={userPriceInput}
                    onChange={(e) => setUserPriceInput(e.target.value)}
                    placeholder="আপনার প্রস্তাবিত মূল্য (৳)"
                    className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-primary"
                    min={60}
                    max={finalAmount}
                  />
                  <button
                    onClick={handleBargainRespond}
                    disabled={loading || !userPriceInput}
                    className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 text-sm"
                  >
                    {loading ? "..." : "পাঠান"}
                  </button>
                </div>
              )}

              {!canBargain && (
                <button
                  onClick={handleAcceptDeal}
                  className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all"
                >
                  ✅ {finalAmount.toLocaleString()} ৳ তে ডিল করুন
                </button>
              )}
            </>
          )}

          {step === "pay" && (
            <div className="space-y-4">
              <div className="bg-primary/5 rounded-xl p-4 text-center">
                <p className="text-xl font-black text-primary">{finalAmount.toLocaleString()} ৳</p>
                <p className="text-sm text-text-secondary">{finalCount}টি রিসোর্স</p>
              </div>

              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-primary to-primary/80 text-white font-bold rounded-xl text-lg hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "⏳ প্রসেসিং..." : `💳 ${finalAmount.toLocaleString()} ৳ পেমেন্ট করুন`}
              </button>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <p className="text-center text-xs text-text-secondary">SSLCommerz এর মাধ্যমে নিরাপদ পেমেন্ট</p>
        </div>
      </div>
    </div>
  );
}
