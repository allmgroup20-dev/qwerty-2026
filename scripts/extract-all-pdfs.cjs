const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");
const pdfParse = require("pdf-parse");

const PDFS = [
  { path: "C:\\Users\\Jobayer\\Downloads\\Start With Why - Simon Sinek.pdf", name: "start-with-why" },
  { path: "C:\\Users\\Jobayer\\Downloads\\Charles-Duhigg.The-Power-of-Habit.pdf", name: "power-of-habit" },
  { path: "C:\\Users\\Jobayer\\Downloads\\Grit_ The Power of Passion and Perseverance ( PDFDrive.com ) Pages 1-50 - Flip PDF Download _ FlipHTML5.pdf", name: "grit" },
  { path: "C:\\Users\\Jobayer\\Downloads\\31-10-2020-083612How to Win Friends and Influence People - Dale Carnegie.pdf", name: "how-to-win-friends" },
  { path: "C:\\Users\\Jobayer\\Downloads\\E001005.pdf", name: "e001005" },
  { path: "C:\\Users\\Jobayer\\Downloads\\emotional-intelligence-daniel-goleman.pdf", name: "emotional-intelligence" },
  { path: "C:\\Users\\Jobayer\\Downloads\\predictable.pdf", name: "predictable" },
  { path: "C:\\Users\\Jobayer\\Downloads\\To Sell Is Human_ The Surprisin - Daniel H. Pink.pdf", name: "to-sell-is-human" },
  { path: "C:\\Users\\Jobayer\\Downloads\\The Culture Map (INTL ED)_ Deco - Erin Meyer.pdf", name: "culture-map" },
  { path: "C:\\Users\\Jobayer\\Downloads\\drive.pdf", name: "drive" },
];

const OUT_DIR = resolve(__dirname, "..", "extracted-texts");

async function main() {
  const fs = require("fs");
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const pdf of PDFS) {
    const outPath = resolve(OUT_DIR, pdf.name + ".txt");
    try {
      process.stdout.write(`[${pdf.name}] Reading PDF... `);
      const buf = readFileSync(pdf.path);
      console.log(`(${(buf.length / 1024 / 1024).toFixed(1)} MB)`);
      console.log(`[${pdf.name}] Parsing...`);
      const data = await pdfParse(buf);
      writeFileSync(outPath, data.text, "utf-8");
      console.log(`[${pdf.name}] Done — ${(data.text.length / 1024).toFixed(0)} KB`);
    } catch (e) {
      console.error(`[${pdf.name}] FAILED: ${e.message}`);
    }
  }
  console.log("\nAll done.");
}

main();
