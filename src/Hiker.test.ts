import { Hiker, ParsedCommand } from "./Hiker";

describe("Hiker Class Unit Tests", () => {
  let hiker: Hiker;

  beforeEach(() => {
    hiker = new Hiker();
  });

  test("should generate a grid of size 1000x1000 with default state", () => {
    // Arrange
    const grid = hiker.generateGrid();
    // Act
    const numberOfRows = grid.length;
    const numberOfColumns = grid[0].length;
    const firstCellState = grid[0][0];
    // Assert
    expect(numberOfRows).toBe(1000);
    expect(numberOfColumns).toBe(1000);
    expect(firstCellState).toBe(0);
  });

  test("should parse a valid command", () => {
    // Arrange
    const command = "turn on 887,9 through 959,629";
    // Act
    const parsed: ParsedCommand = hiker.parseCommand(command);
    // Assert
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
    // Arrange
    const grid = hiker.generateGrid();
    // Act
    hiker.applyCommand(grid, "turn on 0,0 through 1,1");
    // Assert
    expect(grid[0][0]).toBe(1);
    expect(grid[1][1]).toBe(1);
    expect(grid[0][1]).toBe(1);
    expect(grid[1][0]).toBe(1);
  });

  test("should count lights correctly", () => {
    // Arrange
    const grid = hiker.generateGrid();
    // Act
    grid[0][0] = 1;
    grid[1][1] = 2;
    // Assert
    expect(hiker.countOnLight(grid)).toBe(3);
  });

  test("should process commands and return correct count", () => {
    // Arrange
    const commands = ["turn on 0,0 through 1,1", "toggle 0,0 through 0,0"];
    // Act
    const finalCount = hiker.processCommands(commands);
    // Assert
    expect(finalCount).toBe(5);
  });
});
