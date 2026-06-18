import { Router } from 'express';
import { 
  getAllRooms, 
  getRoomById, 
  createRoom, 
  updateRoom, 
  deleteRoom,
  joinRoom,
  leaveRoom,
} from '../controllers/room.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', getAllRooms);
router.get('/:roomId', getRoomById);

// Protected routes (require authentication)
router.use(authenticate); // All routes below require auth

router.post('/', createRoom);
router.patch('/:roomId', updateRoom);
router.delete('/:roomId', deleteRoom);
router.post('/:roomId/join', joinRoom);
router.post('/:roomId/leave', leaveRoom);

export default router;
