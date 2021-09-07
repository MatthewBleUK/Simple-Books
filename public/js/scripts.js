// Displays the edit buttons when clicking checkbox
$('input:checkbox').on('change', function() { 
    var $boxes = $('input:checked');

    if($boxes.length > 0) {
        $("#edit-buttons").css("display", "block");
    } else {
        $("#edit-buttons").css("display", "none");
    }
});

function tableToExcel(table, name, filename) {
    let uri = 'data:application/vnd.ms-excel;base64,', 
    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><title></title><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>', 
    base64 = function(s) { return window.btoa(decodeURIComponent(encodeURIComponent(s))) },         format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; })}
    
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}

    var link = document.createElement('a');
    link.download = filename;
    link.href = uri + base64(format(template, ctx));
    link.click();
}

// Push out form
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
    //document.getElementById("main").style.marginRight = "500px";
}
  
/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    //document.getElementById("main").style.marginRight = "0";
}


// Drop down menu

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if(event.target.matches('#nav-bar .dropbtn') || event.target.matches('#nav-bar .user-id') || event.target.matches('#nav-bar .white-arrow')) {
        document.getElementById("myDropdown").classList.toggle("show");
    } else {
        var element = document.getElementById("myDropdown");
        element.classList.remove('show');
    }    

  }