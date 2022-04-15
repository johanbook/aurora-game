interface Log {
  message: string;
}

export default class Logbook {
  logs: Log[] = [];

  log(message: string): void {
    this.logs.push({ message });
  }

  query(): Log[] {
    return this.logs;
  }

  getLogs(delimiter = "\n"): string {
    return this.query()
      .map((log) => log.message)
      .join(delimiter);
  }

  getPrettyLogs(): string {
    return `Ship logs ${Date.now()}\n${this.getLogs("\n- ")}`;
  }
}
