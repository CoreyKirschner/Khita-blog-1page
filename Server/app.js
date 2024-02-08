const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
});

const User = mongoose.model('User', userSchema);

// Express Middleware for JSON parsing
app.use(express.json());

// Routes (for simplicity, you may want to organize these in separate files)
app.post('/register', async (req, res) => {
  const { username, password, isAdmin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
    isAdmin: isAdmin || false,
  });

  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// Add more routes as needed for login, authorization, etc.

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
