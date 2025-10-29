#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const envPath = path.resolve(process.cwd(), ".env");

function ensureEnv() {
  if (fs.existsSync(envPath)) {
    console.log(".env already exists — leaving as-is");
    return;
  }

  const content = `# Auto-generated .env (created by ensure-db.js)\nDATABASE_URL="file:./dev.db"\n`;
  fs.writeFileSync(envPath, content, { encoding: "utf8", flag: "wx" });
  console.log(".env created with default SQLite DATABASE_URL");
}

try {
  ensureEnv();
  process.exit(0);
} catch (err) {
  console.error("Failed to ensure .env:", err);
  process.exit(1);
}
