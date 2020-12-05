import expenseReport from "./data.json";

interface IParams {
    targetNum: number;
    nums: number[];
}

type NumsTuple = number[];

export const getTwoNumbersThatSumToNum = ({ nums, targetNum }: IParams): NumsTuple => {
    let result: NumsTuple = [];
    nums.forEach((currVal: number, currIdx: number) => {
        for (let index = currIdx + 1; index < nums.length; index++) {
            const element = nums[index];
            if (element + currVal == targetNum) {
                result = [currVal, element];
            }
        }
    });
    return result;
};

export const getThreeNumbersThatSumToNum = ({ nums, targetNum }: IParams): NumsTuple => {
    let result: NumsTuple = [];
    nums.forEach((currVal: number, currIdx: number) => {
        for (let ai = currIdx + 1; ai < nums.length; ai++) {
            const aiN = nums[ai];
            for (let bi = ai + 1; bi < nums.length; bi++) {
                const biN = nums[bi];
                if (currVal + aiN + biN === targetNum) {
                    result = [currVal, aiN, biN];
                }
            }
        }
    });
    return result;
};

// res1
const res = getTwoNumbersThatSumToNum({ nums: expenseReport, targetNum: 2020 });
// res2
const res2 = getThreeNumbersThatSumToNum({ nums: expenseReport, targetNum: 2020 });
console.log(res2);

export const multiplyNums = (nums: NumsTuple): number => nums.reduce((acc, curr) => acc * curr, 1);

console.log(multiplyNums(res2));
