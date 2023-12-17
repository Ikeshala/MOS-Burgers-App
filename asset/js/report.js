//Get the data-category attribute value from the clicked link
$(document).ready(function () {
    $(".report-table .row").hide();
    $(".report-table .row.annual-report").show();
    $(".report-link[data-category='annual-report']").addClass("active");

    $(".report-link").on("click", function (e) {
        e.preventDefault();
        var category = $(this).data("category");
        $(".report-table .row").hide();
        $(".report-table .row." + category).show();
        $(".report-link").removeClass("active");
        $(this).addClass("active");
    });
});
