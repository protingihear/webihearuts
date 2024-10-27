document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.length > 0 ? users[0] : null;

    if (user) {
        document.getElementById("name").value = user.username || '';
        document.getElementById("bio").value = user.bio || '';
        document.getElementById("email").value = user.email || '';
        document.getElementById("gender-display").textContent = user.gender === "P" ? "Perempuan" : "Laki-Laki";
        
        // Set profile picture if available
        if (user.profilePic) {
            document.getElementById("profile-pic").src = user.profilePic;
        }
    }

    // Add an event listener to the Edit button
    const editButton = document.querySelector(".btn.btn-primary");
    editButton.addEventListener("click", function () {
        if (editButton.textContent === "Edit") {
            editButton.textContent = "Save";
            enableEditing();
        } else {
            editButton.textContent = "Edit";
            saveData();
        }
    });

    // Handle profile picture upload
    document.getElementById("profile-pic-input").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("profile-pic").src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});

// Enable editing mode
function enableEditing() {
    document.getElementById("bio").removeAttribute('disabled');
    document.getElementById("name").removeAttribute('disabled');
    document.getElementById("email").removeAttribute('disabled');
    document.getElementById("password").removeAttribute('disabled');

    // Toggle gender view/edit
    document.getElementById("gender-view").classList.add("d-none");
    document.getElementById("gender-edit").classList.remove("d-none");

    // Show the pencil icon
    document.querySelector(".edit-icon").style.display = "inline-block";

    // Show profile picture edit button
    document.querySelector(".profile-edit-btn").style.display = "flex";

    // Set current gender in the radio buttons
    const currentGender = document.getElementById("gender-display").textContent === "Perempuan" ? "P" : "L";
    document.getElementById(`gender-${currentGender.toLowerCase()}`).checked = true;
}

// Save data and exit editing mode
function saveData() {
    const username = document.getElementById("name").value;
    const bio = document.getElementById("bio").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const profilePic = document.getElementById("profile-pic").src;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length > 0) {
        users[0].username = username;
        users[0].bio = bio;
        users[0].email = email;
        users[0].password = password;
        users[0].gender = gender;
        users[0].profilePic = profilePic;

        localStorage.setItem("users", JSON.stringify(users));
        alert("Profile updated successfully!");
    }

    document.getElementById("gender-display").textContent = gender === "P" ? "Perempuan" : "Laki-Laki";

    document.getElementById("gender-view").classList.remove("d-none");
    document.getElementById("gender-edit").classList.add("d-none");

    // Disable fields after saving
    document.getElementById("bio").setAttribute('disabled', true);
    document.getElementById("name").setAttribute('disabled', true);
    document.getElementById("email").setAttribute('disabled', true);
    document.getElementById("password").setAttribute('disabled', true);

    // Hide the pencil icon after saving
    document.querySelector(".edit-icon").style.display = "none";

    // Hide the upload profile picture button after saving
    document.querySelector(".profile-edit-btn").style.display = "none";
}


