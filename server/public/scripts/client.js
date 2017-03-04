console.log('client.js sourced');
$(document).ready(function(){
  console.log('jquery is sourced');

  $('#createTaskButton').on('click', function(){
    console.log('button clicked');
    $('#displayNewTask').append($('#newTaskName').val());
    $('#displayNewTaskDetails').append($('#newTaskDetails').val());
    $('#displayNewTaskDueDate').append($('#newTaskDueDate').val());
    $('#displayCompleteButton').append('<button type="button" id="completeButton">Complete</button>');
    $('#displayDeleteButton').append('<button type="button" id="deleteButton">Delete</button>');

    $('#completeButton').on('click', function(){
    }); // end of complete button listener

    $('#deleteButton').on('click', function(){
    }); // end of delete button listener

  }); // end of create task button listener






}); // end of document ready
