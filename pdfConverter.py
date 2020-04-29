import textract, re
import os

def pdf_convert(lang):
    text = textract.process(os.getcwd()+"/out.pdf").decode("utf-8")[:-1]
    re.sub("\n", " ", text)

    return text
