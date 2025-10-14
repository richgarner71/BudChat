const express = require('express');
const router = express.Router();
const knowledgeService = require('../services/knowledgeService');
const ragService = require('../services/ragService');

// Get state-specific information
router.get('/state/:state', (req, res) => {
  const { state } = req.params;
  const stateInfo = knowledgeService.getStateInfo(state);
  
  if (!stateInfo) {
    return res.status(404).json({ error: 'State not found' });
  }
  
  res.json(stateInfo);
});

// Get product information
router.get('/products', (req, res) => {
  const products = knowledgeService.getProductInfo();
  res.json(products);
});

// Search knowledge base
router.get('/search', async (req, res) => {
  try {
    const { q, state } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    
    const results = await ragService.retrieveContext(q, state);
    res.json({ results });
    
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;