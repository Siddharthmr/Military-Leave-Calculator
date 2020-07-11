var leaveStartDate, extraLeaveDays, earnedDays, seperationDate, ptdy
var dateArray = []
var terminalLeave = 0
var currentTab2 = 0
var todaysDate = new Date()
document.getElementById("today1").value = new Date().toISOString().substr(0, 10)
document.getElementById("today1").addEventListener("change", function () {
  todaysDate = document.getElementById("today1").value
})
document.getElementsByClassName("calculate")[2].addEventListener("click", calculation2)
document.getElementById("seperate2").addEventListener("click", function () {
  document.getElementById("situation").style.display = "none"
  showTab2(0)
});
document.getElementById("progressBar").style.width = "0%"
document.getElementById("home2").addEventListener("click", function () {
  currentTab2 = 0
  tab = document.getElementsByClassName("tab2")
  for (i = 0; i < tab.length; i++) {
    tab[i].style.display = "none"
  }
  document.getElementById("situation").style.display = "block"
  document.getElementById("progressBar").style.width = "0%"
})
function showTab2(n) {
  var x = document.getElementsByClassName("tab2");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("progressBar").style.width = "25%"
    document.getElementById("percentage").innerHTML = "25%"
  }
  if (n == 1) {
    document.getElementById("progressBar").style.width = "50%"
    document.getElementById("percentage").innerHTML = "50%"
  }
  if (n == 2) {
    document.getElementById("progressBar").style.width = "75%"
    document.getElementById("percentage").innerHTML = "75%"
  }
  if (n == 3) {
    document.getElementById("progressBar").style.width = "100%"
    document.getElementById("percentage").innerHTML = "100%"
  }
}
function nextPrev2(n) {
  var x = document.getElementsByClassName("tab2");
  x[currentTab2].style.display = "none";
  currentTab2 = currentTab2 + n;
  showTab2(currentTab2);
}
document.getElementById("plannedSeperateDate2").addEventListener("change", function () {
  var input = this.value;
  var array = input;
  array = array.split("-");
  dateArray[0] = +array[0]
  dateArray[1] = +array[1]
  dateArray[2] = +array[2]
  seperationDate = new Date(dateArray)
  leaveStartDate = new Date(dateArray);
});
function calculation2() {
  if ((document.getElementById("plannedSeperateDate2") == "") || (extraLeaveDays == "") || (document.getElementById("leaveInput1") == "" && document.getElementById("daysAlreadyEarned1") == "")) {
    document.getElementById("calculatedAmount2").innerHTML = `Please make sure you complete all parts of the form.`
  } else {
    terminalLeave = 0
    if (extraLeaveDays == "no") {
      terminalLeave += 0
      ptdy = 0
    } else if (extraLeaveDays == "30") {
      terminalLeave += 30
      ptdy = 30
    }
    else if (extraLeaveDays == "10") {
      terminalLeave += 10
      ptdy = 10
    }
    if (document.getElementById("leaveInput2").value == "") {
      terminalLeave += +calculateEarnedDays(new Date(`${todaysDate.getFullYear()}-${todaysDate.getMonth() + 2}-1`), new Date(`${+dateArray[0]}-${+dateArray[1]}-1`))
      terminalLeave += +document.getElementById("daysAlreadyEarned1").value
    } else {
      terminalLeave += +document.getElementById("leaveInput2").value
    }
    leaveStartDate.setDate(leaveStartDate.getDate() - terminalLeave)
    var month = leaveStartDate.toLocaleString('default', { month: 'long' });
    var month2 = seperationDate.toLocaleString('default', { month: 'long' });
    document.getElementById("calculatedAmount2").innerHTML = `With a final seperation date of ${month2} ${seperationDate.getDate()}, ${seperationDate.getFullYear()} (${seperationDate.toLocaleDateString('en-US')}), you should start terminal leave on ${month} ${leaveStartDate.getDate()}, ${leaveStartDate.getFullYear()} (${leaveStartDate.toLocaleDateString('en-US')}). This assumes ${ptdy} days of PTDY and ${terminalLeave - ptdy} days of terminal leave, including the leave earned while on terminal leave.`
  }
}
function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}
function calculateEarnedDays(d1, d2) {
  earnedDays = Math.floor(monthDiff(d1, d2) * 2.5)
  return earnedDays
}
document.getElementsByClassName("reset")[2].addEventListener("click", function () {
  seperationDate = new Date(dateArray)
  leaveStartDate = new Date(dateArray);
  terminalLeave = 0
})
function extraLeave() {
  extraLeaveDays = event.srcElement.id
}
