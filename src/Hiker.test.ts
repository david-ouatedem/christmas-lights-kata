import { Hiker, instructions, ParsedCommand } from "./Hiker";

describe("Hiker", () => {
  it("generates grid with 1000 rows and 1000 columns", () => {
    // Arrange
    const hiker = new Hiker();

    // Act
    const grid = hiker.generateGrid();

    const rows = grid.length;
    const columns = grid[0].length;

    // Assert
    expect(rows).toBe(1000);
    expect(columns).toBe(1000);
  });
  it("test if lights are initially all off", () => {
    // Arrange
    const hiker = new Hiker();

    // Act
    const grid = hiker.generateGrid();

    const offLights = grid.map((row) =>
      row.filter((value) => value === false)
    ).length;

    // Assert
    expect(offLights).toBe(1000);
  });
  it("failed to correctly parse command", () => {
    // Arrange
    const hiker = new Hiker();
    const command = "turn down 499,499 through 500,500";

    // Act

    // Assert
    expect(() => hiker.parseCommand(command)).toThrow(Error);
  });
  it("can correctly parse command", () => {
    // Arrange
    const hiker = new Hiker();
    const command = "turn off 499,499 through 500,500";

    // Act
    const parsedCommand = hiker.parseCommand(command);

    // Assert
    const expectedResult: ParsedCommand = {
      action: "turn off",
      x1: 499,
      y1: 499,
      x2: 500,
      y2: 500,
    };
    expect(parsedCommand).toStrictEqual(expectedResult);
  });
  it("can correctly apply turn on command", () => {
    // Arrange
    const hiker = new Hiker();
    const command = "turn on 499,499 through 500,500";
    const grid = hiker.generateGrid();

    // Act
    hiker.applyCommand(grid, command);
    const onLights = hiker.countOnLight(grid);

    // Assert
    expect(onLights).toBe(4);
  });
  it("can correctly apply toggle command", () => {
    // Arrange
    const hiker = new Hiker();
    const command = "toggle 831,394 through 904,860";
    const grid = hiker.generateGrid();

    // Act
    hiker.applyCommand(grid, command);
    const onLights = hiker.countOnLight(grid);

    // Assert
    expect(onLights).toBe(34558);
  });
  it("can correctly apply turn turn off command", () => {
    // Arrange
    const hiker = new Hiker();
    const command = "turn off 539,243 through 559,965";
    const grid = hiker.generateGrid(true);

    // Act
    hiker.applyCommand(grid, command);
    const offedLights = 1000000 - hiker.countOnLight(grid);

    // Assert
    expect(offedLights).toBe(15183);
  });
  it("can correctly process many commands", () => {
    // Arrange
    const hiker = new Hiker();
    // Act
    const onLights = hiker.processCommands(instructions);

    // Assert
    expect(onLights).toBe(230022);
  });
});
