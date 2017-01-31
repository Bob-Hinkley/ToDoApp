$(function() {
  console.log('Doc is ready!');

  //grabing list of tasks on page load
  getTask();

  //adding new task
$('#todo-form').on('submit', addTask);
  //deleting task
$('#task-list').on('click', '.delete', deleteTask);
$('#task-list').on('click', '.complete', completeTask);

});

  //Adds new task from #todo-form
function addTask (event) {
  event.preventDefault();

  var formData = $(this).serialize();
  console.log('Adding task ', formData);

  $.ajax({
    url: '/task',
    type: 'POST',
    data: formData,
    success: getTask
  });
}

  //grabs all tasks from the DB
function getTask () {
  $.ajax({
    url: '/task',
    type: 'GET',
    success: displayTask
  });
};


  //Displays all tasks on the dOM
function displayTask (taskList) {
  $('#task-list').empty();
  // console.log('Task List: ', taskList)
  taskList.forEach(function(task){
    var $li = $('<li name="message"><p></p></li>');
    var $form = $('<form></form>');

    //Appending all tasks in UL
    if (task.complete) {
    $form.append(task.message).css('background-color', 'lightgreen');
    } else {
    $form.append(task.message);
    }

    //complete button is created for each list item
    var $completeButton = $('<button class="complete" name="complete"><span class="glyphicon glyphicon-ok"></span></button>');
    $completeButton.data('id', task.id);
    $form.append($completeButton);

    //delete button is created for each list item
    var $deleteButton = $('<button class="delete" name="delete"><span class="glyphicon glyphicon-ban-circle"></span></button>');
    $deleteButton.data('id', task.id);
    $form.append($deleteButton);

    $li.append($form);
    //Appending the actual dom
    $('#task-list').append($li);
  });
}

  //logic for deleting a task
function deleteTask(event) {
  event.preventDefault();
  $.ajax({
    url: '/task/' + $(this).data('id'),
    type: 'DELETE',
    success: getTask
  });
};

function completeTask (event) {
  // event.preventDefault();
  var myId = $(this).data('id');
  console.log('completeButton has been clicked: ', myId)
  //send id to server in object
  var objToSend = {
    id: myId
  };
  $.ajax({
    url: '/task',
    type: 'PUT',
    data: objToSend
  })
}
