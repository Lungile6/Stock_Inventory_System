document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('inventory.html')) {
        loadItems();
    }
});

function signUp() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (username && password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.username === username)) {
            alert('Username already exists');
            return;
        }
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Sign up successful');
    }
}

function signIn() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', username);
        window.location.href = 'inventory.html';
    } else {
        alert('Invalid credentials');
    }
}

function signOut() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = document.getElementById('itemQuantity').value;

    if (itemName && itemQuantity) {
        const item = {
            name: itemName,
            quantity: itemQuantity
        };

        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));

        document.getElementById('itemName').value = '';
        document.getElementById('itemQuantity').value = '';

        loadItems();
    }
}

function loadItems() {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = '';

    let items = JSON.parse(localStorage.getItem('items')) || [];

    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - ${item.quantity}
            <button class="delete" onclick="deleteItem(${index})">Delete</button>
        `;
        inventoryList.appendChild(li);
    });
}

function deleteItem(index) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    loadItems();
}
