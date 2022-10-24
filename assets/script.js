//Function to display the current day and date  
$("#currentDay").text(moment().format("dddd," + " MMMM Do, YYYY"));

//function that creates HTMLstructure of timeblocks and how they are listed,also allows user input to persist on calendar after webpage reload, when saved
function createDiv() {
  var holder = $("#selectable");
  for (let i = 9; i <= 17; i++) {
    var blockDiv = $("<div>").addClass("row time-block").attr("id", i)
    var timeDiv = $("<div>").addClass("col-1 hour").text(i)
    var textArea = $("<textarea>").addClass("col-10 description").text(localStorage.getItem(i))
    var saveBtn = $("<button>").addClass("col-1 saveBtn").html("<i class='fas fa-save'>") 
    holder.append(blockDiv)
//added event listener to saveBtn
    saveBtn.on('click', saveLocal)
    blockDiv.append(timeDiv, textArea, saveBtn)
  }
}

//Converts military time to standard time
function timeAmPm() {
  $(".hour").each(function () {
    var hour = $(this).text();
    if (hour < 12) {
      hour += " AM";
    } else if (hour == 12) {
      hour += " PM";
    } else {
      hour = (hour - 12) + " PM";
    }
    return $(this).text(hour);
  })
}
//Function that saves input to local storage
function saveLocal() {
  var hour = $(this).parent().attr('id')
  var inputText = $(this).siblings('.description').val();
  localStorage.setItem(hour, inputText);
}

//Function that differentiates timeslots as past, current, or future based on the comparison of present time to timeslots
var currentHour = moment().hour();
function timeBlock() {
  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id"));
    if (currentHour === blockHour) {
      $(this).addClass("present");
    } else if (currentHour > blockHour) {
      $(this).addClass("past");
    } else {
      $(this).addClass("future");
    }
  })
}
createDiv();
timeAmPm();
timeBlock();




