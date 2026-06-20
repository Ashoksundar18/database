require('dotenv').config();
const express = require('express');
const { neon } = require('@neondatabase/serverless');

const app = express();
const port = process.env.PORT || 3000;

// Connect to Neon
const sql = neon(process.env.DATABASE_URL);

app.get('/', async (req, res) => {
  try {
    // Query the database to test the connection
    const result = await sql`SELECT version()`;
    const dbVersion = result[0].version;

    res.send(`
      <div style="font-family: sans-serif; padding: 2rem; text-align: center;">
        <h1 style="color: #00e599;">Neon Database Connected Successfully! 🎉</h1>
        <p><strong>Database Version:</strong> ${dbVersion}</p>
        <p>This is a live web application connected to your Neon Serverless Postgres Database.</p>
      </div>
    `);
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).send(`
      <div style="font-family: sans-serif; padding: 2rem; color: red;">
        <h1>Error Connecting to Database</h1>
        <p>${error.message}</p>
      </div>
    `);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
