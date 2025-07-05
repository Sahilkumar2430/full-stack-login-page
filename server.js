const express = require('express');
const mongoose = require('./db');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Schema & Model
const ApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

const Application = mongoose.model('Application', ApplicationSchema);

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// API endpoint to handle form submission
app.post('/api/apply', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const newApp = new Application({ name, email, phone });
    await newApp.save();
    res.json({ message: 'Application submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving application.' });
  }
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
