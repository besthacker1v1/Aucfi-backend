import express from 'express';
const router = express.Router();

// In-memory user storage (temporary, for testing)
const users = [];

// ✅ Register user
router.post('/register', (req, res) => {
  const { username, role, password } = req.body;
  if (!username || !role || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  users.push({ username, role, password });
  res.status(201).json({ message: 'User registered successfully', user: { username, role } });
});

// ✅ Login user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful', user: { username: user.username, role: user.role } });
});

// ✅ Get all users (for testing)
router.get('/users', (req, res) => {
  res.json(users);
});

export default router;
