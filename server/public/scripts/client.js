console.log('client.js sourced');
$(document).ready(function(){
  console.log('jquery is sourced');

$('#createTaskButton').on('click', function(){
  var newTaskObject = {};
  newTaskObject.taskName = $('#newTaskName').val();
  newTaskObject.taskDetails = $('#newTaskDetails').val();
  newTaskObject.dueDate = $('#newTaskDueDate').val();
  newTaskObject.complete = null;
  console.log(newTaskObject);
  $.ajax ({
    type: 'POST',
    url: '/tasks/new',
    data: newTaskObject,
    success: function(response){
      console.log(response);
    } // end of ajax success function
  })// end of ajax
}); // end of click listener




}); // end of document ready

// dispalyAllTasks(); // calling dispalyAllTasks function when page loads to display full task list
// function displayAllTasks(){
//   $.ajax({
//     type: 'GET',
//     url: '/tasks',
//     success: function(response) {
//       $('#taskListDisplay').empty();
//   $('#createTaskButton').on('click', function(){
//     console.log('button clicked');
//     $('#displayNewTask').append($('#newTaskName').val());
//     $('#displayNewTaskDetails').append($('#newTaskDetails').val());
//     $('#displayNewTaskDueDate').append($('#newTaskDueDate').val());
//     $('#displayCompleteButton').append('<button type="button" id="completeButton">Complete</button>');
//     $('#displayDeleteButton').append('<button type="button" id="deleteButton">Delete</button>');
//   }); // end of create task button listener
// } // end of success function
// }); // end of ajax call
// } // end of dispalyAllTasks function


// $('#completeButton').on('click', function(){
//   console.log('complete button clicked');
// }); // end of complete button listener
//
// $('#deleteButton').on('click', function(){
//   console.log('delete button clicked');
// }); // end of delete button listener
