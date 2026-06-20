require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function main() {
  try {
    const version = await sql`SELECT version()`;
    console.log('Successfully connected to Neon database!');
    console.log('Database version:', version[0].version);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

main();
