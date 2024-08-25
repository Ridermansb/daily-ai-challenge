"use client";

import NewsletterEngagementOverviewChart from "@/modules/dashboard/components/NewsletterEngagementOverviewChart";
import { Card, Title } from "@mantine/core";

function NewsletterEngagementOverviewWidget() {
  return (
    <Card withBorder>
      <Title order={3}>Newsletter engagement overview</Title>
      <NewsletterEngagementOverviewChart />
    </Card>
  );
}

export default NewsletterEngagementOverviewWidget;
