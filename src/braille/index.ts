import translate from "googletrans";

import engToBraille from "./eng";
import hinToBraille from "./hin";

const MAX_LENGTH = 10000;

const textToBraille = async (text: string, lang: string) => {
  if (lang === "hi") {
    const toConvert: string[] = [];
    for (let i = 0; i < text.length; i += MAX_LENGTH) {
      toConvert.push(text.slice(i, i + MAX_LENGTH));
    }
    text = (await Promise.all(toConvert.map((text) => translate(text, "hi"))))
      .map((result) => result.text)
      .join();
    return hinToBraille(text);
  } else if (lang === "en") {
    return engToBraille(text);
  } else {
    console.error("Unrecognised language", lang);
    return "Failed";
  }
};

export default textToBraille;
