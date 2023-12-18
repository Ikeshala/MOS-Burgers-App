var form = document.getElementById("add-item-form");
var imgInput = document.getElementById("imgInput");
var previewImage = document.getElementById("previewImage");

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

function addItem() {
    var itemsData = [];

    const itemCode = document.getElementById('item-code-input').value;
    const itemName = document.getElementById('item-name-input').value;
    const category = document.getElementById('category-dropdown').value;
    const quantity = document.getElementById('quantity-input').value;
    const price = document.getElementById('price-input').value;
    const discount = document.getElementById('discount-input').value;
    const expireDate = document.getElementById('expire-date-input').value;

    const itemId = generateUniqueId();

    const newItem = {
        itemId: itemId,
        codeOfItem: itemCode,
        nameOfItem: itemName,
        categoryOfItem: category,
        quantityOfItem: quantity,
        priceOfItem: price,
        discountOfItem: discount,
        expireDateOfItem: expireDate,
        picture: (previewImage.src && previewImage.src !== "undefined") ? previewImage.src : "../asset/images/add item img.jpg" // Include the 'picture' property
    };

    itemsData.push(newItem);

    displayItems(itemsData);

    form.reset();
    previewImage.src = "../asset/images/add item img.jpg";

    const addItemModal = new bootstrap.Modal(document.getElementById('addItemModal'));
    addItemModal.hide();
}

function displayItems(itemsData) {
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) {
        console.error("Dashboard content element not found!");
        return;
    }

    // dashboardContent.innerHTML = '';

    itemsData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'dashboard-card';
        card.setAttribute('data-category', item.categoryOfItem);

        card.innerHTML = `
        <img src="${item.picture}" alt="" class="card-image"> <!-- Use the 'picture' property for the image source -->
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
              <i class="fa-solid fa-trash-can fa-fade" data-bs-toggle="modal" data-bs-target="#readDataModal"></i>
            </div>
          </div>
          <div class="expire-tooltip">Expires on: ${item.expireDateOfItem}</div>
        </div>
      `;

        dashboardContent.appendChild(card);
    });
}

document.getElementById('add-item-link').addEventListener('click', displayModal);

imgInput.addEventListener('change', () => {
    if (imgInput.files[0].size < 1000000) {
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            var imgUrl = e.target.result;
            previewImage.setAttribute('src', imgUrl);
        };

        fileReader.readAsDataURL(imgInput.files[0]);
    } else {
        alert("This file is too large!");
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addItem(); // Call the addItem function directly
});

function displaySelectedImage() {
    if (imgInput.files[0].size < 1000000) {
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            var imgUrl = e.target.result;
            previewImage.setAttribute('src', imgUrl);
        };

        fileReader.readAsDataURL(imgInput.files[0]);
    } else {
        alert("This file is too large!");
    }
}

// Generate unique ID function (you can replace it with your own logic)
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
