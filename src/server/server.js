// server.js
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();

// Example database
const users = [
  { id: 1, username: 'admin', passwordHash: '$2b$10$apPGr0OwGrC8w2q4zksq6ucVVNoNz6E1DlqvtcVLXyDzLm8oO7mzG', role: 'admin' },
  { id: 2, username: 'user', passwordHash: '$2b$10$apPGr0OwGrC8w2q4zksq6ucVVNoNz6E1DlqvtcVLXyDzLm8oO7mzG', role: 'user' }
];

app.use(bodyParser.json());

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    if (await bcrypt.compare(password, user.passwordHash)) {
      res.json({ message: 'Login successful', role: user.role });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
