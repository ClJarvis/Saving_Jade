$(document).ready(function() {

  // User clicked on an edit button
  $(".editButton").click(function () {
    window.location.href = "/Shop/" + $(this)[0].id;
  });

  // User clicked on a delete button
  $(".deleteButton").click(function () {
    var shopItemId = $(this)[0].id;

    $.ajax({
      url: "/Shop",
      method: "DELETE",
      data: {
        shop_id: shopItemId
      },
      success: function (response) {
        $("#Shop_"+shopItemId).remove();  // Remove the DOM element on success
      }
    });
  });



});
