def janitor(text):
    newtext = ''
    i = 0
    isSpace = False
    while i < len(text) - 1:

        if ord(text[i]) == 10240 and isSpace == False :
            newtext +=text[i]
            isSpace = True

        elif ord(text[i]) != 10240 and isSpace == True:
            newtext+=text[i]
            isSpace = False

        elif isSpace == False:
            newtext+=text[i]

        i+=1

    return newtext
    