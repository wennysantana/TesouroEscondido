// script.js
let score = 0;
let treasures = [];
const totalTreasures = 5; 
const gameTimeInSeconds = 60; 

const treasureSound = new Audio('audios/treasure.mp3');
const emptySound = new Audio('audios/errouu.mp3');
const gameOverSound = new Audio('audios/ng-acertou.mp3');

let timeLeft = gameTimeInSeconds;

function startGame() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('jogo').style.display = 'block';
    initializeMap();
    startTimer();
}

function initializeMap() {
    const map = document.getElementById('map');
    map.innerHTML = '';
    for (let i = 0; i < 25; i++) { 
        const cell = document.createElement('div');
        cell.addEventListener('click', () => checkCell(cell, i));
        map.appendChild(cell);
    }
    placeTreasures();
}

function placeTreasures() {
    treasures = [];
    while (treasures.length < totalTreasures) {
        const randomIndex = Math.floor(Math.random() * 25); 
        if (!treasures.includes(randomIndex)) {
            treasures.push(randomIndex);
        }
    }
}

function checkCell(cell, index) {
    if (cell.classList.contains('checked')) return;

    cell.classList.add('checked');

    if (treasures.includes(index)) {
        cell.classList.add('treasure');
        score++;
        document.getElementById('score').textContent = score;
        treasureSound.play(); 
        if (score === totalTreasures) {
            setTimeout(() => alert('Parabéns! Você encontrou todos os tesouros!'), 100);
        }
    } else {
        emptySound.play(); 
        alert('Nada aqui! Continue procurando.');
    }
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    gameOverSound.play(); 
    setTimeout(() => alert('Game Over! Seu tempo acabou!'), 100);
}
