"use client";

import TopPerformingNewsletterEditionsTable from "@/modules/dashboard/components/TopPerformingNewsletterEditionsTable";
import { Card, Title } from "@mantine/core";

function TopPerformingNewsletterEditionsWidget({ defaultDateRange }: { defaultDateRange: [Date, Date] }) {
  return (
    <Card withBorder p="md" m="md">
      <Title order={3}>Top performing newsletter editions</Title>
      <TopPerformingNewsletterEditionsTable defaultDateRange={defaultDateRange} />
    </Card>
  );
}

export default TopPerformingNewsletterEditionsWidget;
