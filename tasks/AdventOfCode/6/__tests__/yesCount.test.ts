import { countHowManyLettersInArr, checkIfLetterExistsInAllStrings, countRepeatingCharacters } from "..";

describe("countHowManyLettersInArr()", () => {
    it("Should count correctly", () => {
        expect(countHowManyLettersInArr(["abc", "abc"])).toEqual(3);
    });

    it("Should count correctly even if repetative letters", () => {
        expect(countHowManyLettersInArr(["abcfffffffffffff", "abc"])).toEqual(4);
        expect(countHowManyLettersInArr(["abcd", "efgh"])).toEqual(8);
        expect(countHowManyLettersInArr(["abcd", "abcd"])).toEqual(4);
        expect(countHowManyLettersInArr(["", ""])).toEqual(0);
    });

    it("Should should not matter how many strings are given", () => {
        expect(countHowManyLettersInArr(["abcd", "abcd", "abcd", "abcd", "abcd", "abcd"])).toEqual(4);
    });
});

describe("checkIfLetterExistsInAllStrings()", () => {
    it("Should return false if exists only in one", () => {
        expect(checkIfLetterExistsInAllStrings(["abc", "aaa"], "b")).toBeFalsy();
        expect(checkIfLetterExistsInAllStrings(["", ""], "a")).toBeFalsy();
        expect(checkIfLetterExistsInAllStrings(["a", "ab"], "a")).toBeTruthy();
    });
    it("Should should handle multiple strings", () => {
        expect(checkIfLetterExistsInAllStrings(["a", "ab", "a", "b"], "a")).toBeFalsy();
    });
});

describe("countRepeatingCharacters()", () => {
    it("should only count when all of the strings contain each letter", () => {
        expect(countRepeatingCharacters("amen", ["b"])).toEqual(0);
        expect(countRepeatingCharacters("amen", ["a"])).toEqual(1);
        expect(countRepeatingCharacters("amen", ["a", "a"])).toEqual(1);
        expect(countRepeatingCharacters("amen", ["a", "a", "a"])).toEqual(1);
        expect(countRepeatingCharacters("amen", ["an", "an", "an"])).toEqual(2);
    });
});
