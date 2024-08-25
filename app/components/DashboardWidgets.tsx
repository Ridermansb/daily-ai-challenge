"use client";

import useStore, { setDateRange } from "../store";
import { useEffect } from "react";
import NewsletterEngagementOverviewWidget from "./NewsletterEngagementOverviewWidget";
import TopPerformingNewsletterEditionsWidget from "./TopPerformingNewsletterEditionsWidget";
import { Group, Stack } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

const DashboardWidgets = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
  const dateRangeValue = useStore((state) => state.dateRange);

  useEffect(() => {
    setDateRange([startDate, endDate]);
  }, [endDate, startDate]);

  return (
    <Stack gap="md" p="md" align="stretch">
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
      <NewsletterEngagementOverviewWidget />
      <TopPerformingNewsletterEditionsWidget />
    </Stack>
  );
};

export default DashboardWidgets;
