import "server-only";
import { fetchSubscriberEvents } from "@/modules/dashboard/api";

/**
 * Get all subscriber events
 * @returns Subscriber events data
 */
export async function getSubscriberEvents(dateRage: [Date, Date]): Promise<TSubscriberEvent[]> {
  const subscriberEvents = await fetchSubscriberEvents(dateRage);
  return subscriberEvents;
}
