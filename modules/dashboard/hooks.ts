"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchSubscriberEvents } from "./api";

type TUseQueryOptions<TAggregator> = Omit<
  UseQueryOptions<TSubscriberEvent[], Error, TAggregator[]>,
  "enabled" | "queryKey" | "queryFn"
>;

export function useGetSubscriberEvents<TAggregator>(
  dateRangeValue: [Date | null, Date | null],
  options: TUseQueryOptions<TAggregator>,
) {
  const [dateStart, dateEnd] = dateRangeValue;
  return useQuery<TSubscriberEvent[], Error, TAggregator[]>({
    enabled: dateRangeValue[0] !== null && dateRangeValue[1] !== null,
    queryKey: ["subscriberEvents", { dateStart, dateEnd }],
    queryFn() {
      if (!dateStart || !dateEnd) {
        throw new Error("Invalid date range");
      }
      console.log("useGetSubscriberEvents() -> queryFn()...");
      return fetchSubscriberEvents([dateStart, dateEnd]);
    },
    ...options,
  });
}
