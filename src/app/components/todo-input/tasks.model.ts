import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1),
  completed: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.string().default(''),
  dueDate: z.union([z.date(), z.null()]),
  createdAt: z.date(),
  tags: z.array(z.string())
});

export type Todo = z.infer<typeof TodoSchema>;

export const TodoFormInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  priority: z.enum(['low', 'medium', 'high'], { message: 'Priority is required' }),
  category: z.string().optional(),
  dueDate: z.string().optional()
});

export type TodoFormInput = z.infer<typeof TodoFormInputSchema>;
