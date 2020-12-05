import { getTwoNumbersThatSumToNum, multiplyNums } from "..";
import { findLongestPalindromicSubstring } from "../../../PalindromicSubstring/index";

describe("getTwoNumbersThatSumToNum", () => {
    it("When given sum and many numbers, should return two that add up to sum", () => {
        expect(getTwoNumbersThatSumToNum({ nums: [1, 3, 5, 1], targetNum: 6 })).toEqual([5, 1]);
    });
});

describe("getTwoNumbersThatSumToNum", () => {
    it("Sum two", () => {
        expect(multiplyNums([5, 5])).toEqual(25);
    });
    it("Sum many", () => {
        expect(multiplyNums([1, 2, 3, 4, 5])).toEqual(120);
    });
});
