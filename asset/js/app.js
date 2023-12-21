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


//  generate a receipt for the order
document.addEventListener('DOMContentLoaded', function () {
    // Function to generate a receipt in PDF format
    function generateReceipt() {
        // Create a document definition for pdfmake
        const docDefinition = {
            content: [
                { text: 'MOS Burgers', style: 'header' },
                { text: 'Happiness in every bite...', style: 'moto' },
                { text: `Date: ${new Date().toLocaleDateString()}`, style: 'subheader' },
                { text: '' }, // Empty line

                // Add order details to the PDF
                { text: `Order ID: ${document.querySelector('.genereted-id').textContent}`, style: 'subheader' },
                { text: `Order Total: ${document.querySelector('.order-total span').textContent}`, style: 'subheader' },
                { text: '' }, // Empty line
                { text: '' }, // Empty line
                { text: 'Order Details :', style: 'details' },
                { text: '' }, // Empty line

                // Add order items
                {
                    table: {
                        widths: ['*', '*', '*'],
                        body: [
                            ['Item', 'Quantity', 'Cost'],
                            ['Classic Burger (Large)', '1', 'Rs. 2500.00'],
                            ['Classic Burger (Regular)', '10', 'Rs. 2500.00'],
                            ['Pepsi (330ml)', '7', 'Rs. 2500.00'],
                            // Add more rows as needed
                        ],
                    },
                },
                { text: '' }, // Empty line
                { text: 'Thank you for your order!', style: 'thankYouMessage' },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    alignment: 'center',
                    bold: true,
                    margin: [0, 0, 0, 10], // Margin bottom
                },
                moto: {
                    fontSize: 12,
                    alignment: 'center',
                    margin: [0, 0, 0, 5], // Margin bottom
                },
                details: {
                    fontSize: 12,
                    bold: true,
                    italics: true,
                    margin: [0, 0, 0, 5], // Margin bottom
                },
                subheader: {
                    fontSize: 12,
                    margin: [0, 0, 0, 5], // Margin bottom
                },
                thankYouMessage: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 20, 0, 0], // Margin top
                },
            },
        };

        // Generate the PDF
        pdfMake.createPdf(docDefinition).download('receipt.pdf', function () {
            // This code will be executed when the download is complete
            // Close the modal
            const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
            cartModal.toggle(); // Use toggle instead of hide
        });
    }

    // Attach the generateReceipt function to the click event of the element with class "checkout"
    const checkoutButtons = document.querySelectorAll('.checkout');
    checkoutButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Call the generateReceipt function when a button with class "checkout" is clicked
            generateReceipt();
        });
    });
});
