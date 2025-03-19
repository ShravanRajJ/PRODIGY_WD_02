let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;
let lastLapTime = 0; // Track last lap's recorded time

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    display.innerHTML = formatTime(difference);
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCount = 0;
    lastLapTime = 0; // Reset lap timing
    display.innerHTML = "00:00:00.00";
    lapList.innerHTML = "";
}

function recordLap() {
    if (running) {
        lapCount++;
        let lapDiff = difference - lastLapTime; // Time since last lap
        lastLapTime = difference; // Update last lap reference

        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCount}: ${formatTime(lapDiff)}`;
        lapList.appendChild(lapItem);
    }
}

function formatTime(diff) {
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const milliseconds = Math.floor((diff % 1000) / 10); // Two-digit ms

    return (
        (hours < 10 ? "0" : "") + hours + ":" + 
        (minutes < 10 ? "0" : "") + minutes + ":" + 
        (seconds < 10 ? "0" : "") + seconds + ":" + 
        (milliseconds < 10 ? "0" : "") + milliseconds
    );
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("lapBtn").addEventListener("click", recordLap);
