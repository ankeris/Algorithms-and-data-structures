import { readFileSync } from "fs";
import path from "path";

const adapters: number[] = readFileSync(path.join(__dirname, "data.txt"), "utf8")
    .toString()
    .split("\n")
    .map((s) => s.replace(/\r$/, ""))
    .map((a) => Number(a));

const adaptersLowToHigh: number[] = adapters.sort((a, b) => a - b);

// 1
const findTotalJoltDiffs = adaptersLowToHigh.reduce(
    (acc, element, idx) => {
        const nextElem = adaptersLowToHigh[idx + 1];
        if (!nextElem) return acc;
        const diffToNextElement = nextElem - element;
        return { ...acc, [diffToNextElement]: acc[diffToNextElement] + 1 };
    },
    {
        "1": 0,
        "2": 0,
        "3": 0,
    }
);

//2
console.log(adaptersLowToHigh);

export const constructArrWithoutGivenNums = (arr: number[], withoutWhatNums: number[]) =>
    arr.filter((x) => withoutWhatNums.indexOf(x) == -1);

export const canGoThroughArr = (arr: number[], withoutWhatNums: number[]) => {
    const arrWithoutGivenNums = constructArrWithoutGivenNums(arr, withoutWhatNums);
    let answer = true;
    arrWithoutGivenNums.forEach((x, idx) => {
        const nextElem = arrWithoutGivenNums[idx + 1];
        const diffToNextElement = nextElem - x;
        if (diffToNextElement > 3) {
            answer = false;
        }
    });
    return answer;
};

const possibleRemovalsToStillReachTheEnd = adaptersLowToHigh.filter(
    (x, i) => x + 1 === adaptersLowToHigh[i + 1] && x - 1 === adaptersLowToHigh[i - 1]
);

console.log(possibleRemovalsToStillReachTheEnd);

// Part 2
function findAll(array, memo = {}) {
    const key = array.join(",");
    console.log(memo);
    if (key in memo) {
        return memo[key];
    }

    let finalResult = 1;
    for (let i = 1; i < array.length - 1; i++) {
        if (array[i + 1] - array[i - 1] <= 3) {
            const arr2 = [array[i - 1]].concat(array.slice(i + 1));
            finalResult += findAll(arr2, memo);
        }
    }
    memo[key] = finalResult;
    return finalResult;
}

console.log(findAll(adapters));
