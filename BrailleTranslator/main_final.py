import printer, alphaToBraille, brailleToAlpha
import warnings
warnings.filterwarnings("ignore") 

def braille_text(inp):
    print(brailleToAlpha.translate(inp))




def text_braille(inp):
    return alphaToBraille.translate(inp)
   
