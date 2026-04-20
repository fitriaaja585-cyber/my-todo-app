// Fungsi Jam Digital Aesthetic
function updateClock() {
    const now = new Date();
    const clockElement = document.getElementById('digital-clock');
    const dateElement = document.getElementById('date-text');
    
    // Format Jam: Menit (tanpa detik agar lebih estetis)
    clockElement.innerText = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.innerText = now.toLocaleDateString('id-ID', options);
}
setInterval(updateClock, 1000);
updateClock(); // Jalankan langsung

// Logika Daftar Tugas
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 1. Fungsi Memuat Data dari Browser
window.onload = () => {
    const savedData = JSON.parse(localStorage.getItem('myTodos')) || [];
    savedData.forEach(task => createTaskElement(task.text, task.completed));
};

// 2. Fungsi Menyimpan Data
function saveData() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('.text-task').innerText.trim(),
            completed: li.classList.contains('done')
        });
    });
    localStorage.setItem('myTodos', JSON.stringify(tasks));
}

// 3. Fungsi Membuat Elemen Tugas Imut
function createTaskElement(text, isCompleted = false) {
    const li = document.createElement('li');
    if (isCompleted) li.classList.add('done');
    
    li.innerHTML = `
        <span class="text-task" style="cursor:pointer">${text}</span>
        <span class="delete-btn">X</span>
    `;

    // Klik teks untuk coret (tanda selesai pink)
    li.querySelector('.text-task').addEventListener('click', () => {
        li.classList.toggle('done');
        saveData();
    });

    // Klik X untuk hapus
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        saveData();
    });

    todoList.appendChild(li);
}

// 4. Perintah Tambah Tugas Imut
addBtn.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        createTaskElement(input.value);
        saveData();
        input.value = ""; // Kosongkan input
    }
});