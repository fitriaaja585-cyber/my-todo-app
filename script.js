const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
    if (input.value !== "") {
        const li = document.createElement('li');
        li.innerHTML = `
            ${input.value} 
            <span class="delete-btn" onclick="this.parentElement.remove()">X</span>
        `;
        todoList.appendChild(li);
        input.value = ""; // Kosongkan input setelah tambah
    }
});