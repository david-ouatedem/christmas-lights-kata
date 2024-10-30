import { Hiker } from "./Hiker";

describe("Hiker Class Unit Tests", () => {
  let hiker: Hiker;

  beforeEach(() => {
    hiker = new Hiker();
  });

  test("should parse command correctly", () => {
    // Arrange
    const command = "turn on 0,0 through 1,1";
    const expectedParsedCommand = {
      action: "turn on",
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1,
    };

    // Act
    const parsedCommand = hiker.parseCommand(command);

    // Assert
    expect(parsedCommand).toEqual(expectedParsedCommand);
  });

  test("should throw an error on invalid command", () => {
    expect(() => hiker.parseCommand("turn up 0,0 through 0,0")).toThrow(
      "Invalid command"
    );
  });

  test("should apply command correctly", () => {
    // Arrange
    const grid = hiker.generateGrid(false);
    const command = "turn on 0,0 through 0,0";

    // Act
    hiker.applyCommand(grid, command);

    // Assert
    expect(grid[0][0]).toBe(true);
  });

  test("should toggle light state correctly", () => {
    // Arrange
    const grid = hiker.generateGrid(false);
    hiker.applyCommand(grid, "turn on 0,0 through 0,0");

    // Act
    hiker.applyCommand(grid, "toggle 0,0 through 0,0");

    // Assert
    expect(grid[0][0]).toBe(false);
  });
});
