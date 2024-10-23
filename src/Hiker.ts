export const instructions: string[] = [
  "turn on 887,9 through 959,629",
  "turn on 454,398 through 844,448",
  "turn off 539,243 through 559,965",
  "turn off 370,819 through 676,868",
  "turn off 145,40 through 370,997",
  "turn off 301,3 through 808,453",
  "turn on 351,678 through 951,908",
  "toggle 720,196 through 897,994",
  "toggle 831,394 through 904,860",
];

export type Commands = "turn on" | "turn off" | "toggle";

export type ParsedCommand = {
  action: Commands;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type BaseGridState = 0 | 1;

export class Hiker {
  private gridSize: number = 1000;

  public generateGrid(baseState?: BaseGridState) {
    const grid: number[][] = Array.from({ length: this.gridSize }, () =>
      Array(this.gridSize).fill(baseState ?? 0)
    );
    return grid;
  }

  public parseCommand(comand: string): ParsedCommand {
    const regex = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/;
    const match = comand.match(regex);

    if (!match) {
      throw new Error("Invalid command");
    }

    const [, action, x1, y1, x2, y2] = match;

    return {
      action: action as Commands,
      x1: +x1,
      y1: +y1,
      x2: +x2,
      y2: +y2,
    };
  }

  public applyCommand(grid: number[][], command: string) {
    const { action, x1, x2, y1, y2 } = this.parseCommand(command);
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        if (action === "turn on") {
          grid[x][y] = 1;
        } else if (action === "turn off") {
          grid[x][y] = 0;
        } else if (action === "toggle") {
          grid[x][y] = 2;
        }
      }
    }
  }

  public countOnLight(grid: number[][]): number {
    let count: number = 0;

    for (let x = 0; x < this.gridSize; x++) {
      for (let y = 0; y < this.gridSize; y++) {
        if (grid[x][y] === 1) {
          count++;
        } else if (grid[x][y] === 2) {
          count += 2;
        }
      }
    }
    return count < 0 ? 0 : count;
  }

  public processCommands(commands: string[], baseGridState?: BaseGridState) {
    const grid = this.generateGrid(baseGridState ?? 0);

    for (let command of commands) {
      this.applyCommand(grid, command);
    }
    return this.countOnLight(grid);
  }
}
