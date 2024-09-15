let users = JSON.parse(localStorage.getItem('users')) || [];
let stockItems = JSON.parse(localStorage.getItem('stockItems')) || [];
let loggedInUser = null;

function handleRegister() {
    const registerUsername = document.getElementById('registerUsername').value;
    const registerPassword = document.getElementById('registerPassword').value;
    const newUser = { id: users.length + 1, username: registerUsername, password: registerPassword, role: 'staff' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
}

function handleLogin() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    loggedInUser = users.find(user => user.username === loginUsername && user.password === loginPassword);
    if (loggedInUser) {
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('inventorySection').style.display = 'block';
        renderStockList();
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
    }
}

function handleAddStockItem() {
    const newStockItem = {
        id: stockItems.length + 1,
        name: document.getElementById('stockName').value,
        description: document.getElementById('stockDescription').value,
        quantity: parseInt(document.getElementById('stockQuantity').value),
        price: parseFloat(document.getElementById('stockPrice').value),
        supplier: document.getElementById('stockSupplier').value,
        category: document.getElementById('stockCategory').value,
    };
    stockItems.push(newStockItem);
    localStorage.setItem('stockItems', JSON.stringify(stockItems));
    renderStockList();
    clearStockInputs();
}

function renderStockList() {
    const stockListDiv = document.getElementById('stockList');
    stockListDiv.innerHTML = '';
    stockItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <div><strong>${item.name}</strong> - ${item.quantity} pcs - $${item.price}</div>
            <div>
                <button onclick="handleEditStockItem(${item.id})">Edit</button>
                <button class="delete" onclick="handleDeleteStockItem(${item.id})">Delete</button>
            </div>
        `;
        stockListDiv.appendChild(itemDiv);
    });
}

function handleEditStockItem(id) {
    const item = stockItems.find(item => item.id === id);
    if (item) {
        document.getElementById('stockName').value = item.name;
        document.getElementById('stockDescription').value = item.description;
        document.getElementById('stockQuantity').value = item.quantity;
        document.getElementById('stockPrice').value = item.price;
        document.getElementById('stockSupplier').value = item.supplier;
        document.getElementById('stockCategory').value = item.category;
        handleDeleteStockItem(id); // Remove item before adding edited version
    }
}

function handleDeleteStockItem(id) {
    stockItems = stockItems.filter(item => item.id !== id);
    localStorage.setItem('stockItems', JSON.stringify(stockItems));
    renderStockList();
}

function clearStockInputs() {
    document.getElementById('stockName').value = '';
    document.getElementById('stockDescription').value = '';
    document.getElementById('stockQuantity').value = '';
    document.getElementById('stockPrice').value = '';
    document.getElementById('stockSupplier').value = '';
    document.getElementById('stockCategory').value = '';
}
