// src/controllers/participationController.ts
import { Request, Response } from 'express';
import Participation, { ParticipationDTO, mapParticipationToDTO } from '../models/Participation';

7
// GET - Récupérer toutes les participations
export const getParticipations = async (req: Request, res: Response) => {
  try {
    const participations = await Participation.find().exec();
    const participationDTOs: ParticipationDTO[] = participations.map((participation: any) =>
      mapParticipationToDTO(participation)
    );
    return res.json(participationDTOs);
  } catch (err) {
    return  res.status(500).json({ message: (err as Error).message });
  }
};

// POST - Créer une nouvelle participation
export const createParticipation = async (req: Request, res: Response) => {
  const { clientID, nbr_place, luggage } = req.body as ParticipationDTO;

  if (!clientID || !nbr_place || !luggage) {
    return res.status(400).json({ message: 'clientID, nbr_place et luggage sont requis' });
  }

  const newParticipation = new Participation({ clientID, nbr_place, luggage });

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
  const participationId = req.params.id; // L'ID de la participation à récupérer

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
