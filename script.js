let min = 0;
let sec = 0;
let delays = [2000, 1500, 1000, 500, 50, 10];
let normal = 2;
let speed = 2;
let interval;
let isRunning = false;

function updateTimer() {
    sec++;
    if (sec === 60) {
        sec = 0;
        min++;
        if (min === 60) {
            min = 0;
        }
    }

    let minString = String(min).padStart(2, "0");
    let secString = String(sec).padStart(2, "0");
    document.getElementById("min").textContent = minString;
    document.getElementById("sec").textContent = secString;
    if ((min === 19 && sec === 56) || (min === 20 && sec === 23) || (min === 45 && sec === 0)) {
        clearInterval(interval);
        isRunning = false;
    }
}

//#region functions

function pause() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
    } else {
        interval = setInterval(updateTimer, delays[speed]);
        isRunning = true;
    }
}

function increaseSpeed() {
    speed++;
    if (speed === 5) {
        speed = 4;
        return;
    }
    if (isRunning) {
        clearInterval(interval);
        interval = setInterval(updateTimer, delays[speed]);
    }
}

function decreaseSpeed() {
    speed--;
    if (speed === -1) {
        speed = 0;
        return;
    }
    if (isRunning) {
        clearInterval(interval);
        interval = setInterval(updateTimer, delays[speed]);
    }
}

function normalize() {
    speed = normal;
    if (isRunning) {
        clearInterval(interval);
        interval = setInterval(updateTimer, delays[speed]);
    }
}

function reset() {
    if (isRunning) clearInterval(interval);
    min = 0;
    sec = 0;
    speed = normal;
    isRunning = false;
    document.getElementById("min").textContent = "00";
    document.getElementById("sec").textContent = "00";
}

function fastForward() {
    if (isRunning) {
        clearInterval(interval);
        let remainder;
        if (min < 19 || (min === 19 && sec < 56)) {
            remainder = (19 - min) * 60 + 56 - sec;
            console.log("1: " + remainder)
        } else if (min < 20 || (min === 20 && sec < 23)) {
            remainder = (20 - min) * 60 + 23 - sec;
            console.log("2: " + remainder)
        } else {
            remainder = (45 - min) * 60 - sec;
            console.log("3: " + remainder)
        }
        let fFSpeed = (7000/remainder);
        if (remainder < 7) fFSpeed = delays[normal];
        console.log(fFSpeed);
        interval = setInterval(updateTimer, fFSpeed)
    }
}

//#endregion

document.onkeyup = function (e) {
    switch (e.code) {
        case "Space":
            pause();
            break;

        case "ArrowRight":
            increaseSpeed();
            break;

        case "ArrowLeft":
            decreaseSpeed();
            break;

        case "KeyN":
            normalize();
            break;

        case "KeyB":
            reset();
            break;

        case "KeyT":
            fastForward();
            break;

        default:
            break;
    }
};
