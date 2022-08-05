const albums = [
    { name: "Jose and the Fire Starters", i: "" },
    { name: "Start a fire", i: "" },
    { name: "Fire in the Hole!", i: "" },
    { name: "Firstart Movin'", i: "" },
    { name: "Fire in the Hole", i: "" },
    { name: "Start a fire", i: "" },
]

interface Sortable {
    percentage: number;
}

/// Sorts a list of values, using a method of each value compared to a term with a trigram-based approach. A term is considered a match if the value contains 30% of the terms' trigrams (case insensitive). Results are sorted by the match percentage with the term.
/// A trigram is a group of 3 characters in a 1-step sliding window, e.g. the trigrams of "fire s" are ["fir", "ire", "re ", "e s"]

// added correct return property type
function query_trigram<T extends object>(values: T[], key: keyof T, term: string): T[] {
    // --- your code here ---
    // tokenize to trigram term
    let termGram = tokenizeTrigram(term.toLowerCase());

    let newValues: T[] = [];
    let sortingArr: T[] = [];

    for (var value of values) {
        // TODO: learn how to cast T[keyof T] to string 
        let valueGram = tokenizeTrigram(`${value[key]}`.toLowerCase());

        // check matching trigrams with the term
        let match = termGram.filter(function (el) {
            return valueGram.indexOf(el) >= 0;
        }).length;

        // check trigram percentage
        let percentage = (match / valueGram.length) * 100;

        if (percentage >= 30) {
            newValues.push(value);
            // TODO: refactor this. not sure how to sort without referencing from percentage
            let newVal: any = value;
            newVal.percentage = percentage;
            sortingArr.push(newVal);
        }

    }

    // sort by percentage using sortingArr
    // TODO: percentage does not exist
    sortingArr.sort((a, b) => {
        return b.percentage - a.percentage;
    });

    // copies sortingArr sort to newValues
    newValues.sort(function (a, b) {
        return sortingArr.indexOf(a) - sortingArr.indexOf(b);
    });

    // removed extra function
    // removed need to delete property

    return newValues;
}

function tokenizeTrigram(array: string) {
    var trigrams = [];

    for (var i = 0; i < array.length - (3 - 1); i++) {
        var trigram: string[] = [];
        // eliminated the nested loop using slice as recommended
        let text = array.slice(i, i + 3);
        trigrams.push(text);
    }
    return trigrams;
}

const results = query_trigram(albums, "name", "fire start").map(e => e.name);
console.log(results);
  // Expected values
  // - Jose and the Fire Starters
  // - Start a fire
  // - Firestart Movin'