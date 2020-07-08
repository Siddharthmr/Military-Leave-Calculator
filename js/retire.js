var leaveStartDate, conusOrOconus, earnedDays, retirementDate, ptdy, terminalLeave
var dateArray = []
var currentTab = 0
var calculateBtn = document.getElementsByClassName("calculate")[0]
var progressPercetage = document.getElementById("percentage")

calculateBtn.addEventListener("click", calculation)
document.getElementById("retire").addEventListener("click", function () {
  document.getElementById("situation").style.display = "none"
  showTab(0)
});
document.getElementById("progressBar").style.width = "0%"
document.getElementById("home").addEventListener("click", function () {
  currentTab = 0
  var tab = document.getElementsByClassName("tab")
  for (i = 0; i < tab.length; i++) {
    tab[i].style.display = "none"
  }
  document.getElementById("situation").style.display = "block"
  document.getElementById("progressBar").style.width = "0%"
})
function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    progressPercetage.innerHTML = "25%"
    document.getElementById("progressBar").style.width = "25%"
  }
  if (n == 1) {
    progressPercetage.innerHTML = "50%"
    document.getElementById("progressBar").style.width = "50%"
  }
  if (n == 2) {
    progressPercetage.innerHTML = "75%"
    document.getElementById("progressBar").style.width = "75%"
  }
  if (n == 3) {
    progressPercetage.innerHTML = "100%"
    document.getElementById("progressBar").style.width = "100%"
  }
}
function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  showTab(currentTab);
}
document.getElementById("plannedRetireDate").addEventListener("change", function () {
  var input = this.value;
  var array = input;
  array = array.split("-");
  dateArray[0] = +array[0]
  if (+array[2] == 1) {
    dateArray[1] = +array[1]
    dateArray[2] = +array[2]
  } else {
    dateArray[1] = +array[1] + 1
    dateArray[2] = +array[2] - (+array[2] - 1)
  }
  retirementDate = new Date(dateArray)
  leaveStartDate = new Date(dateArray);
});
document.getElementById("enlistmentDate").addEventListener("change", function () {
  var input = this.value;
  var array = input;
  array = array.split("-");
  dateArray[0] = +array[0] + 20
  if (+array[2] == 1) {
    dateArray[1] = +array[1]
    dateArray[2] = +array[2]
  } else {
    dateArray[1] = +array[1] + 1
    dateArray[2] = +array[2] - (+array[2] - 1)
  }
  retirementDate = new Date(dateArray)
  leaveStartDate = new Date(dateArray);
});
function conus() {
  conusOrOconus = event.srcElement.id
}
function calculation() {
  terminalLeave = 0
  if (conusOrOconus == "" || (document.getElementById("plannedRetireDate").value == "" && document.getElementById("enlistmentDate").value == "")) {
    document.getElementById("calculatedAmount").innerHTML = `Please make sure you complete all parts of the form.`
  } else {
    if (conusOrOconus == "conus") {
      terminalLeave += 20
      ptdy = 20
    } else if (conusOrOconus == "oconus") {
      terminalLeave += 30
      ptdy = 30
    }
    if (document.getElementById("leaveInput").value == "") {
      terminalLeave += 60
    } else {
      terminalLeave += +document.getElementById("leaveInput").value
    }
    terminalLeave += +calculateEarnedDays(new Date(`${+dateArray[0] - 1}-10-1`), new Date(`${+dateArray[0]}-${+dateArray[1]}-1`))
    leaveStartDate.setDate(leaveStartDate.getDate() - terminalLeave)
    var month = leaveStartDate.toLocaleString('default', { month: 'long' });
    var month2 = retirementDate.toLocaleString('default', { month: 'long' });
    document.getElementById("calculatedAmount").innerHTML = `With a final retirement date of ${month2} ${retirementDate.getDate()}, ${retirementDate.getFullYear()} (${retirementDate.toLocaleDateString('en-US')}), you should start terminal leave on ${month} ${leaveStartDate.getDate()}, ${leaveStartDate.getFullYear()} (${leaveStartDate.toLocaleDateString('en-US')}). This assumes ${ptdy} days of PTDY and ${terminalLeave} days of terminal leave, including the leave earned while on terminal leave (${earnedDays}).`
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
document.getElementsByClassName("reset")[0].addEventListener("click", function () {
  retirementDate = new Date(dateArray)
  leaveStartDate = new Date(dateArray);
  terminalLeave = 0
})

