import { NextRequest, NextResponse } from "next/server";
import { execute, queryFirst } from "@/lib/db/queries";
import { getDB } from "@/lib/db";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json() as {
      status?: string; adminNote?: string;
    };
    const db = await getDB();

    const existing = await queryFirst<{ id: number }>(db, "SELECT id FROM complaints WHERE id = ?", [parseInt(id)]);
    if (!existing) return NextResponse.json({ error: "Complaint not found" }, { status: 404 });

    await execute(db,
      `UPDATE complaints SET status=COALESCE(?,status), admin_note=COALESCE(?,admin_note),
       resolved_at=CASE WHEN ?='resolved' THEN datetime('now') ELSE resolved_at END
       WHERE id=?`,
      [body.status ?? null, body.adminNote ?? null, body.status ?? null, parseInt(id)]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}
