import { NextRequest, NextResponse } from "next/server";
import { query, queryFirst, execute } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { getCached, setCached, invalidateCache } from "@/lib/cache";

export async function GET(req: NextRequest) {
  const limit = Math.min(Math.max(parseInt(req.nextUrl.searchParams.get("limit") || "20") || 20, 1), 100);
  const offset = Math.max(parseInt(req.nextUrl.searchParams.get("offset") || "0") || 0, 0);

  const cached = await getCached<any>("products", 30);
  if (cached && offset === 0) {
    const sliced = cached.slice(0, limit);
    const resp = NextResponse.json({ products: sliced, total: cached.length, limit, offset });
    resp.headers.set("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");
    return resp;
  }

  try {
    const db = await getDB();
    const total = await queryFirst<{ c: number }>(
      db, "SELECT COUNT(*) as c FROM products WHERE is_active = 1"
    );
    const products = await query<any>(
      db,
      `SELECT id, name, name_bn as nameBn, description, description_bn as descriptionBn,
              price, min_price as minPrice, max_price as maxPrice,
              ai_price_enabled as aiPriceEnabled,
              currency, commission_percentage as commissionPercentage,
              commission_fixed as commissionFixed, image_url as imageUrl,
              category, stock, is_active as isActive, enable_commission as enableCommission,
              enable_cod as enableCod, enable_sslcommerz as enableSslcommerz,
              images, commission_override as commissionOverride,
              premium_membership as premiumMembership,
              product_type as productType,
              direct_buy as directBuy,
              created_at as createdAt
       FROM products WHERE is_active = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    if (offset === 0) await setCached("products", products);
    const resp = NextResponse.json({ products, total: total?.c || 0, limit, offset });
    resp.headers.set("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");
    return resp;
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      name: string; nameBn?: string; description?: string; descriptionBn?: string;
      price: number; minPrice?: number; maxPrice?: number; aiPriceEnabled?: number;
      currency?: string; commissionPercentage?: number; commissionFixed?: number;
      imageUrl?: string; category?: string; stock?: number;
      enableCommission?: number; enableCod?: number; enableSslcommerz?: number;
      images?: string; commissionOverride?: string; premiumMembership?: number;
      productType?: string; directBuy?: number;
    };

    if (!body.name || body.price === undefined) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    const db = await getDB();

    await invalidateCache("products");
    await execute(db,
      `INSERT INTO products (name, name_bn, description, description_bn, price,
        min_price, max_price, ai_price_enabled, currency,
        commission_percentage, commission_fixed, image_url, category, stock, is_active,
        enable_commission, enable_cod, enable_sslcommerz, images, commission_override,
        premium_membership, product_type, direct_buy)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.name, body.nameBn || null, body.description || null, body.descriptionBn || null,
        body.price,
        body.minPrice ?? 0, body.maxPrice ?? 0, body.aiPriceEnabled ?? 1,
        body.currency || "BDT",
        body.commissionPercentage || 0, body.commissionFixed || 0,
        body.imageUrl || null, body.category || null, body.stock ?? -1,
        body.enableCommission ?? 1, body.enableCod ?? 1, body.enableSslcommerz ?? 1,
        body.images || null, body.commissionOverride || null,
        body.premiumMembership ?? 0,
        body.productType || "physical",
        body.directBuy ?? 0
      ]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: 500 });
  }
}
