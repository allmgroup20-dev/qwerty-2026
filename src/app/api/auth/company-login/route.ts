import { NextRequest, NextResponse } from "next/server";
import { queryFirst } from "@/lib/db/queries";
import { getDB } from "@/lib/db";
import { verifyCompanyPassword, generateCompanyToken, getJwtSecret } from "@/lib/auth";
import { getCached, setCached } from "@/lib/cache";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json() as { username: string; password: string };
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const usernameHash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(username.toLowerCase()))))
      .map(b => b.toString(16).padStart(2, "0")).join("");

    const cached = await getCached<{ username: string; name: string; password: string; role: string }>(`auth:company:${usernameHash}`, 1800);
    if (cached) {
      const valid = await verifyCompanyPassword(password, cached.password);
      if (!valid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
      const token = await generateCompanyToken(cached.username, getJwtSecret());
      const response = NextResponse.json({ token, username: cached.username, name: cached.name, role: cached.role });
      response.cookies.set("company_token", token, { httpOnly: true, secure: false, sameSite: "lax", path: "/", maxAge: 86400 });
      response.cookies.set("company_user", JSON.stringify({ name: cached.name, username: cached.username, role: cached.role }), { httpOnly: false, secure: false, sameSite: "lax", path: "/", maxAge: 86400 });
      return response;
    }

    const admin = await queryFirst<{ username: string; name: string; password: string; role: string }>(
      await getDB(),
      "SELECT username, name, password, role FROM company_users WHERE username = ? COLLATE NOCASE",
      [username]
    );

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyCompanyPassword(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    setCached(`auth:company:${usernameHash}`, { username: admin.username, name: admin.name, password: admin.password, role: admin.role }).catch(() => {});

    const token = await generateCompanyToken(admin.username, getJwtSecret());
    const response = NextResponse.json({ token, username: admin.username, name: admin.name, role: admin.role });
    response.cookies.set("company_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    response.cookies.set("company_user", JSON.stringify({ name: admin.name, username: admin.username, role: admin.role }), {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return response;
  } catch (error) {
    console.error("Company login error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
