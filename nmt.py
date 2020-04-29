import googletrans

translator = googletrans.Translator()

def nmt(text):
    try:
        res = translator.translate(text = text, dest='hi' )
    except Exception as e:
        print(e)
    return res.text
