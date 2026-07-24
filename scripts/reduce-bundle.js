const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const serverDir = path.resolve(__dirname, "..", ".open-next/server-functions/default");

const removals = [
  // Google Fonts metrics — unused (only use next/font/local)
  "node_modules/next/dist/server/capsize-font-metrics.json",
  // esbuild metadata — not needed at runtime
  "handler.mjs.meta.json",
];

for (const rel of removals) {
  const target = path.join(serverDir, rel);
  if (fs.existsSync(target)) {
    const size = fs.statSync(target).size;
    fs.rmSync(target);
    console.log(`Removed ${rel} (${(size / 1024).toFixed(1)} KB)`);
  } else {
    console.log(`${rel} not found, skipping`);
  }
}

// Extra minification pass on handler.mjs using esbuild
const handlerPath = path.join(serverDir, "handler.mjs");
if (fs.existsSync(handlerPath)) {
  const before = fs.statSync(handlerPath).size;
  console.log(`\nhandler.mjs before extra minify: ${(before / 1024).toFixed(1)} KB`);

  try {
    execSync(
      `npx esbuild "${handlerPath}" --minify --allow-overwrite --outfile="${handlerPath}"`,
      { cwd: serverDir, stdio: "pipe", timeout: 60000 }
    );
    const after = fs.statSync(handlerPath).size;
    const saved = before - after;
    console.log(`handler.mjs after extra minify: ${(after / 1024).toFixed(1)} KB (saved ${(saved / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error("Extra minify failed (non-fatal):", err.message);
  }
} else {
  console.log("handler.mjs not found, skipping extra minify");
}
