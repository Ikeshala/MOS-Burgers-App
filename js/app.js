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


function toggleSearch() {
    var searchBar = document.getElementById('search-bar');
    var currentDisplayStyle = window.getComputedStyle(searchBar).getPropertyValue('display');

    //display property
    searchBar.style.display = currentDisplayStyle === 'none' ? 'block' : 'none';
}

function searchItems() {
    var searchInput = document.getElementById('search-input').value.toLowerCase().trim();
    var dashboardCards = document.querySelectorAll('.dashboard-card');

    dashboardCards.forEach(card => {
        const cardTitle = card.querySelector('.h6-title').textContent.toLowerCase();
        const cardCode = card.querySelector('.dish-info b').textContent.toLowerCase();

        if (cardTitle.includes(searchInput) || cardCode.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}





function toggleCart() {
    var cartContainer = document.getElementById('cart-container');
    var currentDisplayStyle = window.getComputedStyle(cartContainer).getPropertyValue('display');

    // Toggle the display property
    cartContainer.style.display = currentDisplayStyle === 'none' ? 'block' : 'none';
}


