

def janitor(text):
    newtext = ''
    i = 0
    isSpace = False
    while i < len(text) - 1:

        if ord(text[i]) == 10240 and isSpace == False :
            newtext +=text[i]
            isSpace = True
            print("detected", isSpace)

        elif ord(text[i]) != 10240 and isSpace == True:
            newtext+=text[i]
            isSpace = False
            print("detect2", isSpace)
        elif isSpace == False:
            newtext+=text[i]
            print("detect3", isSpace)
        i+=1
    print("Janitor: ", newtext)

    return newtext
    