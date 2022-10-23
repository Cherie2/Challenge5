//Important to wrap the whole JS file for JQuery
$(document).ready(function() {

//Function to display the current day and date  
function today() {
  m = moment();
  var day=$("#currentDay");
  var toDay="";
  toDay=(m.format( "dddd," + " MMMM Do, YYYY"));
  day.append(toDay);
}

//function that creates HTMLstructure of timeslots and how they are listed
function createDiv() {
  var holder=$("#selectable");
  for (let i = 9; i <= 17; i++){  
  var blockDiv=$("<div>").addClass("row time-block").attr("id", i)
  var timeDiv =$("<div>").addClass("col-1 hour").text(i)
  var textArea=$("<textarea>").addClass("col-10 description")
  var saveBtn=$("<button>").addClass("col-1 saveBtn").html("<i class='fas fa-save'>")
  holder.append(blockDiv)
  blockDiv.append(timeDiv).append(textArea).append(saveBtn)
  } 
  return;
}
//Converts military time to standard time
function timeAmPm(){
  $(".hour").each(function() {
    var hour=$(this).text();
    if(hour < 12){
      hour+= " AM";
    }else if(hour == 12){
      hour+= " PM";
    } else {
      hour = (hour-12) + " PM";
    } 
    return $(this).text(hour);
  })
}

var currentHour= moment().hour();
//Function that differentiates timeslots as past, current, or future based on the comparison of present time to timeslots
function timeBlock() {
  $( ".time-block").each(function() {
    var blockHour=$(this).attr("id");
    if( currentHour == blockHour ) {
      $(this).addClass("present");
    }else if (currentHour > blockHour){
      $(this).addClass("past");
    } else {
    $(this).addClass("future");
    }
   })
   return;
}
//need to write function to allow saving of text input inside calendar
//when page is refreshed the text should be saved on page 
function saveTask() {
    $( ".row").each(function(hour,text) {
        var hour=$(this).text();
        var inputText = $(this).find(".description").val();
        localStorage.setItem(hour, JSON.stringify(inputText));
        var save = localStorage.getItem(hour, inputText); 
    })
} 

today();
createDiv();
timeAmPm();
timeBlock();
saveTask();

//created event listener for saveBtn 
var saveBtn=document.querySelector("button");
saveBtn.addEventListener("click", saveTask);
})
