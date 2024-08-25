import { Text, Loader, Table, NumberFormatter } from "@mantine/core";
import { useGetSubscriberEvents } from "../../hooks";

type TAggregateSubscriberEvent = {
  subject: string;
  openRate: number;
  clickThroughRate: number;
};

/**
 * Group by subject and calculate Open Rate and Click Through Rate
 * @param subscriberEvents - Subscriber events to aggregate
 * @returns Aggregated subscriber events
 */
function aggregateSubscriberEvents(subscriberEvents: TSubscriberEvent[]) {
  const aggregated: TAggregateSubscriberEvent[] = [];

  const groupedEvents = Object.groupBy<string, TSubscriberEvent>(subscriberEvents, ({ subject }) => subject);

  // Calculate Open Rate and Click Through Rate for each subject
  for (const subject in groupedEvents) {
    const events = groupedEvents[subject];
    if (!events?.length) {
      continue;
    }
    const openCount = events.filter((event) => event.type === "OPEN").length;
    const clickCount = events.filter((event) => event.type === "CLICK").length;
    const deliveredCount = events.filter((event) => event.type === "DELIVERED").length;
    const openRate = (openCount / deliveredCount) * 100;
    const clickThroughRate = (clickCount / openCount) * 100;

    aggregated.push({
      subject,
      openRate,
      clickThroughRate,
    });
  }

  return aggregated;
}

const TopPerformingNewsletterRow = ({ aggregatedEvent }: { aggregatedEvent: TAggregateSubscriberEvent }) => (
  <Table.Tr>
    <Table.Td>{aggregatedEvent.subject}</Table.Td>
    <Table.Td>
      <NumberFormatter suffix="%" value={aggregatedEvent.openRate} decimalScale={2} />
    </Table.Td>
    <Table.Td>
      <NumberFormatter suffix="%" value={aggregatedEvent.clickThroughRate} decimalScale={2} />
    </Table.Td>
  </Table.Tr>
);

const TopPerformingNewsletterEditionsTable = () => {
  const { data: subscriberEvents, isLoading } = useGetSubscriberEvents<TAggregateSubscriberEvent>({
    select(data) {
      return aggregateSubscriberEvents(data);
    },
  });

  if (isLoading) {
    return <Loader color="blue" size="sm" type="bars" />;
  }

  return subscriberEvents ? (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Subject</Table.Th>
          <Table.Th>Open Rate</Table.Th>
          <Table.Th>Click Through Rate</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {subscriberEvents.map((aggregateEvent) => (
          <TopPerformingNewsletterRow key={aggregateEvent.subject} aggregatedEvent={aggregateEvent} />
        ))}
      </Table.Tbody>
    </Table>
  ) : (
    <Text c="dimmed">No Data Found</Text>
  );
};

export default TopPerformingNewsletterEditionsTable;
