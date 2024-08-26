"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchSubscriberEvents } from "./api";
import useStore from "@/app/store";

type TUseQueryOptions<TAggregator> = Omit<
  UseQueryOptions<TSubscriberEvent[], Error, TAggregator[]>,
  "enabled" | "queryKey" | "queryFn"
>;

export function useGetSubscriberEvents<TAggregator>(options: TUseQueryOptions<TAggregator>) {
  const dateRangeValue = useStore((state) => state.dateRange);

  const [dateStart, dateEnd] = dateRangeValue;

  return useQuery<TSubscriberEvent[], Error, TAggregator[]>({
    enabled: !!dateRangeValue[0] && !!dateRangeValue[1],
    queryKey: ["subscriberEvents", { dateStart, dateEnd }],
    queryFn() {
      if (!dateStart || !dateEnd) {
        throw new Error("Invalid date range");
      }
      return fetchSubscriberEvents([dateStart, dateEnd]);
    },
    ...options,
  });
}
