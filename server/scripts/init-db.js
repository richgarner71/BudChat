const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function initDatabase() {
  try {
    console.log('Initializing database...');
    
    // Enable pgvector extension
    await pool.query('CREATE EXTENSION IF NOT EXISTS vector');
    console.log('✓ pgvector extension enabled');
    
    // Create knowledge_base table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS knowledge_base (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        metadata JSONB,
        embedding vector(1536),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ knowledge_base table created');
    
    // Create index for vector similarity search
    await pool.query(`
      CREATE INDEX IF NOT EXISTS knowledge_base_embedding_idx 
      ON knowledge_base 
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100)
    `);
    console.log('✓ Vector similarity index created');
    
    // Create sessions table (optional, for persistent sessions)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id VARCHAR(255) PRIMARY KEY,
        state VARCHAR(2),
        age INTEGER,
        state_info JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ chat_sessions table created');
    
    // Create messages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255) REFERENCES chat_sessions(id),
        role VARCHAR(20) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ chat_messages table created');
    
    console.log('\n✅ Database initialization complete!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDatabase();