"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: [true, 'First name is required.'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required.'],
        },
    },
    role: {
        type: String,
        enum: ['seller', 'buyer'],
        required: [true, 'Role is required.'],
    },
    // email: {
    //   type: String,
    //   unique: true,
    //   required: [true, 'Email is required.'],
    // },
    password: {
        type: String,
        required: [true, 'Password is required.'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required.'],
        unique: true,
    },
    address: {
        type: String,
        required: [true, 'Address is required.'],
    },
    budget: {
        type: Number,
        required: [true, 'Budget is required.'],
    },
    income: {
        type: Number,
        default: 0,
        required: [true, 'Income is required.'],
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('user', userSchema);
