// src/controllers/participationController.ts
import { Request, Response } from 'express';
import Participation, { ParticipationDTO, mapParticipationToDTO } from '../models/Participation';

// GET - Récupérer toutes les participations
export const getParticipations = async (req: Request, res: Response) => {
  try {
    const participations = await Participation.find().exec();
    const participationDTOs: ParticipationDTO[] = participations.map((participation: any) =>
      mapParticipationToDTO(participation)
    );
    return res.json(participationDTOs);
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
};

// POST - Créer une nouvelle participation
export const createParticipation = async (req: Request, res: Response) => {
  const { clientID, carpoolingID, etat } = req.body as ParticipationDTO;

  if (!clientID || !carpoolingID || !etat) {
    return res.status(400).json({ message: 'clientID, carpoolingID et etat sont requis' });
  }

  const newParticipation = new Participation({ clientID, carpoolingID, etat });

  try {
    const savedParticipation = await newParticipation.save();
    const participationDTO = mapParticipationToDTO(savedParticipation);
    res.status(201).json(participationDTO);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// GET - Obtenir une participation par ID
export const getParticipationById = async (req: Request, res: Response) => {
  const participationId = req.params.id;

  try {
    const participation = await Participation.findById(participationId);

    if (!participation) {
      return res.status(404).json({ message: 'Participation non trouvée' });
    }

    const participationDTO = mapParticipationToDTO(participation);
    res.status(200).json(participationDTO);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// PUT - Mettre à jour une participation par son ID
export const updateParticipation = async (req: Request, res: Response) => {
  const participationId = req.params.id;
  const { clientID, carpoolingID, etat } = req.body as ParticipationDTO;

  if (!clientID || !carpoolingID || !etat) {
    return res.status(400).json({ message: 'clientID, carpoolingID et etat sont requis' });
  }

  try {
    const updatedParticipation = await Participation.findByIdAndUpdate(
      participationId,
      { clientID, carpoolingID, etat },
      { new: true }
    );

    if (!updatedParticipation) {
      return res.status(404).json({ message: 'Participation non trouvée' });
    }

    const participationDTO = mapParticipationToDTO(updatedParticipation);
    res.status(200).json(participationDTO);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// DELETE - Supprimer une participation par son ID
export const deleteParticipation = async (req: Request, res: Response) => {
  const participationId = req.params.id;

  try {
    const deletedParticipation = await Participation.findByIdAndRemove(participationId);
    if (!deletedParticipation) {
      return res.status(404).json({ message: 'Participation non trouvée' });
    }
    const participationDTO = mapParticipationToDTO(deletedParticipation);
    res.status(204).json(participationDTO);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
