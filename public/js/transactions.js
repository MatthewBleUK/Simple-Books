$('#store-transactions').submit(function(e) 
{
    // prevent refresh
    e.preventDefault();
   
    // validate - Could use jquerys.validate instead - cleaning possibly 
    let name = $('#store-transactions .name');
    let date = $('#store-transactions .date');
    let category = $('#store-transactions .category');
    let amount = $('#store-transactions .amount');
    let tags = $('#store-transactions .tags');
    let notes = $('#store-transactions .notes');
    let _token = $("input[name=_token]");
    let errors = [];

    $('.name-error').text('Name cannot be blank *');

    if(!name.val()) 
    {
        name.addClass('border-red');
        $('.name-error').text('Name cannot be blank *');
        errors.push("Name is blank"); 
    } else {
        name.removeClass('border-red');
        $('.name-error').text('');
    }

    if(!date.val()) 
    {
        date.addClass('border-red');
        $('.date-error').text('Date cannot be blank *');
        errors.push("Data is blank"); 
    } else {
        date.removeClass('border-red');
        $('.date-error').text('');
    }
    
    if(!amount.val()) 
    {
        amount.addClass('border-red');
        $('.amount-error').text('Amount cannot be blank *');
        errors.push("Amount is blank"); 
    } else if (!$.isNumeric(parseFloat(amount.val()))) {  
        amount.addClass('border-red');
        $('.amount-error').text('Amount has to be a number *');
        errors.push("Amount is not numeric"); 
    } else {
        amount.removeClass('border-red');
        $('.amount-error').text('');
    }

    // send post ajax request if no errors
    if(errors.length <= 0)
    {   
        $.ajaxSetup({
            headers: 
            {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax(
            {
                url: "/add",
                type:"POST",
                data:
            {
                _token: _token.val(),
                name: name.val(),
                date: date.val(),
                amount: amount.val(),
                category: category.val(),
                tags: tags.val(),
                notes: notes.val(),
            },
            success:function(response)
            {
                if(response) 
                {
                    document.getElementById("mySidenav").style.width = "0";
                    $('#store-transactions').trigger("reset");

                    var total = document.getElementById("total").innerText;
                    var expense = document.getElementById("expenses").innerText;
                    var income = document.getElementById("income").innerText;
                    
                   
                    // Add to transaction bar & currency + minus
                    if(response.category == 'Expense') {
                        expense = parseFloat(response.amount) + parseFloat(expense);
                        $("#expenses").text(expense);
                        response.amount = '-£' + response.amount;
                    } else if (response.category == 'Income') {
                        income = parseFloat(response.amount) + parseFloat(income);
                        $("#income").text(income);
                        response.amount = '£' + response.amount;
                    }

                    // insert new row
                    var table = document.getElementById("transactions-table");
                    var row = table.insertRow(1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    var cell7 = row.insertCell(6);
                    
                    $(row).attr('id', response.id);

                    cell1.innerHTML = '<input type="checkbox">';
                    cell2.innerHTML = response.date;
                    cell3.innerHTML = response.name;
                    cell4.innerHTML = response.amount;
                    cell5.innerHTML = response.category;
                    cell6.innerHTML = response.tags;
                    cell7.innerHTML = '<i class="arrow right"></i>';
        
                    // sort by date
                    sortTableByDate();



                    // hide no transactions label
                    if($('#transactions-table tr').length > 1) {
                        $('#no-transactions').css('display', 'none');
                    }
                }
            },
            error: function (request, status, error) 
            {
                //console.log(request.responseText);
            }
        });
    }

});

function sortTableByDate() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("transactions-table");
    switching = true;

    // Need to check if there's 2 or more rows

    // loop until no more switching left
    while (switching) {
        switching = false;
        rows = table.rows;
        // loop all rows
        for (i = 1; i < (rows.length - 1); i++) {

            shouldSwitch = false;

            // Get the two columns
            x = rows[i].getElementsByTagName("TD")[1].innerHTML;
            y = rows[i + 1].getElementsByTagName("TD")[1].innerHTML;

            // split string at /
            x = x.split('-');
            y = y.split('-');

            // joins to string
            x = x.join('')
            y = y.join('')

           // convert to number and check check if they should switch
            if (Number(x) < Number(y)) {
                // mark as switch and break
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            // switch the rows
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}



$(".delete-button").click(function()
{
    //var id = $(':checkbox:checked').closest('tr').attr('id');
    var token = $(this).data("token");
    
    $('input:checkbox:checked').each(function () {

        var $this = $(this);
        id = $this.closest('tr').attr('id');

        if(id) {
        $.ajax(
        {
            url: "/transaction/"+id,
            type: 'DELETE',
            data: {
                _token: token,
            },
            success: function ()
            {

                $('input:checkbox:checked').each(function () {
                    id = $(this).closest('tr').attr('id');
                    $('#'+id).remove();
                    //console.log("Transaction deleted");

                    // show no transactions label
                    if($('#transactions-table tr').length < 2) {
                        $('#no-transactions').css('display', 'block');
                    }
                });
            }
        });
    }
    });

});
