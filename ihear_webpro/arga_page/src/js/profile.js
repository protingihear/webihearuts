document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users"));
    let user;

    if (users && users.length > 0) {
        user = users[0];
    } else {
        user = {};
    }

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

    // Edit button event listener
    let editButton = document.querySelector(".btn.btn-primary");
    editButton.addEventListener("click", function () {
        if (editButton.textContent === "Edit") {
            editButton.textContent = "Save";
            enableEditing();
        } else {
            editButton.textContent = "Edit";
            saveData();
            disableEditing();
        }
    });

    // Profile picture upload event listener
    document.getElementById("profile-pic-input").addEventListener("change", function (event) {
        if (event.target.files.length > 0) {
            let reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("profile-pic").src = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    });
    
});

// Enable editing mode
function enableEditing() {
    document.getElementById("bio").removeAttribute("disabled");
    document.getElementById("name").removeAttribute("disabled");
    document.getElementById("email").removeAttribute("disabled");
    document.getElementById("password").removeAttribute("disabled");

    document.getElementById("gender-view").classList.add("d-none");
    document.getElementById("gender-edit").classList.remove("d-none");

    document.querySelector(".edit-icon").style.display = "inline-block";
    document.querySelector(".profile-edit-btn").style.display = "flex";

    // Set gender radio button based on current gender display
    let currentGender = document.getElementById("gender-display").textContent;
    if (currentGender === "Perempuan") {
        document.getElementById("gender-p").checked = true;
    } else {
        document.getElementById("gender-l").checked = true;
    }
}

// Disable editing mode
function disableEditing() {
    document.getElementById("bio").setAttribute("disabled", true);
    document.getElementById("name").setAttribute("disabled", true);
    document.getElementById("email").setAttribute("disabled", true);
    document.getElementById("password").setAttribute("disabled", true);

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
    if (userData.gender === "P") {
        document.getElementById("gender-display").textContent = "Perempuan";
    } else {
        document.getElementById("gender-display").textContent = "Laki-Laki";
    }
    alert("Profile updated successfully!");
}
