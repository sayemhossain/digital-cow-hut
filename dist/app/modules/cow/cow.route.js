"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const cow_controller_1 = require("./cow.controller");
const cow_validation_1 = require("./cow.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.validateRequest)(cow_validation_1.createCowZodSchema), cow_controller_1.createCow);
router.get('/:id', cow_controller_1.getSingleCow);
router.get('/', cow_controller_1.getAllCow);
router.patch('/:id', (0, validateRequest_1.validateRequest)(cow_validation_1.updateCowZodSchema), cow_controller_1.updateCow);
router.delete('/:id', cow_controller_1.deleteCow);
exports.CowsRoutes = router;
