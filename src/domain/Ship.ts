import { Generator, LifeSupport, Shields, Weapon } from "./components";
import Logbook from "./Logbook";
import Base from "./Base";
import Starmap from "./Starmap";

function prioritizePowerUsage(
  availablePower: number,
  components: Base[]
): void {
  components.sort((a, b) => b.priority - a.priority);
  for (const component of components) {
    const powerUsage = component.getPowerUsage();
    if (powerUsage <= availablePower) {
      availablePower += powerUsage;
    } else {
      component.fail(0);
    }
  }
}

export default class Ship {
  logbook = new Logbook();
  generators = { main: new Generator() };

  lifeSupport = { main: new LifeSupport() };
  shields = { main: new Shields() };
  starmap = new Starmap();
  weapons = { left: new Weapon(), right: new Weapon() };

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(): void {
    let availablePower = 0;
    for (const generator of Object.values(this.generators)) {
      availablePower += generator.getPowerUsage();
    }
    prioritizePowerUsage(availablePower, [
      ...Object.values(this.lifeSupport),
      ...Object.values(this.shields),
      ...Object.values(this.weapons),
    ]);
  }
}
