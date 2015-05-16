$(document).ready(function() {

  // User clicked on an edit button
  $(".editButton").click(function () {
    window.location.href = "/Jade/" + $(this)[0].id;
  });

  // User clicked on a delete button
  $(".deleteButton").click(function () {
    var jadeItemId = $(this)[0].id;

    $.ajax({
      url: "/Jade",
      method: "DELETE",
      data: {
        jade_id: jadeItemId
      },
      success: function (response) {
        $("#Jade_"+todoItemId).remove();  // Remove the DOM element on success
      }
    });
  });



});
