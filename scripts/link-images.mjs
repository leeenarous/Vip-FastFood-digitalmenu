import fs from "node:fs/promises";

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

const dir = "./public/images/menu";
const files = await fs.readdir(dir);

const rows = parseCSV(await fs.readFile("./menu.new.csv", "utf8"));
const urlCol = rows[0].indexOf("image_url");

// الصفوف اللي بدنا نربطها يدوياً
const targets = [57, 60, 61, 63, 64, 65];

for (const n of targets) {
  const prefix = `item-${String(n).padStart(3, "0")}.`;
  const file = files.find((f) => f.toLowerCase().startsWith(prefix));
  if (file) {
    rows[n - 1][urlCol] = `/images/menu/${file}`;
    console.log("✅ صف", n, file);
  } else {
    console.log("❌ صف", n, "ما لقيت الصورة", prefix + "*");
  }
}

await fs.writeFile("./menu.new.csv", rows.map((r) => r.map(esc).join(",")).join("\n"));
console.log("\nتم تحديث menu.new.csv");