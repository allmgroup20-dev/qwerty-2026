"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatDate, getStatusColor, getStatusBadge } from "@/lib/utils";

interface Order {
  order_id: string; product_name: string; total_amount: number;
  currency: string; order_status: string; payment_status: string;
  payment_method: string; transaction_id: string; created_at: string;
}

const statusMap: Record<string, string> = {
  pending: "pending", confirmed: "processing", paid: "paid",
  failed: "cancelled", cancelled: "cancelled",
};

export default function OrdersPage() {
  const { lang } = useLanguageStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const workerId = localStorage.getItem("worker_id");
    if (!workerId) { setLoading(false); return; }
    fetch(`/api/orders?workerId=${workerId}`)
      .then((r) => r.json() as Promise<{ orders?: Order[] }>)
      .then((data) => { if (data.orders) setOrders(data.orders); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-primary mb-2">{lang === "bn" ? "আমার অর্ডার" : "My Orders"}</h1>
        <p className="text-sm text-text-secondary mb-8">{lang === "bn" ? "আপনার সব অর্ডার" : "All your orders"}</p>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-action border-t-transparent rounded-full" />
          </div>
        ) : orders.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-text-secondary">{lang === "bn" ? "কোন অর্ডার নেই" : "No orders yet"}</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Card key={order.order_id} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-lg">📦</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-primary truncate">{order.product_name || "Product"}</p>
                  <p className="text-xs text-text-secondary">{order.order_id} • {formatDate(order.created_at)}</p>
                  {order.transaction_id && (
                    <p className="text-xs text-text-secondary">Tx: {order.transaction_id}</p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-sm text-primary">{formatCurrency(order.total_amount, order.currency)}</p>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(statusMap[order.order_status] || order.order_status)}`}>
                    {getStatusBadge(statusMap[order.order_status] || order.order_status, lang)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
