# Backend Setup Instructions

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database
MONGO_URL=mongodb://localhost:27017/chat-gpt-project

# JWT Secret
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

# Pinecone API Key (for vector database)
PINECONE_API_KEY=your-pinecone-api-key

# Google AI API Key (for Gemini)
GOOGLE_API_KEY=your-google-api-key
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/chat` - Create a new chat
- `GET /api/chat` - Get all chats for user
- `GET /api/chat/messages/:id` - Get messages for a chat
- `POST /api/chat/messages/:id` - Create a new message

## Socket Events

- `ai-message` - Send message to AI for processing
- `ai-response` - Receive AI response
- `error` - Socket error events
