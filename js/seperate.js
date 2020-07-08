var leaveStartDate, earnedDays, seperationDate
var dateArray = []
var terminalLeave = 0
var currentTab1 = 0
document.getElementsByClassName("calculate")[1].addEventListener("click", calculation1)
document.getElementById("seperate").addEventListener("click", function () {
  document.getElementById("situation").style.display = "none"
  showTab1(0)
});
document.getElementById("progressBar").style.width = "0%"
document.getElementById("home1").addEventListener("click", function () {
  currentTab1 = 0
  tab = document.getElementsByClassName("tab1")
  for (i = 0; i < tab.length; i++) {
    tab[i].style.display = "none"
  }
  document.getElementById("situation").style.display = "block"
  document.getElementById("progressBar").style.width = "0%"
})
function showTab1(n) {
  var x = document.getElementsByClassName("tab1");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("progressBar").style.width = "33%"
    document.getElementById("percentage").innerHTML = "33%"
  }
  if (n == 1) {
    document.getElementById("progressBar").style.width = "66%"
    document.getElementById("percentage").innerHTML = "66%"
  }
  if (n == 2) {
    document.getElementById("progressBar").style.width = "100%"
    document.getElementById("percentage").innerHTML = "100%"
  }
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "block";
  }
}
function nextPrev1(n) {
  var x = document.getElementsByClassName("tab1");
  x[currentTab1].style.display = "none";
  currentTab1 = currentTab1 + n;
  showTab1(currentTab1);
}
document.getElementById("plannedSeperateDate").addEventListener("change", function () {
  var input = this.value;
  var array = input;
  array = array.split("-");
  dateArray[0] = +array[0]
  dateArray[1] = +array[1]
  dateArray[2] = +array[2]
  seperationDate = new Date(dateArray)
  leaveStartDate = new Date(dateArray);
});
function calculation1() {
  if (document.getElementById("plannedSeperateDate") == "") {
    document.getElementById("calculatedAmount1").innerHTML = `Please make sure you complete all parts of the form.`
  } else {
    terminalLeave = 0
    terminalLeave += +calculateEarnedDays(new Date(`${+dateArray[0] - 1}-10-1`), new Date(`${+dateArray[0]}-${+dateArray[1]}-${+dateArray[2]}`))
    if (document.getElementById("leaveInput1").value == "") {
      terminalLeave += 60
    } else {
      terminalLeave += +document.getElementById("leaveInput1").value
    }
    leaveStartDate.setDate(leaveStartDate.getDate() - terminalLeave)
    var leaveStartMonth = leaveStartDate.toLocaleString('default', { month: 'long' });
    var serperationMonth = seperationDate.toLocaleString('default', { month: 'long' });
    document.getElementById("calculatedAmount1").innerHTML = `With a final seperation date of ${serperationMonth} ${seperationDate.getDate()}, ${seperationDate.getFullYear()} (${seperationDate.toLocaleDateString('en-US')}), you should start terminal leave on ${leaveStartMonth} ${leaveStartDate.getDate()}, ${leaveStartDate.getFullYear()} (${leaveStartDate.toLocaleDateString('en-US')}). This assumes ${terminalLeave} days of terminal leave, including the leave earned while on terminal leave (${earnedDays}).`
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
document.getElementsByClassName("reset")[1].addEventListener("click", function () {
  seperationDate = new Date(dateArray)
  leaveStartDate = new Date(dateArray);
  terminalLeave = 0
})
