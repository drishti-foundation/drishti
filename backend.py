import flask
import os
import sys
import time
from flask_cors import CORS
from fpdf import FPDF
from janitor import janitor
import pickle
import webbrowser
from flask import jsonify, request, render_template, send_from_directory

from werkzeug.datastructures import ImmutableMultiDict

from pdfConverter import pdf_convert
from textFormatter import formatText
from nmt import nmt
from map_encoding import get_braille

path = os.path.abspath("static")
app = flask.Flask("__main__", template_folder=path)
CORS(app)

MAX_LENGTH = 2000
LINE_HEIGHT = 10
TITLE_HEIGHT = 40
LINE_LENGTH = 40

# SECTION Routes


@app.route("/")
@app.route("/home")
@app.route("/about")
def main():
    return render_template("index.html")


@app.route("/english", methods=["GET", "POST", "OPTIONS"])
def get_pdf_translate():

    data = dict(request.files)
    print(data)
    if request.method[0].lower() == "o":
        return ""
    print(list(request.files.keys()))
    input_pdf = request.files["file"]

    input_pdf.save("out.pdf")
        
    text = ""
    english_text = pdf_convert("en")
    print("[LENGTH OF TEXT]", len(english_text))
    if len(english_text) >= MAX_LENGTH:
        c = 0
        for i in range((len(english_text)//MAX_LENGTH)+1):
            ceil = min(MAX_LENGTH*(i+1), len(english_text))
            print("[LENGTH OF SUB GOOGLETRANS]", len(english_text[MAX_LENGTH*(i):ceil]))
            text += nmt(english_text[MAX_LENGTH*(i):ceil])
    else:
        text = nmt(english_text)

            

    hindi_text = text
    braille = janitor(get_braille(hindi_text))
    
    

    print("Braille: ", braille)

    output_pdf = FPDF()
    output_pdf.add_font('font', '', 'font.ttf', uni=True)
    output_pdf.set_font('font', '', 14)
    output_pdf.add_page()

    output_pdf.write(TITLE_HEIGHT, "Braille")
    output_pdf.ln(LINE_HEIGHT*2)

    for text in [braille[(i-1)*LINE_LENGTH:i*LINE_LENGTH] for i in range(1, round(len(braille)/LINE_LENGTH))]:
        output_pdf.write(LINE_HEIGHT, text)
    output_pdf.ln(LINE_HEIGHT)

    file_route = f"downloads/{time.time()}.pdf"
    output_pdf.output(file_route, 'F')

    return jsonify({"route": file_route})
# !SECTION

@app.route("/downloads/<pdf_name>")
def get_pdf(pdf_name):
    return send_from_directory("downloads", pdf_name, as_attachment=True)

app.run(host="0.0.0.0")

