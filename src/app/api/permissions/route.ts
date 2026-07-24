import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { query, execute } from "@/lib/db/queries";
import {
  listPermissions,
  grantPermission,
  revokePermission,
  checkPermission,
  getPermissionSummary,
  getPermissionLabel,
} from "@/lib/permissions";
import type { PermissionType } from "@/lib/permissions";

export async function GET(request: NextRequest) {
  try {
    const workerId = request.nextUrl.searchParams.get("worker_id");
    if (!workerId) {
      return NextResponse.json({ error: "worker_id required" }, { status: 400 });
    }

    const summary = request.nextUrl.searchParams.get("summary") === "true";
    if (summary) {
      const result = await getPermissionSummary(workerId);
      return NextResponse.json(result);
    }

    const perms = await listPermissions(workerId);
    return NextResponse.json({ permissions: perms });
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message || "Failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const workerId = body.worker_id as string;
    const permType = body.permission_type as PermissionType;
    const scope = body.scope as Record<string, any> || {};
    const expiresAt = body.expires_at as string | undefined;

    if (!workerId || !permType) {
      return NextResponse.json({ error: "worker_id and permission_type required" }, { status: 400 });
    }

    await grantPermission(workerId, permType, scope, expiresAt);
    return NextResponse.json({ success: true, permission_type: permType, worker_id: workerId });
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message || "Failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const workerId = body.worker_id as string;
    const permType = body.permission_type as PermissionType;

    if (!workerId || !permType) {
      return NextResponse.json({ error: "worker_id and permission_type required" }, { status: 400 });
    }

    await revokePermission(workerId, permType);
    return NextResponse.json({ success: true, permission_type: permType, worker_id: workerId, revoked: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error)?.message || "Failed" }, { status: 500 });
  }
}
