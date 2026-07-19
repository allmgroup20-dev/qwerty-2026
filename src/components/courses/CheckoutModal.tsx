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

const packs = [
  { count: 1, label: "1টি রিসোর্স", price: 99 },
  { count: 3, label: "3টি রিসোর্স", price: 297 },
  { count: 5, label: "5টি রিসোর্স", price: 495 },
  { count: 10, label: "10টি রিসোর্স", price: 990 },
];

export default function CheckoutModal({ workerId, cusName, cusPhone, cusEmail, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<"select" | "bargain" | "pay">("select");
  const [selectedPack, setSelectedPack] = useState(packs[0]);
  const [finalAmount, setFinalAmount] = useState(selectedPack.price);
  const [finalCount, setFinalCount] = useState(selectedPack.count);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [bargainSessionId, setBargainSessionId] = useState<number | null>(null);
  const [bargainMessages, setBargainMessages] = useState<{ role: "ai" | "user"; text: string }[]>([]);
  const [userPriceInput, setUserPriceInput] = useState("");
  const [canBargain, setCanBargain] = useState(true);

  const handleStartBargain = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/bargain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId, resourceCount: selectedPack.count }),
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
    if (!desiredPrice || desiredPrice < 50 || desiredPrice > finalAmount) {
      setError("দয়া করে একটি বৈধ মূল্য লিখুন (৫০-বর্তমান অফারের মধ্যে)");
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
              {step === "bargain" ? "💰 দাম দরকরুন" : step === "pay" ? "💳 পেমেন্ট" : "🛒 রিসোর্স আনলক প্যাকেজ"}
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
              {packs.map((pack) => (
                <button
                  key={pack.count}
                  onClick={() => { setSelectedPack(pack); setFinalAmount(pack.price); setFinalCount(pack.count); }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedPack.count === pack.count
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-text">{pack.label}</span>
                      <p className="text-xs text-text-secondary mt-0.5">{pack.price / pack.count} ৳/রিসোর্স</p>
                    </div>
                    <span className="text-xl font-black text-primary">{pack.price.toLocaleString()} ৳</span>
                  </div>
                </button>
              ))}

              <button
                onClick={handleStartBargain}
                disabled={loading}
                className="w-full py-3 bg-amber-50 border-2 border-amber-200 text-amber-700 font-bold rounded-xl hover:bg-amber-100 transition-all disabled:opacity-50"
              >
                💰 দাম দরকরুন
              </button>

              <button
                onClick={() => setStep("pay")}
                className="w-full py-3.5 bg-gradient-to-r from-primary to-primary/80 text-white font-bold rounded-xl text-lg hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                💳 {selectedPack.price.toLocaleString()} ৳ পেমেন্ট করুন
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
                    min={50}
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
