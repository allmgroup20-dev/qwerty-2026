import { NextResponse } from "next/server";
import { invalidateCache } from "@/lib/cache";

export async function POST() {
  try {
    const cacheKeys = [
      "company_settings", "maintenance:stats",
      "analytics:overview", "analytics:customers",
      "analytics:segments",
    ];
    for (const key of cacheKeys) {
      await invalidateCache(key);
    }

    return NextResponse.json({ success: true, clearedKeys: cacheKeys.length });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
