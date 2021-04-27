const letters = new Map<string, string>([
  ['a', String.fromCharCode(10241)],
  ['b', String.fromCharCode(10243)],
  ['c', String.fromCharCode(10249)],
  ['d', String.fromCharCode(10265)],
  ['e', String.fromCharCode(10257)],
  ['f', String.fromCharCode(10251)],
  ['g', String.fromCharCode(10267)],
  ['h', String.fromCharCode(10259)],
  ['i', String.fromCharCode(10250)],
  ['j', String.fromCharCode(10266)],
  ['k', String.fromCharCode(10245)],
  ['l', String.fromCharCode(10247)],
  ['m', String.fromCharCode(10253)],
  ['n', String.fromCharCode(10269)],
  ['o', String.fromCharCode(10261)],
  ['p', String.fromCharCode(10255)],
  ['q', String.fromCharCode(10271)],
  ['r', String.fromCharCode(10263)],
  ['s', String.fromCharCode(10254)],
  ['t', String.fromCharCode(10270)],
  ['u', String.fromCharCode(10277)],
  ['v', String.fromCharCode(10279)],
  ['w', String.fromCharCode(10298)],
  ['x', String.fromCharCode(10285)],
  ['y', String.fromCharCode(10301)],
  ['z', String.fromCharCode(10293)],
]);

const contractions = new Map<string, string>([
  ['but', String.fromCharCode(10243)],
  ['can', String.fromCharCode(10249)],
  ['do', String.fromCharCode(10265)],
  ['every', String.fromCharCode(10257)],
  ['from', String.fromCharCode(10251)],
  ['go', String.fromCharCode(10267)],
  ['have', String.fromCharCode(10259)],
  ['just', String.fromCharCode(10266)],
  ['knowledge', String.fromCharCode(10280)],
  ['like', String.fromCharCode(10296)],
  ['more', String.fromCharCode(10253)],
  ['not', String.fromCharCode(10269)],
  ['people', String.fromCharCode(10255)],
  ['quite', String.fromCharCode(10271)],
  ['rather', String.fromCharCode(10263)],
  ['so', String.fromCharCode(10254)],
  ['that', String.fromCharCode(10270)],
  ['us', String.fromCharCode(10277)],
  ['very', String.fromCharCode(10279)],
  ['it', String.fromCharCode(10285)],
  ['you', String.fromCharCode(10301)],
  ['as', String.fromCharCode(10293)],
  ['and', String.fromCharCode(10287)],
  ['for', String.fromCharCode(10303)],
  ['of', String.fromCharCode(10295)],
  ['the', String.fromCharCode(10286)],
  ['with', String.fromCharCode(10302)],
  ['will', String.fromCharCode(10298)],
  ['his', String.fromCharCode(10278)],
  ['in', String.fromCharCode(10260)],
  ['was', String.fromCharCode(10292)],
  ['to', String.fromCharCode(10262)],
]);

const punctuation = new Map<string, string>([
  [',', String.fromCharCode(10242)],
  [';', String.fromCharCode(10246)],
  [',', String.fromCharCode(10258)],
  ['.', String.fromCharCode(10290)],
  ['!', String.fromCharCode(10262)],
  ['(', String.fromCharCode(10294)],
  [')', String.fromCharCode(10294)],
  ['“', String.fromCharCode(10278)],
  ['”', String.fromCharCode(10292)],
  ['?', String.fromCharCode(10278)],
  ['/', String.fromCharCode(10252)],
  ['#', String.fromCharCode(10300)],
  ["'", String.fromCharCode(10244)],
  ['…', String.fromCharCode(10290) + String.fromCharCode(10290) + String.fromCharCode(10290)],
  ['’', String.fromCharCode(10244)],
  ['­', String.fromCharCode(10276)],
  ['-', String.fromCharCode(10276)],
  ['‐', String.fromCharCode(10276)],
  ['‑', String.fromCharCode(10276)],
  ['‒', String.fromCharCode(10276)],
  ['–', String.fromCharCode(10276)],
  ['—', String.fromCharCode(10276)],
  ['―', String.fromCharCode(10276)],
]);

const numbers = new Map<string, string>([
  ['1', String.fromCharCode(10241)],
  ['2', String.fromCharCode(10243)],
  ['3', String.fromCharCode(10249)],
  ['4', String.fromCharCode(10265)],
  ['5', String.fromCharCode(10257)],
  ['6', String.fromCharCode(10251)],
  ['7', String.fromCharCode(10267)],
  ['8', String.fromCharCode(10259)],
  ['9', String.fromCharCode(10250)],
  ['0', String.fromCharCode(10266)],
]);

const braille = {
  letters: Array.from(letters.values()),
  contractions: Array.from(contractions.values()),
  punctuation: Array.from(punctuation.values()),
  numbers: Array.from(numbers.values()),
};

const CAPITAL = String.fromCharCode(10272);
const NUMBER = String.fromCharCode(10300);
const UNRECOGNIZED = '?';

let openQuotes = true;

const extractWords = (str: string) => {
  // Split up a sentence based on whitespace (" ") and new line ("\n") chars.
  const words = str.split(' ');
  const result: string[] = [];
  for (const word of words) {
    result.push(...word.split('\n'));
  }
  return result;
};

const isBraille = (char: string) => {
  //  Return true if a char is braille.
  if (char.length > 1) return false;
  return (
    braille.letters.includes(char) ||
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
  if (word === '') return word;
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
  if (word === '') return word;
  let result = '';
  for (const char of word) {
    if (/[A-Z]/.test(char)) result += CAPITAL + char.toLowerCase();
    else result += char.toLowerCase();
  }
  return result;
};

const charToBraille = (char: string) => {
  // Convert an alphabetic char to braille.
  if (isBraille(char)) return char;
  else if (char === '\n') return '\n';
  else if (char === '"') {
    openQuotes = !openQuotes;
    if (openQuotes) return punctuation.get('“');
    else return punctuation.get('”');
  } else if (letters.has(char) && /[A-Z]/.test(char)) return CAPITAL + letters.get(char);
  else if (letters.has(char)) return letters.get(char);
  else if (punctuation.has(char)) return punctuation.get(char);
  else console.error('Unrecognized Symbol:', char, 'with UTF code:', char.charCodeAt(0));
  return UNRECOGNIZED;
};

const wordToBraille = (word: string) => {
  // Convert an alphabetic word to braille.
  if (contractions.has(word)) return contractions.get(word);
  else {
    let result = '';
    for (const char of word) result += charToBraille(char);
    return result;
  }
};

const buildBrailleWord = (
  trimmedWord: string,
  shavings: string,
  index: number,
  braille: string
) => {
  // Translate a trimmed word to braille then re-attach the shavings.
  if (shavings === '') braille += wordToBraille(trimmedWord);
  else {
    for (let i = 0; i < shavings.length; i++) {
      if (i === index && trimmedWord !== '') braille += wordToBraille(trimmedWord);
      braille += wordToBraille(shavings[i]);
    }
    if (index === shavings.length)
      // If the shavings are all at the beginning.
      braille += wordToBraille(trimmedWord);
  }
  return braille;
};

const map = (str: string) => {
  // Convert alphabetic text to braille.
  let braille = '';
  const words = extractWords(str);
  for (let word of words) {
    word = numbersHandler(word);
    word = capitalLettersHandler(word);
    const trimmedWord = trim(word); // Remove punctuation (ex: change dog?" to dog)
    const untrimmedWord = word;
    const index = untrimmedWord.indexOf(trimmedWord);
    const shavings = untrimmedWord.replace(trimmedWord, '');
    braille = buildBrailleWord(trimmedWord, shavings, index, braille) + ' ';
  }
  return braille.slice(0, -1); // Remove the final space that was added.
};

export default map;
