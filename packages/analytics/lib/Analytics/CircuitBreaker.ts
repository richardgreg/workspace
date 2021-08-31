import { queueAsPromised } from "fastq";

export enum CircuitState {
  Closed,
  Open,
  HalfOpen,
}

export class CircuitBreaker {
  state: CircuitState;
  queue: queueAsPromised;
  config: any;
  hwm: number;
  constructor({ queue, config }) {
    this.hwm = 0;
    this.queue = queue;
    this.config = config;
  }
  breakCircuit(): void {
    this.state = CircuitState.Open;
    this.queue.pause();
    const tid = setTimeout(() => {
      this.state = CircuitState.HalfOpen;
      this.queue.concurrency = 1;
      this.queue.resume();
      clearTimeout(tid);
    }, 60 * 1000);
  }
  closeCircuit(): void {
    if (this.state !== CircuitState.Closed) {
      this.hwm = 0;
      this.state = CircuitState.Closed;
      this.queue.concurrency = this.config.concurrentRequests;
    }
  }
  checkCircuit(tries?: number): boolean {
    this.hwm += tries ?? 0;
    if (this.state === CircuitState.Open) {
      return false;
    }
    if (this.state === CircuitState.HalfOpen && tries > 1) {
      this.breakCircuit();
      return false;
    }
    if (
      tries > this.config.circuitBreakerMaxTries &&
      this.state === CircuitState.Closed
    ) {
      this.breakCircuit();
      return false;
    }
    return true;
  }
}
