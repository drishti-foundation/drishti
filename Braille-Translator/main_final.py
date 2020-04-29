import printer, alphaToBraille, brailleToAlpha


def braille_text(inp):
    print(brailleToAlpha.translate(inp))




def text_braille(inp):
    return alphaToBraille.translate(inp)
   