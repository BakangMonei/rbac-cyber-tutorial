const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/access_control_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define user roles
const roles = {
  USER: 'user',
  ADMIN: 'admin',
};

// Middleware to check if user is authenticated
// Middleware to check if user is authenticated
const authenticateUser = (req, res, next) => {
    // Implement your authentication logic here
    if (req.isAuthenticated()) {
      // Assuming you're using a method like req.isAuthenticated() to check authentication
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  

// Endpoint for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (bcrypt.compareSync(password, user.password)) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Define routes and implement RBAC as per requirement

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
