let timer;
let timeRemaining = 300; // 初期は5分 (300秒)
let initialTime = 300;
let multiplier = 1.5;
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const initialTimeInput = document.getElementById('initial-time');
const multiplierInput = document.getElementById('multiplier');
const alarmSound = document.getElementById('alarm-sound');

function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timer) return; // 既にタイマーが動いている場合は何もしない
    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            alarmSound.play();
        }
    }, 1000);
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        timeRemaining = Math.ceil(timeRemaining * multiplier);
        updateDisplay();
    }
}

function resetTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    timeRemaining = initialTime;
    updateDisplay();
}

function setInitialTime() {
    initialTime = parseInt(initialTimeInput.value, 10) * 60;
    resetTimer();
}

function setMultiplier() {
    multiplier = parseFloat(multiplierInput.value);
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
initialTimeInput.addEventListener('change', setInitialTime);
multiplierInput.addEventListener('change', setMultiplier);

updateDisplay();
