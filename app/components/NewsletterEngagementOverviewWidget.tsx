"use client";

import NewsletterEngagementOverviewChart from "@/modules/dashboard/components/NewsletterEngagementOverviewChart";
import { Card, Title } from "@mantine/core";

function NewsletterEngagementOverviewWidget({ defaultDateRange }: { defaultDateRange: [Date, Date] }) {
  return (
    <Card withBorder p="md" m="md">
      <Title order={3}>Newsletter engagement overview</Title>
      <NewsletterEngagementOverviewChart defaultDateRange={defaultDateRange} />
    </Card>
  );
}

export default NewsletterEngagementOverviewWidget;
