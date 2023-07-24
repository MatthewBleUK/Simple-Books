// Displays the edit buttons when clicking checkbox
$(window).click(function (e) {
    $("input:checkbox").on("change", function () {
        var $boxes = $("input:checked");

        if ($boxes.length > 0) {
            $("#edit-buttons").css("display", "block");
        } else {
            $("#edit-buttons").css("display", "none");
        }
    });
});

// export table to excel
function tableToExcel(table, name, filename) {
    let uri = "data:application/vnd.ms-excel;base64,",
        template =
            '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><title></title><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
        base64 = function (s) {
            return window.btoa(decodeURIComponent(encodeURIComponent(s)));
        },
        format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            });
        };

    if (!table.nodeType) table = document.getElementById(table);
    var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };

    var link = document.createElement("a");
    link.download = filename;
    link.href = uri + base64(format(template, ctx));
    link.click();
}

// Open add transaction forms
function openAddTransaction() {
    // Sets sidebar width depending on width of body
    if (document.body.offsetWidth < 600) {
        document.getElementById("addTransactionNav").style.width = "100vw";
    } else {
        document.getElementById("addTransactionNav").style.width = "500px";
    }
}

// Closes add transaction form
function closeAddTransaction() {
    // Sets sidebar width
    document.getElementById("addTransactionNav").style.width = "0";

    // Reset navigation form
    document.getElementById("store-transactions").reset();
}

// Closes edit transaction form
function openEditTransaction(id) {
    // Sets sidebar width depending on width of body
    if (document.body.offsetWidth < 600) {
        document.getElementById("editTransactionNav").style.width = "100vw";
    } else {
        document.getElementById("editTransactionNav").style.width = "500px";
    }

    // Add hidden input box to the edit transaction form to store transaction ID
    $("#transaction-id").attr({
        value: id,
    });

    let _token = $("input[name=_token]");

    // Get form information via ajax
    $.ajax({
        url: "/fetch/" + id,
        type: "GET",
        dataType: "JSON",
        data: {
            _token: _token.val(),
        },
        success: function (response) {
            let name = response.name;
            let date = response.date;
            let amount = response.amount;
            let category = response.category;
            let tags = response.tags;
            let notes = response.notes;

            $("#edit-transactions .name").val(name);
            $("#edit-transactions .date").val(date);
            $("#edit-transactions .amount").val(amount);
            $("#edit-transactions .category").val(category);
            $("#edit-transactions .tags").val(tags);
            $("#edit-transactions .notes").val(notes);
        },
        complete: function (data) {},
        error: function (request) {
            console.log(request);
        },
    });
}

function closeEditTransaction() {
    document.getElementById("editTransactionNav").style.width = "0";
    //document.getElementById("main").style.marginRight = "0";
    // Reset nav
    document.getElementById("edit-transactions").reset();
}

// dropdown menu
window.onclick = function (event) {
    if (
        event.target.matches("#nav-bar .dropbtn") ||
        event.target.matches("#nav-bar .user-id") ||
        event.target.matches("#nav-bar .white-arrow")
    ) {
        document.getElementById("myDropdown").classList.toggle("show");
    } else {
        var element = document.getElementById("myDropdown");
        element.classList.remove("show");
    }
};

// check all checkboxes
$("#rootbox").click(function () {
    $("input:checkbox").not(this).prop("checked", this.checked);
});

// numbers animation on load
$(function () {
    $(".count").each(function () {
        $(this)
            .prop("Counter", 0)
            .animate(
                {
                    Counter: $(this).text(),
                },
                {
                    duration: 500,
                    easing: "swing",
                    step: function (now) {
                        $(this).text(now.toFixed(2));
                    },
                }
            );
    });
});
