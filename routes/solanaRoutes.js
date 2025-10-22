import express from 'express';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

const router = express.Router();

// Connect to Solana mainnet
const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

// Route: Get Solana wallet balance
router.get('/balance/:address', async (req, res) => {
  try {
    const publicKey = new PublicKey(req.params.address);
    const balance = await connection.getBalance(publicKey);
    res.json({
      address: req.params.address,
      balance: balance / 1e9, // Convert lamports to SOL
    });
  } catch (error) {
    console.error('Solana Balance Error:', error);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
});

export default router;
