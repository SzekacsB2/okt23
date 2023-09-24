let min = 0;
let sec = 0;
let delays = [4000, 2000, 1000, 500, 50];
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
    if (min === 19 && sec === 56) clearInterval(interval);
    if (min === 20 && sec === 23) clearInterval(interval);
    if (min === 45 && sec === 0) clearInterval(interval);
}

document.onkeyup = function (e) {
    switch (e.code) {
        case "Space":
            if (isRunning) {
                clearInterval(interval);
                isRunning = false;
            } else {
                interval = setInterval(updateTimer, delays[speed]);
                isRunning = true;
            }
            break;

        case "ArrowRight":
            speed++;
            if (speed === 5) {
                speed = 4;
                break;
            }
            if (isRunning) {
                clearInterval(interval);
                interval = setInterval(updateTimer, delays[speed]);
            }
            break;

        case "ArrowLeft":
            speed--;
            if (speed === -1) {
                speed = 0;
                break;
            }
            if (isRunning) {
                clearInterval(interval);
                interval = setInterval(updateTimer, delays[speed]);
            }
            break;

        case "KeyN":
            speed = 2;
            if (isRunning) {
                clearInterval(interval);
                interval = setInterval(updateTimer, delays[speed]);
            }
            break;

        case "KeyB":
            if (isRunning) clearInterval(interval);
            min = 0;
            sec = 0;
            speed = 2;
            isRunning = false;
            document.getElementById("min").textContent = "00";
            document.getElementById("sec").textContent = "00";
            break;

        default:
            break;
    }
};
