import os, sys, time
sys.path.append(os.path.abspath("BrailleTranslator"))
import flask
from flask import jsonify, request, render_template, send_from_directory, abort
from fpdf import FPDF
from main_final import text_braille
from janitor import janitor
from pdfConverter import pdf_convert
from textFormatter import formatText
from nmt import nmt
from map_encoding import get_braille
import re
path = os.path.abspath("static")
app = flask.Flask(__name__, template_folder=path)
MAX_LENGTH = 2000
LINE_HEIGHT = 10
TITLE_HEIGHT = 40
LINE_LENGTH = 40
def log_error(*args):
    s = "[" + time.strftime("%d-%m %H:%M:%S") + " IST]   "
    for arg in args:
        s += str(arg) + " "
    s += "\n\n"

    with open(os.path.join(os.getcwd(), "error_logs", "flask.log"), "a+") as f:
        f.write(s)
# SECTION Routes


@app.route("/")
@app.route("/home")
@app.route("/about")
def main():
    return render_template("index.html")


@app.route("/braille", methods=["GET", "POST"])
def get_pdf_translate():
    try:

        if request.method[0].lower() == "o":
            return ""
        input_pdf = request.files["file"]
        lang = request.form["lang"]

        input_pdf.save("out.pdf")
        english_text = pdf_convert("en")
        print("[LANG]:   ", lang)

        
        if lang=="en":
            braille = text_braille(english_text)
        elif lang=="hi":
            text = ""
            print("[LENGTH OF TEXT]", len(english_text))
            if len(english_text) >= MAX_LENGTH:
                c = 0
                for i in range((len(english_text)//MAX_LENGTH)+1):
                    ceil = min(MAX_LENGTH*(i+1), len(english_text))
                    text += nmt(english_text[MAX_LENGTH*(i):ceil])
            else:
                text = nmt(english_text)

            
            hindi_text = text
            braille = janitor(get_braille(hindi_text))
        else:
            print("Language not found, please try again")
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

        return jsonify({"route": file_route})
    except Exception as e:
        log_error(e)
        abort(500)
# !SECTION


@app.route("/downloads/<pdf_name>")
def get_pdf(pdf_name):
    return send_from_directory("downloads", pdf_name, as_attachment=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0")

