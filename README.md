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

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd cannabis-chatbot