$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myList li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

async function logout(){
  const response = await fetch("http://localhost:5000/user/logout", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials:"include"
    });
    response.json().then(data => {
      window.location.href = '/'
    });
}

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
