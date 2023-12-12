document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.dashboad-menu a');
    const dashboardCards = document.querySelectorAll('.dashboard-card');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const selectedCategory = this.textContent.toLowerCase().trim();

            // Hide all cards initially
            dashboardCards.forEach(card => {
                card.style.display = 'none';
            });

            // Display cards based on selected category
            dashboardCards.forEach(card => {
                const cardCategory = card.dataset.category.toLowerCase().trim();

                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.style.display = 'block';
                }
            });
        });
    });
});

function toggleCart() {
    var cartContainer = document.getElementById('cart-container');
    var currentDisplayStyle = window.getComputedStyle(cartContainer).getPropertyValue('display');

    // Toggle the display property
    cartContainer.style.display = currentDisplayStyle === 'none' ? 'block' : 'none';
}


