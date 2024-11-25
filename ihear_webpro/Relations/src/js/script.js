// INSERT
document.addEventListener('DOMContentLoaded', () => {
    // Event listener for posting content
    document.querySelector('.UploadStatus').addEventListener('click', function () {
        // Get the input content
        const userContent = document.querySelector('.inputStatus').value.trim();

        if (userContent === '' || userContent === 'Bagikan Kegiatan Anda!!') {
            alert("Please enter some content before posting!");
            return;
        }

        // Send data to the server using fetch API
        fetch('http://localhost/relations_iHear/postingan.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ isi_komentar: userContent })
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Create a new post
                const postContainer = document.createElement('div');
                postContainer.className = 'postinganCommunity';

                const colDiv = document.createElement('div');
                colDiv.className = 'col';

                const profileDiv = document.createElement('div');
                profileDiv.className = 'ProfilePostingan';

                const profileImgDiv = document.createElement('div');
                profileImgDiv.className = 'profile-image';

                const profileImg = document.createElement('img');
                profileImg.src = 'assets/imgProfile.png';
                profileImg.alt = 'Profile Image';
                profileImgDiv.appendChild(profileImg);

                const profileName = document.createElement('p');
                profileName.textContent = 'Yazid Al-Adnan';

                profileDiv.appendChild(profileImgDiv);
                profileDiv.appendChild(profileName);
                colDiv.appendChild(profileDiv);

                const contentDiv = document.createElement('div');
                contentDiv.className = 'IsiPostingan';

                const tagline = document.createElement('p');
                tagline.textContent = '🌻 Be Kind 🌻';

                const contentText = document.createElement('p');
                contentText.textContent = userContent;

                const hashtags = document.createElement('p');
                hashtags.textContent = '#BeKind #Inklusivitas #CintaTanpaBatas';

                const imgContainer = document.createElement('div');
                imgContainer.className = 'text-center';

                const postImg = document.createElement('img');
                postImg.src = 'assets/bekind.png';
                postImg.alt = 'Gambar Postingan';
                imgContainer.appendChild(postImg);

                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'buttonPostingan';

                const likeDiv = createButtonElement('Love', 0);
                const commentDiv = createButtonElement('message-text', 0);
                const shareDiv = createButtonElement('Icon', 0);

                buttonContainer.appendChild(likeDiv);
                buttonContainer.appendChild(commentDiv);
                buttonContainer.appendChild(shareDiv);

                contentDiv.appendChild(tagline);
                contentDiv.appendChild(contentText);
                contentDiv.appendChild(hashtags);
                contentDiv.appendChild(imgContainer);
                contentDiv.appendChild(buttonContainer);

                postContainer.appendChild(colDiv);
                postContainer.appendChild(contentDiv);

                document.querySelector('.ContentTengah').appendChild(postContainer);

                alert("Postingan telah dipublikasi!");
                document.querySelector('.inputStatus').value = '';
            } else {
                alert(`Gagal: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Terjadi kesalahan saat memposting.");
        });
    });

    // GET DATA
function getData() {
    fetch('http://localhost/relations_iHear/getData.php')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const contentContainer = document.querySelector('.ContentTengah');

            // Kosongkan container sebelum menambahkan data baru
            //nigger

            // Tambahkan setiap item sebagai post
            data.forEach(item => {
                const postContainer = document.createElement('div');
                postContainer.className = 'postinganCommunity';
                postContainer.dataset.id = item.ID; // Assign ID to dataset
                console.log(postContainer.dataset.id);
                const colDiv = document.createElement('div');
                colDiv.className = 'col';
            
                const profileDiv = document.createElement('div');
                profileDiv.className = 'ProfilePostingan';
            
                const profileImgDiv = document.createElement('div');
                profileImgDiv.className = 'profile-image';
            
                const profileImg = document.createElement('img');
                profileImg.src = 'assets/imgProfile.png';
                profileImg.alt = 'Profile Image';
                profileImgDiv.appendChild(profileImg);
            
                const profileName = document.createElement('p');
                profileName.textContent = 'Yazid Al-Adnan';
            
                profileDiv.appendChild(profileImgDiv);
                profileDiv.appendChild(profileName);
                colDiv.appendChild(profileDiv);
            
                const contentDiv = document.createElement('div');
                contentDiv.className = 'IsiPostingan';
            
                const tagline = document.createElement('p');
                tagline.textContent = '🌻 Be Kind 🌻';
            
                const contentText = document.createElement('p');
                contentText.textContent = item.isi_komentar;
            
                const hashtags = document.createElement('p');
                hashtags.textContent = '#BeKind #Inklusivitas #CintaTanpaBatas';
            
                const imgContainer = document.createElement('div');
                imgContainer.className = 'text-center';
            
                const postImg = document.createElement('img');
                postImg.src = 'assets/bekind.png';
                postImg.alt = 'Gambar Postingan';
                imgContainer.appendChild(postImg);
            
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'buttonPostingan';
            
                // Tambahkan tombol edit
                const editButton = document.createElement('div');
                const editIcon = document.createElement('img');
                editIcon.src = 'assets/icon/edit.png'; // URL ikon edit
                editIcon.alt = 'Edit Postingan';
                editIcon.style.cursor = 'pointer';
                editIcon.addEventListener('click', () => {
                    const id = postContainer.dataset.id; // Ambil ID dari dataset
                    editData(id);
                });
                editButton.appendChild(editIcon);
            
                // Tambahkan tombol hapus
                const deleteButton = document.createElement('div');
                const deleteIcon = document.createElement('img');
                deleteIcon.src = 'assets/icon/delete.png'; // URL ikon delete
                deleteIcon.alt = 'Hapus Postingan';
                deleteIcon.style.cursor = 'pointer';
                deleteIcon.addEventListener('click', () => {
                    const id = postContainer.dataset.id; // Ambil ID dari dataset
                    deleteData(id);
                });
                deleteButton.appendChild(deleteIcon);
            
                // Tambahkan tombol lainnya
                const likeDiv = createButtonElement('Love', 0);
                const commentDiv = createButtonElement('message-text', 0);
                const shareDiv = createButtonElement('Icon', 0);
            
                buttonContainer.appendChild(editButton);
                buttonContainer.appendChild(deleteButton);
                buttonContainer.appendChild(likeDiv);
                buttonContainer.appendChild(commentDiv);
                buttonContainer.appendChild(shareDiv);
            
                contentDiv.appendChild(tagline);
                contentDiv.appendChild(contentText);
                contentDiv.appendChild(hashtags);
                contentDiv.appendChild(imgContainer);
                contentDiv.appendChild(buttonContainer);
            
                postContainer.appendChild(colDiv);
                postContainer.appendChild(contentDiv);
            
                contentContainer.appendChild(postContainer);
            });                
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Gagal mengambil data dari server.");
        });
}
    

    // Helper function to create button elements
    function createButtonElement(icon, count) {
        const buttonDiv = document.createElement('div');
        const buttonImg = document.createElement('img');
        const buttonCount = document.createElement('p');

        buttonImg.src = `assets/icon/${icon}.png`;
        buttonImg.alt = `${icon} Postingan`;

        buttonCount.textContent = count;

        buttonDiv.appendChild(buttonImg);
        buttonDiv.appendChild(buttonCount);

        return buttonDiv;
    }

    function editData(ID) {
        console.log(ID);
        const newContent = prompt("Masukkan konten baru untuk komentar:");
        if (newContent && newContent.trim() !== "") {
            fetch('http://localhost/relations_iHear/editData.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    ID: ID, // Sesuaikan dengan nama kolom di database
                    isi_komentar: newContent.trim()
                })
            })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    // Refresh data setelah berhasil diperbarui
                    // document.querySelector('.ContentTengah').innerHTML = '';
                    getData();
                } else {
                    alert(`Gagal: ${data.message}`);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Terjadi kesalahan saat memperbarui komentar.");
            });
        } else {
            alert("Konten baru tidak boleh kosong.");
        }
    }
    
    
    // Fungsi untuk menghapus komentar
function deleteData(id_komentar) {
    if (confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
        fetch('http://localhost/relations_iHear/hapusData.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ id_komentar: id_komentar })
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert(data.message); // Menampilkan pesan sukses
                // Refresh data setelah berhasil dihapus
                // document.querySelector('.ContentTengah').innerHTML = '';
                getData();
            } else {
                alert(`Gagal: ${data.message}`); // Menampilkan pesan gagal
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Terjadi kesalahan saat menghapus komentar.");
        });
    }
}


    // Call getData when the page is loaded
    getData();
});
