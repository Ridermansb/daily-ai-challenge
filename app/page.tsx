import { getSubscriberEvents } from "@/modules/dashboard/actions";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NewsletterEngagementOverviewWidget from "./components/NewsletterEngagementOverviewWidget";
import TopPerformingNewsletterEditionsWidget from "./components/TopPerformingNewsletterEditionsWidget";

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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewsletterEngagementOverviewWidget defaultDateRange={[last30DaysFromNow, today]} />
        <TopPerformingNewsletterEditionsWidget defaultDateRange={[last30DaysFromNow, today]} />
      </HydrationBoundary>
    </main>
  );
}
