"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  nameBn: string | null;
  description: string | null;
  descriptionBn: string | null;
  price: number;
  minPrice: number;
  maxPrice: number;
  aiPriceEnabled: number;
  currency: string;
  commissionPercentage: number;
  commissionFixed: number;
  category: string | null;
  stock: number;
  imageUrl: string | null;
  images: string | null;
  isActive: number;
  enableCommission: number;
  enableCod: number;
  enableSslcommerz: number;
  commissionOverride: string | null;
  createdAt: string;
}

interface LevelOverride {
  levelNumber: number;
  percentage: number;
  fixedAmount: number;
}

const emptyForm = () => ({
  name: "", nameBn: "", description: "", descriptionBn: "", price: "", minPrice: "", maxPrice: "", aiPriceEnabled: 1,
  currency: "BDT", commissionPercentage: "0", commissionFixed: "0", category: "business", stock: "-1",
  enableCommission: 1, enableCod: 1, enableSslcommerz: 1, imageUrl: "", images: "[]", commissionOverride: "",
});

export default function CompanyProductsPage() {
  const { lang } = useLanguageStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [levelOverrides, setLevelOverrides] = useState<LevelOverride[]>([]);
  const [globalLevels, setGlobalLevels] = useState<LevelOverride[]>([]);
  const [expandedDesc, setExpandedDesc] = useState<number | null>(null);

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json() as { products?: Product[] };
      if (data.products) setProducts(data.products);
    } catch {}
  };

  const loadGlobalLevels = async () => {
    try {
      const res = await fetch("/api/mlm/levels");
      const data = await res.json() as { levels?: any[] };
      if (data.levels) {
        setGlobalLevels(data.levels.map((l: any) => ({
          levelNumber: l.levelNumber, percentage: l.percentage, fixedAmount: l.fixedAmount,
        })));
      }
    } catch {}
  };

  useEffect(() => { loadProducts(); loadGlobalLevels(); }, []);

  const resetForm = () => {
    setForm(emptyForm()); setLevelOverrides([]); setEditingId(null); setShowAdd(false); setError("");
  };

  const startEdit = (p: Product) => {
    let overrides: LevelOverride[] = [];
    if (p.commissionOverride) { try { overrides = JSON.parse(p.commissionOverride); } catch {} }
    setForm({
      name: p.name, nameBn: p.nameBn || "", description: p.description || "", descriptionBn: p.descriptionBn || "",
      price: String(p.price), minPrice: String(p.minPrice || 0), maxPrice: String(p.maxPrice || 0),
      aiPriceEnabled: p.aiPriceEnabled, currency: p.currency || "BDT",
      commissionPercentage: String(p.commissionPercentage || 0), commissionFixed: String(p.commissionFixed || 0),
      category: p.category || "business", stock: String(p.stock),
      enableCommission: p.enableCommission, enableCod: p.enableCod, enableSslcommerz: p.enableSslcommerz,
      imageUrl: p.imageUrl || "", images: p.images || "[]", commissionOverride: p.commissionOverride || "",
    });
    setLevelOverrides(overrides.length > 0 ? overrides : globalLevels.map(l => ({ ...l })));
    setEditingId(p.id); setShowAdd(true); setError("");
  };

  const handleSave = async () => {
    setSaving(true); setError("");
    try {
      const payload = {
        name: form.name, nameBn: form.nameBn || null, description: form.description || null,
        descriptionBn: form.descriptionBn || null, price: parseFloat(form.price) || 0,
        minPrice: parseFloat(form.minPrice) || 0, maxPrice: parseFloat(form.maxPrice) || 0,
        aiPriceEnabled: form.aiPriceEnabled,
        currency: form.currency, commissionPercentage: parseFloat(form.commissionPercentage) || 0,
        commissionFixed: parseFloat(form.commissionFixed) || 0, category: form.category || null,
        stock: parseInt(form.stock) || -1, imageUrl: form.imageUrl || null, images: form.images || null,
        enableCommission: form.enableCommission, enableCod: form.enableCod, enableSslcommerz: form.enableSslcommerz,
        commissionOverride: levelOverrides.length > 0 ? JSON.stringify(levelOverrides) : null,
      };

      const url = editingId ? `/api/products/${editingId}` : "/api/products";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json() as { error?: string };
      if (!res.ok) throw new Error(data.error || "Save failed");

      await loadProducts(); resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(lang === "bn" ? "নিশ্চিতভাবে ডিলিট করবেন?" : "Are you sure you want to delete?")) return;
    try { const res = await fetch(`/api/products/${id}`, { method: "DELETE" }); if (res.ok) await loadProducts(); } catch {}
  };

  const toggleField = (id: number, field: string, value: number) => {
    fetch(`/api/products/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ [field]: value }) })
      .then(() => loadProducts()).catch(() => {});
  };

  const syncLevelsFromGlobal = () => setLevelOverrides(globalLevels.map(l => ({ ...l })));

  return (
    <div className="min-h-screen py-24 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">{lang === "bn" ? "পণ্য ব্যবস্থাপনা" : "Manage Products"}</h1>
            <p className="text-sm text-text-secondary mt-1">{products.length} {lang === "bn" ? "টি পণ্য" : "products"}</p>
          </div>
          <Button onClick={() => { resetForm(); setShowAdd(!showAdd); }}>
            {lang === "bn" ? "নতুন পণ্য" : "Add Product"}
          </Button>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}

        {showAdd && (
          <Card className="mb-6 animate-fade-up">
            <h3 className="font-bold text-primary mb-4">
              {editingId ? (lang === "bn" ? "পণ্য সম্পাদনা করুন" : "Edit Product") : (lang === "bn" ? "নতুন পণ্য যোগ করুন" : "Add New Product")}
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder={lang === "bn" ? "পণ্যের নাম (ইংরেজি)" : "Product Name (EN)"} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
              <input type="text" placeholder={lang === "bn" ? "পণ্যের নাম (বাংলা)" : "Product Name (BN)"} value={form.nameBn} onChange={(e) => setForm({ ...form, nameBn: e.target.value })} className="input-field" />
              <input type="number" placeholder={lang === "bn" ? "মূল্য" : "Price"} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" required />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                <option value="business">{lang === "bn" ? "ব্যবসা" : "Business"}</option>
                <option value="career">{lang === "bn" ? "ক্যারিয়ার" : "Career"}</option>
                <option value="elite">{lang === "bn" ? "এলিট" : "Elite"}</option>
                <option value="education">{lang === "bn" ? "শিক্ষা" : "Education"}</option>
              </select>
              <input type="text" placeholder={lang === "bn" ? "ছবির URL" : "Image URL"} value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="input-field" />
            </div>

            <div className="border-t border-border pt-4 mb-4">
              <h4 className="font-semibold text-sm text-primary mb-2">{lang === "bn" ? "বিবরণ" : "Description"}</h4>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field w-full !py-2 text-sm" rows={3} placeholder={lang === "bn" ? "পণ্যের বিবরণ লিখুন (ইংরেজি)" : "Product description (EN)"} />
              <textarea value={form.descriptionBn} onChange={(e) => setForm({ ...form, descriptionBn: e.target.value })} className="input-field w-full !py-2 text-sm mt-2" rows={3} placeholder={lang === "bn" ? "পণ্যের বিবরণ লিখুন (বাংলা)" : "Product description (BN)"} />
            </div>

            <div className="border-t border-border pt-4 mb-4">
              <h4 className="font-semibold text-sm text-primary mb-2">{lang === "bn" ? "AI দরদাম প্রাইসিং" : "AI Bargaining Price"}</h4>
              <div className="grid sm:grid-cols-3 gap-3 mb-2">
                <div>
                  <label className="text-xs text-text-secondary block mb-1">{lang === "bn" ? "সর্বনিম্ন দাম" : "Min Price"} (৳)</label>
                  <input type="number" value={form.minPrice} onChange={(e) => setForm({ ...form, minPrice: e.target.value })} className="input-field w-full !py-1.5 text-sm" min="0" />
                </div>
                <div>
                  <label className="text-xs text-text-secondary block mb-1">{lang === "bn" ? "সর্বোচ্চ দাম" : "Max Price"} (৳)</label>
                  <input type="number" value={form.maxPrice} onChange={(e) => setForm({ ...form, maxPrice: e.target.value })} className="input-field w-full !py-1.5 text-sm" min="0" />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={form.aiPriceEnabled === 1} onChange={(e) => setForm({ ...form, aiPriceEnabled: e.target.checked ? 1 : 0 })} className="w-4 h-4 accent-primary" />
                    <span className="text-sm text-text-secondary">{lang === "bn" ? "AI দরদাম সক্রিয়" : "AI Pricing Active"}</span>
                  </label>
                </div>
              </div>
              <p className="text-xs text-text-secondary">
                {lang === "bn" ? "AI গ্রাহকের প্রোফাইল অনুযায়ী min-max-এর মধ্যে দাম নির্ধারণ করবে। কখনো min-এর নিচে যাবে না।" : "AI will set price between min and max based on customer profile. Never goes below min."}
              </p>
            </div>

            <div className="border-t border-border pt-4 mb-4">
              <h4 className="font-semibold text-sm text-primary mb-2">{lang === "bn" ? "কমিশন ও পেমেন্ট সেটিংস" : "Commission & Payment Settings"}</h4>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={form.enableCommission === 1} onChange={(e) => setForm({ ...form, enableCommission: e.target.checked ? 1 : 0 })} className="w-4 h-4 accent-primary" />
                  <span className="text-sm text-text-secondary">{lang === "bn" ? "কমিশন সক্রিয়" : "Enable Commission"}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={form.enableCod === 1} onChange={(e) => setForm({ ...form, enableCod: e.target.checked ? 1 : 0 })} className="w-4 h-4 accent-primary" />
                  <span className="text-sm text-text-secondary">{lang === "bn" ? "ক্যাশ অন ডেলিভারি" : "Cash on Delivery"}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={form.enableSslcommerz === 1} onChange={(e) => setForm({ ...form, enableSslcommerz: e.target.checked ? 1 : 0 })} className="w-4 h-4 accent-primary" />
                  <span className="text-sm text-text-secondary">SSL Commerz</span>
                </label>
              </div>
            </div>

            {form.enableCommission === 1 && (
              <div className="border-t border-border pt-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm text-primary">{lang === "bn" ? "কমিশন লেভেল ওভাররাইড" : "Commission Level Override"}</h4>
                  <button onClick={syncLevelsFromGlobal} className="text-xs text-blue-600 hover:underline">
                    {lang === "bn" ? "গ্লোবাল লেভেল সিঙ্ক" : "Sync from Global"}
                  </button>
                </div>
                <p className="text-xs text-text-secondary mb-2">
                  {lang === "bn" ? "খালি রাখলে গ্লোবাল কমিশন লেভেল ব্যবহার হবে।" : "Leave empty to use global commission levels."}
                </p>
                {levelOverrides.length > 0 && (
                  <div className="space-y-1.5">
                    {levelOverrides.map((lvl, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-16 font-medium text-text-secondary">L{lvl.levelNumber}</span>
                        <input type="number" value={lvl.percentage} onChange={(e) => { const u = [...levelOverrides]; u[i].percentage = parseFloat(e.target.value) || 0; setLevelOverrides(u); }} className="w-16 input-field !py-1 text-xs text-center" min="0" max="100" step="0.5" placeholder="%" />
                        <span className="text-text-secondary">%</span>
                        <input type="number" value={lvl.fixedAmount} onChange={(e) => { const u = [...levelOverrides]; u[i].fixedAmount = parseFloat(e.target.value) || 0; setLevelOverrides(u); }} className="w-16 input-field !py-1 text-xs text-center" min="0" step="1" placeholder="৳" />
                        <span className="text-text-secondary">৳</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2 justify-end border-t border-border pt-4">
              <Button variant="ghost" onClick={resetForm}>{lang === "bn" ? "বাতিল" : "Cancel"}</Button>
              <Button onClick={handleSave} disabled={saving || !form.name}>
                {saving ? (lang === "bn" ? "সংরক্ষণ..." : "Saving...") : (lang === "bn" ? "সেভ করুন" : "Save")}
              </Button>
            </div>
          </Card>
        )}

        <Card className="overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-border">
                  <th className="text-left p-4 text-sm font-semibold text-primary">{lang === "bn" ? "পণ্য" : "Product"}</th>
                  <th className="text-right p-4 text-sm font-semibold text-primary">{lang === "bn" ? "মূল্য" : "Price"}</th>
                  <th className="text-center p-4 text-sm font-semibold text-primary">%</th>
                  <th className="text-center p-4 text-sm font-semibold text-primary">{lang === "bn" ? "কমিশন" : "Comm."}</th>
                  <th className="text-center p-4 text-sm font-semibold text-primary">COD</th>
                  <th className="text-center p-4 text-sm font-semibold text-primary">SSL</th>
                  <th className="text-center p-4 text-sm font-semibold text-primary">AI</th>
                  <th className="text-center p-4 text-sm font-semibold text-primary">{lang === "bn" ? "স্ট্যাটাস" : "Status"}</th>
                  <th className="text-center p-4 text-sm font-semibold text-primary">{lang === "bn" ? "কাজ" : "Actions"}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-gray-50/50">
                    <td className="p-4 text-sm font-medium text-primary">
                      <div className="flex items-center gap-2">
                        {p.imageUrl && <img src={p.imageUrl} alt="" className="w-8 h-8 rounded object-cover" />}
                        <div>
                          <span>{lang === "bn" && p.nameBn ? p.nameBn : p.name}</span>
                          {p.description && (
                            <button onClick={() => setExpandedDesc(expandedDesc === p.id ? null : p.id)} className="block text-xs text-blue-500 hover:underline mt-0.5">
                              {expandedDesc === p.id ? (lang === "bn" ? "বন্ধ" : "Hide") : (lang === "bn" ? "বিবরণ দেখুন" : "View desc.")}
                            </button>
                          )}
                          {expandedDesc === p.id && p.description && (
                            <div className="text-xs text-text-secondary mt-1 bg-gray-50 p-2 rounded max-w-xs">
                              {lang === "bn" && p.descriptionBn ? p.descriptionBn : p.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-right">
                      <div className="font-semibold">{formatCurrency(p.price)}</div>
                      {p.aiPriceEnabled && p.minPrice > 0 && (
                        <div className="text-xs text-text-secondary">৳{p.minPrice}–{p.maxPrice || p.price}</div>
                      )}
                    </td>
                    <td className="p-4 text-sm text-center">{p.commissionPercentage}%</td>
                    <td className="p-4 text-center">
                      <button onClick={() => toggleField(p.id, "enableCommission", p.enableCommission ? 0 : 1)} className={`px-2 py-0.5 rounded text-xs font-medium ${p.enableCommission ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                        {p.enableCommission ? "ON" : "OFF"}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => toggleField(p.id, "enableCod", p.enableCod ? 0 : 1)} className={`px-2 py-0.5 rounded text-xs font-medium ${p.enableCod ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                        {p.enableCod ? "ON" : "OFF"}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => toggleField(p.id, "enableSslcommerz", p.enableSslcommerz ? 0 : 1)} className={`px-2 py-0.5 rounded text-xs font-medium ${p.enableSslcommerz ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                        {p.enableSslcommerz ? "ON" : "OFF"}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => toggleField(p.id, "aiPriceEnabled", p.aiPriceEnabled ? 0 : 1)} className={`px-2 py-0.5 rounded text-xs font-medium ${p.aiPriceEnabled ? "bg-purple-50 text-purple-600" : "bg-gray-100 text-gray-400"}`}>
                        {p.aiPriceEnabled ? "ON" : "OFF"}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                        {lang === "bn" ? "সক্রিয়" : "Active"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => startEdit(p)} className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded" title={lang === "bn" ? "সম্পাদনা" : "Edit"}>✏️</button>
                        <button onClick={() => handleDelete(p.id)} className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded" title={lang === "bn" ? "ডিলিট" : "Delete"}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-text-secondary text-sm">
                      {lang === "bn" ? "কোনো পণ্য নেই। উপরে \"নতুন পণ্য\" বাটনে ক্লিক করে পণ্য যোগ করুন।" : "No products found. Click \"Add Product\" above to create one."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
