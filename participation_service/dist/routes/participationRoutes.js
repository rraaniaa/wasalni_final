"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// participationRoutes.ts
const express_1 = __importDefault(require("express"));
const participationController_1 = require("../controllers/participationController");
const router = express_1.default.Router();
router.get('/participations', participationController_1.getParticipations);
router.post('/participations', participationController_1.createParticipation);
router.delete('/participations/:id', participationController_1.deleteParticipation);
router.get('/participations/:id', participationController_1.getParticipationById);
exports.default = router;
