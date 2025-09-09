import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  message: z.string().min(1).max(5000),
  website: z.string().optional().default(''), // honeypot
});

export type ContactInput = z.infer<typeof ContactSchema>;
