import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sqlite3 from 'better-sqlite3';
import authRoutes from './routes/authRoutes.js';
import auctionRoutes from './routes/auctionRoutes.js';
import solanaRoutes from './routes/solanaRoutes.js'; // ✅ Solana route added
import tradeRoutes from './routes/trade.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ SQLite Database Connection
const db = new sqlite3('./aucfi.db');
console.log('✅ SQLite database connected');

// ✅ Attach DB to all requests
app.use((req, res, next) => {
  req.db = db;
  next();
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/solana', solanaRoutes); // ✅ Solana route active
app.use('/api/trade', tradeRoutes);


// Root route
app.get('/', (req, res) => {
  res.send('🚀 AUC-FI Backend with Solana Integration Running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
