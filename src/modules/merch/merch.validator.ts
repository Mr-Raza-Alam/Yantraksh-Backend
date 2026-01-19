import { z } from "zod";

export const createMerchSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    description: z.string().optional(),
    price: z.number().positive(),
    sizes: z.array(z.string()).optional(), // Changed to generic string array or keep enum if strict
    stock: z.number().int().nonnegative(),
    image: z.string().url().optional()
  })
});


export const updateMerchSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    sizes: z.array(z.string()).optional(),
    stock: z.number().int().nonnegative().optional(),
    image: z.string().url().optional(),
  })
});
