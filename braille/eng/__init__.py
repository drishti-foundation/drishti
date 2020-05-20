import braille.eng.printer
import braille.eng.alphaToBraille
import braille.eng.brailleToAlpha
import warnings
warnings.filterwarnings("ignore") 

def braille_to_eng(inp):
    return brailleToAlpha.translate(inp)

def eng_to_braille(inp):
    return alphaToBraille.translate(inp)
   
