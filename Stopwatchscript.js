let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", addLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 10);
        running = true;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    display.textContent = "00:00:00";
    laps = [];
    updateLaps();
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function addLap() {
    if (running) {
        laps.push(display.textContent);
        updateLaps();
    }
}

function updateLaps() {
    lapsContainer.innerHTML = laps.map((lap, index) => `<li>Lap ${index + 1}: ${lap}</li>`).join("");
}

function pad(unit) {
    return String(unit).padStart(2, "0");
}
