$(document).ready(function(){
    
    var table = $('#example').DataTable();
    
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


