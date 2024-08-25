import { getSubscriberEvents } from "@/modules/dashboard/actions";
import NewsletterEngagementOverviewChart from "@/modules/dashboard/components/NewsletterEngagementOverviewChart";
import { Title } from "@mantine/core";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Home() {
  const today = new Date();
  const last30DaysFromNow = new Date(today);
  last30DaysFromNow.setDate(today.getDate() - 30);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["subscriberEvents", { dateStart: last30DaysFromNow, dateEnd: today }],
    queryFn: () => getSubscriberEvents([last30DaysFromNow, today]),
  });

  return (
    <main>
      <div>
        <Title order={3}>Newsletter engagement overview</Title>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NewsletterEngagementOverviewChart defaultDateRange={[last30DaysFromNow, today]} />
        </HydrationBoundary>
      </div>
    </main>
  );
}
