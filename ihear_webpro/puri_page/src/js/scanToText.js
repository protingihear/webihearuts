document.querySelector('.camera-button').addEventListener('click', function () {
    const infoSection = document.getElementById("infoSection");
    const message = document.createElement("div");
    message.textContent = "Translate gerakan bahasa isyarat";
    infoSection.innerHTML = "";
    infoSection.appendChild(message);
});

// // Tambahkan elemen popup
// const popupOverlayCamera = document.createElement('div');
// popupOverlayCamera.classList.add('popup-overlay');
// popupOverlayCamera.innerHTML = `
//     <div class="popup-content">
//         <h2>Fitur sedang dikerjakan</h2>
//         <p>Mohon tunggu, fitur ini akan segera hadir.</p>
//         <button id="closePopupCamera">Tutup</button>
//     </div>
// `;
// document.body.appendChild(popupOverlayCamera);
// function showPopupCamera() {
//     popupOverlayCamera.style.display = 'flex';
// }

// function hidePopupCamera() {
//     popupOverlayCamera.style.display = 'none';
// }

// document.getElementById('closePopupCamera').addEventListener('click', hidePopupCamera);

// document.querySelector('.camera-button').addEventListener('click', function () {
//     showPopupCamera();
// });