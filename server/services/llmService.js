const OpenAI = require('openai');
const axios = require('axios');

class LLMService {
  constructor() {
    this.provider = process.env.LLM_PROVIDER || 'openai';
    
    if (this.provider === 'openai') {
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    }
  }
  
  async generateResponse(userMessage, context, state, stateInfo, history = []) {
    const systemPrompt = this.buildSystemPrompt(state, stateInfo);
    const contextPrompt = this.buildContextPrompt(context);
    
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'system', content: contextPrompt },
      ...history.slice(-10), // Last 10 messages for context
      { role: 'user', content: userMessage }
    ];
    
    if (this.provider === 'openai') {
      return await this.generateOpenAI(messages);
    } else if (this.provider === 'routellm') {
      return await this.generateRouteLLM(messages);
    }
  }
  
  async generateOpenAI(messages) {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages,
        temperature: 0.7,
        max_tokens: 500
      });
      
      return response.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI error:', error);
      throw error;
    }
  }
  
  async generateRouteLLM(messages) {
    try {
      const response = await axios.post(
        `${process.env.ROUTELLM_ENDPOINT}/chat/completions`,
        {
          model: 'gpt-4-turbo-preview',
          messages,
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.ROUTELLM_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('RouteLLM error:', error);
      throw error;
    }
  }
  
  async getEmbedding(text) {
    if (this.provider === 'openai') {
      const response = await this.client.embeddings.create({
        model: 'text-embedding-3-small',
        input: text
      });
      return response.data[0].embedding;
    } else {
      // Implement RouteLLM embedding if available
      throw new Error('Embedding not implemented for this provider');
    }
  }
  
  buildSystemPrompt(state, stateInfo) {
    return `You are a knowledgeable and friendly cannabis culture assistant. You provide accurate, evidence-based information about cannabis in the United States.

Current user location: ${state}
State cannabis status: ${stateInfo.status}
${stateInfo.medical ? 'Medical cannabis is legal in this state.' : ''}
${stateInfo.recreational ? 'Recreational cannabis is legal in this state.' : ''}

Guidelines:
- Provide educational information only
- Always emphasize compliance with local laws
- Include medical disclaimers when discussing health topics
- Be respectful and non-judgmental
- Do not facilitate illegal activities or sales
- Encourage responsible use
- Cite sources when possible

Tone: Friendly, informative, and professional.`;
  }
  
  buildContextPrompt(context) {
    if (!context || context.length === 0) {
      return 'No additional context available.';
    }
    
    const contextText = context
      .map(doc => doc.content)
      .join('\n\n');
    
    return `Relevant information from knowledge base:\n${contextText}`;
  }
}

module.exports = new LLMService();