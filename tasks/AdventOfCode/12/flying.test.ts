import { Direction, flyFromTo, turnFromTo } from ".";

describe("turnFromTo()", () => {
    // not testing coords when turning anyway.
    const coords = { N: 3, W: 15 };

    it("South -> Right", () => {
        const currentPosition = { ...coords, facing: "S" as Direction };
        expect(turnFromTo(currentPosition, "R90")).toEqual({ ...coords, facing: "W" });
        expect(turnFromTo(currentPosition, "R180")).toEqual({ ...coords, facing: "N" });
        expect(turnFromTo(currentPosition, "R270")).toEqual({ ...coords, facing: "E" });
    });

    it("South -> Left", () => {
        const currentPosition = { ...coords, facing: "S" as Direction };
        expect(turnFromTo(currentPosition, "L90")).toEqual({ ...coords, facing: "E" });
        expect(turnFromTo(currentPosition, "L180")).toEqual({ ...coords, facing: "N" });
        expect(turnFromTo(currentPosition, "L270")).toEqual({ ...coords, facing: "W" });
    });

    it("North -> Right", () => {
        const currentPosition = { ...coords, facing: "N" as Direction };
        expect(turnFromTo(currentPosition, "R90")).toEqual({ ...coords, facing: "E" });
        expect(turnFromTo(currentPosition, "R180")).toEqual({ ...coords, facing: "S" });
        expect(turnFromTo(currentPosition, "R270")).toEqual({ ...coords, facing: "W" });
    });

    it("North -> Left", () => {
        const currentPosition = { ...coords, facing: "N" as Direction };
        expect(turnFromTo(currentPosition, "L90")).toEqual({ ...coords, facing: "W" });
        expect(turnFromTo(currentPosition, "L180")).toEqual({ ...coords, facing: "S" });
        expect(turnFromTo(currentPosition, "L270")).toEqual({ ...coords, facing: "E" });
    });

    it("East -> Right", () => {
        const currentPosition = { ...coords, facing: "E" as Direction };
        expect(turnFromTo(currentPosition, "R90")).toEqual({ ...coords, facing: "S" });
        expect(turnFromTo(currentPosition, "R180")).toEqual({ ...coords, facing: "W" });
        expect(turnFromTo(currentPosition, "R270")).toEqual({ ...coords, facing: "N" });
    });

    it("East -> Left", () => {
        const currentPosition = { ...coords, facing: "E" as Direction };
        expect(turnFromTo(currentPosition, "L90")).toEqual({ ...coords, facing: "N" });
        expect(turnFromTo(currentPosition, "L180")).toEqual({ ...coords, facing: "W" });
        expect(turnFromTo(currentPosition, "L270")).toEqual({ ...coords, facing: "S" });
    });

    it("West -> Right", () => {
        const currentPosition = { ...coords, facing: "W" as Direction };
        expect(turnFromTo(currentPosition, "R90")).toEqual({ ...coords, facing: "N" });
        expect(turnFromTo(currentPosition, "R180")).toEqual({ ...coords, facing: "E" });
        expect(turnFromTo(currentPosition, "R270")).toEqual({ ...coords, facing: "S" });
    });

    it("West -> Left", () => {
        const currentPosition = { ...coords, facing: "W" as Direction };
        expect(turnFromTo(currentPosition, "L90")).toEqual({ ...coords, facing: "S" });
        expect(turnFromTo(currentPosition, "L180")).toEqual({ ...coords, facing: "E" });
        expect(turnFromTo(currentPosition, "L270")).toEqual({ ...coords, facing: "N" });
    });
});

describe("flyFromTo()", () => {
    it("Should return correct when flying forward", () => {
        expect(flyFromTo({ S: 15, W: 10, facing: "W" }, "F100")).toEqual({ S: 15, W: 110, facing: "W" });
        expect(flyFromTo({ S: 15, E: 10, facing: "E" }, "F100")).toEqual({ S: 15, E: 110, facing: "E" });
        expect(flyFromTo({ S: 15, E: 10, facing: "S" }, "F100")).toEqual({ S: 115, E: 10, facing: "S" });
        expect(flyFromTo({ S: 15, E: 10, facing: "N" }, "F100")).toEqual({ N: 85, E: 10, facing: "N" });
    });

    it("Should return fly opposite directions when needed", () => {
        expect(flyFromTo({ S: 15, W: 10, facing: "W" }, "E100")).toEqual({ S: 15, E: 90, facing: "W" });
        expect(flyFromTo({ S: 15, W: 10, facing: "W" }, "N100")).toEqual({ N: 85, W: 10, facing: "W" });

        expect(flyFromTo({ N: 15, W: 10, facing: "W" }, "S15")).toEqual({ N: 0, W: 10, facing: "W" });
        expect(flyFromTo({ N: 15, W: 10, facing: "W" }, "S3")).toEqual({ N: 12, W: 10, facing: "W" });
        expect(flyFromTo({ N: 15, W: 10, facing: "W" }, "E50")).toEqual({ N: 15, E: 40, facing: "W" });
    });

    it("Should handle zeros", () => {
        // --
        expect(flyFromTo({ S: 0, W: 0, facing: "W" }, "N100")).toEqual({ N: 100, W: 0, facing: "W" });
        expect(flyFromTo({ S: 0, W: 0, facing: "W" }, "E100")).toEqual({ S: 0, E: 100, facing: "W" });
        expect(flyFromTo({ S: 0, E: 0, facing: "W" }, "W100")).toEqual({ S: 0, W: 100, facing: "W" });
        expect(flyFromTo({ N: 0, E: 0, facing: "W" }, "S100")).toEqual({ S: 100, E: 0, facing: "W" });
        // ++
        expect(flyFromTo({ N: 0, E: 0, facing: "W" }, "E100")).toEqual({ N: 0, E: 100, facing: "W" });
        expect(flyFromTo({ N: 0, E: 0, facing: "W" }, "N100")).toEqual({ N: 100, E: 0, facing: "W" });
    });
});
