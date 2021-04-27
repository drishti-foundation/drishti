import mapHi from './hi';
import mapEn from './en';

const MAPPERS = {
  hi: mapHi,
  ma: mapHi,
  sa: mapHi,
  en: mapEn,
};

/*
 * Converts a binary representation of a braille character to unicode braille character
 */
const binToBraille = (s: number | '?') => {
  if (s === '?') return '?';

  let braille = '';

  // Converts the braille number to braille
  // The braille number is in the following format
  //
  //   1 4
  //   2 5
  //   3 6
  //
  // So for the braille character '⠫', the number is 0b110101
  //
  // - first it reverses the bits
  //   eg: 0b110101 -> 0b101011
  // - then it adds 0x2800 which is one less than code point of the first unicode character (⠁)
  const getBrailleCharCode = (n: number) =>
    0x2800 +
    (((n & (1 << 5)) >> 5) |
      ((n & (1 << 4)) >> 3) |
      ((n & (1 << 3)) >> 1) |
      ((n & (1 << 2)) << 1) |
      ((n & (1 << 1)) << 3) |
      ((n & (1 << 0)) << 5));

  // Some characters map to 2 braille characters
  if (s > 1 << 6) {
    braille += String.fromCharCode(getBrailleCharCode(s >> 6));
  }

  braille += String.fromCharCode(getBrailleCharCode(s));

  return braille;
};

const mapper = (text: string, lang: keyof typeof MAPPERS) => {
  if (lang === 'en') {
    return mapEn(text);
  }
  return text.split('').map(MAPPERS[lang]).map(binToBraille).join('');
};

export default mapper;
