$(document).ready(function() {

  // User clicked on an edit button
  $(".editButton").click(function () {
    window.location.href = "/shop" + $(this)[0].id;
  });

  // User clicked on a delete button
  $(".deleteButton").click(function () {
    var shopItemId = $(this)[0].id;

    $.ajax({
      url: "/shop",
      method: "DELETE",
      data: {
        shop_id: shopItemId
      },
      success: function (response) {
        $("#shop_"+shopItemId).remove();  // Remove the DOM element on success
      }
    });
  });



});
