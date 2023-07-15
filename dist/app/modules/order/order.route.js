"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.validateRequest)(order_validation_1.createOrderZodSchema), order_controller_1.createOrder);
router.get('/', order_controller_1.getAllOrder);
exports.OrderRoutes = router;
