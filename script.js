// 1. UPDATE JAM & TANGGAL
function updateTime() {
    const clock = document.getElementById('digital-clock');
    const dateText = document.getElementById('date-text');
    const now = new Date();
    
    if(clock) clock.innerText = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
    if(dateText) dateText.innerText = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
setInterval(updateTime, 1000);
updateTime();

// 2. FUNGSI PINDAH TAB (Navigasi Samping)
function switchTab(event, tabId) {
    // Sembunyikan semua konten tab
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Matikan status aktif di semua tombol navigasi
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Tampilkan tab yang dipilih & aktifkan tombolnya
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 3. FUNGSI SIMPAN PROFIL (Tombol Simpan Perubahan)
function saveProfile() {
    const nameInput = document.getElementById('input-name').value;
    const classInput = document.getElementById('input-class').value;
    
    if (nameInput.trim() !== "" && classInput.trim() !== "") {
        localStorage.setItem('userName', nameInput);
        localStorage.setItem('userClass', classInput);
        
        // Update tampilan nama di pojok kiri atas
        document.getElementById('display-name').innerText = nameInput;
        document.getElementById('display-class').innerText = classInput;
        
        alert('Profil kamu berhasil diperbarui! ✨🌸');
    } else {
        alert('Isi nama dan kelas dulu ya! 😊');
    }
}

// 4. LOGIKA DAFTAR TUGAS (Tombol Tambah)
const inputTodo = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

function createTaskElement(text, category, isCompleted = false) {
    const li = document.createElement('li');
    if (isCompleted) li.classList.add('done');
    
    li.innerHTML = `
        <div class="task-info">
            <span class="text-task" style="cursor:pointer; font-weight:bold;">${text}</span>
            <br><small style="color: #ff7eb9;">${category}</small>
        </div>
        <span class="delete-btn" style="cursor:pointer; color:#ffcccc; font-weight:bold;">Hapus</span>
    `;

    // Klik teks untuk coret selesai
    li.querySelector('.text-task').onclick = () => {
        li.classList.toggle('done');
        saveData();
    };

    // Klik hapus
    li.querySelector('.delete-btn').onclick = () => {
        li.remove();
        saveData();
    };

    todoList.appendChild(li);
}

// Event klik tombol Tambah
if(addBtn) {
    addBtn.addEventListener('click', () => {
        const category = document.getElementById('task-category').value;
        if (inputTodo.value.trim() !== "") {
            createTaskElement(inputTodo.value, category);
            saveData();
            inputTodo.value = ""; 
        }
    });
}

// 5. PENYIMPANAN DATA (LocalStorage)
function saveData() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        tasks.push({
            text: li.querySelector('.text-task').innerText,
            category: li.querySelector('small').innerText,
            completed: li.classList.contains('done')
        });
    });
    localStorage.setItem('myFullPlannerTasks', JSON.stringify(tasks));
}

// 6. LOAD DATA SAAT BUKA HALAMAN
window.onload = () => {
    // Load Profil
    const savedName = localStorage.getItem('userName') || "Nama Kamu";
    const savedClass = localStorage.getItem('userClass') || "Kelas - Jurusan";
    document.getElementById('display-name').innerText = savedName;
    document.getElementById('display-class').innerText = savedClass;
    
    // Load Tugas
    const savedTasks = JSON.parse(localStorage.getItem('myFullPlannerTasks')) || [];
    savedTasks.forEach(t => createTaskElement(t.text, t.category, t.completed));
};