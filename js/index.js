//Main start over function - resets all values
function startOver() {
  currentTab = 0
  leaveStartDate = ""
  conusOrOconus = ""
  earnedDays = 0
  retirementDate = ""
  ptdy = 0
  terminalLeave = 0
  separationDate = ""
  extraLeaveDays = 0
  input = ""
  var retirementTab = document.getElementsByClassName("retirement-tab")
  for (i = 0; i < retirementTab.length; i++) {
    retirementTab[i].style.display = "none"
  }
  var separationTab = document.getElementsByClassName("separation-tab")
  for (i = 0; i < separationTab.length; i++) {
    separationTab[i].style.display = "none"
  }
  var involuntaryseparationTab = document.getElementsByClassName("involuntary-separation-tab")
  for (i = 0; i < involuntaryseparationTab.length; i++) {
    involuntaryseparationTab[i].style.display = "none"
  }
  document.getElementById("situation").style.display = "block"
  document.getElementById("progressBar").style.width = "0%"
  var elements = document.querySelectorAll("#extraLeaveDays, #enlistmentDate, #plannedRetireDate, #leaveInput, #leaveInput1, #leaveInput2, #plannedSeparateDate, #plannedInvSeparateDate")
  for (i = 0; i < elements.length; i++) {
    elements[i].value = ""
  }
  var elements = document.querySelectorAll("#no, #yes-extraLeave, #yes-ptdy, #oconus, #conus")
  for (i = 0; i < elements.length; i++) {
    elements[i].style.borderColor = "transparent"
  }
  document.getElementById("extraLeaveDays").style.display = "none"
}
//Event Listeners
document.getElementsByClassName("leaveInput")[0].addEventListener("input", function () {
  document.getElementsByClassName("daysAlreadyEarned")[0].value = ""
})
document.getElementsByClassName("leaveInput")[1].addEventListener("input", function () {
  document.getElementsByClassName("daysAlreadyEarned")[1].value = ""
})
document.getElementsByClassName("leaveInput")[2].addEventListener("input", function () {
  document.getElementsByClassName("daysAlreadyEarned")[2].value = ""
})
document.getElementsByClassName("daysAlreadyEarned")[0].addEventListener("input", function () {
  document.getElementsByClassName("leaveInput")[0].value = ""
})
document.getElementsByClassName("daysAlreadyEarned")[1].addEventListener("input", function () {
  document.getElementsByClassName("leaveInput")[1].value = ""
})
document.getElementsByClassName("daysAlreadyEarned")[2].addEventListener("input", function () {
  document.getElementsByClassName("leaveInput")[2].value = ""
})




//Other functions used for calculation  
function calculateEarnedDays(d1, d2) {
  earnedDays = Math.floor(monthDiff(d1, d2) * 2.5)
  return earnedDays
}
function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

//Navigation
function showTab(n, x) {
  x[n].style.display = "block";
  var percentage = `${Math.floor(100 / x.length * currentTab + 100 / x.length)}%`
  document.getElementById("progressBar").style.width = percentage
  document.getElementById("percentage").innerHTML = percentage
}
function nextPrev(n) {
  var x
  if (event.srcElement.parentElement.parentElement.className.includes("tab")) {
    x = document.getElementsByClassName(event.srcElement.parentElement.parentElement.classList[0])
  } else {
    x = document.getElementsByClassName(event.srcElement.parentElement.parentElement.parentElement.classList[0])
  }
  console.log(x)
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  showTab(currentTab, x);
}