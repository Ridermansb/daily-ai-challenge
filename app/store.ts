import { DatesRangeValue } from "@mantine/dates";
import { create } from "zustand";

interface Store {
  dateRange: DatesRangeValue;
}

const today = new Date();
const last30DaysFromNow = new Date(today);
last30DaysFromNow.setDate(today.getDate() - 30);

const useStore = create<Store>(() => ({
  dateRange: [last30DaysFromNow, today],
}));

export function setDateRange(dateRange: DatesRangeValue) {
  useStore.setState(() => ({
    dateRange: dateRange,
  }));
}

export default useStore;
