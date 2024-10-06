from flask import Flask, jsonify, request

app = Flask(__name__)

# Пример данных игрока
player_data = {
    'coins': 0,
    'energy': 100,
    'max_energy': 100,
    'coins_per_click': 1,
    'recovery_speed': 1000,  # Скорость восстановления энергии
    'energy_level': 12,
    'recharge_level': 4,
    'energy_cost': 300000,
    'recharge_cost': 250000
}

# Получение текущего состояния игрока
@app.route('/progress', methods=['GET'])
def get_progress():
    return jsonify(player_data)

# Обновление состояния игрока
@app.route('/progress', methods=['POST'])
def update_progress():
    data = request.json
    player_data.update(data)
    return jsonify({'status': 'success', 'data': player_data})

if __name__ == '__main__':
    app.run(debug=True)
