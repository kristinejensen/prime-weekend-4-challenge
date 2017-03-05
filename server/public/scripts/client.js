console.log('client.js sourced');
$(document).ready(function(){
  console.log('jquery is sourced');

  displayAllTasks();
  function displayAllTasks() {
    $.ajax ({
      type: 'GET',
      url: '/tasks',
      success: function(response){
        console.log(response);
        $('#taskListDisplay').empty();
        for (var i = 0; i < response.length; i++) {
          var currentTask = response[i];
          var $newTask = $('<tr>');
          $newTask.data('id', currentTask.id);
          $newTask.append('<td class="taskColor">' + currentTask.task_name + '</td>');
          $newTask.append('<td class="taskColor">' + currentTask.details + '</td>');
          $newTask.append('<td class="taskColor">' + currentTask.due_date + '</td>');
          $newTask.append('<td><button class="completeButton">Complete</button></td>');
          $newTask.append('<td><button class="deleteButton">Delete</button></td>');
          $('#taskListDisplay').append($newTask);
        } // end of for loop
      } // end of ajax response function
    }); // end of ajax call
  } // end of displayAllTasks function


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
        displayAllTasks();
      }
    })
  }); // end of click listener

  $('#taskListDisplay').on('click', '.completeButton', function(){
    console.log('complete button clicked');
    $(this).css({'background-color': 'SeaGreen', 'text-decoration': 'line-through'});
    $(this).parent().prev().css({'background-color': 'SeaGreen', 'text-decoration': 'line-through'});
    $(this).parent().prev().prev().css({'background-color': 'SeaGreen', 'text-decoration': 'line-through'});
    $(this).parent().prev().prev().prev().css({'background-color': 'SeaGreen', 'text-decoration': 'line-through'});
  }); // end of complete button listener


}); // end of document ready




// $('#deleteButton').on('click', function(){
//   console.log('delete button clicked');
// }); // end of delete button listener
