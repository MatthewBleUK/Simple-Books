$("#store-transactions").submit(function (e) {
    // prevent refresh
    e.preventDefault();

    // validate - Could use jquerys.validate instead - cleaning possibly
    let name = $("#store-transactions .name");
    let date = $("#store-transactions .date");
    let category = $("#store-transactions .category");
    let amount = $("#store-transactions .amount");
    let tags = $("#store-transactions .tags");
    let notes = $("#store-transactions .notes");
    let _token = $("input[name=_token]");
    let errors = [];

    $(".name-error").text("Name cannot be blank *");

    if (!name.val()) {
        name.addClass("border-red");
        $(".name-error").text("Name cannot be blank *");
        errors.push("Name is blank");
    } else {
        name.removeClass("border-red");
        $(".name-error").text("");
    }

    if (!date.val()) {
        date.addClass("border-red");
        $(".date-error").text("Date cannot be blank *");
        errors.push("Data is blank");
    } else {
        date.removeClass("border-red");
        $(".date-error").text("");
    }

    if (!amount.val()) {
        amount.addClass("border-red");
        $(".amount-error").text("Amount cannot be blank *");
        errors.push("Amount is blank");
    } else if (!$.isNumeric(parseFloat(amount.val()))) {
        amount.addClass("border-red");
        $(".amount-error").text("Amount has to be a number *");
        errors.push("Amount is not numeric");
    } else {
        amount.removeClass("border-red");
        $(".amount-error").text("");
    }

    amount = amount.val();
    amount = parseFloat(amount);
    amount = amount.toFixed(2);

    // send post ajax request if no errors
    if (errors.length <= 0) {
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });

        $.ajax({
            url: "/add",
            type: "POST",
            data: {
                _token: _token.val(),
                name: name.val(),
                date: date.val(),
                amount: amount,
                category: category.val(),
                tags: tags.val(),
                notes: notes.val(),
            },
            success: function (response) {
                if (response) {
                    document.getElementById("addTransactionNav").style.width =
                        "0";
                    $("#store-transactions").trigger("reset");

                    //var total = document.getElementById("total").innerText;
                    var expense = document.getElementById("expenses").innerText;
                    var income = document.getElementById("income").innerText;
                    var minusSign =
                        document.getElementById("minus-sign").innerText;

                    // if(minusSign.indexOf("-") !== -1) {
                    //     total = '-' + total;
                    //     alert(parseFloat(total));
                    // }

                    // Add minus - This could be cleaner - improve later maybe
                    if (response.category == "Expense") {
                        expense =
                            parseFloat(response.amount) + parseFloat(expense);
                        $("#expenses").text(expense.toFixed(2));
                        response.amount = "-" + response.amount;
                    } else if (response.category == "Income") {
                        income =
                            parseFloat(response.amount) + parseFloat(income);
                        $("#income").text(income.toFixed(2));
                        response.amount = "" + response.amount;
                    }

                    total = income - expense;
                    total = total.toFixed(2);

                    total = total.toString();

                    // if total is a negative number
                    if (total.indexOf("-") !== -1) {
                        // remove minus
                        total = total.replace("-", "");
                        // add it to id text
                        $("#minus-sign").text("-");
                    } else {
                        $("#minus-sign").text("");
                    }

                    let minus = "";

                    // if total is a negative number
                    if (response.amount.indexOf("-") !== -1) {
                        // remove minus
                        response.amount = response.amount.replace("-", "");
                        // add it to id text
                        minus = "-";
                    } else {
                        minus = " ";
                    }

                    $("#total").text(total);

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

                    $(row).attr("id", response.id);

                    cell1.innerHTML =
                        '<input type="checkbox" name="transaction">';
                    cell2.innerHTML = response.date;
                    cell3.innerHTML = response.name;
                    cell4.innerHTML =
                        "<span>" +
                        minus +
                        '</span><span>£</span><span><span class="transaction-amount">' +
                        response.amount +
                        "</span>";
                    cell5.innerHTML =
                        '<span class="category">' +
                        response.category +
                        "</span>";
                    cell6.innerHTML = response.tags;
                    cell7.innerHTML =
                        '<span onclick="openEditTransaction(' +
                        response.id +
                        ')"><i class="arrow right"></i></span>';

                    // sort by date
                    sortTableByDate();

                    // hide no transactions label
                    if ($("#transactions-table tr").length > 1) {
                        $("#no-transactions").css("display", "none");
                    }

                    // reset nav
                    document.getElementById("store-transactions").reset();
                }
            },
            error: function (request, status, error) {
                console.log(request.responseText);
            },
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
        for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;

            // Get the two columns
            x = rows[i].getElementsByTagName("TD")[1].innerHTML;
            y = rows[i + 1].getElementsByTagName("TD")[1].innerHTML;

            // split string at /
            x = x.split("-");
            y = y.split("-");

            // joins to string
            x = x.join("");
            y = y.join("");

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

$(".delete-button").click(function () {
    var token = $(this).data("token");

    $("input:checkbox[name='transaction']:checked").each(function () {
        var $this = $(this);
        id = $this.closest("tr").attr("id");

        $.ajax({
            url: "/transaction/" + id,
            type: "DELETE",
            data: {
                _token: token,
            },
            success: function () {
                let row = $("input:checkbox[name='transaction']:checked")
                    .closest("tr")
                    .attr("id");
                let amountColumn = $("#" + row + " .transaction-amount").text();
                let categoryColumn = $("#" + row + " .category").text();

                let incomeDashboardVal = $("#income").text();
                let expenseDashboardVal = $("#expenses").text();
                let totalDashboardVal = $("#total").text();
                let minusSign = document.getElementById("minus-sign").innerText;

                $("#" + row).remove();

                // if minus sign exists add it to total
                if (minusSign.indexOf("-") !== -1) {
                    totalDashboardVal = "-" + totalDashboardVal;
                    totalDashboardVal = parseFloat(totalDashboardVal);
                } else {
                    totalDashboardVal = parseFloat(totalDashboardVal);
                }

                // if category is Income
                if (categoryColumn.indexOf("Income") !== -1) {
                    // minus from income dashboard
                    incomeDashboardVal =
                        parseFloat(incomeDashboardVal) -
                        parseFloat(amountColumn);
                    $("#income").text(incomeDashboardVal.toFixed(2));

                    // minus from total dashboard
                    totalDashboardVal =
                        parseFloat(totalDashboardVal) -
                        parseFloat(amountColumn);
                }

                // if category is Expense
                if (categoryColumn.indexOf("Expense") !== -1) {
                    // minus from expense dashboard
                    expenseDashboardVal =
                        parseFloat(expenseDashboardVal) -
                        parseFloat(amountColumn);
                    $("#expenses").text(expenseDashboardVal.toFixed(2));

                    // add to total dashboard
                    totalDashboardVal =
                        parseFloat(totalDashboardVal) +
                        parseFloat(amountColumn);
                }

                totalDashboardVal = totalDashboardVal.toFixed(2);
                totalDashboardVal = totalDashboardVal.toString();

                // if total is minus
                if (totalDashboardVal.indexOf("-") !== -1) {
                    // remove minus from total
                    totalDashboardVal = totalDashboardVal.replace("-", "");
                    // add minus to sign
                    $("#minus-sign").text("-");

                    // update dashboard
                    $("#total").text(totalDashboardVal);
                } else {
                    // remove minus
                    $("#minus-sign").text("");

                    // update dashboard
                    $("#total").text(totalDashboardVal);
                }
            },
            complete: function (data) {
                // if only 1 tr then show label
                var rowCount = $("#transactions-table tr").length;

                console.log(rowCount);

                if (rowCount == 1) {
                    $(
                        '<span id="no-transactions">There are no transactions</span>'
                    ).insertAfter("#transactions-table");
                }
            },
        });
    });
});

function showlabel() {
    // if only 1 tr then show label
    var rowCount = $("#transactions-table tr").length;

    if (rowCount == 1) {
        $("#no-transactions").css("display", "block");
    }
}

$("#edit-transactions").submit(function (e) {
    // prevent refresh
    e.preventDefault();

    // validate - Could use jquerys.validate instead - cleaning possibly
    let name = $("#edit-transactions .name");
    let date = $("#edit-transactions .date");
    let category = $("#edit-transactions .category");
    let amount = $("#edit-transactions .amount");
    let tags = $("#edit-transactions .tags");
    let notes = $("#edit-transactions .notes");
    let _token = $("input[name=_token]");
    let id = $("input[name=_transaction]");
    let errors = [];

    $(".name-error").text("Name cannot be blank *");

    if (!name.val()) {
        name.addClass("border-red");
        $(".name-error").text("Name cannot be blank *");
        errors.push("Name is blank");
    } else {
        name.removeClass("border-red");
        $(".name-error").text("");
    }

    if (!date.val()) {
        date.addClass("border-red");
        $(".date-error").text("Date cannot be blank *");
        errors.push("Data is blank");
    } else {
        date.removeClass("border-red");
        $(".date-error").text("");
    }

    if (!amount.val()) {
        amount.addClass("border-red");
        $(".amount-error").text("Amount cannot be blank *");
        errors.push("Amount is blank");
    } else if (!$.isNumeric(parseFloat(amount.val()))) {
        amount.addClass("border-red");
        $(".amount-error").text("Amount has to be a number *");
        errors.push("Amount is not numeric");
    } else {
        amount.removeClass("border-red");
        $(".amount-error").text("");
    }

    amount = amount.val();
    amount = parseFloat(amount);
    amount = amount.toFixed(2);

    // send post ajax request if no errors
    if (errors.length <= 0) {
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });

        $.ajax({
            url: "/update",
            type: "POST",
            data: {
                _token: _token.val(),
                name: name.val(),
                date: date.val(),
                amount: amount,
                category: category.val(),
                tags: tags.val(),
                notes: notes.val(),
                id: id.val(),
            },
            success: function (response) {
                let minusSign = $("#minus-sign").text();

                // Set dashboard numbers

                // Get current values for dashboard
                let total = parseFloat($("#total").text());

                // if total is negative add minus sign
                if (minusSign.indexOf("-") !== -1) {
                    total = parseFloat(-total);
                }

                let income = parseFloat($("#income").text());
                let expense = parseFloat($("#expenses").text());

                // Caculate value after the edit

                // get and remove old values and save into a variable
                let oldCategory = $("#" + id.val() + " td:eq(4)").text();
                let oldAmount = parseFloat(
                    $("#" + id.val() + " .transaction-amount").text()
                );

                // remove old values from dashboard number
                if (oldCategory.indexOf("Expense") !== -1) {
                    // remove it from expense
                    expense = parseFloat(expense) - parseFloat(oldAmount);
                } else if (oldCategory.indexOf("Income") !== -1) {
                    // remove it from income
                    income = parseFloat(income) - parseFloat(oldAmount);
                }

                // add new values
                if (category.val() == "Expense") {
                    // add it to expense
                    expense = parseFloat(expense) + parseFloat(amount);
                } else if (category.val() == "Income") {
                    // add it to income
                    income = parseFloat(income) + parseFloat(amount);
                }

                total = income - expense;

                total = total.toFixed(2);
                income = income.toFixed(2);
                expense = expense.toFixed(2);

                // Remove minus sign from total and add it to id
                total = total.toString();

                if (total.indexOf("-") !== -1) {
                    // remove - from total
                    total = total.replace("-", "");
                    // add to minus sign
                    $("#minus-sign").text("-");
                }

                // Update dashboard
                $("#total").text(total);
                $("#income").text(income);
                $("#expenses").text(expense);

                // set values
                $("#" + id.val() + " td:eq(1)").html(date.val());
                $("#" + id.val() + " td:eq(2)").html(name.val());

                // Set correct sign for amount
                if (category.val() == "Expense") {
                    $("#" + id.val() + " td:eq(3)").html(
                        '<span>-</span><span>£</span><span class="transaction-amount">' +
                            amount +
                            "</span>"
                    );
                } else if (category.val() == "Income") {
                    $("#" + id.val() + " td:eq(3)").html(
                        '<span>£</span><span class="transaction-amount">' +
                            amount +
                            "</span>"
                    );
                }

                $("#" + id.val() + " td:eq(4)").html(category.val());
                $("#" + id.val() + " td:eq(5)").html(tags.val());

                // close nav
                closeEditTransaction();

                // console.log(response.success);
            },
            error: function (request, status, error) {
                console.log(request.responseText);
            },
        });
    }
});
