const selectMenu = document.querySelectorAll("select"),
  currentTime = document.querySelector("#time"),
  setAlarmBtn = document.querySelector("button"),
  content = document.querySelector(".alarm");

let alarmTime,
  ringTone = new Audio("./files/ringtone.mp3"),
  isAlarmSet = false;
// option selection
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// current Time setting
setInterval(() => {
  // getting hour, mins, secs
  let date = new Date();
  (h = date.getHours()),
    (m = date.getMinutes()),
    (s = date.getSeconds()),
    (ampm = "AM");

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  // if the hour value is 0, set it to 12
  h = h == 0 ? (h = 12) : h;
  // adding 0 if less than 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currentTime.innerHTML = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime == `${h}:${m} ${ampm}`) {
    ringTone.play();
    ringTone.loop = true;
  }
}, 1000);

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringTone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return (isAlarmSet = false);
  }
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please, select a valid time to set an Alarm!");
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
}
setAlarmBtn.addEventListener("click", setAlarm);
