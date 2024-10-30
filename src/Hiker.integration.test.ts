import { Hiker, instructions } from "./Hiker";

describe("Hiker Class Integration Tests", () => {
  let hiker: Hiker;

  beforeEach(() => {
    hiker = new Hiker();
  });

  test("should process a sequence of commands correctly", () => {
    const finalCount = hiker.processCommands(instructions);
    expect(finalCount).toBe(426321);
  });

  test("should handle commands at the grid boundaries", () => {
    const commands = [
      "turn on 999,999 through 999,999",
      "turn off 999,999 through 999,999",
    ];
    expect(hiker.processCommands(commands)).toBe(0);
  });
});
