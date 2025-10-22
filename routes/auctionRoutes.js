import express from "express";
import Database from "better-sqlite3";

const router = express.Router();
const db = new Database("./aucfi.db");

// ✅ Ensure the auctions table exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS auctions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    startingBid REAL NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// ✅ Create new auction
router.post("/create", (req, res) => {
  const { title, description, startingBid } = req.body;

  if (!title || !description || !startingBid) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const stmt = db.prepare(`
    INSERT INTO auctions (title, description, startingBid)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(title, description, startingBid);

  res.json({ success: true, auctionId: result.lastInsertRowid });
});

// ✅ Get all auctions
router.get("/", (req, res) => {
  const stmt = db.prepare("SELECT * FROM auctions ORDER BY createdAt DESC");
  const auctions = stmt.all();
  res.json(auctions);
});

// ✅ Get single auction
router.get("/:id", (req, res) => {
  const stmt = db.prepare("SELECT * FROM auctions WHERE id = ?");
  const auction = stmt.get(req.params.id);

  if (!auction) return res.status(404).json({ error: "Auction not found" });
  res.json(auction);
});

export default router;
