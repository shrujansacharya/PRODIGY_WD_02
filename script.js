let startTime, updatedTime, difference;
let isRunning = false;
let interval;
let savedTime = 1800000; // Start at 30 minutes (30 * 60 * 1000 = 1800000 ms)

const display = document.getElementById('display');
const laps = document.getElementById('laps');

function formatTime(ms) {
    let date = new Date(ms);
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    let milliseconds = String(Math.floor(date.getMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
    if (!isRunning) {
        startTime = new Date().getTime() - savedTime;
        interval = setInterval(() => {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;
            display.textContent = formatTime(difference);
        }, 10);
        isRunning = true;
    }
}

function pauseTimer() {
    clearInterval(interval);
    isRunning = false;
    savedTime = difference;
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    display.textContent = "00:30:00"; // Reset display to 30 minutes
    savedTime = 1800000; // Reset saved time to 30 minutes
    laps.innerHTML = "";
}

function recordLap() {
    if (isRunning) {
        let lapTime = formatTime(difference);
        let lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        laps.appendChild(lapItem);
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

// Adding corner lines
const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
corners.forEach(corner => {
    const line = document.createElement('div');
    line.classList.add('corner-line', corner);
    document.body.appendChild(line);
});
