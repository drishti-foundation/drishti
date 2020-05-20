from braille.hin.janitor import janitor
from braille.hin.nmt import nmt
from braille.hin.map_encoding import get_braille

MAX_LENGTH = 2000

def hin_to_braille(inp):
    text = ""
    print("[LENGTH OF TEXT]", len(inp))
    if len(inp) >= MAX_LENGTH:
        for i in range((len(inp)//MAX_LENGTH)+1):
            start = MAX_LENGTH*i
            end = min(MAX_LENGTH*(i+1), len(inp))

            text += nmt(inp[start:end])
    else:
        text = nmt(inp)
    
    return janitor(get_braille(text))