$(function() {
  console.log('Doc is ready!');

  getTask();

$('#todo-form').on('submit', addTask);
$('#task-list').on('click', '.delete', deleteTask);
});

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

function getTask () {
  $.ajax({
    url: '/task',
    type: 'GET',
    success: displayTask
  });
};



function displayTask (taskList) {
  $('#task-list').empty();
  // console.log('Task List: ', taskList)
  taskList.forEach(function(task){
    var $li = $('<li name="message"><p></p></li>');
    var $form = $('<form></form>');

    $form.append(task.message);

    var $completeButton = $('<button class="complete" name="complete"><span class="glyphicon glyphicon-ok"></span></button>');
    $completeButton.data('id', task.id);
    $form.append($completeButton);

    var $deleteButton = $('<button class="delete" name="delete"><span class="glyphicon glyphicon-ban-circle"></span></button>');
    $deleteButton.data('id', task.id);
    $form.append($deleteButton);

    $li.append($form);
    $('#task-list').append($li);
  });
}

function deleteTask(event) {
  event.preventDefault();
  $.ajax({
    url: '/task/' + $(this).data('id'),
    type: 'DELETE',
    success: getTask
  });
};
