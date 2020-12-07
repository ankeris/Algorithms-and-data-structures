import { readFileSync } from "fs";
import path from "path";

const groups = readFileSync(path.join(__dirname, "data.txt"), "utf8")
    .toString()
    .split("\n")
    .map((s) => s.replace(/\r$/, ""))
    .map((a) => a.split("contain"))
    .reduce((acc: any, curr: any) => {
        return { ...acc, [curr[0]]: curr[1] };
    }, {});

const foundAlready: string[] = [];

const findHowManyBags = (groupToSearchIn: any, bagToLookFor: string) => {
    const vals = Object.values(groupToSearchIn);
    const keys = Object.keys(groupToSearchIn);

    vals.forEach((val: string, index: number) => {
        if (val.includes(bagToLookFor)) {
            const currentKey = keys[index].replace("bags", "bag").slice(0, -1);

            if (foundAlready.indexOf(currentKey) === -1) {
                foundAlready.push(currentKey);
            }

            findHowManyBags(groupToSearchIn, currentKey);
        }
    });
};

foundAlready.push("shiny gold bag");
findHowManyBags(groups, "shiny gold bag");

console.log(foundAlready.length);
