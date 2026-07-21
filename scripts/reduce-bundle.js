const fs = require("fs");
const path = require("path");

const target = path.resolve(
  __dirname,
  "..",
  ".open-next/server-functions/default/node_modules/next/dist/server/capsize-font-metrics.json"
);

if (fs.existsSync(target)) {
  const size = fs.statSync(target).size;
  fs.rmSync(target);
  console.log(`Removed capsize-font-metrics.json (${(size / 1024).toFixed(1)} KB)`);
} else {
  console.log("capsize-font-metrics.json not found, skipping");
}
