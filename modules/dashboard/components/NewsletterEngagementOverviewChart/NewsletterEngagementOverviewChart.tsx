import { AreaChart, AreaChartSeries } from "@mantine/charts";
import { Text, Loader } from "@mantine/core";
import { useGetSubscriberEvents } from "../../hooks";

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

const series: AreaChartSeries[] = [
  { name: "delivered", label: "Delivered", color: "blue.4" },
  { name: "opens", label: "Opens", color: "teal.3" },
  { name: "clicks", label: "Clicks", color: "green.8" },
  { name: "unsubscribes", label: "Unsubscribes", color: "red.8" },
  { name: "openRate", label: "Open Rate", color: "blue.6" },
  { name: "clickThroughRate", label: "Click Through Rate", color: "indigo.8" },
];

const NewsletterEngagementOverviewChart = () => {
  const { data: subscriberEvents, isLoading } = useGetSubscriberEvents<TAggregateSubscriberEvent>({
    select(data) {
      return aggregateSubscriberEvents(data);
    },
  });

  if (isLoading) {
    return <Loader color="blue" size="sm" type="bars" />;
  }

  return subscriberEvents ? (
    <AreaChart
      h={300}
      withLegend
      data={subscriberEvents}
      dataKey="createdAt"
      series={series}
      yAxisLabel="Amount"
      curveType="step"
    />
  ) : (
    <Text c="dimmed">No Data Found</Text>
  );
};

export default NewsletterEngagementOverviewChart;
