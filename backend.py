import os, time
from flask import Flask, jsonify, request, render_template, send_from_directory, abort

from braille.eng import eng_to_braille
from braille.hin import hin_to_braille

from pdfHandler import read_pdf, write_pdf

path = os.path.abspath("static")
app = Flask(__name__, template_folder=path)

def log_error(*args):
    if __name__ == "__main__":
        print(*args)
    else:
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
@app.route("/demo")
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
        input_text = read_pdf("en")
        print("[LANG]:   ", lang)

        
        if lang=="en":
            braille = eng_to_braille(input_text)
        elif lang=="hi":
            braille = hin_to_braille(input_text)
        else:
            print("Language not found, please try again")

        file_route = write_pdf(braille)

        return jsonify({"route": file_route})
    except Exception as e:
        log_error(e)
        abort(500)
# !SECTION


@app.route("/downloads/<pdf_name>")
def get_pdf(pdf_name):
    return send_from_directory("downloads", pdf_name, as_attachment=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)

