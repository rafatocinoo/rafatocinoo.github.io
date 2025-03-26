from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Simulación de una base de datos de usuarios
usuarios = {
    "admin": {"rol": "admin", "mensaje": "flag{AP1_M1sconf1g_expl01ted}"},
    "usuario": {"rol": "user", "mensaje": "No tienes permisos para ver esto"}
}

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/datos', methods=['GET'])
def obtener_datos():
    username = request.args.get('user')  # Obtiene el usuario desde la URL
    if username in usuarios:
        return jsonify({"mensaje": usuarios[username]["mensaje"]})
    return jsonify({"error": "Usuario no encontrado"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1221, debug=True)
