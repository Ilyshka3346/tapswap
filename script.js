let coinCount = 0;
let energy = 100;
let maxEnergy = 100;
let recoverySpeed = 1000;  // Восстановление энергии каждые 1 секунду
let coinsPerClick = 1;
const coinElement = document.getElementById('coin-count');
const energyElement = document.getElementById('energy');
const clickerImg = document.getElementById('clicker-img');

// Вкладки
const earnTab = document.getElementById('earn-tab');
const boostTab = document.getElementById('boost-tab');
const earnContent = document.getElementById('earn-content');
const boostContent = document.getElementById('boost-content');

// Функция переключения вкладок
function switchTab(tab) {
    if (tab === 'earn') {
        earnTab.classList.add('active');
        boostTab.classList.remove('active');
        earnContent.classList.add('active');
        boostContent.classList.remove('active');
    } else if (tab === 'boost') {
        earnTab.classList.remove('active');
        boostTab.classList.add('active');
        earnContent.classList.remove('active');
        boostContent.classList.add('active');
    }
}

// По умолчанию включена вкладка "Заработать"
switchTab('earn');

// Обработчики для переключения вкладок
earnTab.addEventListener('click', function() {
    switchTab('earn');
});

boostTab.addEventListener('click', function() {
    switchTab('boost');
});

// Load saved progress
function loadProgress() {
    const savedCoins = localStorage.getItem('coins');
    const savedEnergy = localStorage.getItem('energy');
    const savedMaxEnergy = localStorage.getItem('maxEnergy');
    const savedCoinsPerClick = localStorage.getItem('coinsPerClick');
    const savedRecoverySpeed = localStorage.getItem('recoverySpeed');
    
    if (savedCoins !== null) coinCount = parseInt(savedCoins);
    if (savedEnergy !== null) energy = parseInt(savedEnergy);
    if (savedMaxEnergy !== null) maxEnergy = parseInt(savedMaxEnergy);
    if (savedCoinsPerClick !== null) coinsPerClick = parseInt(savedCoinsPerClick);
    if (savedRecoverySpeed !== null) recoverySpeed = parseInt(savedRecoverySpeed);
    
    coinElement.textContent = coinCount.toLocaleString();
    energyElement.textContent = `Энергия: ${energy}/${maxEnergy}`;
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('coins', coinCount);
    localStorage.setItem('energy', energy);
    localStorage.setItem('maxEnergy', maxEnergy);
    localStorage.setItem('coinsPerClick', coinsPerClick);
    localStorage.setItem('recoverySpeed', recoverySpeed);
}

// Increment coin count and decrease energy on click
clickerImg.addEventListener('click', function() {
    if (energy > 0) {
        coinCount += coinsPerClick;
        energy--;
        coinElement.textContent = coinCount.toLocaleString();
        energyElement.textContent = `Энергия: ${energy}/${maxEnergy}`;
        saveProgress();
    } else {
        alert("Недостаточно энергии!");
    }
});

// Energy recovery over time (каждая секунда)
setInterval(function() {
    if (energy < maxEnergy) {
        energy++;
        energyElement.textContent = `Энергия: ${energy}/${maxEnergy}`;
        saveProgress();
    }
}, recoverySpeed);

// Покупка улучшений
document.getElementById('buy-energy').addEventListener('click', function() {
    if (coinCount >= 500) {
        coinCount -= 500;
        maxEnergy += 20;  // Увеличение максимальной энергии на 20
        energyElement.textContent = `Энергия: ${energy}/${maxEnergy}`;
        coinElement.textContent = coinCount.toLocaleString();
        saveProgress();
    } else {
        alert("Недостаточно монет!");
    }
});

document.getElementById('buy-recovery').addEventListener('click', function() {
    if (coinCount >= 1000) {
        coinCount -= 1000;
        recoverySpeed = Math.max(500, recoverySpeed - 500);  // Увеличение скорости восстановления (минимум 500ms)
        coinElement.textContent = coinCount.toLocaleString();
        saveProgress();
    } else {
        alert("Недостаточно монет!");
    }
});

document.getElementById('buy-coins').addEventListener('click', function() {
    if (coinCount >= 2000) {
        coinCount -= 2000;
        coinsPerClick += 1;  // Увеличение количества монет за клик
        coinElement.textContent = coinCount.toLocaleString();
        saveProgress();
    } else {
        alert("Недостаточно монет!");
    }
});

// Load progress on page load
loadProgress();
