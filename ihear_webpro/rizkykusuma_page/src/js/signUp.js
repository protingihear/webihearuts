document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("sign-up-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("text-field-email-address").value;
        const username = document.getElementById("text-field-username").value;
        const password = document.getElementById("text-field-password").value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;

        // Validasi jika ada field yang kosong
        if (email === "" || username === "" || password === "" || !gender) {
            alert("Semua field harus diisi!");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Cek apakah email sudah terdaftar
        const isEmailExist = users.some(user => user.email === email);
        if (isEmailExist) {
            alert("Email sudah terdaftar, gunakan email lain.");
            return;
        }

        // Simpan data pengguna baru
        users.push({ email, username, password, gender });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Akun berhasil dibuat! Silakan login.");
        window.location.href = "signIn.html";
    });
});
