"use client";

import { useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(value);
  const [loading, setLoading] = useState(false);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let w = img.width, h = img.height;
          const maxDim = 400;
          if (w > maxDim || h > maxDim) {
            const ratio = Math.min(maxDim / w, maxDim / h);
            w = Math.round(w * ratio);
            h = Math.round(h * ratio);
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) { resolve(reader.result as string); return; }
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.onerror = () => resolve(reader.result as string);
        img.src = reader.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Max 2MB");
      return;
    }
    setLoading(true);
    try {
      const dataUrl = await compressImage(file);
      setPreview(dataUrl);
      onChange(dataUrl);
    } catch {
      alert("Failed to process image");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      {label && <label className="text-xs font-medium text-text-secondary block mb-1">{label}</label>}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-border flex-shrink-0 relative">
          {preview ? (
            <img src={preview} alt="" className="w-full h-full object-cover" onError={() => setPreview("")} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
          )}
          {loading && <div className="absolute inset-0 bg-white/70 flex items-center justify-center"><div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => inputRef.current?.click()} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all">
            {preview ? "Change" : "Upload"}
          </button>
          {preview && (
            <button type="button" onClick={handleRemove} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all">
              Remove
            </button>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </div>
    </div>
  );
}
