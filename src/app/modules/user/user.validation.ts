import { z } from 'zod';

export const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required.',
      }),
      lastName: z.string({
        required_error: 'Last name is required.',
      }),
    }),
    role: z.string({
      required_error: 'Role is required.',
    }),
    password: z.string({
      required_error: 'Password is required.',
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required.',
    }),
    address: z.string().optional(),
    budget: z.number({
      required_error: 'Budget is required.',
    }),
    income: z.number({
      required_error: 'Income is required.',
    }),
  }),
});

export const updateUserZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First name is required.',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last name is required.',
          })
          .optional(),
      })
      .optional(),
    role: z
      .string({
        required_error: 'Role is required.',
      })
      .optional(),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .optional(),
    phoneNumber: z
      .string({
        required_error: 'Phone number is required.',
      })
      .optional(),
    address: z.string().optional(),
    budget: z
      .number({
        required_error: 'Budget is required.',
      })
      .optional(),
    income: z
      .number({
        required_error: 'Income is required.',
      })
      .optional(),
  }),
});
