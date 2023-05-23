$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myList li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});


var myList = document.getElementById("myList");
var listItems = myList.getElementsByTagName("li");

// Sadece belirli öğeyi göster
function showItem(index) {

  for (var i = 0; i < listItems.length; i++) {
    listItems[i].style.display = "none";
  }

  // Belirli öğeyi göster
  var item = document.getElementById("item" + index);
  if (item) {
    item.style.display = "block";
  }
}
