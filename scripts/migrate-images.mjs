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

const rows = parseCSV(await fs.readFile("./menu.csv", "utf8"));
const header = rows[0];
const urlCol = header.indexOf("image_url");
const out = [header];
const failed = [];

for (let i = 1; i < rows.length; i++) {
const row = rows[i];
const url = (row[urlCol] || "").trim();
if (!url) { out.push(row); continue; }

const ext = path.extname(new URL(url).pathname) || ".jpg";
const name = `item-${String(i + 1).padStart(3, "0")}${ext}`;
try {
    const res = await fetch(url);
    const type = res.headers.get("content-type") || "";
    if (!res.ok || !type.startsWith("image/")) throw new Error(`${res.status} ${type}`);
    await fs.writeFile(path.join(outDir, name), Buffer.from(await res.arrayBuffer()));
    row[urlCol] = `/images/menu/${name}`;
    console.log("✅ صف", i + 1, name);
} catch (e) {
    failed.push({ row: i + 1, url, err: e.message });
    console.log("❌ صف", i + 1, e.message);
}
out.push(row);
}

await fs.writeFile("./menu.new.csv", out.map(r => r.map(esc).join(",")).join("\n"));
console.log(`\nانتهى. فشل ${failed.length} صورة.`);
if (failed.length) console.table(failed);