let timer;
let initialTime = 300; // 初期は5分 (300秒)
let timeRemaining = initialTime;
let multiplier = 1.5;
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const stopBtn = document.getElementById('stop-btn');
const minutesSelect = document.getElementById('minutes-select');
const secondsSelect = document.getElementById('seconds-select');
const multiplierInput = document.getElementById('multiplier');
const volumeControl = document.getElementById('volume-control');
const testSoundBtn = document.getElementById('test-sound-btn');
const alarmSound = document.getElementById('alarm-sound');
const toggleDarkModeBtn = document.getElementById('toggle-dark-mode-btn');

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
            toggleStopButton(true);
        }
    }, 1000);
}

function pauseTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    initialTime = Math.ceil(initialTime * multiplier);
    timeRemaining = initialTime;
    updateDisplay();
    toggleStopButton(false);
}

function resetTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    setInitialTime();
    updateDisplay();
    toggleStopButton(false);
}

function setInitialTime() {
    const minutes = parseInt(minutesSelect.value, 10);
    const seconds = parseInt(secondsSelect.value, 10);
    initialTime = (minutes * 60) + seconds;
    timeRemaining = initialTime;
    updateDisplay(); // ここでディスプレイを更新します
}

function setMultiplier() {
    multiplier = parseFloat(multiplierInput.value);
}

function setVolume() {
    alarmSound.volume = volumeControl.value;
}

function testSound() {
    alarmSound.currentTime = 0; // 音の再生をリセット
    alarmSound.play();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function toggleStopButton(show) {
    if (show) {
        startBtn.classList.add('hidden');
        pauseBtn.classList.add('hidden');
        resetBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');
    } else {
        startBtn.classList.remove('hidden');
        pauseBtn.classList.remove('hidden');
        resetBtn.classList.remove('hidden');
        stopBtn.classList.add('hidden');
    }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
stopBtn.addEventListener('click', stopTimer);
minutesSelect.addEventListener('change', setInitialTime);
secondsSelect.addEventListener('change', setInitialTime);
multiplierInput.addEventListener('change', setMultiplier);
volumeControl.addEventListener('input', setVolume);
testSoundBtn.addEventListener('click', testSound);
toggleDarkModeBtn.addEventListener('click', toggleDarkMode);

setInitialTime();
updateDisplay();
setVolume();
