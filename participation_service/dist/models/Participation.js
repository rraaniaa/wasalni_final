"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapParticipationToDTO = void 0;
// src/models/Participation.ts
const mongoose_1 = __importDefault(require("mongoose"));
const participationSchema = new mongoose_1.default.Schema({
    clientID: { type: Number, required: true },
    nbr_place: { type: Number, required: true },
    luggage: { type: Number, required: true },
});
const Participation = mongoose_1.default.model('Participation', participationSchema);
const mapParticipationToDTO = (participation) => {
    return {
        clientID: participation.clientID,
        nbr_place: participation.nbr_place,
        luggage: participation.luggage,
    };
};
exports.mapParticipationToDTO = mapParticipationToDTO;
exports.default = Participation;
