const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function clean() {
  try {
    console.log('Cleaning database...');
    await pool.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
    await pool.query('GRANT ALL ON SCHEMA public TO public;');
    await pool.query('GRANT ALL ON SCHEMA public TO neondb_owner;');
    console.log('Database cleaned successfully.');
    await pool.end();
  } catch (err) {
    console.error('Clean failed:', err);
    process.exit(1);
  }
}

clean();
