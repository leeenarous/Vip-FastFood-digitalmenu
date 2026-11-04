import fs from "node:fs/promises";
import path from "node:path";

const outDir = "./public/images/menu";
await fs.mkdir(outDir, { recursive: true });

function parseCSV(text) {
const rows = [];
let row = [], cell = "", q = false;
for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
    if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
    else if (c === '"') q = false;
    else cell += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (c !== "\r") cell += c;
}
if (cell || row.length) { row.push(cell); rows.push(row); }
return rows;
}

const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const rows = parseCSV(await fs.readFile("./menu.new.csv", "utf8"));
const urlCol = rows[0].indexOf("image_url");
const done = new Map(); 
let failed = 0;

for (let i = 1; i < rows.length; i++) {
const row = rows[i];
const url = (row[urlCol] || "").trim();
if (!url.startsWith("http")) continue; 

if (done.has(url)) { row[urlCol] = done.get(url); continue; }

const ext = path.extname(new URL(url).pathname) || ".jpg";
const name = `item-${String(i + 1).padStart(3, "0")}${ext}`;
let ok = false;

for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
    try {
    const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
    const type = res.headers.get("content-type") || "";
    if (!res.ok || !type.startsWith("image/")) throw new Error(`${res.status}`);
    await fs.writeFile(path.join(outDir, name), Buffer.from(await res.arrayBuffer()));
    row[urlCol] = `/images/menu/${name}`;
    done.set(url, row[urlCol]);
    console.log("✅ صف", i + 1, name);
    ok = true;
    } catch (e) {
    console.log(`⏳ صف ${i + 1} محاولة ${attempt} فشلت (${e.message})`);
      await sleep(3000 * attempt);
    }
}
if (!ok) { failed++; console.log("❌ صف", i + 1, "استسلمنا"); }
}

await fs.writeFile("./menu.new.csv", rows.map((r) => r.map(esc).join(",")).join("\n"));
console.log(`\nانتهى. لسا فاشلة: ${failed}`);