import os, time
import textract, re
from fpdf import FPDF

LINE_HEIGHT = 10
TITLE_HEIGHT = 40
LINE_LENGTH = 40

def read_pdf(lang):
    text = textract.process(os.getcwd()+"/out.pdf").decode("utf-8")[:-1]
    re.sub("\n", " ", text)

    return text

def write_pdf(braille):
    output_pdf = FPDF()
    output_pdf.add_font('font', '', os.path.abspath('font.ttf'), uni=True)
    output_pdf.set_font('font', '', 14)
    output_pdf.add_page()

    output_pdf.write(TITLE_HEIGHT, "Braille")
    output_pdf.ln(LINE_HEIGHT*2)

    for text in [braille[(i-1)*LINE_LENGTH:i*LINE_LENGTH] for i in range(1, round(len(braille)/LINE_LENGTH))]:
        output_pdf.write(LINE_HEIGHT, re.sub('\?*', '', text))
        output_pdf.ln(LINE_HEIGHT)

    file_route = f"downloads/{time.time()}.pdf"
    output_pdf.output(file_route, 'F')
    
    return file_route
