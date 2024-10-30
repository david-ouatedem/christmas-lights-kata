import { Hiker, instructions } from "./Hiker";

describe("Hiker Class Integration Tests", () => {
  let hiker: Hiker;

  beforeEach(() => {
    hiker = new Hiker();
  });

  test("should process a sequence of commands correctly", () => {
    // Arrange
    const commands = instructions;
    // Act
    const finalCount = hiker.processCommands(commands);
    // Assert
    expect(finalCount).toBe(426321);
  });

  test("should handle commands at the grid boundaries", () => {
    // Arrange
    const commands = [
      "turn on 999,999 through 999,999",
      "turn off 999,999 through 999,999",
    ];
    // Act
    const finalCount = hiker.processCommands(commands);
    // Assert
    expect(finalCount).toBe(0);
  });
});
