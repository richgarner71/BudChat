const express = require('express');
const router = express.Router();
const ragService = require('../services/ragService');
const llmService = require('../services/llmService');
const complianceService = require('../services/complianceService');

// Store sessions in memory (use Redis in production)
const sessions = new Map();

// Verify age
router.post('/verify-age', (req, res) => {
  const { age, state } = req.body;
  
  if (!age || !state) {
    return res.status(400).json({ error: 'Age and state are required' });
  }
  
  const isLegal = complianceService.checkAge(age);
  const stateInfo = complianceService.getStateInfo(state);
  
  if (!isLegal) {
    return res.json({ 
      verified: false, 
      message: 'You must be 21 or older to use this service.' 
    });
  }
  
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessions.set(sessionId, {
    age,
    state,
    stateInfo,
    messages: [],
    createdAt: new Date()
  });
  
  res.json({ 
    verified: true, 
    sessionId,
    stateInfo 
  });
});

// Send message
router.post('/message', async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    
    if (!sessionId || !sessions.has(sessionId)) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const session = sessions.get(sessionId);
    
    // Check for compliance violations
    const complianceCheck = complianceService.checkMessage(message);
    if (!complianceCheck.allowed) {
      return res.json({
        response: complianceCheck.message,
        compliance: false
      });
    }
    
    // Retrieve relevant context using RAG
    const context = await ragService.retrieveContext(message, session.state);
    
    // Generate response using LLM
    const response = await llmService.generateResponse(
      message,
      context,
      session.state,
      session.stateInfo,
      session.messages
    );
    
    // Store in session history
    session.messages.push(
      { role: 'user', content: message, timestamp: new Date() },
      { role: 'assistant', content: response, timestamp: new Date() }
    );
    
    res.json({ response, compliance: true });
    
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get session history
router.get('/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  
  if (!sessions.has(sessionId)) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  const session = sessions.get(sessionId);
  res.json({
    messages: session.messages,
    state: session.state,
    stateInfo: session.stateInfo
  });
});

module.exports = router;