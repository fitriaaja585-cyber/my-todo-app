// Fungsi Jam Digital
function updateClock() {
    const now = new Date();
    const clockElement = document.getElementById('digital-clock');
    const dateElement = document.getElementById('date-text');
    
    clockElement.innerText = now.toLocaleTimeString('id-ID');
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.innerText = now.toLocaleDateString('id-ID', options);
}
setInterval(updateClock, 1000);
updateClock();

// Logika Daftar Tugas
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

window.onload = () => {
    const savedData = JSON.parse(localStorage.getItem('myTodos')) || [];
    savedData.forEach(task => createTaskElement(task.text, task.completed));
};

function saveData() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('.text-task').innerText,
            completed: li.classList.contains('done')
        });
    });
    localStorage.setItem('myTodos', JSON.stringify(tasks));
}

function createTaskElement(text, isCompleted = false) {
    const li = document.createElement('li');
    if (isCompleted) li.classList.add('done');
    
    li.innerHTML = `
        <span class="text-task" style="cursor:pointer">${text}</span>
        <span class="delete-btn">X</span>
    `;

    li.querySelector('.text-task').addEventListener('click', () => {
        li.classList.toggle('done');
        saveData();
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        saveData();
    });

    todoList.appendChild(li);
}

addBtn.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        createTaskElement(input.value);
        saveData();
        input.value = "";
    }
});