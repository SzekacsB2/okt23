const normalSpeeds = [1000, 7000, 700];
const speeds = [10, 100, 1000, 1000, 1000, 1000, 1000, 1000, 1000];
const fastForwardTime = 7000;

let min = 0;
let sec = 0;
let interval;
let isRunning = false;
let normalIndex = 0;

function updateTimer() {
    sec++;
    if (sec === 60) {
        sec = 0;
        min++;
        if (min === 60) {
            min = 0;
        }
    }
    document.getElementById("min").textContent = String(min).padStart(2, "0");
    document.getElementById("sec").textContent = String(sec).padStart(2, "0");
    if (min === 19 && sec === 56) {
        stopTimer(1, "\nP1");
    }
    if (min === 20 && sec === 23) {
        stopTimer(2, "\nP2");
    }
    if (min === 45 && sec === 0) {
        stopTimer(0, "\nP3");
    }
}

//#region functions

function stopTimer(newIndex, message) {
    clearInterval(interval);
    isRunning = false;
    normalIndex = newIndex;
    console.log(message);
}

function toggleTimer() {
    if (isRunning) {
        stopTimer(normalIndex, "\nP")
    } else {
        console.log("\nUP " + min + ":" + sec);
        console.log(normalSpeeds[normalIndex]);
        interval = setInterval(updateTimer, normalSpeeds[normalIndex]);
        isRunning = true;
    }
}

function changeSpeed(n) {
    if (isRunning) {
        clearInterval(interval);
        console.log("\nC " + min + ":" + sec);
        console.log(speeds[n]);
        interval = setInterval(updateTimer, speeds[n]);
    }
}

function normalSpeed() {
    if (isRunning) {
        clearInterval(interval);
        console.log("\nN " + min + ":" + sec);
        console.log(normalSpeeds[normalIndex]);
        interval = setInterval(updateTimer, normalSpeeds[normalIndex]);
    }
}

function reset() {
    if (isRunning) clearInterval(interval);
    min = 0;
    sec = 0;
    normalIndex = 0;
    isRunning = false;
    console.log("\nR");
    document.getElementById("min").textContent = "00";
    document.getElementById("sec").textContent = "00";
}

function fastForward() {
    if (isRunning) {
        clearInterval(interval);
        console.log("\nF " + min + ":" + sec);
        let remainder;
        if (min < 19 || (min === 19 && sec < 56)) {
            remainder = (19 - min) * 60 + 56 - sec;
            console.log("1 " + remainder)
        } else if (min < 20 || (min === 20 && sec < 23)) {
            remainder = (20 - min) * 60 + 23 - sec;
            console.log("2 " + remainder)
        } else {
            remainder = (45 - min) * 60 - sec;
            console.log("3 " + remainder)
        }
        let fastForwardSpeed = (fastForwardTime / remainder);
        console.log(fastForwardSpeed);
        interval = setInterval(updateTimer, fastForwardSpeed)
    }
}

//#endregion

document.onkeyup = function (e) {
    if (e.code.includes('Digit')) {
        let n = parseInt(e.code[5]) - 1;
        changeSpeed(n);
    } else {
        switch (e.code) {
            case "Space":
                toggleTimer();
                break;

            case "KeyN":
                normalSpeed();
                break;

            case "KeyR":
                reset();
                break;

            case "KeyF":
                fastForward();
                break;

            default:
                break;
        }
    }
};
