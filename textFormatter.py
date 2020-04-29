import time


def formatText(text, lang):
    text = text.replace('	', ' ').replace('  ', ' ').replace('\n', ' ')
    i = 1
    c = 0
    ordOfAscii = [44, 59, 58, 124, 33, 63, 45, 8211, 42, 40, 41]
    while i <= (len(text) - 1):

        if ord(text[i]) == 12:
            text = text[:12] + text[13:]
            # i-=1
        elif ord(text[i]) == 9:
            text = text[:i] + text[i+1:]
        elif text[i-1].isalnum() and text[i].isspace():
            c = i+1
            # i-=1
        elif text[i].isalnum and text[i-1].isspace():
            text = text[:c+1] + text[i:]
            c
            # i-=1
        elif not (text[i].isalnum() or text[i].isspace() or (ord(text[i]) in ordOfAscii)):
            text = text[:i] + text[i+1:]
            # i-=1
        elif ord(text[i]) == 10 and ord(text[i-1]) == 10:
            text = text[:i] + text[i+1:]
            # i-=1
        i += 1
        print(i)
    return text
