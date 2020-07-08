function startOver(){
    currentTab = 0
    currentTab1 = 0
    currentTab2 = 0
    leaveStartDate = ""
    conusOrOconus = ""
    earnedDays = 0
    retirementDate = ""
    ptdy = 0
    terminalLeave = 0
    seperationDate = ""
    extraLeaveDays = 0
    dateArray = []
    var tab = document.getElementsByClassName("tab")
    for (i = 0; i < tab.length; i++) {
      tab[i].style.display = "none"
    }
    var tab1 = document.getElementsByClassName("tab1")
    for (i = 0; i < tab1.length; i++) {
      tab1[i].style.display = "none"
    }
    var tab2 = document.getElementsByClassName("tab2")
    for (i = 0; i < tab2.length; i++) {
      tab2[i].style.display = "none"
    }
    document.getElementById("situation").style.display = "block"
    document.getElementById("progressBar").style.width = "0%"
    document.getElementById("enlistmentDate").value = ""
    document.getElementById("plannedRetireDate").value = ""
    document.getElementById("leaveInput").value = ""
    document.getElementById("leaveInput1").value = ""
    document.getElementById("leaveInput2").value = ""
    document.getElementById("plannedSeperateDate").value = ""
    document.getElementById("plannedSeperateDate2").value = ""
  }