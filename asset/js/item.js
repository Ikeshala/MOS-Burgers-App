//display item-container click on add-item & close item-container click on close-cart function
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('add-item').addEventListener('click', function (event) {
        event.preventDefault();

        var cartContainer = document.querySelector('.item-container');
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
        var cartContainer = document.querySelector('.item-container');
        var closeButton = document.getElementById('close-cart');

        cartContainer.style.display = 'none';
        closeButton.style.display = 'none';

        history.go(0);
    });
});

// Adjust the size of the dashboard based on the item-container's active state
document.addEventListener('DOMContentLoaded', function () {
    var cartContainer = document.querySelector('.item-container');
    var closeButton = document.getElementById('close-cart');
    var dashboard = document.querySelector('.dashboard');
    var dashboardMenu = document.querySelector('.dashboad-menu');

    document.getElementById('add-item').addEventListener('click', function (event) {
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

// Show/Hide the modal and background overlay
function displayModal() {
    document.getElementById('overlay').style.display = 'block';

    var middleModalElement = document.getElementById('addItemModal');
    var middleModal = new bootstrap.Modal(middleModalElement);

    var closeButton = middleModalElement.querySelector('.btn-close');
    closeButton.addEventListener('click', function () {

        setTimeout(function () {
            document.getElementById('overlay').style.display = 'none';

            middleModal.hide();
        });
    });

    middleModal.show();
}


