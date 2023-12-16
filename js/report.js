//Get the data-category attribute value from the clicked link
$(document).ready(function () {
    $(".report-table .row").hide();

    $(".report-link").on("click", function (e) {
        e.preventDefault();
        var category = $(this).data("category");
        $(".report-table .row").hide();
        $(".report-table .row." + category).show();
    });
});
