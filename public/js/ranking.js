$(document).ready(function(){
    
    var table = $('#example').DataTable({
      order:[[8,'desc']],
      "language": {
        "url": "http://cdn.datatables.net/plug-ins/1.13.4/i18n/tr.json"
      }
    });
    
    table.buttons().container()
    .appendTo('#example_wrapper :eq(0)');
    var $tableSearch = $('#tableSearch');
    $('#example_filter').detach().appendTo($tableSearch);
    $('#example_length').detach().prependTo($tableSearch);
    $('<div>').css({
      'display': 'flex',
      'justify-content': 'flex-end'
    }).append($('#example_filter'), $('#example_length')).appendTo($tableSearch);
     
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
      window.location.href = '/ranking'
    });
}