// Get the language switch button
let changeLanguage = document.getElementById('changeLang');

// Check if there's a saved language in localStorage; if not, default to 'en'
let currentLang = localStorage.getItem('lang') || 'en';

document.body.classList.remove('english');
document.body.classList.remove('arabic');

if (currentLang === 'ar') {
        // currentLang = 'ar'
        document.body.classList.remove('english');
        document.body.classList.add('arabic');
    } else {
        // currentLang = 'en'
        document.body.classList.remove('arabic');
        document.body.classList.add('english');
    }

// This will store the translation data after fetching
let translations = {};

// Fetch the translation file (only once when the page loads)
fetch('data/data.json')
    .then(res => res.json())
    .then(data => {
        translations = data;
        setLanguage(currentLang); // Apply the saved or default language
    })
    .catch(err => {
        console.error('Failed to load language file:', err);
    });

// Listen for clicks on the language switch button
changeLanguage.addEventListener('click', () => {
    // Toggle between 'en' and 'ar'
    currentLang = currentLang === 'en' ? 'ar' : 'en';

    // Apply the new language to the page
    setLanguage(currentLang);

    // Save the selected language to localStorage
    localStorage.setItem('lang', currentLang);

    // Dispatch a custom event so other components can respond if needed
    const event = new CustomEvent('stateChanged', {
        detail: { newState: currentLang }
    });
    document.dispatchEvent(event);
});

// Function to apply the selected language
function setLanguage(lang) {
    const elements = translations[lang];

    // Loop through all translation keys and update matching elements on the page
    Object.entries(elements).forEach(([id, value]) => {
        const singleElement = document.getElementById(id);
        if (singleElement) {
            singleElement.innerHTML = value;
        }
    });

    // Change page direction (RTL or LTR) depending on the language
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update the current language value
    currentLang = lang;
}
