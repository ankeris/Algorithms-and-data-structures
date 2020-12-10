import { readFileSync } from "fs";
import path from "path";

type Command = "acc" | "jmp" | "nop";

type ActionHolder = {
    command: Command;
    number: number;
};

const groups: ActionHolder[] = readFileSync(path.join(__dirname, "data.txt"), "utf8")
    .toString()
    .split("\n")
    .map((s) => s.replace(/\r$/, ""))
    .map((a) => {
        const str = a.split(" ");
        const command: Command = str[0] as Command;
        const number: number = Number(str[1]);
        return { command, number };
    });

export const performCommandAction = (currIndex: number, action: ActionHolder, currentCount: number) => {
    switch (action.command) {
        case "acc":
            return { nextIndex: currIndex + 1, accumulator: currentCount + action.number };
        case "jmp":
            return { nextIndex: currIndex + action.number, accumulator: currentCount };
        default:
            return { nextIndex: currIndex + 1, accumulator: currentCount };
    }
};

// 1
// let alreadyVisitedIndexes: number[] = [];

// const countGlobal = (groups: ActionHolder[]): number => {
//     let currentIndex = 0;
//     let currentAccumulator = 0;
//     while (alreadyVisitedIndexes.indexOf(currentIndex) == -1) {
//         alreadyVisitedIndexes.push(currentIndex);
//         const { nextIndex, accumulator } = performCommandAction(currentIndex, groups[currentIndex], currentAccumulator);
//         currentIndex = nextIndex;
//         currentAccumulator = accumulator;
//     }
//     return currentAccumulator;
// };

// 2

let alreadyTriedIndexes: number[] = [];
let alreadyVisitedIndexes: number[] = [];

const countGlobal2 = (groups: ActionHolder[]): number => {
    let currentIndex = 0;
    let currentAccumulator = 0;
    let alreadySwapped = false;

    function justDoNormal(): void {
        const { nextIndex, accumulator } = performCommandAction(currentIndex, groups[currentIndex], currentAccumulator);
        currentIndex = nextIndex;
        currentAccumulator = accumulator;
    }

    while (currentIndex < groups.length) {
        const currentActionHolder = groups[currentIndex];
        if (alreadyVisitedIndexes.indexOf(currentIndex) == -1) {
            alreadyVisitedIndexes.push(currentIndex);
        } else {
            alreadyVisitedIndexes = [];
            currentIndex = 0;
            currentAccumulator = 0;
            alreadySwapped = false;
        }

        if (alreadySwapped) {
            justDoNormal();
        } else {
            if (currentActionHolder.command === "nop" || currentActionHolder.command === "jmp") {
                if (alreadyTriedIndexes.indexOf(currentIndex) == -1) {
                    const swappedCmd = currentActionHolder.command === "nop" ? "jmp" : "nop";
                    alreadyTriedIndexes.push(currentIndex);
                    alreadySwapped = true;
                    const { nextIndex, accumulator } = performCommandAction(
                        currentIndex,
                        { command: swappedCmd, number: currentActionHolder.number },
                        currentAccumulator
                    );
                    currentIndex = nextIndex;
                    currentAccumulator = accumulator;
                } else {
                    justDoNormal();
                }
            } else {
                justDoNormal();
            }
        }
    }

    return currentAccumulator;
};

const answ = countGlobal2(groups);
console.log(answ);
