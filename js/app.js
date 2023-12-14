// Display cards based on selected category
document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.dashboad-menu a');
    const dashboardCards = document.querySelectorAll('.dashboard-card');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const selectedCategory = this.textContent.toLowerCase().trim();

            dashboardCards.forEach(card => {
                card.style.display = 'none';
            });

            dashboardCards.forEach(card => {
                const cardCategory = card.dataset.category.toLowerCase().trim();

                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.style.display = 'block';
                }
            });
        });
    });
});

//search functionality, allowing search for items by code or name
function toggleSearch() {
    var searchBar = document.getElementById('search-bar');
    var currentDisplayStyle = window.getComputedStyle(searchBar).getPropertyValue('display');

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

//display cart-container click on cart-link & close cart-container click on close-cart function
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cart-link').addEventListener('click', function (event) {
        event.preventDefault();

        var cartContainer = document.querySelector('.cart-container');
        var closeButton = document.getElementById('close-cart');

        if (cartContainer.style.display === 'none' || cartContainer.style.display === '') {
            cartContainer.style.display = 'block';
            closeButton.style.display = 'block';
        } else {
            cartContainer.style.display = 'none';
            closeButton.style.display = 'none';
        }
    });

    document.getElementById('close-cart').addEventListener('click', function () {
        var cartContainer = document.querySelector('.cart-container');
        var closeButton = document.getElementById('close-cart');

        cartContainer.style.display = 'none';
        closeButton.style.display = 'none';

        history.go(0);
    });
});


// generate order ID
let orderIdCounter = 1;

function generateOrderId() {
    const orderId = `MOS${String(orderIdCounter).padStart(5, '0')}`;
    orderIdCounter++;
    return orderId;
}

const generatedOrderId = generateOrderId();
document.querySelector('.genereted-id').textContent = generatedOrderId;


// Adjust the size of the dashboard based on the cart-container's active state
document.addEventListener('DOMContentLoaded', function () {
    var cartContainer = document.querySelector('.cart-container');
    var closeButton = document.getElementById('close-cart');
    var dashboard = document.querySelector('.dashboard');
    var dashboardMenu = document.querySelector('.dashboad-menu');

    document.getElementById('cart-link').addEventListener('click', function (event) {
        event.preventDefault();

        cartContainer.classList.toggle('active');
        closeButton.style.display = cartContainer.classList.contains('active') ? 'block' : 'none';
        dashboard.style.width = cartContainer.classList.contains('active') ? 'calc(100% - 340px)' : '100%';
        dashboardMenu.style.width = cartContainer.classList.contains('active') ? 'calc(100%)' : '100%';

        if (!cartContainer.classList.contains('active')) {
            cartContainer.style.display = 'none';
        } else {
            cartContainer.style.display = 'block';
        }
    });

    document.getElementById('close-cart').addEventListener('click', function () {
        cartContainer.classList.remove('active');
        closeButton.style.display = 'none';
        dashboard.style.width = '100%';
        dashboardMenu.style.width = '100%';
        history.go(0);
    });

    var navbarLinks = document.querySelectorAll('.navbar-link');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function () {
            cartContainer.classList.remove('active');
            closeButton.style.display = 'none';
            dashboard.style.width = '100%';
            dashboardMenu.style.width = '100%';
            cartContainer.style.display = 'none';
        });
    });
});


