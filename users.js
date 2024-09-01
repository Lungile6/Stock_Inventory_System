document.addEventListener('DOMContentLoaded', loadUsers);

const userForm = document.getElementById('user-form');

userForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = { username, password };
    addUser(user);
    userForm.reset();
});

function addUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function loadUsers() {
    const users = getUsers();
    // Additional functionality to manage users can be added here
}