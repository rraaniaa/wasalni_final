// participationRoutes.ts
import express from 'express';
import {
  getParticipations,
  createParticipation,
  deleteParticipation,
  getParticipationById,
} from '../controllers/participationController';

const router = express.Router();

router.get('/participations', getParticipations);
router.post('/participations', createParticipation);
router.delete('/participations/:id', deleteParticipation);
router.get('/participations/:id', getParticipationById);


export default router;