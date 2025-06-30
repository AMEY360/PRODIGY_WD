let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');
const clickSound = document.getElementById('click-sound');

// Load laps from local storage
window.onload = () => {
    const savedLaps = JSON.parse(localStorage.getItem('laps')) || [];
    savedLaps.forEach(lap => addLapToList(lap.time, lap.id));
};

function playClick() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function updateTime() {
    const currentTime = Date.now() - startTime + elapsedTime;
    const milliseconds = Math.floor(currentTime % 1000);
    const seconds = Math.floor((currentTime / 1000) % 60);
    const minutes = Math.floor((currentTime / (1000 * 60)) % 60);
    const hours = Math.floor((currentTime / (1000 * 60 * 60)) % 24);

    display.textContent = 
        `${hours.toString().padStart(2, '0')}:` +
        `${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}.` +
        `${milliseconds.toString().padStart(3, '0')}`;
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        playClick();
        isRunning = true;
        startTime = Date.now();
        timerInterval = setInterval(updateTime, 10);
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
});

pauseButton.addEventListener('click', () => {
    if (isRunning) {
        playClick();
        isRunning = false;
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
});

resetButton.addEventListener('click', () => {
    playClick();
    isRunning = false;
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    display.textContent = "00:00:00.000";
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
    lapsContainer.innerHTML = '';
    localStorage.removeItem('laps');
});

lapButton.addEventListener('click', () => {
    playClick();
    const lapTime = display.textContent;
    const lapId = Date.now().toString();
    addLapToList(lapTime, lapId);

    // Save lap to local storage
    const savedLaps = JSON.parse(localStorage.getItem('laps')) || [];
    savedLaps.push({ id: lapId, time: lapTime });
    localStorage.setItem('laps', JSON.stringify(savedLaps));
});

function addLapToList(time, id) {
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `${time} <button class="delete-btn" onclick="deleteLap('${id}', this)">Delete</button>`;
    lapsContainer.appendChild(lapItem);
}

window.deleteLap = function (id, button) {
    // Remove from local storage
    let savedLaps = JSON.parse(localStorage.getItem('laps')) || [];
    savedLaps = savedLaps.filter(lap => lap.id !== id);
    localStorage.setItem('laps', JSON.stringify(savedLaps));

    // Remove from DOM
    const lapItem = button.parentElement;
    lapsContainer.removeChild(lapItem);
};
