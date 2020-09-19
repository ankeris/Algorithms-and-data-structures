const reverseString = (s: string) => s.split("").reverse().join("");

interface LongestPalindromeTaskAnswer {
    allPalindromes: string[];
    longestPalindrome: string;
}

export const findLongestPalindromicSubstring = (givenWords: string): LongestPalindromeTaskAnswer => {
    // rm spaces
    const givenWordsNonSpace = givenWords.split(" ").join("");
    const allLongestPalindromes: string[] = [];

    for (let i = 0; i < givenWordsNonSpace.length; i++) {
        let currentLongestPalindrome = "";
        let currentConstructedString = "";

        for (let j = i; j < givenWordsNonSpace.length; j++) {
            const element = givenWordsNonSpace[j];
            currentConstructedString = currentConstructedString + element;

            if (currentConstructedString === reverseString(currentConstructedString)) {
                currentLongestPalindrome = currentConstructedString;
            }
        }

        if (currentLongestPalindrome.length > 1) allLongestPalindromes.push(currentLongestPalindrome);
    }

    return {
        allPalindromes: allLongestPalindromes,
        longestPalindrome: allLongestPalindromes.sort((a, b) => b.length - a.length)[0],
    };
};

const answ = findLongestPalindromicSubstring("HYTBCABADEFGHABCDEDCBAGHTFYW12345678987654321ZWETYGDE");
// console.log(answ);
