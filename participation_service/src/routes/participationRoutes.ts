// participationRoutes.ts
import express from 'express';
import {
  getParticipations,
  createParticipation,
  deleteParticipation,
  getParticipationById,
} from '../controllers/participationController';

const router = express.Router();

router.get('/driver/participations', getParticipations);
router.post('/driver/participations', createParticipation);
router.delete('/driver/participations/:id', deleteParticipation);
router.get('/driver/participations/:id', getParticipationById);

export default router;
