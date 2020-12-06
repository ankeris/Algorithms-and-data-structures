import { readFileSync } from "fs";
import path from "path";

const groups = readFileSync(path.join(__dirname, "data.txt"), "utf8")
    .toString()
    .split("\n")
    .map((s) => s.replace(/\r$/, ""))
    .reduce(
        (acc: any, curr: any) => {
            const accLength = acc.length;
            if (curr.length) {
                acc[accLength - 1].push(curr);
                return acc;
            } else {
                return [...acc, []];
            }
        },
        [[]]
    );

// 1
export const countHowManyLettersInArr = (arr: string[]) => {
    return new Set(arr.join("")).size;
};

// 2
export const checkIfLetterExistsInAllStrings = (arr: string[], letter: string) =>
    arr.reduce((acc: boolean, curr: string) => {
        if (!curr.includes(letter)) {
            return false;
        } else return acc;
    }, true);

export const countRepeatingCharacters = (word: string, wordsToCheck: string[]) =>
    word.split("").reduce((acc: number, currLetter: string) => {
        if (checkIfLetterExistsInAllStrings(wordsToCheck, currLetter)) {
            return acc + 1;
        }
        return acc;
    }, 0);

let result: any = [];

groups.forEach((x) => {
    const [firstElem, ...wordsToCheck] = x;
    result.push(countRepeatingCharacters(firstElem, wordsToCheck));
});

// log result
// const res = result.reduce((acc: any, curr: any) => acc + curr, 0);
// console.log(res);
