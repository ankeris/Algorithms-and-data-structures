import { readFileSync } from "fs";
import path from "path";

const data: string[] = readFileSync(path.join(__dirname, "data.txt"), "utf8")
    .toString()
    .split("\n")
    .map((s) => s.replace(/\r$/, ""))
    .map((x) => {
        const regExp = /[a-zA-Z]/g;
        if (regExp.test(x)) {
            return x;
        } else {
            return Number(x);
            /* do something if letters are not found in your string */
        }
    })
    .reduce();

console.log(data);
