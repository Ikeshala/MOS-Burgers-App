var form = document.getElementById("add-item-form");
var imgInput = document.getElementById("imgInput");
var previewImage = document.getElementById("previewImage");
var fileTooLargeAlertShown = false;
var itemsData = [];

function displayModal() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    const addItemModal = new bootstrap.Modal(document.getElementById('addItemModal'));

    addItemModal.show();

    addItemModal._element.addEventListener('shown.bs.modal', function () {
        const addItemButton = document.getElementById('add-item');

        if (addItemButton) {
            addItemButton.addEventListener('click', function () {
                addItem();
            });
        }
    });

    const closeButton = addItemModal._element.querySelector('.btn-close');
    closeButton.addEventListener('click', function () {
        overlay.style.display = 'none';
        addItemModal.hide();
    });
}

function displaySelectedImage() {
    imgInput.addEventListener('input', function () {
        fileTooLargeAlertShown = false;
    });

    if (imgInput.files[0].size < 1000000) {
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
    const itemCodeInput = document.getElementById('item-code-input');
    const itemNameInput = document.getElementById('item-name-input');
    const categoryDropdown = document.getElementById('category-dropdown');
    const quantityInput = document.getElementById('quantity-input');
    const priceInput = document.getElementById('price-input');
    const discountInput = document.getElementById('discount-input');
    const expireDateInput = document.getElementById('expire-date-input');

    // Validation 1: Check for empty fields
    if (!itemCodeInput.value || !itemNameInput.value || !categoryDropdown.value || !quantityInput.value || !priceInput.value || !discountInput.value || !expireDateInput.value || previewImage.src === "undefined") {
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

    form.reset();
    previewImage.src = "../asset/images/add item img.jpg";

    const addItemModal = new bootstrap.Modal(document.getElementById('addItemModal'));
    addItemModal.hide();

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
        card.setAttribute('data-category', `${item.categoryOfItem} ${item.itemId}`);

        card.innerHTML = `
        <img src="${item.picture}" alt="" class="card-image">
        <div class="card-detail">
          <div class="dish-discount">${item.discountOfItem}%
            <i class='bx bxs-discount bx-tada'></i>
          </div>
          <div class="dish-title">
            <h6 class="h6-title">${item.nameOfItem}</h6>
          </div>
          <div class="dish-info">
            <ul>
              <li>
                <p>code</p>
                <b>${item.codeOfItem}</b>
              </li>
              <li>
                <p>stock</p>
                <b>${item.quantityOfItem}</b>
              </li>
            </ul>
          </div>
          <div class="dist-bottom-row">
            Rs. ${item.priceOfItem}
            <div class="dish-bottom-icon">
              <i class="fa-solid fa-pen-to-square fa-fade" data-bs-toggle="modal" data-bs-target="#readDataModal"></i>
              <i class="fa-solid fa-trash-can fa-fade" data-bs-toggle="modal" onclick="showDeleteConfirmation('${item.itemId}')"></i>
            </div>
          </div>
          <div class="expire-tooltip">Expires on: ${item.expireDateOfItem}</div>
        </div>
      `;

        dashboardContent.appendChild(card);
    });
}

function deleteItem(itemId) {
    const updatedItemsData = itemsData.filter(item => item.itemId !== itemId);
    itemsData = updatedItemsData; 
    displayItems(updatedItemsData);
    alert("Item deleted successfully!");
}

document.getElementById('add-item-link').addEventListener('click', displayModal);

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

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}