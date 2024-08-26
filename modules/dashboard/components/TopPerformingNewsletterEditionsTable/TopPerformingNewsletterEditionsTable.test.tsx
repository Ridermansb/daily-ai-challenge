import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import { render } from "@/test-utils";
import TopPerformingNewsletterEditionsTable from "./TopPerformingNewsletterEditionsTable";

jest.mock("../../hooks.ts", () => ({
  useGetSubscriberEvents: jest.fn(() => ({ isLoading: false, data: [] })),
}));

describe("<TopPerformingNewsletterEditionsTable>", () => {
  it("renders table", async () => {
    render(<TopPerformingNewsletterEditionsTable />);

    const table = await screen.getByRole("table");

    await waitFor(() => {
      expect(table).toBeInTheDocument();
    });
  });
});
