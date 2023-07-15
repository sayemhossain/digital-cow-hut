"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
exports.createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required.',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required.',
            }),
        }),
        role: zod_1.z.string({
            required_error: 'Role is required.',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required.',
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required.',
        }),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number({
            required_error: 'Budget is required.',
        }),
        income: zod_1.z.number({
            required_error: 'Income is required.',
        }),
    }),
});
exports.updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z
                .string({
                required_error: 'First name is required.',
            })
                .optional(),
            lastName: zod_1.z
                .string({
                required_error: 'Last name is required.',
            })
                .optional(),
        })
            .optional(),
        role: zod_1.z
            .string({
            required_error: 'Role is required.',
        })
            .optional(),
        password: zod_1.z
            .string({
            required_error: 'Password is required.',
        })
            .optional(),
        phoneNumber: zod_1.z
            .string({
            required_error: 'Phone number is required.',
        })
            .optional(),
        address: zod_1.z.string().optional(),
        budget: zod_1.z
            .number({
            required_error: 'Budget is required.',
        })
            .optional(),
        income: zod_1.z
            .number({
            required_error: 'Income is required.',
        })
            .optional(),
    }),
});
