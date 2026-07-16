import { NextRequest, NextResponse } from "next/server";
import { query, execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

export async function GET() {
  try {
    const products = await query<any>(
      await getDB(),
      `SELECT id, name, name_bn as nameBn, description, description_bn as descriptionBn,
              price, currency, commission_percentage as commissionPercentage,
              commission_fixed as commissionFixed, image_url as imageUrl,
              category, stock, is_active as isActive, enable_commission as enableCommission,
              enable_cod as enableCod, enable_sslcommerz as enableSslcommerz,
              images, commission_override as commissionOverride,
              created_at as createdAt
       FROM products WHERE is_active = 1 ORDER BY created_at DESC`
    );
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      name: string; nameBn?: string; description?: string; descriptionBn?: string;
      price: number; currency?: string; commissionPercentage?: number; commissionFixed?: number;
      imageUrl?: string; category?: string; stock?: number;
      enableCommission?: number; enableCod?: number; enableSslcommerz?: number;
      images?: string; commissionOverride?: string;
    };

    if (!body.name || body.price === undefined) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    const db = await getDB();

    await execute(db,
      `INSERT INTO products (name, name_bn, description, description_bn, price, currency,
        commission_percentage, commission_fixed, image_url, category, stock, is_active,
        enable_commission, enable_cod, enable_sslcommerz, images, commission_override)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?)`,
      [
        body.name, body.nameBn || null, body.description || null, body.descriptionBn || null,
        body.price, body.currency || "BDT",
        body.commissionPercentage || 0, body.commissionFixed || 0,
        body.imageUrl || null, body.category || null, body.stock ?? -1,
        body.enableCommission ?? 1, body.enableCod ?? 1, body.enableSslcommerz ?? 1,
        body.images || null, body.commissionOverride || null
      ]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: 500 });
  }
}
