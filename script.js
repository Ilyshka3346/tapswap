let coinCount = 0;
let energy = 100;
let maxEnergy = 100;
let recoverySpeed = 1000; // Восстановление каждые 1 секунда
let coinsPerClick = 1;

let energyLevel = 1;
let rechargeLevel = 1;
let coinClickLevel = 1;
let energyCost = 5000;
let rechargeCost = 3000;
let coinClickCost = 2000;

const coinElement = document.getElementById('coin-count');
const energyElement = document.getElementById('energy');
const clickerImg = document.getElementById('clicker-img');
const energyCostElement = document.getElementById('energy-cost');
const rechargeCostElement = document.getElementById('recharge-cost');
const coinClickCostElement = document.getElementById('coin-click-cost');
const energyLevelElement = document.getElementById('energy-level');
const rechargeLevelElement = document.getElementById('recharge-level');
const coinClickLevelElement = document.getElementById('coin-click-level');

// Функция обновления UI для улучшений
function updateBoostUI() {
    energyCostElement.textContent = energyCost.toLocaleString();
    rechargeCostElement.textContent = rechargeCost.toLocaleString();
    coinClickCostElement.textContent = coinClickCost.toLocaleString();
    energyLevelElement.textContent = `${energyLevel} уровень`;
    rechargeLevelElement.textContent = `${rechargeLevel} уровень`;
    coinClickLevelElement.textContent = `${coinClickLevel} уровень`;
}

// Load saved progress
function loadProgress() {
    const savedCoins = localStorage.getItem('coins');
    const savedEnergy = localStorage.getItem('energy');
    const savedMaxEnergy = localStorage.getItem('maxEnergy');
    const savedCoinsPerClick = localStorage.getItem('coinsPerClick');
    const savedEnergyLevel = localStorage.getItem('energyLevel');
    const savedRechargeLevel = localStorage.getItem('rechargeLevel');
    const savedCoinClickLevel = localStorage.getItem('coinClickLevel');
    const savedEnergyCost = localStorage.getItem('energyCost');
    const savedRechargeCost = localStorage.getItem('rechargeCost');
    const savedCoinClickCost = localStorage.getItem('coinClickCost');

    if (savedCoins) coinCount = parseInt(savedCoins);
    if (savedEnergy) energy = parseInt(savedEnergy);
    if (savedMaxEnergy) maxEnergy = parseInt(savedMaxEnergy);
    if (savedCoinsPerClick) coinsPerClick = parseInt(savedCoinsPerClick);
    if (savedEnergyLevel) energyLevel = parseInt(savedEnergyLevel);
    if (savedRechargeLevel) rechargeLevel = parseInt(savedRechargeLevel);
    if (savedCoinClickLevel) coinClickLevel = parseInt(savedCoinClickLevel);
    if (savedEnergyCost) energyCost = parseInt(savedEnergyCost);
    if (savedRechargeCost) rechargeCost = parseInt(savedRechargeCost);
    if (savedCoinClickCost) coinClickCost = parseInt(savedCoinClickCost);

    coinElement.textContent = coinCount.toLocaleString();
    energyElement.textContent = `Энергия: ${energy}/${maxEnergy}`;
    updateBoostUI();
}

// Save progress
function saveProgress() {
    localStorage.setItem('coins', coinCount);
    localStorage.setItem('energy', energy);
    localStorage.setItem('maxEnergy', maxEnergy);
    localStorage.setItem('coinsPerClick', coinsPerClick);
    localStorage.setItem('energyLevel', energyLevel);
    localStorage.setItem('rechargeLevel', rechargeLevel);
    localStorage.setItem('coinClickLevel', coinClickLevel);
    localStorage.setItem('energyCost', energyCost);
    localStorage.setItem('rechargeCost', rechargeCost);
    localStorage.setItem('coinClickCost', coinClickCost);
}

// Обработка клика по изображению
clickerImg.addEventListener('click', function() {
    if (energy > 0) {
        coinCount += coinsPerClick;
        energy--;
        coinElement.textContent = coinCount.toLocaleString();
        energyElement.textContent = `Энергия: ${energy}/${maxEnergy}`;
        saveProgress();
    } else {
        alert('Недостаточно энергии!');
    }
});

// Покупка улучшения "Увеличение количества энергии"
document.getElementById('buy-energy').addEventListener('click', function() {
    if (coinCount >= energyCost) {
        coinCount -= energyCost;
        maxEnergy += 10;
        energyLevel++;
        energyCost += 2000; // Увеличение стоимости следующего уровня
        updateBoostUI();
        saveProgress();
    } else {
        alert('Недостаточно монет!');
    }
});

// Покупка улучшения "Увеличение скорости восстановления энергии"
document.getElementById('buy-recharge').addEventListener('click', function() {
    if (coinCount >= rechargeCost) {
        coinCount -= rechargeCost;
        recoverySpeed -= 100; // Увеличиваем скорость восстановления
        rechargeLevel++;
        rechargeCost += 1500; // Увеличение стоимости следующего уровня
        updateBoostUI();
        saveProgress();
    } else {
        alert('Недостаточно монет!');
    }
});

// Покупка улучшения "Количество монет за клик"
document.getElementById('buy-coin-click').addEventListener('click', function() {
    if (coinCount >= coinClickCost) {
        coinCount -= coinClickCost;
        coinsPerClick += 1;
        coinClickLevel++;
        coinClickCost += 1000; // Увеличение стоимости следующего уровня
        updateBoostUI();
        saveProgress();
    } else {
        alert('Недостаточно монет!');
    }
});

// Восстановление энергии
setInterval(function() {
    if (energy < maxEnergy) {
        energy++;
        energyElement.textContent = `Энергия: ${energy}/${maxEnergy}`;
        saveProgress();
    }
}, recoverySpeed);

// Переключение вкладок
document.getElementById('earn-tab').addEventListener('click', function() {
    document.getElementById('earn-content').classList.add('active');
    document.getElementById('boost-content').classList.remove('active');
});

document.getElementById('boost-tab').addEventListener('click', function() {
    document.getElementById('boost-content').classList.add('active');
    document.getElementById('earn-content').classList.remove('active');
});

loadProgress();
