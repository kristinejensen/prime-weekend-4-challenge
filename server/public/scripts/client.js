console.log('client.js sourced');
$(document).ready(function(){
  console.log('jquery is sourced');

  displayAllTasks();
  function displayAllTasks() { // creating function to dynamically display tasks on DOM
    $.ajax ({
      type: 'GET',
      url: '/tasks',
      success: function(response){
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
        }
      }
    });
  }

  $('#createTaskButton').on('click', function(){ // event listener to create new task
    var newTaskObject = {};
    newTaskObject.taskName = $('#newTaskName').val();
    newTaskObject.taskDetails = $('#newTaskDetails').val();
    newTaskObject.dueDate = $('#newTaskDueDate').val();
    newTaskObject.complete = null;
    $.ajax ({
      type: 'POST',
      url: '/tasks/new',
      data: newTaskObject,
      success: function(response){
        displayAllTasks();
      }
    })
    $('#newTaskName').val('');
    $('#newTaskDetails').val('');
    $('#newTaskDueDate').val('');
  });

  $('#taskListDisplay').on('click', '.completeButton', function(){ // event listener to mark task as complete
    $(this).css('background-color', 'SeaGreen');
    $(this).parent().prev().css({'background-color': 'SeaGreen', 'text-decoration': 'line-through'});
    $(this).parent().prev().prev().css({'background-color': 'SeaGreen', 'text-decoration': 'line-through'});
    $(this).parent().prev().prev().prev().css({'background-color': 'SeaGreen', 'text-decoration': 'line-through'});
    var idOfTaskToUpdate = $(this).parent().parent().data().id;
    var completeStatus = 'yes';
    var taskObjectToUpdate = {
      complete: completeStatus
    }
    $.ajax({
      type: 'PUT',
      url: '/tasks/complete/' + idOfTaskToUpdate,
      data: taskObjectToUpdate,
      success: function(response){
        console.log(response);
      }
    })
  });

  $('#taskListDisplay').on('click', '.deleteButton', function(){ // event listener to delete task
    var idOfTaskToDelete = $(this).parent().parent().data().id;
    $.ajax({
      type: 'DELETE',
      url: '/tasks/delete/' + idOfTaskToDelete,
      success: function(response){
        console.log(response);
      }
    })
    $(this).parent().parent().empty();
  });

});
