//Get the data-category attribute value from the clicked link
document.addEventListener('DOMContentLoaded', function () {
    const customerLinks = document.querySelectorAll('.customer-link');
    const dashboardContent = document.getElementById('dashboard-content');
    const historyTable = document.querySelector('.customer-table');

    function showSection(category) {
        dashboardContent.style.display = category === 'customers' ? 'block' : 'none';
        historyTable.style.display = category === 'history' ? 'block' : 'none';
    }

    customerLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            customerLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');

            showSection(link.getAttribute('data-category'));
        });
    });

    const defaultLink = document.querySelector('.customer-link.active');
    showSection(defaultLink.getAttribute('data-category'));
});


var form = document.getElementById("add-customer-form");
var imgInput = document.getElementById("imgInput");
var previewImage = document.getElementById("previewImage");
var fileTooLargeAlertShown = false;
var itemsData = [];

function displayModal() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    const addCustomerModal = new bootstrap.Modal(document.getElementById('addCustomerModal'));

    addCustomerModal.show();

    addCustomerModal._element.addEventListener('shown.bs.modal', function () {
        const addItemButton = document.getElementById('add-customer');

        if (addItemButton) {
            addItemButton.addEventListener('click', function () {
                addItem();
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

function addItem() {
    const itemCodeInput = document.getElementById('add-customer-id-input');
    const itemNameInput = document.getElementById('customer-name-input');
    const quantityInput = document.getElementById('quantity-input');
    const discountInput = document.getElementById('no-of-orders-input');

    // Validation 1: Check for empty fields
    if (!itemCodeInput.value || !itemNameInput.value || !categoryDropdown.value || !quantityInput.value || !priceInput.value || !discountInput.value || !expireDateInput.value || !previewImage.src) {
        alert("Please fill in all fields, including selecting an image!");
        return;
    }

    // Validation 2: Convert codeOfItem to uppercase if it starts with a lowercase 'b'
    const itemCode = itemCodeInput.value.trim();
    if (itemCode.charAt(0) === 'b') {
        itemCodeInput.value = itemCode.toUpperCase();
    }

    // Validation 3: Check codeOfItem format (B followed by 4 digits)
    const codeRegex = /^B\d{4}$/;
    if (!codeRegex.test(itemCodeInput.value)) {
        alert("Invalid item code format. Code should start with 'B' followed by 4 digits.");
        return;
    }

    // Validation 4: Check quantityOfItem is a positive number
    const quantity = parseFloat(quantityInput.value);
    if (isNaN(quantity) || quantity < 0) {
        alert("Quantity should be a positive number.");
        return;
    }

    // Validation 5: Format priceOfItem as currency
    const price = parseFloat(priceInput.value).toFixed(2);
    if (isNaN(price)) {
        alert("Price should be a number.");
        return;
    }
    priceInput.value = price;

    // Validation 6: Check discountOfItem is between 0 and 100
    const discount = parseFloat(discountInput.value);
    if (isNaN(discount) || discount < 0 || discount > 100) {
        alert("Discount should be between 0 and 100.");
        return;
    }

    // Validation 7: Check expireDateOfItem is not a previous date
    const currentDate = new Date();
    const expireDate = new Date(expireDateInput.value);
    if (expireDate < currentDate) {
        alert("Expiration date cannot be a previous date.");
        return;
    }

    // Validation 8: Check categoryOfItem is selected
    if (categoryDropdown.selectedIndex === 0) {
        alert("Please select a category.");
        return;
    }

    const itemId = generateUniqueId();

    const newItem = {
        itemId: itemId,
        codeOfItem: itemCodeInput.value,
        nameOfItem: itemNameInput.value,
        categoryOfItem: categoryDropdown.value,
        quantityOfItem: quantity,
        priceOfItem: price,
        discountOfItem: discount,
        expireDateOfItem: expireDateInput.value,
        picture: previewImage.src
    };

    itemsData.push(newItem);

    displayItems(itemsData);

    // Reset form controls individually
    itemCodeInput.value = '';
    itemNameInput.value = '';
    categoryDropdown.value = '';
    quantityInput.value = '';
    priceInput.value = '';
    discountInput.value = '';
    expireDateInput.value = '';
    previewImage.src = "../asset/images/add item img.jpg";

    const addCustomerModal = new bootstrap.Modal(document.getElementById('addCustomerModal'));
    addCustomerModal.hide();

    // Display success alert
    alert("Item added successfully!");
}

function displayItems(itemsData) {
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) {
        console.error("Dashboard content element not found!");
        return;
    }

    // Clear the existing content
    dashboardContent.innerHTML = '';

    itemsData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'dashboard-card';
        card.setAttribute('data-item-id', item.itemId);

        card.innerHTML = `
            <img src="${item.picture}" alt="" class="card-image">
            <div class="card-detail">
                <div class="no-of-orders">${item.discountOfItem}%
                <i class="fa-solid fa-ranking-star fa-bounce"></i>
                </div>  
                <div class="customer-info">
                    <ul>
                        <li>
                            <p>stock</p>
                            <b>${item.quantityOfItem}</b>
                        </li>
                    </ul>
                </div>
                <div class="customer-name-line">
                    <h6 class="h6-title">${item.nameOfItem}</h6>
                </div>
                <div class="dist-bottom-row">
                    <div class="customer-bottom-icon">
                        <i class="fa-solid fa-pen-to-square fa-fade" data-bs-toggle="modal" data-bs-target="#updateDataModal"></i>
                        <i class="fa-solid fa-trash-can fa-fade" data-bs-toggle="modal" onclick="showDeleteConfirmation('${item.itemId}')"></i>
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
    addItem();
});

function showDeleteConfirmation(itemId) {
    const confirmation = confirm("Do you want to delete this item?");
    if (confirmation) {
        deleteItem(itemId);
    }
}

function deleteItem(itemId) {
    const updatedItemsData = itemsData.filter(item => item.itemId !== itemId);
    itemsData = updatedItemsData;
    displayItems(updatedItemsData);
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
            const itemId = target.closest('.dashboard-card').dataset.category.split(' ')[1];
            const selectedItem = itemsData.find(item => item.itemId === itemId);

            // Populate the update modal with existing data
            populateUpdateModal(selectedItem);
        }
    });

    // Add an event listener to the update button in the update modal form
    document.getElementById('update-data-form').addEventListener('submit', function (e) {
        e.preventDefault();

        updateItem();
    });
});

// Function to populate the update modal with existing data
function populateUpdateModal(item) {
    const updateDataForm = document.getElementById('update-data-form');
    const previewImage = updateDataForm.querySelector('#update-previewImage');
    const itemCodeInput = updateDataForm.querySelector('#update-customer-id-input');
    const itemNameInput = updateDataForm.querySelector('#update-customer-name-input');
    const discountInput = updateDataForm.querySelector('#update-no-of-orders-input');

    // Check if item is defined
    if (item) {
        // Populate the input fields with existing data
        updateDataForm.dataset.itemId = item.itemId;
        itemCodeInput.value = item.codeOfItem || '';
        itemNameInput.value = item.nameOfItem || '';
        categoryDropdown.value = item.categoryOfItem || '';
        quantityInput.value = item.quantityOfItem || '';
        priceInput.value = item.priceOfItem || '';
        discountInput.value = item.discountOfItem || '';
        expireDateInput.value = item.expireDateOfItem || '';
        previewImage.src = item.picture || '';

        // Show the update modal
        const updateDataModal = new bootstrap.Modal(document.getElementById('updateDataModal'));
        updateDataModal.show();
    } else {
        console.error("Selected item is undefined.");
    }
}

// Function to update the item
function updateItem() {
    // Retrieve updated values from the form
    const previewImage = document.getElementById('update-previewImage');
    const itemCodeInput = document.getElementById('update-customer-id-input');
    const itemNameInput = document.getElementById('update-customer-name-input');
    const discountInput = document.getElementById('update-no-of-orders-input');

    // Retrieve the item ID from the update modal
    const itemId = document.getElementById('update-data-form').dataset.itemId;

    // Find the index of the item in the itemsData array
    const itemIndex = itemsData.findIndex(item => item.itemId === itemId);

    if (itemIndex !== -1) {
        // Get the existing item
        const existingItem = itemsData[itemIndex];

        // Create an object to store updated values
        const updatedValues = {};

        // Compare and store updated values
        if (itemCodeInput.value.trim() !== String(existingItem.codeOfItem).trim()) {
            updatedValues.codeOfItem = itemCodeInput.value.trim();
        }

        if (itemNameInput.value !== String(existingItem.nameOfItem).trim()) {
            updatedValues.nameOfItem = itemNameInput.value;
        }

        if (categoryDropdown.value !== String(existingItem.categoryOfItem).trim()) {
            updatedValues.categoryOfItem = categoryDropdown.value;
        }

        const newQuantity = parseFloat(quantityInput.value);
        if (!isNaN(newQuantity) && newQuantity !== parseFloat(existingItem.quantityOfItem)) {
            updatedValues.quantityOfItem = newQuantity;
        }

        const newPrice = parseFloat(priceInput.value);
        if (!isNaN(newPrice) && newPrice !== parseFloat(existingItem.priceOfItem)) {
            updatedValues.priceOfItem = newPrice.toFixed(2);
        }

        const newDiscount = parseFloat(discountInput.value);
        if (!isNaN(newDiscount) && newDiscount !== parseFloat(existingItem.discountOfItem)) {
            updatedValues.discountOfItem = newDiscount;
        }

        const newExpireDate = new Date(expireDateInput.value);
        if (!isNaN(newExpireDate.getTime()) && newExpireDate.getTime() !== new Date(existingItem.expireDateOfItem).getTime()) {
            updatedValues.expireDateOfItem = expireDateInput.value;
        }

        // Validation 1: Check item code format (B followed by 4 digits)
        if (updatedValues.codeOfItem) {
            const itemCode = updatedValues.codeOfItem.trim();
            if (!/^B\d{4}$/.test(itemCode)) {
                alert("Invalid item code format. Code should start with 'B' followed by 4 digits.");
                return;
            }
        }

        // Validation 2: Check quantity is a positive number
        if (updatedValues.quantityOfItem) {
            const quantity = updatedValues.quantityOfItem;
            if (isNaN(quantity) || quantity < 0) {
                alert("Quantity should be a positive number.");
                return;
            }
        }

        // Validation 3: Format price as currency
        if (updatedValues.priceOfItem) {
            const price = parseFloat(updatedValues.priceOfItem);
            if (isNaN(price)) {
                alert("Price should be a number.");
                return;
            }
        }

        // Validation 4: Check discount is between 0 and 100
        if (updatedValues.discountOfItem) {
            const discount = updatedValues.discountOfItem;
            if (isNaN(discount) || discount < 0 || discount > 100) {
                alert("Discount should be between 0 and 100.");
                return;
            }
        }

        // Validation 5: Check expire date is not a previous date
        if (updatedValues.expireDateOfItem) {
            const currentDate = new Date();
            const expireDate = new Date(updatedValues.expireDateOfItem);
            if (expireDate < currentDate) {
                alert("Expiration date cannot be a previous date.");
                return;
            }
        }

        // Validation 6: Check category is selected
        if (updatedValues.categoryOfItem) {
            const category = updatedValues.categoryOfItem.trim();
            if (category === "") {
                alert("Please select a category.");
                return;
            }
        }

        // Check if any values have changed
        if (Object.keys(updatedValues).length > 0) {
            // Update only the fields that have changed
            const updatedItem = {
                itemId: itemId,
                codeOfItem: updatedValues.codeOfItem || existingItem.codeOfItem,
                nameOfItem: updatedValues.nameOfItem || existingItem.nameOfItem,
                categoryOfItem: updatedValues.categoryOfItem || existingItem.categoryOfItem,
                quantityOfItem: updatedValues.quantityOfItem || existingItem.quantityOfItem,
                priceOfItem: updatedValues.priceOfItem || existingItem.priceOfItem,
                discountOfItem: updatedValues.discountOfItem || existingItem.discountOfItem,
                expireDateOfItem: updatedValues.expireDateOfItem || existingItem.expireDateOfItem,
                picture: existingItem.picture // Keep the original picture
            };

            // Update the item in the itemsData array
            itemsData[itemIndex] = updatedItem;

            // Display updated items
            displayItems(itemsData);

            // Display success alert
            alert("Item updated successfully!");

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
        alert("Item not found for updating.");

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
        const itemId = target.closest('.dashboard-card').dataset.category.split(' ')[1];
        const selectedItem = itemsData.find(item => item.itemId === itemId);

        // Populate the update modal with existing data
        populateUpdateModal(selectedItem);
    }
});