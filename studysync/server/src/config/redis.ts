import Redis from 'ioredis';

let redisClient: Redis | null = null;

export const connectRedis = (): Redis => {
  if (redisClient) {
    return redisClient;
  }

  try {
    redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    redisClient.on('connect', () => {
      console.log('✅ Redis Connected');
    });

    redisClient.on('error', (err) => {
      console.error('❌ Redis Client Error:', err);
    });

    redisClient.on('close', () => {
      console.log('⚠️  Redis connection closed');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      if (redisClient) {
        await redisClient.quit();
        console.log('Redis connection closed through app termination');
      }
    });

    return redisClient;
  } catch (error) {
    console.error('❌ Error connecting to Redis:', error);
    throw error;
  }
};

export const getRedisClient = (): Redis => {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call connectRedis() first.');
  }
  return redisClient;
};

// Helper functions for common Redis operations
export const setRoomState = async (roomId: string, state: any): Promise<void> => {
  const redis = getRedisClient();
  await redis.set(`room:${roomId}:state`, JSON.stringify(state), 'EX', 3600); // 1 hour TTL
};

export const getRoomState = async (roomId: string): Promise<any | null> => {
  const redis = getRedisClient();
  const data = await redis.get(`room:${roomId}:state`);
  return data ? JSON.parse(data) : null;
};

export const setUserPresence = async (userId: string, roomId: string): Promise<void> => {
  const redis = getRedisClient();
  await redis.set(`user:${userId}:presence`, roomId, 'EX', 30); // 30 seconds TTL
};

export const getUserPresence = async (userId: string): Promise<string | null> => {
  const redis = getRedisClient();
  return redis.get(`user:${userId}:presence`);
};

export const addRoomParticipant = async (roomId: string, userId: string): Promise<void> => {
  const redis = getRedisClient();
  await redis.sadd(`room:${roomId}:participants`, userId);
};

export const removeRoomParticipant = async (roomId: string, userId: string): Promise<void> => {
  const redis = getRedisClient();
  await redis.srem(`room:${roomId}:participants`, userId);
};

export const getRoomParticipants = async (roomId: string): Promise<string[]> => {
  const redis = getRedisClient();
  return redis.smembers(`room:${roomId}:participants`);
};
