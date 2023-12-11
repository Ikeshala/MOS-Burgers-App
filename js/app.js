$(document).ready(function ($) {
    "use strict";

    // Click event for menu tab items
    $(".filters li").on("click", function () {
        // Remove 'filter-active' class from all items
        $(".filters li").removeClass("filter-active");
        // Add 'filter-active' class to the clicked item
        $(this).addClass("filter-active");

        // Get the category from the clicked item's data attribute
        var category = $(this).data("filter");

        // Hide all items
        $(".dish-box-wp").hide();

        // Show only items with the selected category
        $(".dish-box-wp[data-cat='" + category + "']").show();
    });
});

function toggleCart() {
    var cartContainer = document.getElementById('cart-container');
    var currentDisplayStyle = window.getComputedStyle(cartContainer).getPropertyValue('display');

    // Toggle the display property
    cartContainer.style.display = currentDisplayStyle === 'none' ? 'block' : 'none';
}
