// حماية الكود وضمان تحميل العناصر أولاً
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. تشغيل الساعة والوقت فوراً
    const timeDisplay = document.getElementById('timeDisplay');
    const dateDisplay = document.getElementById('dateDisplay');

    function updateDateTime() {
        const now = new Date();
        if (timeDisplay) timeDisplay.innerText = now.toLocaleTimeString('ar-EG');
        if (dateDisplay) dateDisplay.innerText = now.toLocaleDateString('ar-EG');
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // 2. دوال التحكم في النوافذ (Modals)
    window.openPopup = (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = 'flex';
    };

    window.closePopup = (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = 'none';
    };

    // ربط الأزرار الـ 3 بفتح النوافذ
    document.getElementById('btnUniform').onclick = () => openPopup('uniformPop');
    document.getElementById('btnReport').onclick = () => openPopup('reportPop');
    document.getElementById('btnLeader').onclick = () => openPopup('leaderPop');

    // 3. نظام الإدارة (الدخول)
    const adminArea = document.getElementById('adminArea');
    
    document.getElementById('adminLoginTrigger').onclick = () => {
        const user = prompt("User:");
        const pass = prompt("Pass:");
        if (user === "Admin" && pass === "@Admin") {
            adminArea.style.display = 'block';
            adminArea.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert("خطأ في البيانات!");
        }
    };

    document.getElementById('closeAdminBtn').onclick = () => {
        adminArea.style.display = 'none';
    };

    // حفظ بيانات الموظف
    document.getElementById('saveEmpBtn').onclick = () => {
        const id = document.getElementById('admId').value;
        const rank = document.getElementById('admRank').value;
        const status = document.getElementById('admStatus').value || "سليم";

        if (id && rank) {
            localStorage.setItem('MOH_' + id, JSON.stringify({ rank, status }));
            alert(`تم حفظ بيانات الموظف (${id}) بنجاح`);
            document.getElementById('admId').value = '';
            document.getElementById('admRank').value = '';
            document.getElementById('admStatus').value = '';
        } else {
            alert("برجاء ملء البيانات الأساسية");
        }
    };

    // 4. نظام البحث والاستعلام
    document.getElementById('searchBtn').onclick = () => {
        const query = document.getElementById('empSearchInput').value.trim();
        const panel = document.getElementById('resultPanel');
        
        if (!query) return;

        const storedData = localStorage.getItem('MOH_' + query);
        panel.style.display = 'block';

        if (storedData) {
            const info = JSON.parse(storedData);
            panel.innerHTML = `
                <p style="margin-bottom:5px;"><b>الرتبة:</b> <span style="color:#0ea5e9">${info.rank}</span></p>
                <p><b>المخالفات:</b> ${info.status}</p>
            `;
        } else {
            panel.innerHTML = `<p style="color:#ef4444">عذراً، هذا الكود غير مسجل.</p>`;
        }
    };
});
