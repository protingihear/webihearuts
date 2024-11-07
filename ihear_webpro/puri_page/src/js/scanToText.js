// Tambahkan JavaScript di sini jika diperlukan
// Misalnya, untuk menambah fungsi ketika tombol kamera ditekan
document.querySelector('.camera-button').addEventListener('click', function () {
    const infoSection = document.getElementById("infoSection");
    const message = document.createElement("div");
    message.textContent = "Translate gerakan bahasa isyarat";
    infoSection.innerHTML = "";
    infoSection.appendChild(message);
});
