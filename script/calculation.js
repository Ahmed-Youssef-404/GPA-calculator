let isEnglish = 'en';

// استمع للحدث المخصص اللي اسمه 'stateChanged'
document.addEventListener('stateChanged', (event) => {
    // استقبل القيمة الجديدة من الحدث
    const newState = event.detail.newState;
    // console.log(newState)
    console.log(`Calculation.js: عرفت إن الحالة اتغيرت! القيمة الجديدة هي ${newState}`);

    if (newState === 'ar') {
        // currentLang = 'ar'
        isEnglish = false
        document.body.classList.remove('english');
        document.body.classList.add('arabic');
    } else {
        // currentLang = 'en'
        isEnglish = true
        document.body.classList.remove('arabic');
        document.body.classList.add('english');
    }
    console.log("Is it English? " + isEnglish)
    clear()
});


function clear() {
    document.getElementById('subjects').value = ""
    document.getElementById('previousGPA').value = ""
    document.getElementById('previousCredits').value = ""
    document.getElementById('subjects-container').innerHTML = ""
    errorMessage.style.display = 'none';

}

function clearPoints() {
    document.getElementById('currentGPA').innerHTML = `${isEnglish ? "Current Semester GPA" : "معدل الفصل الحالي"}:`

    document.getElementById('newTotalGPA').innerHTML = `${isEnglish ? "New Total GPA" : "المعدل التراكمي الجديد"}:`
}


// Replace these functions in calculation.js
function showPopup() {
    const overlay = document.getElementById('popup-overlay');
    const popupHolder = document.getElementById('popupHolder');

    overlay.style.display = 'block';
    popupHolder.style.display = 'block';

    // Trigger reflow to enable animation
    void overlay.offsetWidth;
    void popupHolder.offsetWidth;

    overlay.classList.add('show');
    document.querySelector('.popup').classList.add('show');
}

function hidePopup() {
    const overlay = document.getElementById('popup-overlay');
    const popup = document.querySelector('.popup');

    overlay.classList.remove('show');
    popup.classList.remove('show');

    // Wait for animation to complete before hiding
    setTimeout(() => {
        overlay.style.display = 'none';
        document.getElementById('popupHolder').style.display = 'none';
    }, 300);
}
document.getElementById('subjects').addEventListener('change', function () {
    const subjectsContainer = document.getElementById('subjects-container');
    subjectsContainer.innerHTML = '';
    const numSubjects = this.value;

    for (let i = 1; i <= numSubjects; i++) {
        subjectsContainer.innerHTML += `
        <div class=oneSubjec>
        
          <div class="form-group">
            <label for="grade${i}">
              ${isEnglish ? `Subject ${i} Grade:` : `درجة المادة ${i} :`}
            </label>
            <select id="grade${i}" required>
              <option value="4">${isEnglish ? 'A+' : 'A+'}</option>
              <option value="3.7">${isEnglish ? 'A' : 'A'}</option>
              <option value="3.3">${isEnglish ? 'B+' : 'B+'}</option>
              <option value="3">${isEnglish ? 'B' : 'B'}</option>
              <option value="2.7">${isEnglish ? 'C+' : 'C+'}</option>
              <option value="2.4">${isEnglish ? 'C' : 'C'}</option>
              <option value="2.2">${isEnglish ? 'D+' : 'D+'}</option>
              <option value="2">${isEnglish ? 'D' : 'D'}</option>
              <option value="0">${isEnglish ? 'F' : 'F'}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="credits${i}">
              ${isEnglish ? `Subject ${i} Credits:` : `عدد الساعات المعتمدة للمادة ${i} :`}
            </label>
            <input 
              type="number" 
              id="credits${i}" 
              placeholder="${isEnglish ? `Enter credits for subject ${i}` : `ادخل عدد الساعات للمادة ${i}`}"
              min="1"
              required
            >
          </div>
          </div>
          <div class="lin"></div>
        `;
    }
});

const errorMessage = document.getElementById('error-message');

function calculateGPA() {
    errorMessage.style.display = 'none';

    const numSubjects = document.getElementById('subjects').value;
    const previousGPA = document.getElementById('previousGPA').value;
    const previousCredits = document.getElementById('previousCredits').value;

    // Check if any of the main fields are empty
    if (!numSubjects || !previousGPA || !previousCredits) {
        errorMessage.innerText = isEnglish ? "Please fill in all the required fields." : "يرجى ملء جميع الحقول المطلوبة";
        errorMessage.style.display = 'block';
        clearPoints()
        return;
    }

    let totalGradePoints = 0;
    let totalCredits = 0;
    let isValid = true;
    // let gpaIsMore4 = false;

    for (let i = 1; i <= numSubjects; i++) {
        const grade = document.getElementById(`grade${i}`).value;
        const credits = document.getElementById(`credits${i}`).value;

        // Check if any subject grade or credits field is empty
        if (!grade || !credits) {
            isValid = false;
            break;
        }

        if (credits <= 0) {
            errorMessage.innerText = isEnglish ? "Course credits must be at least 1" : "عدد الساعات المعتمدة للمادة يجب أن يساوي على الأقل 1";
            errorMessage.style.display = 'block';
            clearPoints()
            return;
        }

        totalGradePoints += parseFloat(grade) * parseFloat(credits);
        totalCredits += parseFloat(credits);
    }

    if (!isValid) {
        errorMessage.innerText = isEnglish ? "Please fill in all the subject grades and credits." : "يرجى ملء جميع درجات المواد والساعات المعتمدة";
        errorMessage.style.display = 'block';
        clearPoints()
        return;
    }

    if (previousGPA > 4) {
        errorMessage.innerText = isEnglish ? "GPA must be less than or equal to 4.00" : "المعدل التراكمي يجب أن يكون أقل من أو يساوي 4.00";
        errorMessage.style.display = 'block';
        clearPoints()
        return;
    }




    const currentGPA = totalGradePoints / totalCredits;
    const overallGradePoints = (parseFloat(previousGPA) * parseFloat(previousCredits)) + totalGradePoints;
    const overallCredits = parseFloat(previousCredits) + totalCredits;
    const newTotalGPA = overallGradePoints / overallCredits;

    document.getElementById('currentGPA').innerHTML = `
    ${isEnglish ? "Current Semester GPA" : "معدل الفصل الحالي"}: 
    <span class="result">${currentGPA.toFixed(2)}</span>`;

    document.getElementById('newTotalGPA').innerHTML = `
    ${isEnglish ? "New Total GPA" : "المعدل التراكمي الجديد"}: 
    <span class="result">${newTotalGPA.toFixed(2)}</span>`;

}

document.querySelectorAll('.help').forEach(help => help.style.display = 'none');
document.querySelectorAll('.help-icon').forEach(icon => {
    // للأجهزة التي تدعم الماوس (سطح المكتب)
    icon.addEventListener('mouseenter', function () {
        const target = document.getElementById(this.dataset.target);
        if (target) {
            target.style.display = 'block';
        }
    });

    icon.addEventListener('mouseleave', function () {
        const target = document.getElementById(this.dataset.target);
        if (target) {
            target.style.display = 'none';
        }
    });

    // للأجهزة التي تدعم اللمس (الموبايل)
    icon.addEventListener('touchstart', function (e) {
        e.preventDefault(); // علشان نمنع السلوك الافتراضي
        const target = document.getElementById(this.dataset.target);
        if (target) {
            target.style.display = target.style.display === 'block' ? 'none' : 'block';
        }
    });
});

// التأكد من إخفاء الرسالة عند الضغط في أي مكان خارجها
document.addEventListener('click', function (event) {
    if (event.target.closest('.help') || event.target.closest('.help-icon')) {
        return;
    }

    document.querySelectorAll('.help').forEach(help => {
        help.style.display = 'none';
    });
});


