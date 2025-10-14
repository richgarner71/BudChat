# Cannabis Culture Chatbot

A 508-compliant, responsive web widget chatbot focused on cannabis culture and services in the United States.

## Features

- 🌿 Cannabis-specific knowledge base with RAG (Retrieval Augmented Generation)
- 🔒 Age verification and state-specific compliance
- ♿ 508 compliant and fully accessible
- 📱 Responsive design for all devices
- 🎨 Customizable widget appearance
- 🔐 Secure backend with rate limiting

## Tech Stack

**Backend:**
- Node.js + Express
- PostgreSQL with pgvector for RAG
- OpenAI or RouteLLM for LLM integration

**Frontend:**
- React
- Accessible UI components
- CSS with WCAG 2.1 AA compliance

## Setup

### Prerequisites

- Node.js 16+
- PostgreSQL 14+ with pgvector extension
- OpenAI API key or RouteLLM API key

## Installation

**1. Clone the repository**

git clone <your-repo-url>
cd cannabis-chatbot

**2. Install backend dependencies**

npm install

**3. Install frontend dependencies**

cd client
npm install
cd ..

**4. Configure environment variables**

cp .env.example .env
(Edit .env with your configuration)

**5. Initialize database**

npm run init-db

**6. Seed knowledge base**

npm run seed

**7. Running the Application**

Development mode:

_Terminal 1 (Backend):_
npm run dev

_Terminal 2 (Frontend):_
cd client
npm start

Production mode:

**8. Build the frontend:**

cd client
npm run build

**9. Serve both:**
npm start

**10. Embedding the Widget**

Add this script to your HTML:
'''html
<script src="https://your-domain.com/embed.js"></script>
<script>
  CannabisChat.init({
    apiUrl: 'https://your-api-domain.com',
    position: 'bottom-right',
    primaryColor: '#10b981'
  });
</script>
'''

##API Endpoints

_Chat_
POST /api/chat/message - Send a message
POST /api/chat/verify-age - Verify user age
GET /api/chat/session/:sessionId - Get session history

_Knowledge_
GET /api/knowledge/state/:state - Get state-specific info
GET /api/knowledge/products - Get product information
GET /api/knowledge/search?q=query - Search knowledge base

##Compliance

This chatbot is designed for educational purposes and includes:

Age verification (21+)
State-specific legal information
Medical disclaimers
No direct sales or transactions
Accessibility
WCAG 2.1 AA compliant
Keyboard navigation support
Screen reader compatible
High contrast mode
Adjustable text sizes
License
MIT

**Disclaimer**

This chatbot provides educational information only. Always consult with healthcare professionals and comply with local laws.





