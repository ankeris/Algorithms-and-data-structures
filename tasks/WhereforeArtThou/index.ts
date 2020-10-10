function whatIsInAName(collection: Array<object>, source: any) {
    const resultArr: object[] = [];

    collection.forEach((collectionEl: any) => {
        let allowPass = true;
        Object.keys(source).forEach((key) => {
            if (collectionEl[key] !== source[key]) {
                allowPass = false;
            }
        });
        if (allowPass) resultArr.push(collectionEl);
    });

    return resultArr;
}

whatIsInAName(
    [
        { first: "Romeo", last: "Montague" },
        { first: "Mercutio", last: null },
        { first: "Tybalt", last: "Capulet" },
    ],
    { last: "Capulet" }
);
