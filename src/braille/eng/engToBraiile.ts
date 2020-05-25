import { contractions, letters, punctuation, numbers, braille } from "./mapEngToBraille";

const CAPITAL = String.fromCharCode(10272);
const NUMBER = String.fromCharCode(10300);
const UNRECOGNIZED = "?";

let openQuotes = true;

const extractWords = (str: string) => {
  // Split up a sentence based on whitespace (" ") and new line ("\n") chars.
  const words = str.split(" ");
  const result: string[] = [];
  for (const word of words) {
    const temp = word.split("\n");
    for (const item of temp) {
      result.push(item);
    }
  }
  return result;
};

const isBraille = (char: string) => {
  //  Return true if a char is braille.
  if (char.length > 1) return false;
  return (
    letters.has(char) ||
    braille.numbers.includes(char) ||
    braille.punctuation.includes(char) ||
    braille.contractions.includes(char) ||
    char === CAPITAL ||
    char === NUMBER
  );
};

const trim = (word: string) => {
  // Remove punctuation around a word. Example: cat." becomes cat
  while (word.length > 0 && !/[A-Za-z0-9]/.test(word[0])) word = word.slice(1);

  while (word.length > 0 && !/[A-Za-z0-9]/.test(word[-1])) word = word.slice(0, -1);
  return word;
};

const numbersHandler = (word: string) => {
  // Replace each group of numbers in a word to their respective braille representation.
  if (word === "") return word;
  let result = word[0];
  if (/[0-9]/.test(word[0])) result = NUMBER + numbers.get(word[0]);
  for (let i = 1; i < word.length; i++) {
    if (/[0-9]/.test(word[i]) && /[0-9]/.test(word[i - 1])) result += numbers.get(word[i]);
    else if (/[0-9]/.test(word[i])) result += NUMBER + numbers.get(word[i]);
    else result += word[i];
  }
  return result;
};

const capitalLettersHandler = (word: string) => {
  // Put the capital escape code before each capital letter.
  if (word === "") return word;
  let result = "";
  for (const char of word) {
    if (/[A-Z]/.test(char)) result += CAPITAL + char.toLowerCase();
    else result += char.toLowerCase();
  }
  return result;
};

const charToBraille = (char: string) => {
  // Convert an alphabetic char to braille.
  if (isBraille(char)) return char;
  else if (char === "\n") return "\n";
  else if (char === '"') {
    openQuotes = !openQuotes;
    if (openQuotes) return punctuation.get("“");
    else return punctuation.get("”");
  } else if (letters.has(char) && /[A-Z]/.test(char)) return CAPITAL + letters.get(char);
  else if (letters.has(char)) return letters.get(char);
  else if (punctuation.has(char)) return punctuation.get(char);
  else console.error("Unrecognized Symbol:", char, "with UTF code:", char.charCodeAt(0));
  return UNRECOGNIZED;
};

const wordToBraille = (word: string) => {
  // Convert an alphabetic word to braille.
  if (contractions.has(word)) return contractions.get(word);
  else {
    let result = "";
    for (const char of word) result += charToBraille(char);
    return result;
  }
};

const buildBrailleWord = (trimmedWord: string, shavings: string, index: number, braille: string) => {
  // Translate a trimmed word to braille then re-attach the shavings.
  if (shavings === "") braille += wordToBraille(trimmedWord);
  else {
    for (let i = 0; i < shavings.length; i++) {
      if (i === index && trimmedWord !== "") braille += wordToBraille(trimmedWord);
      braille += wordToBraille(shavings[i]);
    }
    if (index === shavings.length)
      // If the shavings are all at the beginning.
      braille += wordToBraille(trimmedWord);
  }
  return braille;
};

const engToBraille = (str: string) => {
  // Convert alphabetic text to braille.
  let braille = "";
  const words = extractWords(str);
  for (let word of words) {
    word = numbersHandler(word);
    word = capitalLettersHandler(word);
    const trimmedWord = trim(word); // Remove punctuation (ex: change dog?" to dog)
    const untrimmedWord = word;
    const index = untrimmedWord.indexOf(trimmedWord);
    const shavings = untrimmedWord.replace(trimmedWord, "");
    braille = buildBrailleWord(trimmedWord, shavings, index, braille) + " ";
  }
  return braille.slice(0, -1); // Remove the final space that was added.
};

export default engToBraille;
