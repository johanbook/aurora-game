export default abstract class Base {
  abstract watts: number;

  damage: number = 0;
  efficiency: number = 0;
  priority: number = 0;

  setEfficiency(efficiency: number) {
    this.efficiency = efficiency;
  }

  fail(efficiency: number) {
    this.efficiency = efficiency;
  }

  getPowerUsage(): number {
    return this.watts * this.efficiency;
  }

  getStatus(): string {
    return `Status:\n${this.priority}`;
  }
}
