// src/models/Participation.ts
import mongoose from 'mongoose';

export interface ParticipationDTO {
  clientID: Number;
  nbr_place: number;
  luggage: number;
}

const participationSchema = new mongoose.Schema({
  clientID: { type: Number, required: true },
  nbr_place: { type: Number, required: true },
  luggage: { type: Number, required: true },
});

const Participation = mongoose.model('Participation', participationSchema);

export const mapParticipationToDTO = (participation: any): ParticipationDTO => {
  return {
    clientID: participation.clientID,
    nbr_place: participation.nbr_place,
    luggage: participation.luggage,
  };
};

export default Participation;
