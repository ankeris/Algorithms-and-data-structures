import { readFileSync } from "fs";
import path from "path";

const data: string[] = readFileSync(path.join(__dirname, "data.txt"), "utf8")
    .toString()
    .split("\n")
    .map((s) => s.replace(/\r$/, ""));

const goalNumber = parseInt(data[0]);
const timeStamps = data[1]
    .split(",")
    .filter((x) => x !== "x")
    .map((a) => parseInt(a));

const result = [];
// 1
for (const iterator of timeStamps) {
    let closest1: number = 0;
    let closest2: number = 0;
    let i: number = 0;
    while (closest2 < goalNumber) {
        i++;
        closest2 = iterator * i;
    }
    closest1 = closest2 - iterator;
    result.push({
        1: closest1,
        2: closest2,
        origin: iterator,
    });
}

// 2
const [firstBus, ...buses] = readFileSync(path.join(__dirname, "data.txt"), "utf8")
    .split("\n")[1]
    .split(",")
    .map((n, i) => [Number(n), i])
    .filter(([n]) => !Number.isNaN(n));

let multiplier = firstBus[0];
let i = 0;

buses.forEach(([bus, busIndex]) => {
    while (true) {
        if ((i + busIndex) % bus === 0) {
            multiplier = multiplier * bus;
            break;
        }
        i += multiplier;
    }
});

console.log(i);
