export class IdempotentExecutor {
  constructor() {
    this.receipts = new Map();
  }

  async run(event, { action, verify }) {
    if (!event?.id) throw new Error("event.id is required");
    if (this.receipts.has(event.id)) {
      return { status: "REUSED", receipt: this.receipts.get(event.id) };
    }
    const effect = await action(event);
    const observation = await verify(effect);
    if (!observation?.ok) {
      return { status: "UNVERIFIED", effect, observation };
    }
    const receipt = { eventId: event.id, effect, observation };
    this.receipts.set(event.id, receipt);
    return { status: "VERIFIED", receipt };
  }
}
