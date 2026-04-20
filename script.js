const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 1. Fungsi untuk memuat data dari memori browser saat web dibuka
window.onload = () => {
    // Ambil data yang tersimpan, jika tidak ada, buat array kosong []
    const savedData = JSON.parse(localStorage.getItem('myTodos')) || [];
    // Buat elemen daftar untuk setiap tugas yang tersimpan
    savedData.forEach(task => createTaskElement(task.text, task.completed));
};

// 2. Fungsi untuk menyimpan data ke memori browser
function saveData() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        tasks.push({
            text: li.querySelector('.text-task').innerText,
            completed: li.classList.contains('done') // Cek apakah ada class 'done'
        });
    });
    // Simpan array tugas ke localStorage dengan nama 'myTodos'
    localStorage.setItem('myTodos', JSON.stringify(tasks));
}

// 3. Fungsi utama untuk membuat elemen tugas baru
function createTaskElement(text, isCompleted = false) {
    const li = document.createElement('li');
    
    // Jika data yang dimuat berstatus 'completed', tambahkan class 'done'
    if (isCompleted) li.classList.add('done');
    
    li.innerHTML = `
        <span class="text-task" style="cursor:pointer">${text}</span>
        <span class="delete-btn">X</span>
    `;

    // FITUR A: Klik teks untuk coret (tanda selesai)
    li.querySelector('.text-task').addEventListener('click', () => {
        li.classList.toggle('done');
        saveData(); // Simpan perubahan status
    });

    // FITUR B: Klik X untuk hapus tugas
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        saveData(); // Simpan perubahan setelah dihapus
    });

    todoList.appendChild(li);
}

// 4. Perintah saat tombol "Tambah" diklik
addBtn.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        createTaskElement(input.value); // Buat elemen di layar
        saveData();                     // Simpan ke memori
        input.value = "";              // Kosongkan kotak input
    }
});