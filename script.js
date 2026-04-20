// 1. UPDATE JAM
function updateTime() {
    const clock = document.getElementById('digital-clock');
    const dateText = document.getElementById('date-text');
    const now = new Date();
    clock.innerText = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
    dateText.innerText = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
setInterval(updateTime, 1000);
updateTime();

// 2. PINDAH TAB
function switchTab(event, tabId) {
    // Sembunyikan semua konten
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    // Matikan semua tombol nav
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    
    // Tampilkan yang dipilih
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// 3. FITUR DIARY & MOOD
function saveDiary() {
    const text = document.getElementById('diary-area').value;
    localStorage.setItem('myDiary', text);
    alert('Diary kamu sudah disimpan aman! ✨💖');
}

function setMood(mood) {
    document.getElementById('current-mood').innerText = mood;
    localStorage.setItem('myMood', mood);
}

// Ambil data lama saat buka web
window.onload = () => {
    document.getElementById('diary-area').value = localStorage.getItem('myDiary') || "";
    document.getElementById('current-mood').innerText = localStorage.getItem('myMood') || "Belum dipilih";
    
    // Load Todo List (jika ada kode lama kamu, taruh di bawah sini)
};