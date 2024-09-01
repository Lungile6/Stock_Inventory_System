document.addEventListener('DOMContentLoaded', loadInventory);

const productForm = document.getElementById('product-form');
const inventoryTable = document.querySelector('#inventory-table tbody');

productForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const category = document.getElementById('product-category').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const quantity = parseInt(document.getElementById('product-quantity').value);

    const product = { name, description, category, price, quantity };
    addProduct(product);
    productForm.reset();
});

function addProduct(product) {
    const inventory = getInventory();
    inventory.push(product);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    renderInventory();
}

function getInventory() {
    return JSON.parse(localStorage.getItem('inventory')) || [];
}

function renderInventory() {
    const inventory = getInventory();
    inventoryTable.innerHTML = '';
    inventory.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>
                <button onclick="updateProduct(${index})">Update</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        inventoryTable.appendChild(row);
        checkLowStock(product);
    });
}

function checkLowStock(product) {
    if (product.quantity < 5) {
        alert(`Low stock alert for ${product.name}! Only ${product.quantity} left.`);
    }
}

function updateProduct(index) {
    const inventory = getInventory();
    const product = inventory[index];
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-quantity').value = product.quantity;

    deleteProduct(index);
}

function deleteProduct(index) {
    const inventory = getInventory();
    inventory.splice(index, 1);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    renderInventory();
}