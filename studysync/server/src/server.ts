import dotenv from 'dotenv';
dotenv.config();

import { createServer } from 'http';
import app from './app';
import { connectDB } from './config/db';
import { connectRedis } from './config/redis';
import { initializeSocket } from './socket';

const PORT = process.env.PORT || 4000;

// Create HTTP server
const httpServer = createServer(app);

// Initialize Socket.io
const io = initializeSocket(httpServer);

// Connect to databases
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Connect to Redis (optional, will warn if fails)
    try {
      connectRedis();
    } catch (error) {
      console.warn('⚠️  Starting without Redis. Some features may be limited.');
    }

    // Start server
    httpServer.listen(PORT, () => {
      console.log('\n🚀 ═══════════════════════════════════════════════════════');
      console.log(`   StudySync Server Running`);
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`   HTTP Server: http://localhost:${PORT}`);
      console.log(`   Socket.io: ws://localhost:${PORT}`);
      console.log(`   Health Check: http://localhost:${PORT}/health`);
      console.log('═══════════════════════════════════════════════════════\n');
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  // Close server & exit
  httpServer.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('❌ Uncaught Exception:', err);
  // Close server & exit
  httpServer.close(() => process.exit(1));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n⚠️  SIGTERM received. Shutting down gracefully...');
  httpServer.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Start the server
startServer();
