"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    cow: {
        type: mongoose_1.Types.ObjectId,
        ref: 'cow',
        required: [true, 'Cow id is required'],
    },
    buyer: {
        type: mongoose_1.Types.ObjectId,
        ref: 'user',
        required: [true, 'Buyer id is required'],
    },
});
exports.Order = (0, mongoose_1.model)('order', orderSchema);
