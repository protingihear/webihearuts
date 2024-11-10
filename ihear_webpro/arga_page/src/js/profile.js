document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.length > 0 ? users[0] : {};

    document.getElementById("name").value = user.username || '';
    document.getElementById("bio").value = user.bio || '';
    document.getElementById("email").value = user.email || '';
    if (user.gender === "P") {
        document.getElementById("gender-display").textContent = "Perempuan";
    } else {
        document.getElementById("gender-display").textContent = "Laki-Laki";
    }
    if (user.profilePic) {
        document.getElementById("profile-pic").src = user.profilePic;
    }

    let editButton = document.querySelector(".btn.btn-primary");
    editButton.addEventListener("click", function () {
        if (editButton.textContent === "Edit") {
            editButton.textContent = "Save";
            enableEditing();
        } else {
            if (validateForm()) {
                editButton.textContent = "Edit";
                saveData();
                disableEditing();
            }
        }
    });

    document.getElementById("profile-pic-input").addEventListener("change", function (event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file.type.startsWith("image/")) { // Accepts any image type
                let reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById("profile-pic").src = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                alert("Only image files are allowed.");
                event.target.value = "";  
            }
        }
    });
});

// Enable editing mode
function enableEditing() {
    document.getElementById("bio").removeAttribute("disabled");
    document.getElementById("name").removeAttribute("disabled");
    document.getElementById("email").removeAttribute("disabled");
    document.getElementById("password").removeAttribute("disabled");
    document.getElementById("confirm-password").removeAttribute("disabled");
    document.getElementById("gender-view").classList.add("d-none");
    document.getElementById("gender-edit").classList.remove("d-none");
    document.querySelector(".edit-icon").style.display = "inline-block";
    document.querySelector(".profile-edit-btn").style.display = "flex";

    let currentGender = document.getElementById("gender-display").textContent;
    if (currentGender === "Perempuan") {
        document.getElementById("gender-p").checked = true;
    } else {
        document.getElementById("gender-l").checked = true;
    }
}

// Validate form inputs
function validateForm() {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const nameError = document.getElementById("name-error");
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirm-password-error");

    // Clear previous error messages
    nameError.style.display = "none";
    passwordError.style.display = "none";
    confirmPasswordError.style.display = "none";

    
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name)) {
        nameError.textContent = "Nama hanya boleh mengandung huruf.";
        nameError.style.display = "block";
        return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`{}\[\]:;"'<>,.?\/\\|-]).{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.textContent = "Kata sandi harus minimal 8 karakter, termasuk satu huruf kapital, satu angka, dan satu karakter khusus.";
        passwordError.style.display = "block";
        return false;
    }

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Password tidak cocok.";
        confirmPasswordError.style.display = "block";
        return false;
    }

    return true;
}

// Disable editing mode
function disableEditing() {
    document.getElementById("bio").setAttribute("disabled", true);
    document.getElementById("name").setAttribute("disabled", true);
    document.getElementById("email").setAttribute("disabled", true);
    document.getElementById("password").setAttribute("disabled", true);
    document.getElementById("confirm-password").setAttribute("disabled", true);
    document.getElementById("gender-view").classList.remove("d-none");
    document.getElementById("gender-edit").classList.add("d-none");
    document.querySelector(".edit-icon").style.display = "none";
    document.querySelector(".profile-edit-btn").style.display = "none";
}

// Save data to local storage
function saveData() {
    let userData = {
        username: document.getElementById("name").value,
        bio: document.getElementById("bio").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        profilePic: document.getElementById("profile-pic").src
    };

    localStorage.setItem("users", JSON.stringify([userData]));
    document.getElementById("gender-display").textContent = userData.gender === "P" ? "Perempuan" : "Laki-Laki";
    alert("Profile updated successfully!");
}
