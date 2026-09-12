import { z } from 'zod';

/**
 * Формат успешного списка (документ 6, §13.1; копирует §15.2
 * спецификации MES-MF): { items, page, pageSize, totalItems }.
 * Фабрика принимает схему элемента и возвращает схему страницы.
 */
export function paginatedListSchema<Item extends z.ZodType>(itemSchema: Item) {
  return z.object({
    items: z.array(itemSchema),
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
    totalItems: z.number().int().nonnegative(),
  });
}

/**
 * Формат ошибки (документ 6, §8.5):
 * { timestamp, errorCode, message }.
 */
export const apiErrorSchema = z.object({
  timestamp: z.iso.datetime(),
  errorCode: z.string().min(1),
  message: z.string().min(1),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
