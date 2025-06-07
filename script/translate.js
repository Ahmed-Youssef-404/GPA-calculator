let changeLanguage = document.getElementById('changeLang')

let currentLang = 'en';

changeLanguage.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en'
    console.log(`Translate.js: الحالة اتغيرت لـ ${currentLang}`);
    setLanguage(currentLang);

    // 1. أنشئ حدث مخصص
    const event = new CustomEvent('stateChanged', {
        detail: { newState: currentLang } // ابعت القيمة الجديدة هنا
    });

    // 2. أطلق الحدث ده عشان أي حد بيسمع له يعرف
    document.dispatchEvent(event);
});



// changeLanguage.addEventListener('click', function() {
// });

fetch('data/data.json')
    .then(res => res.json())
    .then(data => {
        translations = data;
        console.log(data)
        setLanguage(currentLang);
    })
    .catch(err => {
        console.error('Failed to load language file:', err);
    });

function setLanguage(lang) {
    const elements = translations[lang];

    for (let id in elements) {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = elements[id];
        }
    }




    // لو حابب تغير اتجاه الصفحة
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    currentLang = lang;
}