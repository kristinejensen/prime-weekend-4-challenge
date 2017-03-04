console.log('client.js sourced');
$(document).ready(function(){
  console.log('jquery is sourced');

  $('#createTaskButton').on('click', function(){
    console.log('button clicked');
    $('#displayNewTask').append($('#newTaskName').val());
    $('#displayNewTaskDetails').append($('#newTaskDetails').val());
    $('#displayNewTaskDueDate').append($('#newTaskDueDate').val());
  }); // end of create task button listener



}); // end of document ready
