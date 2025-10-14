const { Pool } = require('pg');
const pgvector = require('pgvector/pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

class RAGService {
  async retrieveContext(query, state = null, limit = 5) {
    try {
      // Get query embedding (you'll need to implement this with your LLM provider)
      const queryEmbedding = await this.getEmbedding(query);
      
      // Search for similar documents
      let sql = `
        SELECT 
          content,
          metadata,
          1 - (embedding <=> $1) as similarity
        FROM knowledge_base
        WHERE 1=1
      `;
      
      const params = [pgvector.toSql(queryEmbedding)];
      
      if (state) {
        sql += ` AND (metadata->>'state' = $2 OR metadata->>'state' IS NULL)`;
        params.push(state);
      }
      
      sql += `
        ORDER BY embedding <=> $1
        LIMIT $${params.length + 1}
      `;
      params.push(limit);
      
      const result = await pool.query(sql, params);
      
      return result.rows.map(row => ({
        content: row.content,
        metadata: row.metadata,
        similarity: row.similarity
      }));
      
    } catch (error) {
      console.error('RAG retrieval error:', error);
      return [];
    }
  }
  
  async getEmbedding(text) {
    // Implement embedding generation using OpenAI or RouteLLM
    // This is a placeholder - you'll need to implement based on your LLM provider
    const llmService = require('./llmService');
    return await llmService.getEmbedding(text);
  }
  
  async addDocument(content, metadata = {}) {
    try {
      const embedding = await this.getEmbedding(content);
      
      await pool.query(
        `INSERT INTO knowledge_base (content, metadata, embedding) 
         VALUES ($1, $2, $3)`,
        [content, JSON.stringify(metadata), pgvector.toSql(embedding)]
      );
      
      return true;
    } catch (error) {
      console.error('Error adding document:', error);
      return false;
    }
  }
}

module.exports = new RAGService();