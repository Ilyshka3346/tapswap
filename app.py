from flask import Flask, request, jsonify

app = Flask(__name__)

# Initial coin count and energy (could be retrieved from a database)
coins = 0
energy = 100
max_energy = 100
recovery_speed = 5000
coins_per_click = 1

@app.route('/update_coins', methods=['POST'])
def update_coins():
    global coins, energy, max_energy, recovery_speed, coins_per_click
    data = request.json
    coins = data.get('coins', coins)
    energy = data.get('energy', energy)
    max_energy = data.get('maxEnergy', max_energy)
    recovery_speed = data.get('recoverySpeed', recovery_speed)
    coins_per_click = data.get('coinsPerClick', coins_per_click)
    return jsonify({'status': 'success', 'coins': coins, 'energy': energy})

if __name__ == '__main__':
    app.run(debug=True)
