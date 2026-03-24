document.addEventListener('DOMContentLoaded', () => {
    // 1. الساعة والتاريخ
    const timeEl = document.getElementById('timeDisplay');
    const dateEl = document.getElementById('dateDisplay');
    
    function update() {
        const now = new Date();
        if(timeEl) timeEl.innerText = now.toLocaleTimeString('ar-EG');
        if(dateEl) dateEl.innerText = now.toLocaleDateString('ar-EG');
    }
    setInterval(update, 1000);
    update();

    // 2. النوافذ المنبثقة
    window.openPopup = (id) => document.getElementById(id).style.display = 'flex';
    window.closePopup = (id) => document.getElementById(id).style.display = 'none';

    // 3. نظام الإدارة
    const adminArea = document.getElementById('adminArea');
    window.loginAdmin = () => {
        const u = prompt("User:");
        const p = prompt("Pass:");
        if(u === "Admin" && p === "@Admin") {
            adminArea.style.display = 'block';
            adminArea.scrollIntoView({ behavior: 'smooth' });
        } else { alert("خطأ!"); }
    };

    window.saveData = () => {
        const id = document.getElementById('admId').value;
        const rank = document.getElementById('admRank').value;
        if(id && rank) {
            localStorage.setItem('MOH_' + id, JSON.stringify({rank, status: document.getElementById('admStatus').value || "سليم"}));
            alert("تم الحفظ");
        }
    };

    // 4. البحث
    window.searchEmp = () => {
        const id = document.getElementById('empSearchInput').value;
        const res = document.getElementById('resultPanel');
        const data = localStorage.getItem('MOH_' + id);
        res.style.display = 'block';
        if(data) {
            const info = JSON.parse(data);
            res.innerHTML = `<p>الرتبة: ${info.rank}</p><p>الحالة: ${info.status}</p>`;
        } else { res.innerHTML = "غير موجود"; }
    };
});
