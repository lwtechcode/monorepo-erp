import { z } from 'zod';

export const unitOfMeasurementSchema = z.object({
  name: z.string().min(1).max(255),
  abbreviation: z.string().min(1),
  active: z.boolean().optional().nullable(),
});
