import { NextRequest, NextResponse } from "next/server";
import { execute, queryFirst } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json() as {
      name?: string; nameBn?: string; description?: string; descriptionBn?: string;
      price?: number; currency?: string; commissionPercentage?: number; commissionFixed?: number;
      imageUrl?: string; category?: string; stock?: number; isActive?: number;
      enableCommission?: number; enableCod?: number; enableSslcommerz?: number;
      images?: string; commissionOverride?: string;
    };
    const db = await getDB();

    const existing = await queryFirst<{ id: number }>(db, "SELECT id FROM products WHERE id = ?", [parseInt(id)]);
    if (!existing) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    await execute(db,
      `UPDATE products SET name=COALESCE(?,name), name_bn=COALESCE(?,name_bn), description=COALESCE(?,description),
       description_bn=COALESCE(?,description_bn), price=COALESCE(?,price), currency=COALESCE(?,currency),
       commission_percentage=COALESCE(?,commission_percentage), commission_fixed=COALESCE(?,commission_fixed),
       image_url=COALESCE(?,image_url), category=COALESCE(?,category), stock=COALESCE(?,stock),
       is_active=COALESCE(?,is_active), enable_commission=COALESCE(?,enable_commission),
       enable_cod=COALESCE(?,enable_cod), enable_sslcommerz=COALESCE(?,enable_sslcommerz),
       images=COALESCE(?,images), commission_override=COALESCE(?,commission_override)
       WHERE id=?`,
      [body.name ?? null, body.nameBn ?? null, body.description ?? null, body.descriptionBn ?? null,
       body.price ?? null, body.currency ?? null, body.commissionPercentage ?? null, body.commissionFixed ?? null,
       body.imageUrl ?? null, body.category ?? null, body.stock ?? null, body.isActive ?? null,
       body.enableCommission ?? null, body.enableCod ?? null, body.enableSslcommerz ?? null,
       body.images ?? null, body.commissionOverride ?? null, parseInt(id)]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await getDB();
    await execute(db, "UPDATE products SET is_active = 0 WHERE id = ?", [parseInt(id)]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
