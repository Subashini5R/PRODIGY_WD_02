document.addEventListener('DOMContentLoaded', function() {
    let startTime;
    let updatedTime;
    let difference = 0;
    let tInterval;
    let running = false;

    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const resetButton = document.getElementById('resetButton');
    const display = document.getElementById('display');

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);

    function startTimer() {
        if (!running) {
            startTime = new Date().getTime() - difference;
            tInterval = setInterval(getShowTime, 10); // Update display every 10 milliseconds
            running = true;
            startButton.disabled = true;
            stopButton.disabled = false;
            resetButton.disabled = false;
        }
    }

    function stopTimer() {
        if (running) {
            clearInterval(tInterval);
            difference = new Date().getTime() - startTime;
            running = false;
            startButton.disabled = false;
            stopButton.disabled = true;
            resetButton.disabled = false;
        }
    }

    function resetTimer() {
        clearInterval(tInterval);
        running = false;
        difference = 0;
        display.innerHTML = "00:00:00.000";
        startButton.disabled = false;
        stopButton.disabled = true;
        resetButton.disabled = true;
    }

    function getShowTime() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;

        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        let milliseconds = Math.floor((difference % 1000) / 10);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

        display.innerHTML = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
    }
});
