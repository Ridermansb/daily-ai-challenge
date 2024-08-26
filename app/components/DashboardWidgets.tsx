"use client";

import { useEffect } from "react";
import { Group, Stack, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import NewsletterEngagementOverviewWidget from "./NewsletterEngagementOverviewWidget";
import TopPerformingNewsletterEditionsWidget from "./TopPerformingNewsletterEditionsWidget";
import useStore, { setDateRange } from "../store";
import { getQueryClient } from "../utils";
import ThemeSwitch from "./ThemeSwitch";

const DashboardWidgets = ({ dateStart, dateEnd }: { dateStart: Date; dateEnd: Date }) => {
  const dateRangeValue = useStore((state) => state.dateRange);

  const queryClient = getQueryClient();
  const queryState = queryClient.getQueryState(["subscriberEvents", { dateStart, dateEnd }]);

  useEffect(() => {
    setDateRange([dateStart, dateEnd]);
  }, [dateEnd, dateStart]);

  return (
    <Stack gap="md" p="md" align="stretch">
      <Group align="center" justify="space-between">
        <DatePickerInput
          type="range"
          label="Filter by date"
          required
          value={dateRangeValue}
          onChange={setDateRange}
          maxDate={new Date()}
        />
        <ThemeSwitch />
      </Group>
      {queryState?.error && <Text c="red">Error fetching data</Text>}
      <NewsletterEngagementOverviewWidget />
      <TopPerformingNewsletterEditionsWidget />
    </Stack>
  );
};

export default DashboardWidgets;
