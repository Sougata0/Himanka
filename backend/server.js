// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Serve static files from root folder (where index.html is)
app.use(express.static(path.join(__dirname, '..')));

// 👉 Signup Route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(query, [email, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send('User already exists');
      }
      return res.status(500).send('Signup failed');
    }
    res.send('Signup successful');
  });
});

// 👉 Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).send('Login failed');

    if (results.length > 0) {
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// 🚀 Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Login error:", err);
      res.status(500).send("Server error");
    } else if (result.length > 0) {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});
