import { performCommandAction } from "..";

describe("countHowManyLettersInArr()", () => {
    it("performCommandAction should return correct index when given an action", () => {
        expect(performCommandAction(5, { command: "acc", number: +17 }, 0).nextIndex).toEqual(6);
        expect(performCommandAction(5, { command: "jmp", number: +3 }, 0).nextIndex).toEqual(8);
        expect(performCommandAction(5, { command: "jmp", number: -2 }, 0).nextIndex).toEqual(3);
        expect(performCommandAction(5, { command: "nop", number: +421 }, 0).nextIndex).toEqual(6);
    });

    it("performCommandAction should return correct counter", () => {
        expect(performCommandAction(5, { command: "acc", number: +17 }, 5).accumulator).toEqual(22);
        expect(performCommandAction(5, { command: "jmp", number: +3 }, 5).accumulator).toEqual(5);
        expect(performCommandAction(5, { command: "nop", number: +421 }, 5).accumulator).toEqual(5);
    });
});
