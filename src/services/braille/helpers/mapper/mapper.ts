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

  const revBits = (n: number) =>
    ((n & (1 << 5)) >> 5) |
    ((n & (1 << 4)) >> 3) |
    ((n & (1 << 3)) >> 1) |
    ((n & (1 << 2)) << 1) |
    ((n & (1 << 1)) << 3) |
    ((n & (1 << 0)) << 5);

  if (s > 1 << 5) {
    braille += String.fromCharCode(revBits(s >> 6));
  }
  braille += String.fromCharCode(revBits(s));

  return braille;
};

const mapper = (text: string, lang: keyof typeof MAPPERS) => {
  if (lang === 'en') {
    return mapEn(text);
  }
  return text.split('').map(MAPPERS[lang]).map(binToBraille).join('');
};

export default mapper;
