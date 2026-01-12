import { z } from "zod";

export const createMerchSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    price: z.number().positive(),
    sizes: z.array(z.enum(["S", "M", "L", "XL"])),
    stock: z.number().int().nonnegative(),
    imageUrl: z.string().url()
  })
});


export const updateMerchSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    price: z.number().positive().optional(),
    sizes: z.array(z.enum(["S", "M", "L", "XL"])).optional(),
    stock: z.number().int().nonnegative().optional(),
    imageUrl: z.string().url().optional(),
    isActive: z.boolean().optional()
  })
});
