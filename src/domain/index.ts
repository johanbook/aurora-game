import Ship from "./Ship";
import Config from "../config";
import { createCommandMapper } from "./commandMapper";

export function createEventLoop() {
  const ship = new Ship("Aurora");
  const commandMapper = createCommandMapper(ship);
  setInterval(() => ship.update(), Config.UPDATE_INTERVAL);
  return { commandMapper };
}
