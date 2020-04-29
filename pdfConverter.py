
# from io import StringIO

# from pdfminer.converter import TextConverter
# from pdfminer.layout import LAParams
# from pdfminer.pdfdocument import PDFDocument
# from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
# from pdfminer.pdfpage import PDFPage
# from pdfminer.pdfparser import PDFParser


# def pdf_convert(pdf, lang):
#     output_string = StringIO()
#     parser = PDFParser(pdf)
#     doc = PDFDocument(parser)
#     rsrcmgr = PDFResourceManager()
#     device = TextConverter(rsrcmgr, output_string, laparams=LAParams())
#     interpreter = PDFPageInterpreter(rsrcmgr, device)
#     for page in PDFPage.create_pages(doc):
#         interpreter.process_page(page)
#     return output_string.getvalue()


# if __name__ == "__main__":
#     with open("pdfs/eng/sample.pdf", 'rb') as f:
#         text = pdf_convert(f, 'en')
#     print(text)

import textract, re
import os

def pdf_convert(lang):
    text = textract.process(os.getcwd()+"/out.pdf").decode("utf-8")[:-1]
    print("[PDF_CONVERT]", text)
    re.sub("\n", " ", text)

    return text
