"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatDate, getStatusColor, getStatusBadge } from "@/lib/utils";

interface Commission {
  commission_id: string; from_name: string; level_number: number;
  percentage: number; total_amount: number; currency: string;
  status: string; created_at: string;
}

export default function CommissionsPage() {
  const { lang } = useLanguageStore();
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const workerId = localStorage.getItem("worker_id");
    if (!workerId) { setLoading(false); return; }
    fetch(`/api/mlm/commissions?workerId=${workerId}`)
      .then((r) => r.json() as Promise<{ commissions?: Commission[] }>)
      .then((data) => {
        if (data.commissions) setCommissions(data.commissions);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-primary mb-2">
          {lang === "bn" ? "কমিশন ইতিহাস" : "Commission History"}
        </h1>
        <p className="text-sm text-text-secondary mb-8">
          {lang === "bn" ? "আপনার সব কমিশনের বিস্তারিত" : "Details of all your commissions"}
        </p>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-action border-t-transparent rounded-full" />
          </div>
        ) : commissions.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-text-secondary">{lang === "bn" ? "কোন কমিশন নেই" : "No commissions yet"}</p>
          </Card>
        ) : (
          <Card className="overflow-hidden !p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="text-left p-4 text-sm font-semibold text-primary">{lang === "bn" ? "থেকে" : "From"}</th>
                    <th className="text-left p-4 text-sm font-semibold text-primary">{lang === "bn" ? "লেভেল" : "Level"}</th>
                    <th className="text-left p-4 text-sm font-semibold text-primary">%</th>
                    <th className="text-right p-4 text-sm font-semibold text-primary">{lang === "bn" ? "পরিমাণ" : "Amount"}</th>
                    <th className="text-center p-4 text-sm font-semibold text-primary">{lang === "bn" ? "স্ট্যাটাস" : "Status"}</th>
                    <th className="text-right p-4 text-sm font-semibold text-primary">{lang === "bn" ? "তারিখ" : "Date"}</th>
                  </tr>
                </thead>
                <tbody>
                  {commissions.map((c) => (
                    <tr key={c.commission_id} className="border-b border-border last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 text-sm font-medium text-primary">{c.from_name || "Unknown"}</td>
                      <td className="p-4 text-sm text-text-secondary">Level {c.level_number}</td>
                      <td className="p-4 text-sm text-text-secondary">{c.percentage || 0}%</td>
                      <td className="p-4 text-sm font-semibold text-right">{formatCurrency(c.total_amount, c.currency)}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(c.status)}`}>
                          {getStatusBadge(c.status, lang)}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-text-secondary text-right">{formatDate(c.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
