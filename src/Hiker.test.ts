import { Hiker, ParsedCommand } from "./Hiker";

describe("Hiker Class Unit Tests", () => {
  let hiker: Hiker;

  beforeEach(() => {
    hiker = new Hiker();
  });

  test("should generate a grid of size 1000x1000 with default state", () => {
    const grid = hiker.generateGrid();
    expect(grid.length).toBe(1000);
    expect(grid[0].length).toBe(1000);
    expect(grid[0][0]).toBe(0);
  });

  test("should parse a valid command", () => {
    const command = "turn on 887,9 through 959,629";
    const parsed: ParsedCommand = hiker.parseCommand(command);
    expect(parsed.action).toBe("turn on");
    expect(parsed.x1).toBe(887);
    expect(parsed.y1).toBe(9);
    expect(parsed.x2).toBe(959);
    expect(parsed.y2).toBe(629);
  });

  test("should throw an error on invalid command", () => {
    expect(() => hiker.parseCommand("invalid command")).toThrow(
      "Invalid command"
    );
  });

  test("should apply turn on command correctly", () => {
    const grid = hiker.generateGrid();
    hiker.applyCommand(grid, "turn on 0,0 through 1,1");
    expect(grid[0][0]).toBe(1);
    expect(grid[1][1]).toBe(1);
    expect(grid[0][1]).toBe(1);
    expect(grid[1][0]).toBe(1);
  });

  test("should count lights correctly", () => {
    const grid = hiker.generateGrid();
    grid[0][0] = 1;
    grid[1][1] = 2;
    expect(hiker.countOnLight(grid)).toBe(3);
  });

  test("should process commands and return correct count", () => {
    const commands = ["turn on 0,0 through 1,1", "toggle 0,0 through 0,0"];
    expect(hiker.processCommands(commands)).toBe(5);
  });
});
