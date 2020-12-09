import { readFileSync } from "fs";
import path from "path";

const groups = readFileSync(path.join(__dirname, "data.txt"), "utf8")
    .toString()
    .split("\n")
    .map((s) => s.replace(/\r$/, ""))
    .map((a) => a.split("contain"));

const groups1 = groups.reduce((acc: any, curr: any) => {
    return { ...acc, [curr[0]]: curr[1] };
}, {});

const foundAlready: string[] = [];

// 1
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
const answ = findHowManyBags(groups1, "shiny gold bag");
console.log(foundAlready.length);

const groups2 = groups.reduce((acc: any, curr: any) => {
    const value = curr[1].split(",");
    return {
        ...acc,
        [curr[0].slice(0, -2)]: value.reduce((acc, curr) => {
            const number = Number(curr.substr(1, 1));
            const key = curr.substr(3).replace("bags", "bag").replace("bag.", "bag");
            if (key == " other bag") {
                return [...acc, { number: 0, color: key.substring(1) }];
            } else {
                return [...acc, { number, color: key }];
            }
        }, []),
    };
}, {});

const countAll = (topBag: any) => {
    if (topBag.number == 0) return 0;
    const childBags = groups2[topBag.color];
    let total = 1;
    for (const bag of childBags) {
        total += bag.number * countAll(bag);
    }
    return total;
};
