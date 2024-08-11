let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10); 
        startStopBtn.innerHTML = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    startStopBtn.innerHTML = 'Start';
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10); 

    display.innerHTML = 
        (minutes < 10 ? "0" + minutes : minutes) + ':' +
        (seconds < 10 ? "0" + seconds : seconds) + ':' +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}

function recordLap() {
    lapCounter++;
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapCounter}: ${display.innerHTML}`;
    laps.appendChild(lapTime);
}
