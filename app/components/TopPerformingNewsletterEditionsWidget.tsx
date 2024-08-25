"use client";

import TopPerformingNewsletterEditionsTable from "@/modules/dashboard/components/TopPerformingNewsletterEditionsTable";
import { Card, Title } from "@mantine/core";

function TopPerformingNewsletterEditionsWidget() {
  return (
    <Card withBorder>
      <Title order={3}>Top performing newsletter editions</Title>
      <TopPerformingNewsletterEditionsTable />
    </Card>
  );
}

export default TopPerformingNewsletterEditionsWidget;
