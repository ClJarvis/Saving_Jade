// /* https://savingsmultipliedssh.firebaseio.com/items.json */

// function getResults(){

// 	$.ajax({
// 	  url: "https://savingproject.firebaseio.com//items.json",
// 	  dataType:"jsonp",
// 	  success:function(data){
// 	  	for (var i=0; i < data.length; i++) {
// 	  		console.log(data[i].price);
// 			$("#searchResults").append("<div class='col-md-3'>" + "<img src=" + data[i].image + " width='150' height='150'><br>" + data[i].title + '<br>' + data[i].price + '<br>' + data[i].seller + '<br>' + data[i].endDate + '<br>' + "</div>");
// 		}
// 	    }
// 	  });
// }

// getResults();

// var nss = {};
// 		$(document).ready(function(){
// 			nss.outputUpdate = function(price, id){
// 				$('#js-' + id).val(price);
// 			}

// 		});
// // var myResults = "https://savingsmultipliedssh.firebaseio.com/items.json";


