const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Configuration PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Route /api
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello from Backend!',
    timestamp: new Date().toISOString(),
    success: true
  });
});

// Route /db
app.get('/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json({
      message: 'Data from Database',
      data: result.rows,
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: 'Database error',
      error: error.message,
      success: false
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
