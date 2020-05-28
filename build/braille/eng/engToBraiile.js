"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapEngToBraille_1 = require("./mapEngToBraille");
var CAPITAL = String.fromCharCode(10272);
var NUMBER = String.fromCharCode(10300);
var UNRECOGNIZED = "?";
var openQuotes = true;
var extractWords = function (str) {
    var words = str.split(" ");
    var result = [];
    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
        var word = words_1[_i];
        result.push.apply(result, word.split("\n"));
    }
    return result;
};
var isBraille = function (char) {
    if (char.length > 1)
        return false;
    return (mapEngToBraille_1.braille.letters.includes(char) ||
        mapEngToBraille_1.braille.numbers.includes(char) ||
        mapEngToBraille_1.braille.punctuation.includes(char) ||
        mapEngToBraille_1.braille.contractions.includes(char) ||
        char === CAPITAL ||
        char === NUMBER);
};
var trim = function (word) {
    while (word.length > 0 && !/[A-Za-z0-9]/.test(word[0]))
        word = word.slice(1);
    while (word.length > 0 && !/[A-Za-z0-9]/.test(word[-1]))
        word = word.slice(0, -1);
    return word;
};
var numbersHandler = function (word) {
    if (word === "")
        return word;
    var result = word[0];
    if (/[0-9]/.test(word[0]))
        result = NUMBER + mapEngToBraille_1.numbers.get(word[0]);
    for (var i = 1; i < word.length; i++) {
        if (/[0-9]/.test(word[i]) && /[0-9]/.test(word[i - 1]))
            result += mapEngToBraille_1.numbers.get(word[i]);
        else if (/[0-9]/.test(word[i]))
            result += NUMBER + mapEngToBraille_1.numbers.get(word[i]);
        else
            result += word[i];
    }
    return result;
};
var capitalLettersHandler = function (word) {
    if (word === "")
        return word;
    var result = "";
    for (var _i = 0, word_1 = word; _i < word_1.length; _i++) {
        var char = word_1[_i];
        if (/[A-Z]/.test(char))
            result += CAPITAL + char.toLowerCase();
        else
            result += char.toLowerCase();
    }
    return result;
};
var charToBraille = function (char) {
    if (isBraille(char))
        return char;
    else if (char === "\n")
        return "\n";
    else if (char === '"') {
        openQuotes = !openQuotes;
        if (openQuotes)
            return mapEngToBraille_1.punctuation.get("“");
        else
            return mapEngToBraille_1.punctuation.get("”");
    }
    else if (mapEngToBraille_1.letters.has(char) && /[A-Z]/.test(char))
        return CAPITAL + mapEngToBraille_1.letters.get(char);
    else if (mapEngToBraille_1.letters.has(char))
        return mapEngToBraille_1.letters.get(char);
    else if (mapEngToBraille_1.punctuation.has(char))
        return mapEngToBraille_1.punctuation.get(char);
    else
        console.error("Unrecognized Symbol:", char, "with UTF code:", char.charCodeAt(0));
    return UNRECOGNIZED;
};
var wordToBraille = function (word) {
    if (mapEngToBraille_1.contractions.has(word))
        return mapEngToBraille_1.contractions.get(word);
    else {
        var result = "";
        for (var _i = 0, word_2 = word; _i < word_2.length; _i++) {
            var char = word_2[_i];
            result += charToBraille(char);
        }
        return result;
    }
};
var buildBrailleWord = function (trimmedWord, shavings, index, braille) {
    if (shavings === "")
        braille += wordToBraille(trimmedWord);
    else {
        for (var i = 0; i < shavings.length; i++) {
            if (i === index && trimmedWord !== "")
                braille += wordToBraille(trimmedWord);
            braille += wordToBraille(shavings[i]);
        }
        if (index === shavings.length)
            braille += wordToBraille(trimmedWord);
    }
    return braille;
};
var engToBraille = function (str) {
    var braille = "";
    var words = extractWords(str);
    for (var _i = 0, words_2 = words; _i < words_2.length; _i++) {
        var word = words_2[_i];
        word = numbersHandler(word);
        word = capitalLettersHandler(word);
        var trimmedWord = trim(word);
        var untrimmedWord = word;
        var index = untrimmedWord.indexOf(trimmedWord);
        var shavings = untrimmedWord.replace(trimmedWord, "");
        braille = buildBrailleWord(trimmedWord, shavings, index, braille) + " ";
    }
    return braille.slice(0, -1);
};
exports.default = engToBraille;
