"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
    },
    location: {
        type: String,
        required: [true, 'Location is required.'],
    },
    breed: {
        type: String,
        required: [true, 'Breed is required.'],
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required.'],
    },
    label: {
        type: String,
        required: [true, 'Label is required.'],
    },
    category: {
        type: String,
        required: [true, 'Category is required.'],
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Seller is required.'],
    },
});
exports.Cow = (0, mongoose_1.model)('cow', cowSchema);
