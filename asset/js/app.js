document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.dashboad-menu a');
    const dashboardCards = document.querySelectorAll('.dashboard-card');

    // Display cards based on selected category
    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const selectedCategory = this.textContent.toLowerCase().trim();

            dashboardCards.forEach(card => {
                const cardCategory = card.dataset.category.toLowerCase().trim();
                card.style.display = (selectedCategory === 'all' || selectedCategory === cardCategory) ? 'block' : 'none';
            });
        });
    });
});


// Search item by name and code
// Define dashboardCards
let dashboardCards;

// Fetch dashboardCards 
document.addEventListener('DOMContentLoaded', function () {
    dashboardCards = document.querySelectorAll('.dashboard-card');
});

// Rest of code, including the searchItems function
function searchItems() {
    const inputText = document.getElementById('search-input').value.toLowerCase();
    const cardContainer = document.getElementById('dashboard-cards');
    let found = false; // Variable to check if any matching item is found

    if (dashboardCards && dashboardCards.length > 0) {
        dashboardCards.forEach(card => {
            const cardText = card.innerText.toLowerCase();

            if (cardText.includes(inputText)) {
                card.style.display = 'block';
                found = true; // Set found to true if a matching item is found
            } else {
                card.style.display = 'none';
            }
        });

        if (!found) {
            // If no matching item is found, display an alert
            alert('No matching items found.');
        }
    }
}

window.toggleSearch = function () {
    const searchBar = document.getElementById('search-bar');
    
    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
        searchBar.style.display = 'block';
        document.getElementById('search-input').focus();
    } else {
        searchBar.style.display = 'none';
    }
};


// show and hide modal according to the click event of the "Cart" link
// show and hide modal according to the click event of the "Cart" link
document.addEventListener('DOMContentLoaded', function () {
    // Generate order ID
    let orderIdCounter = 1;

    function generateOrderId() {
        const orderId = `MOS${String(orderIdCounter).padStart(5, '0')}`;
        orderIdCounter++;
        return orderId;
    }

    const generatedOrderId = generateOrderId();
    document.querySelector('.genereted-id').textContent = generatedOrderId;

    // Function to toggle the cart modal
    function toggleCart() {
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        cartModal.toggle();
    }

    // Attach the toggleCart function to the click event of the "Cart" link
    document.getElementById('cart-link').addEventListener('click', toggleCart);

    // You can also close the cart modal when clicking on the close button
    document.getElementById('close-cart').addEventListener('click', toggleCart);
});
