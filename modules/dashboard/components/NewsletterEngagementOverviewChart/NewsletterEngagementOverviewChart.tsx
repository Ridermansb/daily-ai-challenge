import { AreaChart } from "@mantine/charts";
import { useQuery } from "@tanstack/react-query";
import { Text, Loader, Stack, Group } from "@mantine/core";
import { fetchSubscriberEvents } from "../../api";
import { useState } from "react";
import { DatePickerInput, DatesRangeValue } from "@mantine/dates";

type TAggregateSubscriberEvent = {
  createdAt: string;
  opens: number;
  clicks: number;
  unsubscribes: number;
  delivered: number;
  openRate: number;
  clickThroughRate: number;
};

function aggregateSubscriberEvents(subscriberEvents: TSubscriberEvent[]) {
  const aggregated: TAggregateSubscriberEvent[] = [];

  subscriberEvents.forEach((event) => {
    const existing = aggregated.find((agg) => agg.createdAt === event.createdAt.toDateString());

    if (existing) {
      if (event.type === "OPEN") {
        existing.opens++;
      } else if (event.type === "CLICK") {
        existing.clicks++;
      } else if (event.type === "UNSUBSCRIBE") {
        existing.unsubscribes++;
      } else if (event.type === "DELIVERED") {
        existing.delivered++;
      }
      existing.openRate = existing.delivered ? existing.opens / existing.delivered : 0;
      existing.clickThroughRate = existing.opens ? existing.clicks / existing.opens : 0;
    } else {
      aggregated.push({
        createdAt: event.createdAt.toDateString(),
        opens: event.type === "OPEN" ? 1 : 0,
        clicks: event.type === "CLICK" ? 1 : 0,
        unsubscribes: event.type === "UNSUBSCRIBE" ? 1 : 0,
        delivered: event.type === "DELIVERED" ? 1 : 0,
        openRate: 0,
        clickThroughRate: 0,
      });
    }
  });

  return aggregated;
}

function useGetSubscriberEvents(dateRangeValue: [Date | null, Date | null]) {
  const [dateStart, dateEnd] = dateRangeValue;
  return useQuery<TSubscriberEvent[], Error, TAggregateSubscriberEvent[]>({
    enabled: dateRangeValue[0] !== null && dateRangeValue[1] !== null,
    queryKey: ["subscriberEvents", { dateStart, dateEnd }],
    queryFn() {
      if (!dateStart || !dateEnd) {
        throw new Error("Invalid date range");
      }
      return fetchSubscriberEvents([dateStart, dateEnd]);
    },
    select(data) {
      return aggregateSubscriberEvents(data);
    },
  });
}

const NewsletterEngagementOverviewChart = ({ defaultDateRange }: { defaultDateRange: [Date, Date] }) => {
  const [dateRangeValue, setDateRange] = useState<DatesRangeValue>(defaultDateRange);
  const { data: subscriberEvents, isLoading } = useGetSubscriberEvents([dateRangeValue[0], dateRangeValue[1]]);

  if (isLoading) {
    return <Loader color="blue" size="sm" type="bars" />;
  }

  return (
    <Stack align="stretch" justify="center" gap="md" px={20}>
      <Group align="flex-end">
        <DatePickerInput
          type="range"
          label="Filter by date"
          required
          value={dateRangeValue}
          onChange={setDateRange}
          maxDate={new Date()}
        />
      </Group>
      {subscriberEvents ? (
        <AreaChart
          h={300}
          withLegend
          data={subscriberEvents}
          dataKey="createdAt"
          series={[
            { name: "delivered", label: "Delivered", color: "blue.4" },
            { name: "opens", label: "Opens", color: "teal.3" },
            { name: "clicks", label: "Clicks", color: "green.8" },
            { name: "unsubscribes", label: "Unsubscribes", color: "red.8" },
            { name: "openRate", label: "Open Rate", color: "blue.6" },
            { name: "clickThroughRate", label: "Click Through Rate", color: "indigo.8" },
          ]}
          yAxisLabel="Amount"
          curveType="step"
          connectNulls
        />
      ) : (
        <Text c="dimmed">No Data Found</Text>
      )}
    </Stack>
  );
};

export default NewsletterEngagementOverviewChart;
