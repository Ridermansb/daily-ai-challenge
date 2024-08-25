import { getSubscriberEvents } from "@/modules/dashboard/actions";
import NewsletterEngagementOverviewChart from "@/modules/dashboard/components/NewsletterEngagementOverviewChart";
import { Card, Title } from "@mantine/core";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";

async function NewsletterEngagementOverviewWidget() {
  const today = new Date();
  const last30DaysFromNow = new Date(today);
  last30DaysFromNow.setDate(today.getDate() - 30);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["subscriberEvents", { dateStart: last30DaysFromNow, dateEnd: today }],
    queryFn: () => getSubscriberEvents([last30DaysFromNow, today]),
  });

  return (
    <Card withBorder p="md" m="md">
      <Title order={3}>Newsletter engagement overview</Title>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewsletterEngagementOverviewChart defaultDateRange={[last30DaysFromNow, today]} />
      </HydrationBoundary>
    </Card>
  );
}

export default NewsletterEngagementOverviewWidget;
