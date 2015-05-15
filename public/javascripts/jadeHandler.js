$(document).ready(function() {

  // User clicked on an edit button
  $(".editButton").click(function () {
    window.location.href = "/jade/" + $(this)[0].id;
  });

  // User clicked on a delete button
  $(".deleteButton").click(function () {
    var jadeItemId = $(this)[0].id;

    $.ajax({
      url: "/jade",
      method: "DELETE",
      data: {
        jade_id: jadeItemId
      },
      success: function (response) {
        $("#jade_"+todoItemId).remove();  // Remove the DOM element on success
      }
    });
  });



});
