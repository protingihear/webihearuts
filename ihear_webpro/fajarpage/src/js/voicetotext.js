const micButton = document.querySelector('.mic-container .circle-icon');
const stopButton = document.querySelector('.stop-container .circle-icon');
const judul=document.querySelector('.atas h1')
const gambar=document.querySelector('.tengah img')

const awal='assets/images/waveform.png'

const akhir='assets/images/gerak.png'

micButton.addEventListener('click', function() {
    micButton.classList.toggle('active');

    if (micButton.classList.contains('active')) {
        stopButton.classList.add('active');
	judul.textContent='merekam';
	gambar.src=akhir

    }
});

stopButton.addEventListener('click', function() {
    if (stopButton.classList.contains('active')) {
        stopButton.classList.remove('active'); 
        micButton.classList.remove('active'); 
	judul.textContent="Mulai menerjemahkan" ;
		gambar.src=awal
    }
});
