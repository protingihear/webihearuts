document.querySelector('.UploadStatus').addEventListener('click', function () {
    // Mendapatkan konten dari input
    const userContent = document.querySelector('.inputStatus').value;

    if (userContent === 'Bagikan Kegiatan Anda!!' || userContent.trim() === '') {
        alert("Please enter some content before posting!");
        return;
    }

    // Membuat elemen baru untuk postingan
    const newPost = document.createElement('div');
    newPost.className = 'postinganCommunity';

    // Isi dari elemen postingan baru
    newPost.innerHTML = `
        <div class="col">
            <div class="ProfilePostingan">
                <div class="profile-image">
                    <img src="assets/imgProfile.png" alt="Profile Image">
                </div>
                <p>Yazid Al-Adnan</p>
            </div>
        </div>
        <div class="IsiPostingan">
            <p>🌻 Be Kind 🌻</p>
            <p>${userContent}</p>
            <p>#BeKind #Inklusivitas #CintaTanpaBatas</p>
            <div class="text-center">
                <img src="assets/bekind.png" alt="Gambar Postingan">
            </div>
            <div class="buttonPostingan">
                <div class="lope">
                    <img src="assets/icon/Love.png" alt="Like Postingan">
                    <p>0</p>
                </div>
                <div class="komen">
                    <img src="assets/icon/message-text.png" alt="Komen">
                    <p>0</p>
                </div>
                <div class="share">
                    <img src="assets/icon/Icon.png" alt="Share">
                    <p>0</p>
                </div>
            </div>
        </div>
    `;

    // Menyisipkan elemen postingan baru tepat di bawah elemen terakhir di dalam `.ContentTengah`
    const contentTengah = document.querySelector('.ContentTengah');
    contentTengah.appendChild(newPost);

    // Menampilkan notifikasi postingan berhasil dipublikasi
    alert("Postingan telah dipublikasi!");

    // Mengosongkan input field
    document.querySelector('.inputStatus').value = '';
});
