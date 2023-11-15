"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteParticipation = exports.getParticipationById = exports.createParticipation = exports.getParticipations = void 0;
const Participation_1 = __importStar(require("../models/Participation"));
7;
// GET - Récupérer toutes les participations
const getParticipations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const participations = yield Participation_1.default.find().exec();
        const participationDTOs = participations.map((participation) => (0, Participation_1.mapParticipationToDTO)(participation));
        return res.json(participationDTOs);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.getParticipations = getParticipations;
// POST - Créer une nouvelle participation
const createParticipation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientID, nbr_place, luggage } = req.body;
    if (!clientID || !nbr_place || !luggage) {
        return res.status(400).json({ message: 'clientID, nbr_place et luggage sont requis' });
    }
    const newParticipation = new Participation_1.default({ clientID, nbr_place, luggage });
    try {
        const savedParticipation = yield newParticipation.save();
        const participationDTO = (0, Participation_1.mapParticipationToDTO)(savedParticipation);
        res.status(201).json(participationDTO);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.createParticipation = createParticipation;
// GET - Obtenir une participation par ID
const getParticipationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const participationId = req.params.id; // L'ID de la participation à récupérer
    try {
        const participation = yield Participation_1.default.findById(participationId);
        if (!participation) {
            return res.status(404).json({ message: 'Participation non trouvée' });
        }
        const participationDTO = (0, Participation_1.mapParticipationToDTO)(participation);
        res.status(200).json(participationDTO);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getParticipationById = getParticipationById;
// DELETE - Supprimer une participation par son ID
const deleteParticipation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const participationId = req.params.id;
    try {
        const deletedParticipation = yield Participation_1.default.findByIdAndRemove(participationId);
        if (!deletedParticipation) {
            return res.status(404).json({ message: 'Participation non trouvée' });
        }
        const participationDTO = (0, Participation_1.mapParticipationToDTO)(deletedParticipation);
        res.status(204).json(participationDTO);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteParticipation = deleteParticipation;
