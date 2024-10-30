import { Hiker, instructions } from "./Hiker";

describe("Hiker Class Integration Tests", () => {
  let hiker: Hiker;

  beforeEach(() => {
    hiker = new Hiker();
  });

  test("should process a sequence of commands correctly with toggles", () => {
    // Arrange
    const commands = instructions;

    // Act
    const finalCount = hiker.processCommands(commands);

    // Assert
    expect(finalCount).toBe(230022);
  });
});
