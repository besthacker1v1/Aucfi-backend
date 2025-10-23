import express from 'express';
const router = express.Router();

// ✅ Dummy trade database (for testing)
const trades = [];

/**
 * @route   GET /api/trade
 * @desc    Test route or fetch all trades
 */
router.get('/', (req, res) => {
  res.json({ message: 'Trade route is live ✅', trades });
});

/**
 * @route   POST /api/trade/buy
 * @desc    Simulate a buy trade
 * @body    { asset: string, amount: number, price: number }
 */
router.post('/buy', (req, res) => {
  const { asset, amount, price } = req.body;
  if (!asset || !amount || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const trade = {
    id: trades.length + 1,
    type: 'buy',
    asset,
    amount,
    price,
    timestamp: new Date().toISOString()
  };

  trades.push(trade);
  res.json({ success: true, trade });
});

/**
 * @route   POST /api/trade/sell
 * @desc    Simulate a sell trade
 * @body    { asset: string, amount: number, price: number }
 */
router.post('/sell', (req, res) => {
  const { asset, amount, price } = req.body;
  if (!asset || !amount || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const trade = {
    id: trades.length + 1,
    type: 'sell',
    asset,
    amount,
    price,
    timestamp: new Date().toISOString()
  };

  trades.push(trade);
  res.json({ success: true, trade });
});

export default router;
