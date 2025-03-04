document.getElementById('subjects').addEventListener('change', function () {
    const subjectsContainer = document.getElementById('subjects-container');
    subjectsContainer.innerHTML = '';
    const numSubjects = this.value;

    for (let i = 1; i <= numSubjects; i++) {
        subjectsContainer.innerHTML += `
            <div class="form-group">
                <label for="grade${i}">Subject ${i} Grade:</label>
                <select id="grade${i}" required>
                    <option value="4">A+</option>
                    <option value="3.7">A</option>
                    <option value="3.3">B+</option>
                    <option value="3">B</option>
                    <option value="2.7">C+</option>
                    <option value="2.4">C</option>
                    <option value="2.2">D+</option>
                    <option value="2">D</option>
                    <option value="0">F</option>
                </select>
            </div>
            <div class="form-group">
                <label for="credits${i}">Subject ${i} Credits:</label>
                <input type="number" id="credits${i}" placeholder="Enter credits for subject ${i}" required>
            </div>
        `;
    }
});

function calculateGPA() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';

    const numSubjects = document.getElementById('subjects').value;
    const previousGPA = document.getElementById('previousGPA').value;
    const previousCredits = document.getElementById('previousCredits').value;

    // Check if any of the main fields are empty
    if (!numSubjects || !previousGPA || !previousCredits) {
        errorMessage.innerText = "Please fill in all the required fields.";
        errorMessage.style.display = 'block';
        return;
    }

    let totalGradePoints = 0;
    let totalCredits = 0;
    let isValid = true;

    for (let i = 1; i <= numSubjects; i++) {
        const grade = document.getElementById(`grade${i}`).value;
        const credits = document.getElementById(`credits${i}`).value;

        // Check if any subject grade or credits field is empty
        if (!grade || !credits) {
            isValid = false;
            break;
        }

        totalGradePoints += parseFloat(grade) * parseFloat(credits);
        totalCredits += parseFloat(credits);
    }

    if (!isValid) {
        errorMessage.innerText = "Please fill in all the subject grades and credits.";
        errorMessage.style.display = 'block';
        return;
    }

    const currentGPA = totalGradePoints / totalCredits;
    const overallGradePoints = (parseFloat(previousGPA) * parseFloat(previousCredits)) + totalGradePoints;
    const overallCredits = parseFloat(previousCredits) + totalCredits;
    const newTotalGPA = overallGradePoints / overallCredits;

    document.getElementById('currentGPA').innerHTML = `Current Semester GPA: <span class="result">${currentGPA.toFixed(2)}</span>`;
    document.getElementById('newTotalGPA').innerHTML = `New Total GPA: <span class="result">${newTotalGPA.toFixed(2)}</span>`;
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

