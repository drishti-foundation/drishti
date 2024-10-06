"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapEngToBraille_1 = require("./mapEngToBraille");
const CAPITAL = String.fromCharCode(10272);
const NUMBER = String.fromCharCode(10300);
const UNRECOGNIZED = '?';
let openQuotes = true;
const extractWords = (str) => {
    const words = str.split(' ');
    const result = [];
    for (const word of words) {
        result.push(...word.split('\n'));
    }
    return result;
};
const isBraille = (char) => {
    if (char.length > 1)
        return false;
    return (mapEngToBraille_1.braille.letters.includes(char) ||
        mapEngToBraille_1.braille.numbers.includes(char) ||
        mapEngToBraille_1.braille.punctuation.includes(char) ||
        mapEngToBraille_1.braille.contractions.includes(char) ||
        char === CAPITAL ||
        char === NUMBER);
};
const trim = (word) => {
    while (word.length > 0 && !/[A-Za-z0-9]/.test(word[0]))
        word = word.slice(1);
    while (word.length > 0 && !/[A-Za-z0-9]/.test(word[-1]))
        word = word.slice(0, -1);
    return word;
};
const numbersHandler = (word) => {
    if (word === '')
        return word;
    let result = word[0];
    if (/[0-9]/.test(word[0]))
        result = NUMBER + mapEngToBraille_1.numbers.get(word[0]);
    for (let i = 1; i < word.length; i++) {
        if (/[0-9]/.test(word[i]) && /[0-9]/.test(word[i - 1]))
            result += mapEngToBraille_1.numbers.get(word[i]);
        else if (/[0-9]/.test(word[i]))
            result += NUMBER + mapEngToBraille_1.numbers.get(word[i]);
        else
            result += word[i];
    }
    return result;
};
const capitalLettersHandler = (word) => {
    if (word === '')
        return word;
    let result = '';
    for (const char of word) {
        if (/[A-Z]/.test(char))
            result += CAPITAL + char.toLowerCase();
        else
            result += char.toLowerCase();
    }
    return result;
};
const charToBraille = (char) => {
    if (isBraille(char))
        return char;
    else if (char === '\n')
        return '\n';
    else if (char === '"') {
        openQuotes = !openQuotes;
        if (openQuotes)
            return mapEngToBraille_1.punctuation.get('“');
        else
            return mapEngToBraille_1.punctuation.get('”');
    }
    else if (mapEngToBraille_1.letters.has(char) && /[A-Z]/.test(char))
        return CAPITAL + mapEngToBraille_1.letters.get(char);
    else if (mapEngToBraille_1.letters.has(char))
        return mapEngToBraille_1.letters.get(char);
    else if (mapEngToBraille_1.punctuation.has(char))
        return mapEngToBraille_1.punctuation.get(char);
    else
        console.error('Unrecognized Symbol:', char, 'with UTF code:', char.charCodeAt(0));
    return UNRECOGNIZED;
};
const wordToBraille = (word) => {
    if (mapEngToBraille_1.contractions.has(word))
        return mapEngToBraille_1.contractions.get(word);
    else {
        let result = '';
        for (const char of word)
            result += charToBraille(char);
        return result;
    }
};
const buildBrailleWord = (trimmedWord, shavings, index, braille) => {
    if (shavings === '')
        braille += wordToBraille(trimmedWord);
    else {
        for (let i = 0; i < shavings.length; i++) {
            if (i === index && trimmedWord !== '')
                braille += wordToBraille(trimmedWord);
            braille += wordToBraille(shavings[i]);
        }
        if (index === shavings.length)
            braille += wordToBraille(trimmedWord);
    }
    return braille;
};
const engToBraille = (str) => {
    let braille = '';
    const words = extractWords(str);
    for (let word of words) {
        word = numbersHandler(word);
        word = capitalLettersHandler(word);
        const trimmedWord = trim(word);
        const untrimmedWord = word;
        const index = untrimmedWord.indexOf(trimmedWord);
        const shavings = untrimmedWord.replace(trimmedWord, '');
        braille = buildBrailleWord(trimmedWord, shavings, index, braille) + ' ';
    }
    return braille.slice(0, -1);
};
exports.default = engToBraille;
