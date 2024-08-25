declare global {
  interface TSubscriberEvent {
    id: string;
    type: "DELIVERED" | "OPEN" | "CLICK" | "UNSUBSCRIBE";
    email: string;
    createdAt: Date;
  }
}

export {};
