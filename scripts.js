var startTime;
var running = false;
var interval;
var previousLapTime = 0;
var flags = [];

// Start button
function start() {
  if (!running) {
    startTime = new Date().getTime() - previousLapTime;
    interval = setInterval(updateDisplay, 10);
    running = true;
  }
}

// Stop button
function stop() {
  if (running) {
    clearInterval(interval);
    running = false;
  }
}

// Reset button
function reset() {
  stop();
  var display = document.getElementById("display");
  display.innerText = "00:00:00";
  previousLapTime = 0;
  flags = [];
  updateFlags();
}

// Flag button
function flag() {
  if (running) {
    var currentTime = new Date().getTime() - startTime;
    var lapTime = currentTime - previousLapTime;
    previousLapTime = currentTime;
    var flagData = {
      lapNumber: flags.length + 1,
      lapTime: lapTime,
      totalTime: currentTime
    };
    flags.push(flagData);
    updateFlags();
  }
}

// updated Display
function updateDisplay() {
  var currentTime = new Date().getTime() - startTime;
  var minutes = Math.floor(currentTime / (60 * 1000));
  var seconds = Math.floor((currentTime % (60 * 1000)) / 1000);
  var milliseconds = Math.floor((currentTime % 1000) / 10);

  var display = document.getElementById("display");
  display.innerText = pad(minutes) + ":" + pad(seconds) + ":" + pad(milliseconds);
}

// Converts value to string
function pad(value) {
  return value.toString().padStart(2, "0");
}

// updated Flags
function updateFlags() {
    var lapTableBody = document.getElementById("lapTableBody");
    lapTableBody.innerHTML = "";
  
    for (var i = 0; i < flags.length; i++) {
      var lapData = flags[i];
      
      var row = document.createElement("tr");
      
      var lapNumberCell = document.createElement("td");
      lapNumberCell.innerText = lapData.lapNumber;
      
      var lapTimeCell = document.createElement("td");
      lapTimeCell.innerText = formatTime(lapData.lapTime);
      
      var totalTimeCell = document.createElement("td");
      totalTimeCell.innerText = formatTime(lapData.totalTime);
      
      row.appendChild(lapNumberCell);
      row.appendChild(lapTimeCell);
      row.appendChild(totalTimeCell);
      
      lapTableBody.appendChild(row);
    }
}
  
// Format time
function formatTime(time) {
  var minutes = Math.floor(time / (60 * 1000));
  var seconds = Math.floor((time % (60 * 1000)) / 1000);
  var milliseconds = Math.floor((time % 1000) / 10);

  return pad(minutes) + ":" + pad(seconds) + ":" + pad(milliseconds);
}
