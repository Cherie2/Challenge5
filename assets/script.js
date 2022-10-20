//Important to wrap the whole JS file for JQuery
$(document).ready(function() {

//Function to display the current day and date  
function today() {
  m = moment();
  var day=$("#currentDay");
  var toDay="";
  toDay=(m.format( "dddd," + " MMMM Do"));
  day.append(toDay);
}

//function that creates HTMLstructure of timeslots and how they are listed
var currentHour= moment().hour();
//var amPm= moment().format("hA");
//make another variable in if statement for i >12
function createDiv() {
  var holder=$("#selectable");
  for (let i = 9; i <= 17; i++){
  var blockDiv=$("<div>").addClass("row time-block").attr("id", i)
  var timeDiv =$("<div>").addClass("col-1 hour").text(i)
  var textArea=$("<textarea>").addClass("col-10 description")
  var saveBtn=$("<button>").addClass("col-1 saveBtn").html("<i class='fas fa-save'>")
  blockDiv.append(timeDiv).append(textArea).append(saveBtn)
  holder.append(blockDiv)
  }
  //console.log("#selectable");
}
  function displayCurrentHour(hour){
    var hour=" ";
    if(hour<12){
      hour+= " AM";
    }else{
      hour+= " PM";
    }
  }

//It differentiates timeslots as past, current, or future based on the comparison of present time to timeslots
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
}
//need to write function to allow saving of text input inside calendar
//when page is refreshed the text should be saved on page 
function saveTask(event) {
    if(event === "click"){
    $( ".description").each(function(){
    var inputText = $(this).text();
    var task=document.querySelector(".description");
    inputText.innerText=task;
    console.log(inputText);
    localStorage.setItem("Tasks", JSON.stringify(inputText));
    localStorage.getItem("Tasks");
  })
//create event listener for saveBtn, parent is timeBlock
//time and value saved in local storage
   }
}
today();
createDiv();
displayCurrentHour();
timeBlock();
saveTask();
 saveBtn=document.querySelector("textarea");
 saveBtn.addEventListener("click", saveTask);
})
