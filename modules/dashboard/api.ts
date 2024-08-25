const SUBSCRIBER_EVENTS_URL = `${process.env.NEXT_PUBLIC_API_URL}/subscriberEvents`;

/**
 * Represent a subscriber event object from the database
 */
type TSubscriberEventDatabase = TDatabaseObject<TSubscriberEvent>;

/**
 * Transform a subscriber event object from the database to a subscriber event object
 * @param param0 - Subscriber event object from the database
 * @returns - Subscriber event object with createdAt as a Date object
 */
export function transform({ createdAt, ...rest }: TSubscriberEventDatabase): TSubscriberEvent {
  return {
    ...rest,
    createdAt: new Date(createdAt),
  };
}

/**
 * Fetch subscriber events data
 * @param dateRangeValue - Date range value
 * @todo Do the filter on the json-server (waiting to be fixed https://github.com/typicode/json-server/issues/1528 and https://github.com/typicode/json-server/issues/851)
 * @returns Subscriber events data
 */
export function fetchSubscriberEvents(dateRangeValue: [Date, Date]): Promise<TSubscriberEvent[]> {
  console.log("fetchSubscriberEvents()...", dateRangeValue);
  return fetch(SUBSCRIBER_EVENTS_URL)
    .then((res) => res.json())
    .then((data: TSubscriberEventDatabase[]) => data.map<TSubscriberEvent>((event) => transform(event)))
    .then((data) =>
      data.filter((event) => event.createdAt >= dateRangeValue[0] && event.createdAt <= dateRangeValue[1]),
    );
}
