# StudySync Backend Server

Express.js + Socket.io + MongoDB + Redis backend for StudySync collaborative study platform.

## 🚀 Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express.js 4.x
- **Real-time:** Socket.io 4.x
- **Database:** MongoDB (Mongoose ORM)
- **Cache:** Redis (ioredis)
- **Authentication:** JWT
- **Language:** TypeScript

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
```

## 🔧 Configuration

### Required Services

1. **MongoDB** - Running on `mongodb://localhost:27017/studysync`
2. **Redis** - Running on `redis://localhost:6379`

### Environment Variables

See `.env.example` for all available options.

## 🎯 Development

```bash
# Start development server (with hot reload)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 📡 API Endpoints

### Health Check
```
GET /health
```

### API v1
```
GET /api/v1
```

## 🔌 Socket.io Events

### Client → Server

#### Room Events
- `room:join` - Join a study room
- `room:leave` - Leave a study room
- `presence:status` - Update user status

#### Timer Events
- `timer:start` - Start Pomodoro timer
- `timer:pause` - Pause timer
- `timer:resume` - Resume timer
- `timer:skip` - Skip to next phase
- `timer:reset` - Reset timer

#### Chat Events
- `chat:send` - Send message
- `chat:react` - React to message
- `chat:delete` - Delete message
- `presence:typing` - Typing indicator

### Server → Client

#### Room Events
- `room:joined` - Room data on join
- `room:user-joined` - User joined notification
- `room:user-left` - User left notification

#### Timer Events
- `timer:sync` - Timer state sync
- `timer:phase-change` - Phase transition
- `timer:complete` - Session complete

#### Chat Events
- `chat:message` - New message
- `chat:reaction` - Message reaction update
- `chat:deleted` - Message deleted
- `chat:typing` - User typing

#### Presence Events
- `presence:update` - User status update
- `presence:online` - Online users

## 📊 Database Models

### User
- Profile information
- Study preferences
- Streak tracking
- Achievements
- Social connections

### Room
- Room configuration
- Pomodoro settings
- Timer state
- Content (notes, whiteboard)
- Statistics

### StudySession
- Session tracking
- Duration and focus time
- Mood and notes
- Achievement unlocks

### Message
- Room chat messages
- Reactions
- System messages

## 🔐 Authentication

JWT-based authentication required for Socket.io connections.

Token must be passed in handshake:
```typescript
const socket = io(SERVER_URL, {
  auth: { token: 'your-jwt-token' }
});
```

## 📝 Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── db.ts           # MongoDB connection
│   │   └── redis.ts        # Redis client & helpers
│   ├── models/
│   │   ├── User.model.ts
│   │   ├── Room.model.ts
│   │   ├── StudySession.model.ts
│   │   └── Message.model.ts
│   ├── socket/
│   │   ├── index.ts        # Socket.io initialization
│   │   ├── roomHandlers.ts
│   │   ├── timerHandlers.ts
│   │   └── chatHandlers.ts
│   ├── app.ts              # Express app
│   └── server.ts           # Server entry point
├── package.json
├── tsconfig.json
└── .env
```

## 🔒 Security Features

- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ MongoDB sanitization
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Input validation

## 🚦 Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Configurable via environment variables

## 📈 Scaling

### Redis Adapter
Socket.io uses Redis adapter for horizontal scaling across multiple server instances.

### Load Balancing
Use sticky sessions for Socket.io connections:
```nginx
upstream socket_nodes {
    ip_hash;
    server localhost:4000;
    server localhost:4001;
    server localhost:4002;
}
```

## 🧪 Testing

```bash
# Run tests (to be implemented)
pnpm test
```

## 📝 Logging

- Development: Morgan 'dev' format
- Production: Morgan 'combined' format

## 🐛 Error Handling

- Global error handler
- Unhandled promise rejection handler
- Uncaught exception handler
- Graceful shutdown on SIGTERM

## 🚀 Deployment

### Prerequisites
- MongoDB instance
- Redis instance
- Node.js 20+

### Recommended Platforms
- **Railway** - Easy deployment with MongoDB/Redis add-ons
- **Render** - Free tier available
- **Heroku** - With MongoDB Atlas & Redis Cloud
- **DigitalOcean App Platform**

### Build & Deploy
```bash
# Build TypeScript
pnpm build

# Start production server
NODE_ENV=production pnpm start
```

## 🔗 Integration with Frontend

Frontend connects to:
- **HTTP API:** `http://localhost:4000`
- **Socket.io:** `ws://localhost:4000`

Update frontend `.env.local`:
```
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

## 📊 Monitoring

Monitor these metrics in production:
- Socket.io connection count
- MongoDB query performance
- Redis memory usage
- API response times
- Error rates

## 🆘 Troubleshooting

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongosh

# Start MongoDB (macOS)
brew services start mongodb-community

# Start MongoDB (Linux)
sudo systemctl start mongod
```

### Redis Connection Failed
```bash
# Check if Redis is running
redis-cli ping

# Start Redis (macOS)
brew services start redis

# Start Redis (Linux)
sudo systemctl start redis
```

### Port Already in Use
```bash
# Find process using port 4000
lsof -i :4000

# Kill process
kill -9 <PID>
```

## 📄 License

MIT

---

**Built for StudySync - Study together. Focus deeper.** 🔥
