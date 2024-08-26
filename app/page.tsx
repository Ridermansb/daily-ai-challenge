import { getSubscriberEvents } from "@/modules/dashboard/actions";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import DashboardWidgets from "./components/DashboardWidgets";
import { getQueryClient } from "./utils";

export default async function Home() {
  const today = new Date();
  const last30DaysFromNow = new Date(today);
  last30DaysFromNow.setDate(today.getDate() - 30);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["subscriberEvents", { dateStart: last30DaysFromNow, dateEnd: today }],
    queryFn: () => getSubscriberEvents([last30DaysFromNow, today]),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DashboardWidgets dateStart={last30DaysFromNow} dateEnd={today} />
      </HydrationBoundary>
    </main>
  );
}
