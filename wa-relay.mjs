#!/usr/bin/env node
import { makeWASocket, DisconnectReason, fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import http from "http";
import fs from "fs";
import path from "path";

const PORT = parseInt(process.env.PORT || "3001", 10);
const SESSION_FILE = path.join(process.cwd(), "wa-session.json");
const WEBHOOK_URL = process.env.WEBHOOK_URL || "http://localhost:3000/api/whatsapp/webhook";

let sock = null;
let qrCode = null;
let status = "disconnected";
let statusError = null;
let sessionCreds = null;
let sessionKeys = null;
let reconnectAttempts = 0;
let reconnectTimer = null;
let sentCount = 0;
let receivedCount = 0;
let startTime = null;

function loadSession() {
  try {
    if (fs.existsSync(SESSION_FILE)) {
      const data = JSON.parse(fs.readFileSync(SESSION_FILE, "utf8"));
      sessionCreds = data.creds || null;
      sessionKeys = data.keys || null;
      console.log("[relay] Session loaded from disk");
    }
  } catch (e) {
    console.error("[relay] Session load error:", e.message);
  }
}

function saveSession(creds, keys) {
  sessionCreds = creds;
  sessionKeys = keys;
  try {
    const data = { creds, keys: exportKeysForSave(keys) };
    fs.writeFileSync(SESSION_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("[relay] Session save error:", e.message);
  }
}

function exportKeysForSave(keys) {
  if (!keys) return {};
  const exported = {};
  for (const [key, value] of Object.entries(keys)) {
    if (value instanceof Map) exported[key] = Array.from(value.entries());
    else if (typeof value === "object" && value !== null) exported[key] = value;
  }
  return exported;
}

function rebuildKeys(saved) {
  if (!saved) return {};

  const keys = {};
  for (const [type, entries] of Object.entries(saved)) {
    if (Array.isArray(entries)) {
      const map = new Map();
      for (const [id, value] of entries) map.set(id, value);
      keys[type] = map;
    } else {
      keys[type] = entries;
    }
  }
  return keys;
}

async function startConnection() {
  if (sock) {
    try { sock.end(undefined); } catch {}
    sock = null;
  }

  status = "connecting";
  statusError = null;
  qrCode = null;

  try {
    const { version } = await fetchLatestBaileysVersion();
    console.log(`[relay] Using protocol v${version.join(".")}`);

    const auth = sessionCreds
      ? { creds: sessionCreds, keys: rebuildKeys(sessionKeys) }
      : undefined;

    sock = makeWASocket({
      version,
      auth,
      printQRInTerminal: true,
      browser: ["Jobayer Group Relay", "Chrome", ""],
      syncFullHistory: false,
      logger: { info: () => {}, error: () => {}, warn: () => {} },
    });

    sock.ev.on("qr", (qr) => {
      qrCode = qr;
      reconnectAttempts = 0;
      console.log("[relay] QR code generated");
    });

    sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
      if (connection === "open") {
        status = "connected";
        statusError = null;
        qrCode = null;
        startTime = Date.now();
        reconnectAttempts = 0;
        console.log("[relay] Connected!");

        const creds = sock?.authState?.creds;
        const keys = sock?.authState?.keys;
        if (creds) {
          saveSession(
            creds,
            keys ? { ...keys } : null
          );
        }
      }

      if (connection === "close") {
        const statusCode =
          lastDisconnect?.error?.output?.statusCode || DisconnectReason.loggedOut;

        if (statusCode === DisconnectReason.loggedOut) {
          status = "disconnected";
          statusError = "Logged out";
          qrCode = null;
          sessionCreds = null;
          sessionKeys = null;
          if (fs.existsSync(SESSION_FILE)) fs.unlinkSync(SESSION_FILE);
          console.log("[relay] Logged out");
        } else {
          status = "disconnected";
          statusError = `Disconnected (${statusCode})`;
          scheduleReconnect();
        }
      }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
      for (const msg of messages) {
        if (msg.key?.fromMe) continue;
        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
        const phone = msg.key?.remoteJid?.replace("@s.whatsapp.net", "") || "";
        if (!text || !phone) continue;

        receivedCount++;
        console.log(`[relay] Received from ${phone}: ${text.substring(0, 50)}`);

        try {
          const res = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, text, name: "", fromBrowser: true }),
          });
          const data = await res.json();
          if (data.reply && sock) {
            await sock.sendMessage(msg.key.remoteJid, { text: data.reply });
            sentCount++;
            console.log(`[relay] Reply sent to ${phone}: ${data.reply.substring(0, 50)}`);
          }
        } catch (e) {
          console.error(`[relay] Webhook error: ${e.message}`);
        }
      }
    });

    sock.ev.on("creds.update", async () => {
      try {
        const creds = sock?.authState?.creds;
        const keys = sock?.authState?.keys;
        if (creds) saveSession(creds, keys ? { ...keys } : null);
      } catch {}
    });
  } catch (e) {
    status = "error";
    statusError = e.message;
    console.error(`[relay] Connection error: ${e.message}`);
  }
}

function scheduleReconnect() {
  if (reconnectTimer) clearTimeout(reconnectTimer);
  const delay = Math.min(60, Math.pow(2, reconnectAttempts)) * 1000;
  reconnectAttempts++;
  console.log(`[relay] Reconnecting in ${delay / 1000}s`);
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    startConnection();
  }, delay);
}

function stopConnection() {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  if (sock) {
    try { sock.end(undefined); } catch {}
    sock = null;
  }
  status = "disconnected";
  qrCode = null;
  reconnectAttempts = 0;
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;

  if (path === "/qr") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ qr: qrCode }));
    return;
  }

  if (path === "/status") {
    const elapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status,
        error: statusError,
        qr: qrCode || null,
        sentCount,
        receivedCount,
        uptime: elapsed,
        connected: status === "connected",
      })
    );
    return;
  }

  if (path === "/start") {
    startConnection();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (path === "/stop") {
    stopConnection();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (path === "/send" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const { jid, text } = JSON.parse(body);
        if (!jid || !text) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: "jid and text required" }));
          return;
        }
        if (status !== "connected" || !sock) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: "Not connected" }));
          return;
        }
        const targetJid = jid.includes("@s.whatsapp.net") ? jid : `${jid}@s.whatsapp.net`;
        await sock.sendMessage(targetJid, { text });
        sentCount++;
        res.writeHead(200);
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
});

loadSession();
console.log(`[relay] WhatsApp Relay starting on http://localhost:${PORT}`);
console.log(`[relay] Webhook URL: ${WEBHOOK_URL}`);
if (sessionCreds) {
  console.log("[relay] Saved session found, auto-connecting...");
  setTimeout(() => startConnection(), 1000);
} else {
  console.log("[relay] No session found. Start via /start endpoint or click Connect in the UI.");
}

server.listen(PORT);
