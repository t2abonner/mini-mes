import type { Response } from 'express';

/**
 * Отправляет ошибку в едином формате документа 6, §8.5
 * (копирует §15.3 спецификации MES-MF):
 * { timestamp, errorCode, message }.
 *
 * Все эндпоинты мок-сервера используют эту функцию, чтобы клиент
 * получал предсказуемую структуру ошибки.
 */
export const sendApiError = (
  res: Response,
  status: number,
  errorCode: string,
  message: string,
): void => {
  res.status(status).json({
    timestamp: new Date().toISOString(),
    errorCode,
    message,
  });
};
