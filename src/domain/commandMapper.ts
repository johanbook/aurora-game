import Ship from "./Ship";

type Command = (ship: Ship, options: string[]) => string;

const COMMANDS: Record<string, Command> = {
  logs: (ship) => ship.logbook.getPrettyLogs(),
  hostname: (ship) => ship.name,
  starmap: (ship) => ship.starmap.getMap(),
  status: () => "Not available",
};

export function mapCommand(ship: Ship, arg: string): string {
  const [cmd, ...options] = arg.split(" ");

  if (cmd in COMMANDS) {
    return COMMANDS[cmd](ship, options);
  }

  if (cmd === "help") {
    const availableCommands = Object.keys(COMMANDS).join(", ");
    return `Available commands: ${availableCommands}`;
  }

  return `Command '${cmd}' not recognized`;
}

export function createCommandMapper(ship: Ship): (args: string) => string {
  return (args: string) => mapCommand(ship, args);
}
