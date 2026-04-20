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

// 2. PINDAH TAB
function switchTab(event, tabId) {
    document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 3. SIMPAN PROFIL KE TABEL
function saveProfile() {
    const nameVal = document.getElementById('input-name').value;
    const classVal = document.getElementById('input-class').value;
    
    if (nameVal.trim() && classVal.trim()) {
        localStorage.setItem('userName', nameVal);
        localStorage.setItem('userClass', classVal);
        
        document.getElementById('display-name').innerText = nameVal;
        document.getElementById('display-class').innerText = classVal;
        alert('Data tabel profil sudah diupdate! ✨🌸');
    }
}

// 4. DAFTAR TUGAS
function createTask(text, cat, isDone = false) {
    const li = document.createElement('li');
    if (isDone) li.classList.add('done');
    
    li.innerHTML = `
        <div>
            <span class="task-text">${text}</span>
            <span class="badge">${cat}</span>
        </div>
        <button class="del-btn" style="border:none; background:none; color:#ffcccc; cursor:pointer; font-weight:bold;">Hapus</button>
    `;

    li.querySelector('.task-text').onclick = () => {
        li.classList.toggle('done');
        saveTasks();
    };

    li.querySelector('.del-btn').onclick = () => {
        li.remove();
        saveTasks();
    };

    document.getElementById('todo-list').appendChild(li);
}

document.getElementById('add-btn').onclick = () => {
    const input = document.getElementById('todo-input');
    const category = document.getElementById('task-category').value;
    if (input.value.trim()) {
        createTask(input.value, category);
        saveTasks();
        input.value = "";
    }
};

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        tasks.push({
            t: li.querySelector('.task-text').innerText,
            c: li.querySelector('.badge').innerText,
            d: li.classList.contains('done')
        });
    });
    localStorage.setItem('myDesktopTasks', JSON.stringify(tasks));
}

// 5. LOAD SEMUA DATA
window.onload = () => {
    // Load Profil
    document.getElementById('display-name').innerText = localStorage.getItem('userName') || "Fitria";
    document.getElementById('display-class').innerText = localStorage.getItem('userClass') || "XI RPL 1";
    
    // Load Tugas
    const saved = JSON.parse(localStorage.getItem('myDesktopTasks')) || [];
    saved.forEach(task => createTask(task.t, task.c, task.d));
};