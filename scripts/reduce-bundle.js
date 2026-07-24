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

  // Patch loadInstrumentationModule to tolerate errors without .code (Workers)
  let content = fs.readFileSync(handlerPath, "utf8");

  // catch in getInstrumentationModule (require shim in Workers produces code=undefined)
  const patch1 = 'w.code!=="ENOENT"&&w.code!=="MODULE_NOT_FOUND"&&w.code!=="ERR_MODULE_NOT_FOUND"';
  const patched1 = 'w.code&&w.code!=="ENOENT"&&w.code!=="MODULE_NOT_FOUND"&&w.code!=="ERR_MODULE_NOT_FOUND"';
  if (content.includes(patch1)) {
    content = content.replace(patch1, patched1);
    console.log("Patched getInstrumentationModule catch (line 55)");
  } else {
    console.warn("getInstrumentationModule catch pattern not found");
  }

  // catch in loadInstrumentationModule (re-throws as "An error occurred while loading the instrumentation hook")
  const patch2 = 'ae.code!=="MODULE_NOT_FOUND"';
  const patched2 = 'ae.code&&ae.code!=="MODULE_NOT_FOUND"';
  if (content.includes(patch2)) {
    content = content.replace(patch2, patched2);
    console.log("Patched loadInstrumentationModule catch (line 8409)");
  } else {
    console.warn("loadInstrumentationModule catch pattern not found");
  }

  // Fix loadCustomCacheHandlers override: t/e variables are not defined (minification issue)
  const patch3 = 't&&(0,ke.initializeCacheHandlers)(e))for(let[m,ge]of Object.entries(t))';
  const patched3 = 'this.nextConfig.experimental&&this.nextConfig.experimental.cacheHandlers&&(0,ke.initializeCacheHandlers)(this.nextConfig.experimental))for(let[m,ge]of Object.entries(this.nextConfig.experimental.cacheHandlers))';
  if (content.includes(patch3)) {
    content = content.replace(patch3, patched3);
    console.log("Patched loadCustomCacheHandlers t/e references");
  } else {
    console.warn("loadCustomCacheHandlers t/e pattern not found");
  }

  fs.writeFileSync(handlerPath, content);
  console.log(`handler.mjs patched: ${(fs.statSync(handlerPath).size / 1024).toFixed(1)} KB`);

} else {
  console.log("handler.mjs not found, skipping extra minify");
}
