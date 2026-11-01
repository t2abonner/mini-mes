/**
 * Единый конверт для всех Real-time событий (документ 6, §14.2).
 * Клиент всегда знает, что в payload лежат специфичные данные,
 * а метаданные (eventId, occurredAt) приходят в едином формате.
 */
export interface RealtimeEvent<T> {
  eventId: string;
  eventType: string;
  occurredAt: string;
  payload: T;
}
