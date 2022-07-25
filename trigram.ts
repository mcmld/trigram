const albums = [
    { name: "Jose and the Fire Starters" },
    { name: "Start a fire" },
    { name: "Fire in the Hole!" },
    { name: "Firstart Movin'" }
]

/// Sorts a list of values, using a method of each value compared to a term with a trigram-based approach. A term is considered a match if the value contains 30% of the terms' trigrams (case insensitive). Results are sorted by the match percentage with the term.
/// A trigram is a group of 3 characters in a 1-step sliding window, e.g. the trigrams of "fire s" are ["fir", "ire", "re ", "e s"]
function query_trigram<T extends object>(values: T[], key: keyof T, term: string): T[] {
    // --- your code here ---
    // tokenize to trigram term
    let termGram = tokenizeTrigram(term)

    let newValues = analyzeMatchPercentage(values, key, termGram);

    // sort by percentage
    newValues.sort((a, b) => {
        return b.percentage - a.percentage;
    });

    // reduce object property
    newValues.forEach(object => {
        delete object['percentage'];
    });

    //console.log(newValues);

    return newValues;
}

function analyzeMatchPercentage<T extends object>(values: T[], key: keyof T, tokenizedTerm: string[]) {

    let newValues = [];

    for (var value of values) {
        let valueGram = tokenizeTrigram(value[key]);

        let match = tokenizedTerm.filter(function (el) {
            return valueGram.indexOf(el) >= 0;
        }).length;

        // check trigram percentage
        let percentage = (match / valueGram.length) * 100;

        if (percentage >= 30) {
            newValues.push({ name: value[key], percentage: percentage });
        }
    }

    return newValues;
}

function tokenizeTrigram(array: string[] | string) {
    var trigrams = [];

    for (var i = 0; i < array.length - (3 - 1); i++) {
        var trigram = [];

        for (var j = 0; j < 3; j++) {
            trigram.push(array[i + j])
        }
        let text = trigram.join("");
        trigrams.push(text.toLowerCase());
    }

    return trigrams;
}

const results = query_trigram(albums, "name", "fire start").map(e => e.name);
console.log(results);
  // Expected values
  // - Jose and the Fire Starters
  // - Start a fire
  // - Firestart Movin'