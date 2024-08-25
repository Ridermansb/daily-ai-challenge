declare global {
  interface TSubscriberEvent {
    id: string;
    type: "DELIVERED" | "OPEN" | "CLICK" | "UNSUBSCRIBE";
    subject: string;
    email: string;
    createdAt: Date;
  }
}

export {};
