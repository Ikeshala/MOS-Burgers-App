//Get the data-category attribute value from the clicked link
document.addEventListener('DOMContentLoaded', function () {
    // Get all customer links
    const customerLinks = document.querySelectorAll('.customer-link');

    // Get dashboard content sections
    const dashboardContent = document.getElementById('dashboard-content');
    const historyTable = document.querySelector('.customer-table');

    // Set default view to dashboardContent
    dashboardContent.style.display = 'flex';
    historyTable.style.display = 'none';

    // Add click event listener to each customer link
    customerLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // Prevent the default behavior of the link
            event.preventDefault();

            // Get the data-category attribute value
            const category = link.getAttribute('data-category');

            // Hide both sections by default
            dashboardContent.style.display = 'none';
            historyTable.style.display = 'none';

            // Deactivate all links
            customerLinks.forEach(link => link.classList.remove('active'));

            // Remove the history-display class to reset the display property
            dashboardContent.classList.remove('history-display');

            // Show the selected section based on the data-category attribute
            if (category === 'customers') {
                dashboardContent.style.display = 'flex';
            } else if (category === 'history') {
                // Add a custom class to override the display style
                dashboardContent.classList.add('history-display');
                historyTable.style.display = 'block';
            }

            // Activate the clicked link
            link.classList.add('active');
        });
    });
});












var form = document.getElementById("add-customer-form");
var imgInput = document.getElementById("imgInput");
var previewImage = document.getElementById("previewImage");
var fileTooLargeAlertShown = false;
var customerData = [];

function displayModal() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    const addCustomerModal = new bootstrap.Modal(document.getElementById('addCustomerModal'));

    addCustomerModal.show();

    addCustomerModal._element.addEventListener('shown.bs.modal', function () {
        const addCustomerButton = document.getElementById('add-customer');

        if (addCustomerButton) {
            addCustomerButton.addEventListener('click', function () {
                addCustomer();
            });
        }
    });

    const closeButton = addCustomerModal._element.querySelector('.btn-close');
    closeButton.addEventListener('click', function () {
        overlay.style.display = 'none';
        addCustomerModal.hide();
    });
}

function displaySelectedImage() {
    imgInput.addEventListener('input', function () {
        fileTooLargeAlertShown = false;
    });

    if (imgInput.files[0] && imgInput.files[0].size < 1000000) {

        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            var imgUrl = e.target.result;
            previewImage.setAttribute('src', imgUrl);
        };

        fileReader.readAsDataURL(imgInput.files[0]);
    } else {
        if (!fileTooLargeAlertShown) {
            alert("This file is too large!");
            fileTooLargeAlertShown = true;
        }
    }
}

function addCustomer() {
    const customerIdInput = document.getElementById('add-customer-id-input');
    const customerNameInput = document.getElementById('customer-name-input');
    const noOfOrdersInput = document.getElementById('no-of-orders-input');

    // Validation 1: Check for empty fields
    if (!customerIdInput.value || !customerNameInput.value || !noOfOrdersInput.value || !previewImage.src) {
        alert("Please fill in all fields, including selecting an image!");
        return;
    }

    // Validation 2: Check customer ID format (beginning with '0' and total 10 digits)
    const customerIdRegex = /^0\d{9}$/;
    if (!customerIdRegex.test(customerIdInput.value)) {
        alert("Invalid customer phone number.");
        return;
    }

    // Validation 3: Check if customer ID is unique
    if (customerData.some(customer => customer.idOfCustomer === customerIdInput.value)) {
        alert("Customer ID already exists.");
        return;
    }

    // Validation 4: Check number of orders is a positive number
    const noOfOrders = parseFloat(noOfOrdersInput.value);
    if (isNaN(noOfOrders) || noOfOrders <= 0) {
        alert("Number of orders must be a positive number.");
        return;
    }

    // Validation 5: Check customerNameInput contains only letters and spaces
    const customerName = customerNameInput.value.trim();
    if (!/^[a-zA-Z\s]+$/.test(customerName)) {
        alert("Customer name can only contain letters and spaces.");
        return;
    }

    // Validation 6: Check if previewImage is empty
    if (!previewImage.src || previewImage.src === "") {
        alert("Please select an image!");
        return;
    }

    const custId = generateUniqueId();

    const newCustomer = {
        custId: custId,
        idOfCustomer: customerIdInput.value,
        nameOfCustomer: customerNameInput.value,
        totalOrdersOfCustomer: noOfOrders,
        picture: previewImage.src
    };

    customerData.push(newCustomer);

    displayCustomers(customerData);

    // Reset form controls individually
    customerIdInput.value = '';
    customerNameInput.value = '';
    noOfOrdersInput.value = '';
    previewImage.src = "../asset/images/add customer.jpg";

    const addCustomerModal = new bootstrap.Modal(document.getElementById('addCustomerModal'));
    addCustomerModal.hide();

    // Display success alert
    alert("Customer added successfully!");
}

function displayCustomers(customerData) {
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) {
        console.error("Dashboard content element not found!");
        return;
    }

    // Clear the existing content
    dashboardContent.innerHTML = '';

    customerData.forEach(customer => {
        const card = document.createElement('div');
        card.className = 'dashboard-card';
        card.setAttribute('data-cust-id', customer.custId);

        card.innerHTML = `
            <img src="${customer.picture}" alt="" class="card-image">
            <div class="card-detail">
                <div class="no-of-orders">${customer.totalOrdersOfCustomer}
                <i class="fa-solid fa-bag-shopping fa-shake"></i>
                </div>  
                <div class="customer-info">
                    <ul>
                        <li>
                            <p>Customer ID</p>
                            <b>${customer.idOfCustomer}</b>
                        </li>
                    </ul>
                </div>
                <div class="customer-name-line">
                    <h6 class="h6-title">${customer.nameOfCustomer}</h6>
                </div>
                <div class="dist-bottom-row">
                    <div class="customer-bottom-icon">
                        <i class="fa-solid fa-pen-to-square fa-fade" data-bs-toggle="modal" data-bs-target="#updateDataModal"></i>
                        <i class="fa-solid fa-trash-can fa-fade" data-bs-toggle="modal" onclick="showDeleteConfirmation('${customer.custId}')"></i>
                    </div>
                </div>
            </div>
        `;

        // Append the card to the dashboardContent
        dashboardContent.appendChild(card);
    });
}

document.getElementById('add-customer-link').addEventListener('click', displayModal);

imgInput.addEventListener('change', displaySelectedImage);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addCustomer();
});

function showDeleteConfirmation(custId) {
    const confirmation = confirm("Do you want to delete this customer?");
    if (confirmation) {
        deleteItem(custId);
    }
}

function deleteItem(custId) {
    const updatedItemsData = customerData.filter(customer => customer.custId !== custId);
    customerData = updatedItemsData;
    displayCustomers(updatedItemsData);
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener to the document to handle update icon clicks
    document.addEventListener('click', function (event) {
        const target = event.target;

        // Check if the clicked element is the update icon
        if (target.classList.contains('fa-pen-to-square')) {
            const custId = target.closest('.dashboard-card').dataset.category.split(' ')[1];
            const selectedCustomer = customerData.find(customer => customer.custId === custId);

            // Populate the update modal with existing data
            populateUpdateModal(selectedCustomer);
        }
    });

    // Add an event listener to the update button in the update modal form
    document.getElementById('update-data-form').addEventListener('submit', function (e) {
        e.preventDefault();

        updateCustomer();
    });
});

// Function to populate the update modal with existing data
function populateUpdateModal(customer) {
    const updateDataForm = document.getElementById('update-data-form');
    const previewImage = updateDataForm.querySelector('#update-previewImage');
    const customerIdInput = updateDataForm.querySelector('#update-customer-id-input');
    const customerNameInput = updateDataForm.querySelector('#update-customer-name-input');
    const noOfOrdersInput = updateDataForm.querySelector('#update-no-of-orders-input');

    // Check if customer is defined
    if (customer) {
        // Populate the input fields with existing data
        updateDataForm.dataset.custId = customer.custId;
        customerIdInput.value = customer.idOfCustomer || '';
        customerNameInput.value = customer.nameOfCustomer || '';
        noOfOrdersInput.value = customer.totalOrdersOfCustomer || '';
        previewImage.src = customer.picture || '';

        // Show the update modal
        const updateDataModal = new bootstrap.Modal(document.getElementById('updateDataModal'));
        updateDataModal.show();
    } else {
        console.error("Selected customer is undefined.");
    }
}

// Function to update the customer
function updateCustomer() {
    // Retrieve updated values from the form
    const previewImage = document.getElementById('update-previewImage');
    const customerIdInput = document.getElementById('update-customer-id-input');
    const customerNameInput = document.getElementById('update-customer-name-input');
    const noOfOrdersInput = document.getElementById('update-no-of-orders-input');

    // Retrieve the customer ID from the update modal
    const custId = document.getElementById('update-data-form').dataset.custId;

    // Find the index of the customer in the customerData array
    const customerIndex = customerData.findIndex(customer => customer.custId === custId);

    if (customerIndex !== -1) {
        // Get the existing customer
        const existingCustomer = customerData[customerIndex];

        // Create an object to store updated values
        const updatedValues = {};

        // Compare and store updated values
        if (customerIdInput.value.trim() !== String(existingCustomer.idOfCustomer).trim()) {
            // Validation 1: Check customer ID format (beginning with '0' and total 10 digits)
            const customerIdRegex = /^0\d{9}$/;
            if (!customerIdRegex.test(customerIdInput.value)) {
                alert("Invalid customer ID format. It should start with '0' followed by 9 digits.");
                return;
            }

            // Validation 2: Check if customer ID is unique
            if (customerData.some(customer => customer.idOfCustomer === customerIdInput.value && customer.custId !== custId)) {
                alert("Customer ID already exists. Please choose a different one.");
                return;
            }

            updatedValues.idOfCustomer = customerIdInput.value.trim();
        }

        if (customerNameInput.value !== String(existingCustomer.nameOfCustomer).trim()) {
            // Validation 3: Check customerNameInput contains only letters and spaces
            const customerName = customerNameInput.value.trim();
            if (!/^[a-zA-Z\s]+$/.test(customerName)) {
                alert("Customer name can only contain letters and spaces.");
                return;
            }

            updatedValues.nameOfCustomer = customerNameInput.value;
        }

        const newTotalOrders = parseFloat(noOfOrdersInput.value);
        if (!isNaN(newTotalOrders) && newTotalOrders !== parseFloat(existingCustomer.totalOrdersOfCustomer)) {
            // Validation 4: Check number of orders is a positive number
            if (newTotalOrders <= 0) {
                alert("Number of orders must be a positive number.");
                return;
            }
            updatedValues.totalOrdersOfCustomer = newTotalOrders;
        }

        // Check if any values have changed
        if (Object.keys(updatedValues).length > 0) {
            // Update only the fields that have changed
            const updatedItem = {
                custId: custId,
                idOfCustomer: updatedValues.idOfCustomer || existingCustomer.idOfCustomer,
                nameOfCustomer: updatedValues.nameOfCustomer || existingCustomer.nameOfCustomer,
                totalOrdersOfCustomer: updatedValues.totalOrdersOfCustomer || existingCustomer.totalOrdersOfCustomer,
                picture: existingCustomer.picture // Keep the original picture
            };

            // Update the customer in the customerData array
            customerData[customerIndex] = updatedItem;

            // Display updated customers
            displayCustomers(customerData);

            // Display success alert
            alert("Customer updated successfully!");

            // Hide the update modal
            const updateDataModal = new bootstrap.Modal(document.getElementById('updateDataModal'));
            updateDataModal.hide();
        } else {
            // If no values have changed, display a message
            alert("No changes detected.");

            // Hide the update modal
            const updateDataModal = new bootstrap.Modal(document.getElementById('updateDataModal'));
            updateDataModal.hide();
        }
    } else {
        alert("Customer not found for updating.");

        // Hide the update modal
        const updateDataModal = new bootstrap.Modal(document.getElementById('updateDataModal'));
        updateDataModal.hide();
    }
}

// Add an event listener to the document to handle update icon clicks
document.addEventListener('click', function (event) {
    const target = event.target;

    // Check if the clicked element is the update icon
    if (target.classList.contains('fa-pen-to-square')) {
        const custId = target.closest('.dashboard-card').dataset.category.split(' ')[1];
        const selectedCustomer = customerData.find(customer => customer.custId === custId);

        // Populate the update modal with existing data
        populateUpdateModal(selectedCustomer);
    }
});