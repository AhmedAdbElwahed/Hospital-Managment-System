import { z } from 'zod';

export const loginFromSchema = z.object({
    email: z.string().email("Provide a proper email"),
    password: z.string().min(3, "password is not sufficient")
});