import { findLongestPalindromicSubstring } from "../index";

describe("LONGEST PALINDROME", () => {
    it("should return 'eve' when 'whatever' is given", () => {
        expect(findLongestPalindromicSubstring("whatever").longestPalindrome).toBe("eve");
    });

    it("should return 'rotor' when 'therotor' is given", () => {
        expect(findLongestPalindromicSubstring("therotor").longestPalindrome).toBe("rotor");
    });

    it("should return 'jdkjdkjdkTTTkdjkdjkdj' when 'jdkjdkjdkTTTkdjkdjkdj' is given", () => {
        expect(findLongestPalindromicSubstring("jdkjdkjdkTTTkdjkdjkdj").longestPalindrome).toBe("jdkjdkjdkTTTkdjkdjkdj");
    });

    it("should return 'bbbb' when 'aaa bbbb' is given", () => {
        expect(findLongestPalindromicSubstring("aaa bbbb").longestPalindrome).toBe("bbbb");
        expect(findLongestPalindromicSubstring("aaa    bbbb    ").longestPalindrome).toBe("bbbb");
    });

    it("should return '12345678987654321' when 'HYTBCABADEFGHABCDEDCBAGHTFYW12345678987654321ZWETYGDE' is given", () => {
        expect(findLongestPalindromicSubstring("HYTBCABADEFGHABCDEDCBAGHTFYW12345678987654321ZWETYGDE").longestPalindrome).toBe("12345678987654321");
    });
});
