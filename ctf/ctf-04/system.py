from flask import Flask, request, jsonify, render_template
import base64

app = Flask(__name__)

# Base de datos simulada con usuarios
usuarios = {
    "admin": {"rol": "admin", "mensaje": "El acceso a datos sensibles está restringido."},
    "empleado01": {"rol": "empleado", "mensaje": "Mensaje interno: Kross dejó algo en la API..."},
    "investigador": {"rol": "externo", "mensaje": "No tienes acceso a estos registros."}
}

# Nuevo mensaje oculto dividido en dos partes
parte1 = "Q1RGe0luczFkZV8="
parte2 = "VGhyMzR0X0QzdGVjdGVkfQ=="

# Nueva clave oculta basada en la historia
claves_acceso = {
    "kross_log1": parte1,
    "kross_log2": parte2
}

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/datos', methods=['GET'])
def obtener_datos():
    username = request.args.get('user')
    if username in usuarios:
        return jsonify({"mensaje": usuarios[username]["mensaje"]})
    return jsonify({"error": "Usuario no encontrado"}), 404

@app.route('/hidden', methods=['GET'])
def obtener_parte_flag():
    secret = request.args.get('key')
    if secret in claves_acceso:
        return jsonify({"parte": claves_acceso[secret]})
    return jsonify({"error": "Clave incorrecta"}), 403

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1221, debug=True)
