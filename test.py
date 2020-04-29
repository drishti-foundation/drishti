import os
import sys
import time
from PIL import Image, ImageFont, ImageDraw
from fpdf import FPDF
from pdfConverter import pdf_convert
from textFormatter import formatText
from nmt import nmt
from map_encoding import get_braille


LINE_HEIGHT = 10
LINE_LENGTH = 60

with open("pdfs/eng/sample.pdf", "rb") as pdf:
    english_text = formatText(pdf_convert(pdf, "en"), 'en')
    hindi_text = nmt(english_text)
    braille = get_braille(hindi_text)

    output_pdf = FPDF()
    output_pdf.add_font('font', '', 'font.ttf', uni=True)
    output_pdf.set_font('font', '', 14)
    output_pdf.add_page()
    output_pdf.write(LINE_HEIGHT*2, "BRAILLE")
    output_pdf.ln(LINE_HEIGHT*2)
    for text in [braille[(i-1)*LINE_LENGTH:i*LINE_LENGTH] for i in range(1, round(len(braille)/LINE_LENGTH))]:
        output_pdf.write(LINE_HEIGHT, text)
    output_pdf.ln(LINE_HEIGHT)

    filename = time.time()

    output_pdf.output(f"downloads/{time.time()}.pdf", 'F')

    with open(f"downloads/{time.time()}.txt", 'w+') as f:
        f.write(braille)
