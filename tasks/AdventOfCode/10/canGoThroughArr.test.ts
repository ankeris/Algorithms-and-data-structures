import { canGoThroughArr, constructArrWithoutGivenNums } from ".";

describe("countHowManyLettersInArr()", () => {
    it("performCommandAction should return correct index when given an action", () => {
        expect(canGoThroughArr([0, 1, 2, 3, 4, 6], [1, 3])).toBeTruthy();
        expect(canGoThroughArr([0, 3, 6, 7, 8, 9, 10, 11, 12], [8, 9])).toBeTruthy();

        expect(canGoThroughArr([0, 1, 2, 3, 4, 6], [3, 4])).toBeFalsy();
        expect(canGoThroughArr([0, 3, 6, 7, 8, 9, 10, 11, 12], [7, 8, 9])).toBeFalsy();
        expect(canGoThroughArr([0, 1, 2, 3, 4, 6], [1, 2, 3])).toBeFalsy();
        expect(
            canGoThroughArr(
                [
                    0,
                    1,
                    2,
                    3,
                    6,
                    7,
                    8,
                    9,
                    10,
                    13,
                    14,
                    17,
                    18,
                    19,
                    20,
                    21,
                    24,
                    25,
                    26,
                    27,
                    28,
                    31,
                    32,
                    33,
                    34,
                    37,
                    40,
                    41,
                    42,
                    43,
                    44,
                    47,
                    48,
                    49,
                    50,
                    53,
                    54,
                    55,
                    56,
                    57,
                    60,
                    61,
                    62,
                    65,
                    66,
                    67,
                    68,
                    69,
                    72,
                    73,
                    74,
                    77,
                    80,
                    81,
                    82,
                    83,
                    84,
                    87,
                    88,
                    91,
                    92,
                    95,
                    96,
                    97,
                    100,
                    101,
                    102,
                    103,
                    104,
                    107,
                    110,
                    111,
                    112,
                    113,
                    114,
                    117,
                    118,
                    119,
                    120,
                    121,
                    124,
                    127,
                    130,
                    133,
                    136,
                    139,
                    140,
                    141,
                    142,
                    145,
                    146,
                    147,
                    148,
                ],
                [1, 2, 7, 9]
            )
        ).toBeTruthy();
    });

    it("performCommandAction should return correct index when given an action", () => {
        expect(constructArrWithoutGivenNums([0, 1, 2, 3], [1, 3])).toEqual([0, 2]);
        expect(constructArrWithoutGivenNums([0, 1, 2, 3], [0, 3])).toEqual([1, 2]);
        expect(constructArrWithoutGivenNums([5], [5])).toEqual([]);
    });
});
