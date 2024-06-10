let timer;
let initialTime = 300; // 初期は5分 (300秒)
let timeRemaining = initialTime;
let multiplier = 1.5;
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const minutesSelect = document.getElementById('minutes-select');
const secondsSelect = document.getElementById('seconds-select');
const multiplierInput = document.getElementById('multiplier');
const volumeControl = document.getElementById('volume-control');
const testSoundBtn = document.getElementById('test-sound-btn');
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
    setInitialTime();
    updateDisplay();
}

function setInitialTime() {
    const minutes = parseInt(minutesSelect.value, 10);
    const seconds = parseInt(secondsSelect.value, 10);
    initialTime = (minutes * 60) + seconds;
    timeRemaining = initialTime;
}

function setMultiplier() {
    multiplier = parseFloat(multiplierInput.value);
}

function setVolume() {
    alarmSound.volume = volumeControl.value;
}

function testSound() {
    alarmSound.play();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
minutesSelect.addEventListener('change', setInitialTime);
secondsSelect.addEventListener('change', setInitialTime);
multiplierInput.addEventListener('change', setMultiplier);
volumeControl.addEventListener('input', setVolume);
testSoundBtn.addEventListener('click', testSound);

setInitialTime();
updateDisplay();
setVolume();
