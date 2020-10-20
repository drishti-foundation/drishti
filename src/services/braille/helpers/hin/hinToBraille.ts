import mapHinToBraille from './mapHinToBraille';

const bin2braille = (s: string) => {
  const hexstr: string = parseInt(s.split('').reverse().join(''), 2).toString(16).slice(0, 2);

  const basehex = '0x2800';
  let braillehex = '';

  if (hexstr.length === 2) {
    braillehex += basehex.slice(0, 4) + hexstr;
    return parseInt(braillehex);
  } else {
    braillehex += basehex.slice(0, 5) + hexstr;
    return parseInt(braillehex);
  }
};

const binStrBraille = (s: string) => {
  let brailleChr = '';
  for (let i = 0; i < Math.floor(s.length / 6); i++) {
    brailleChr += String.fromCharCode(bin2braille(s.slice(6 * i, 6 * i + 6)));
  }
  return brailleChr;
};

const hinToBraille = (s: string) => {
  let text = '';
  for (let i = 0; i < s.length; i++) {
    if (mapHinToBraille.has(s[i])) {
      const bin = mapHinToBraille.get(s[i]) ?? '?';
      text += binStrBraille(bin);
      // if (bin === '000100')
      //   // Halant comes before
      //   text = text.slice(0, i - 1) + text[i] + text[i - 1] + text.slice(i + 1);
    }
  }
  return text;
};

export default hinToBraille;
