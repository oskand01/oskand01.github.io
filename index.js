"use strict";

window.addEventListener("resize", checkDevice);
const hoursSpan = document.getElementById("hour");
const minutesSpan = document.getElementById("minute");
//const secondsSpan = document.getElementById("second");

const alarmContainer = document.getElementById("alarm-container");
const clockContainer = document.querySelector(".clock-container");
const newAlarmButton = document.getElementById("menu");
const saveAlarmButton = document.getElementById("save-alarm-button");
const exitAlarmButton = document.getElementById("exit-alarm-button");
let alarmList = document.getElementById("alarm-list");
let alarms = [];

function Alarm(hour, minute) {
  this.hour = hour;
  this.minute = minute;
  this.alarmTime = `${this.hour}:${this.minute}`;
  this.active = true;
  this.delete = false;
}

function initApp() {
  document.getElementById("date").textContent = getDate();
  setTime();
  uppdateAlarmList();
  initiateNewAlarmButton();
  initiateExitAlarmButton();
  initiateSaveAlarmButton();
  //initCheckInputKey();
}

function checkDevice() {
  if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
    let w = window.innerWidth;
    let h = window.innerHeight;
    if (w > h * 1.5) {
      document.querySelector(".alarm-container").style.height = "45vw;";
      document.body.style.transform = "scale(0.6)";
      document.body.style.height = "100vh";
      document.body.style.position = "relative";
      document.body.style.bottom = "9.5vw";
      document.getElementsByTagName("footer")[0].style.position = "static";
      document.querySelector(".alarm-container").style.minHeight = "18.35vw";
      document.querySelector(".alarm-container").style.minWidth = "100%";
      document.querySelector(".alarm-container").style.marginTop = "0";
    } else {
      document.body.style.transform = "scale(1)";
      document.body.style.height = "100vh";
      document.body.style.position = "static";
      document.getElementsByTagName("footer")[0].style.position = "fixed";
      document.querySelector(".alarm-container").style.minHeight = "75vw";
      document.querySelector(".alarm-container").style.height = "48vw;";
    }
  } else {
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;
    console.log(w, h);
  }
}

function getDate() {
  const date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${date.getFullYear()}-${month}-${day}`;
}

function initiateNewAlarmButton() {
  newAlarmButton.addEventListener("click", () => {
    alarmContainer.style.display = "block";
    clockContainer.style.display = "none";
    newAlarmButton.style.display = "none";
    exitAlarmButton.style.display = "inline-block";
    fillSelectHour();
    fillSelectMinute();
    /* setInputFilter(document.getElementById("input-hour"), function (value) {
      return /^\d{1}$|^[0]{1}\d{1}$|^[1]{1}\d{1}$|^[2]{1}[0-4]{1}$/.test(value);
    });
    setInputFilter(document.getElementById("input-min"), function (value) {
      return /^[0-5]?[0-9]$/.test(value);
    }); */
  });
}

function fillSelectHour() {
  for (let i = 1; i < 24; i++) {
    document.getElementById("hour-list").appendChild(createHourOption(i));
  }
}

function createHourOption(i) {
  let hourOption = document.createElement("li");
  const hourSelected = document.getElementById("alarm-hour")
  hourOption.className = "alarm-option";


  if (i < 10) {
    
    hourOption.textContent = `0${i}`;
  } else {
    
    hourOption.textContent = i;
  }

  hourOption.addEventListener("click", (event) => {
    hourSelected.textContent = event.target.textContent;
    document.getElementById("hour-list").style.display = "none";
    hourSelected.style.display = "inline-block";



  })
  return hourOption;
}

function fillSelectMinute() {
  for (let i = 1; i < 60; i++) {
    document.getElementById("min-list").appendChild(createMinOption(i));
  }
}

function createMinOption(i) {
  const minOption = document.createElement("li");
  const minSelected = document.getElementById("alarm-min")
  
  

  minOption.className = "alarm-option";


  if (i < 10) {
    
    minOption.textContent = `0${i}`;
  } else {
    
    minOption.textContent = i;
  }

  minOption.addEventListener("click", (event) => {
    minSelected.textContent = event.target.textContent;
    document.getElementById("min-list").style.display = "none";
    minSelected.style.display = "inline-block";
    


  })
  return minOption;
}



function initiateExitAlarmButton() {
  exitAlarmButton.addEventListener("click", () => {
    returnToDashboard();
  });
}

function returnToDashboard() {
  clockContainer.style.display = "block";
  alarmContainer.style.display = "none";
  alarmContainer.style.backgroundColor = "#F8F1F1";
  alarmContainer.style.opacity = "100%";
  exitAlarmButton.style.display = "none";
  newAlarmButton.style.display = "inline-block";
}

function initiateSaveAlarmButton() {
  saveAlarmButton.addEventListener("click", () => {
    getInputValue();
  });
}

function saveAlarmAnimation() {
  alarmContainer.style.backgroundColor = "#C0DCBC";
  alarmContainer.style.opacity = "50%";


}

function getInputValue() {
  const hour = document.getElementById("alarm-hour").textContent;
  const min = document.getElementById("alarm-min").textContent;
  console.log(`${hour}:${min}`)
  
  createAlarm(document.getElementById("alarm-hour").textContent, document.getElementById("alarm-min").textContent);
  //saveAlarmAnimation();
  /* setTimeout(() => {
    createAlarm(hour, min);
  }, 400); */
}

/* function checkInputValue(hour, min) {
  if (hour > 23 || hour < 0 || min > 59 || min < 0) {
    return false;
  } else {
    return true;
  }
} */

/* function initCheckInputKey() {
  const hour = document.getElementById("input-hour");
  const min = document.getElementById("input-min");
  const reg = new RegExp(/^\d+$/);
  hour.addEventListener("keydown", (event) => {
    if (event.target.valueOf() != reg) {
      clearInput();
    }
  });
  min.addEventListener("keydown", (event) => {
    if (event.target.valueOf() != reg) {
      clearInput();
    }
  });
} */

/* function clearInput() {
  let inputs = document.querySelectorAll(".alarm-input");
  inputs.forEach((input) => {
    input.value = "";
    input.style.color = "#3D3D3D";
  });
} */

function createAlarm(hour, min) {
  alarms.push(new Alarm(hour, min));
  setTimeout(() => {
    clearAlarmList();
    returnToDashboard();
  }, 200);
}

function clearAlarmList() {
  document.querySelectorAll(".alarm-list-item").forEach((e) => e.remove());
  uppdateAlarmList();
}

function uppdateAlarmList() {
  if (alarms.length < 1) {
    document.querySelector(".alarm-container").style.display = "none";
  } else {
    document.querySelector(".alarm-container").style.display = "block";
    for (let i = 0; i < alarms.length; i++) {
      if (alarms[i].delete === true) {
        alarms.splice(i, 1);
        clearAlarmList();
      } else if (alarms[i].delete === false) {
        createAlarmElements(alarms[i]);
      }
    }
  }
}

function createAlarmElements(obj) {
  alarmList.prepend(createAlarmListItem(obj));
}

function createAlarmListItem(obj) {
  const alarmListItem = document.createElement("li");
  if (obj.active) {
    alarmListItem.className = "alarm-list-item";
  } else {
    alarmListItem.className = "alarm-list-item alarm-list-item-inactive";
  }

  alarmListItem.appendChild(createActiveButton(obj));
  alarmListItem.appendChild(createAlarmHeader(obj));
  alarmListItem.appendChild(createDeleteAlarmButton(obj));
  return alarmListItem;
}

function createAlarmHeader(obj) {
  const alarmHeader = document.createElement("h5");
  alarmHeader.textContent = obj.alarmTime;
  return alarmHeader;
}

function createActiveButton(obj) {
  const activeButton = document.createElement("button");
  activeButton.className = "alarm-button";
  activeButton.appendChild(createActiveButtonImg(obj));
  initActiveButton(activeButton, obj);
  return activeButton;
}

function initActiveButton(activeButton, obj) {
  activeButton.addEventListener("click", () => {
    if (obj.active) {
      obj.active = false;
      activeButton.childNodes[0].src = "/media/alarm.svg";
      activeButton.parentNode.className =
        "alarm-list-item alarm-list-item-inactive";
    } else {
      obj.active = true;
      activeButton.childNodes[0].src = "/media/alarm-fill.svg";
      activeButton.parentNode.className = "alarm-list-item";
    }
  });
}

function createActiveButtonImg(obj) {
  const activeImg = document.createElement("img");
  if (obj.active === true) {
    activeImg.src = "/media/alarm-fill.svg";
  } else {
    activeImg.src = "/media/alarm.svg";
  }
  return activeImg;
}

function createDeleteAlarmButton(obj) {
  let deleteButton = document.createElement("button");
  deleteButton.className = "alarm-button";
  deleteButton.appendChild(createDeleteAlarmButtonImg());
  initDeleteAlarmButton(deleteButton, obj);
  return deleteButton;
}

function initDeleteAlarmButton(deleteButton, obj) {
  deleteButton.addEventListener("click", () => {
    obj.delete = true;
    clearAlarmList();
  });
}

function createDeleteAlarmButtonImg() {
  const deleteImg = document.createElement("img");
  deleteImg.src = "/media/x.svg";
  return deleteImg;
}

function setTime() {
  const time = new Date();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  if (second < 10) {
    second = `0${second}`;
  }

  hoursSpan.textContent = `${hour}:`;
  minutesSpan.textContent = `${minute}`;
  //secondsSpan.textContent = `${second}`;

  if (hour === "00" && minute === "00" && second === "00") {
    document.getElementById("date").textContent = getDate();
  }
  if (second === "00") {
    const alarmCheck = `${hour}:${minute}`;

    if (checkAlarm(alarmCheck)) {
      console.log(alarmCheck);
      transform();
    }
  }
}

function checkAlarm(alarmCheck) {
  for (let i = 0; i < alarms.length; i++) {
    if (alarms[i].alarmTime === alarmCheck) {
      return true;
    }
  }
  return false;
}
//last ten seconds every hour the
function transform() {
  let element = document.getElementById("container");
  element.style.backgroundColor = "#f8cbc9";

  setTimeout(() => {
    element.style.backgroundColor = "#F1F5F9";
  }, 500);
}

//Stole this input filter from: https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}
window.addEventListener("DOMContentLoaded", () => {
  checkDevice();
  initApp();
  setInterval(setTime, 1000);
});
