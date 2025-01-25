const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;
const DB_FILE = './db.json';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to read data from db.json
const readDatabase = () => {
  const data = fs.readFileSync(DB_FILE);
  return JSON.parse(data);
};

// Function to write data to db.json
const writeDatabase = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Signup API
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const db = readDatabase();

  const userExists = db.users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  db.users.push({ username, password });
  writeDatabase(db);

  res.json({ success: true, message: 'Signup successful' });
});

// Login API
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = readDatabase();

  const user = db.users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  }

  res.json({ success: true, token: 'mock-jwt-token' });
});

// API test route
app.get('/', (req, res) => {
  res.send('Backend server is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
