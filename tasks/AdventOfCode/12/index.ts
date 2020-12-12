import { readFileSync } from "fs";
import path from "path";

enum Directions {
    NORTH = "N",
    SOUTH = "S",
    EAST = "E",
    WEST = "W",
}

enum Turns {
    R90 = "R90",
    R180 = "R180",
    R270 = "R270",
    L90 = "L90",
    L180 = "L180",
    L270 = "L270",
}

export type Direction = "N" | "S" | "E" | "W";

type ICurrentPose = {
    [Directions.NORTH]?: number;
    [Directions.SOUTH]?: number;
    [Directions.EAST]?: number;
    [Directions.WEST]?: number;
    facing?: Direction;
};

type TurnAction = "R90" | "R180" | "R270" | "L90" | "L180" | "L270";

const turnsMatrix = {
    [Directions.NORTH]: {
        [Turns.R90]: Directions.EAST,
        [Turns.R180]: Directions.SOUTH,
        [Turns.R270]: Directions.WEST,
        [Turns.L90]: Directions.WEST,
        [Turns.L180]: Directions.SOUTH,
        [Turns.L270]: Directions.EAST,
    },
    [Directions.SOUTH]: {
        [Turns.R90]: Directions.WEST,
        [Turns.R180]: Directions.NORTH,
        [Turns.R270]: Directions.EAST,
        [Turns.L90]: Directions.EAST,
        [Turns.L180]: Directions.NORTH,
        [Turns.L270]: Directions.WEST,
    },
    [Directions.EAST]: {
        [Turns.R90]: Directions.SOUTH,
        [Turns.R180]: Directions.WEST,
        [Turns.R270]: Directions.NORTH,
        [Turns.L90]: Directions.NORTH,
        [Turns.L180]: Directions.WEST,
        [Turns.L270]: Directions.SOUTH,
    },
    [Directions.WEST]: {
        [Turns.R90]: Directions.NORTH,
        [Turns.R180]: Directions.EAST,
        [Turns.R270]: Directions.SOUTH,
        [Turns.L90]: Directions.SOUTH,
        [Turns.L180]: Directions.EAST,
        [Turns.L270]: Directions.NORTH,
    },
};

const oppositionMatrix = {
    [Directions.NORTH]: Directions.SOUTH,
    [Directions.SOUTH]: Directions.NORTH,
    [Directions.EAST]: Directions.WEST,
    [Directions.WEST]: Directions.EAST,
};

const actions: string[] = readFileSync(path.join(__dirname, "data.txt"), "utf8")
    .toString()
    .split("\n")
    .map((s) => s.replace(/\r$/, ""));

export const flyFromTo = (currentPose: ICurrentPose, dirVal: string) => {
    const [first, ...rest] = dirVal;
    const constructedFacing = first == "F" ? `${currentPose.facing}` : first;
    const value = Number(rest.join(""));

    if (constructedFacing in currentPose) {
        return {
            ...currentPose,
            [constructedFacing]: currentPose[constructedFacing] + value,
        };
    } else {
        const oppositeDir = oppositionMatrix[constructedFacing];
        const diff = currentPose[oppositeDir] - value;
        if (diff < 0) {
            const newObj = {};
            delete Object.assign(newObj, { [constructedFacing]: Math.abs(diff), ...currentPose })[oppositeDir];
            return newObj;
        } else if (diff === 0) {
            return {
                ...currentPose,
                [oppositeDir]: 0,
            };
        } else {
            return {
                ...currentPose,
                [oppositeDir]: currentPose[oppositeDir] - value,
            };
        }
    }
};

export const turnFromTo = (currentPose: ICurrentPose, turn: TurnAction): ICurrentPose => {
    return {
        ...currentPose,
        facing: turnsMatrix[currentPose.facing][turn],
    };
};

// 1
// starting cords 0, 0
const getFinalPosition1 = (actionsArr: string[], currentPos: ICurrentPose) =>
    actionsArr.reduce((acc: ICurrentPose, currVal: TurnAction) => {
        if (currVal.includes("R") || currVal.includes("L")) {
            return turnFromTo(acc, currVal);
        } else {
            return flyFromTo(acc, currVal);
        }
    }, currentPos as ICurrentPose);

const res1 = getFinalPosition1(actions, { N: 0, E: 0, facing: "E" });
console.log(res1);

// 2
// const getFinalPosition2 = (actionsArr: string[], currentPosShip: ICurrentPose, currentPosWaypont: ICurrentPose) => {

// };

let currentPosShip: ICurrentPose = { N: 0, E: 0 };
let currentPosWaypont: ICurrentPose = { N: 1, E: 10 };
const actionsTest = ["F75", "R90"];
// const actionsTest = ["F75", "L90", "N5", "W2", "N5"];

for (const action of actions) {
    // Move the ship towards waypoint
    if (action.includes("F")) {
        const [_, ...rest] = action;
        const value = Number(rest.join(""));
        Object.keys(currentPosWaypont).forEach((key) => {
            currentPosShip = flyFromTo(currentPosShip, `${key}${currentPosWaypont[key] * value}`);
        });
    }
    // move the waypoint
    else if (action.includes("R") || action.includes("L")) {
        const newObj = {};
        Object.keys(currentPosWaypont).forEach((key) => {
            newObj[turnsMatrix[key][action]] = currentPosWaypont[key];
        });
        currentPosWaypont = newObj;
    } else {
        currentPosWaypont = flyFromTo(currentPosWaypont, action);
    }
}

console.log(currentPosShip);
