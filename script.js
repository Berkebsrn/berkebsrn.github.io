const songs = [
    {
      title: "Aşk, Virüs",
      src: "music/song1.mp3",
      cover: "images/cover1.jpg",
      producer: "Redd",
    },
    {
      title: "Çözüm Sendin",
      src: "music/song2.mp3",
      cover: "images/cover2.jpg",
      producer: "İnsan Mıyız",
    },
    {
      title: "Rüzgar",
      src: "music/song3.mp3",
      cover: "images/cover3.jpg",
      producer: "Kalben",
    },
    {
      title: "Kumralım",
      src: "music/song4.mp3",
      cover: "images/cover4.jpg",
      producer: "Yaşar",
    },
    {
      title: "Ben",
      src: "music/song5.mp3",
      cover: "images/cover5.jpg",
      producer: "Barış Akarsu",
    },
];

let currentSongIndex = 0;
const audioElement = document.getElementById("audio");
const songNameElement = document.getElementById("song-name");
const producerNameElement = document.getElementById("producer-name");
const coverElement = document.getElementById("current-cover");
const seekElement = document.getElementById("seek");
const playButton = document.getElementById("play-button");

function loadSong(songIndex) {
    const song = songs[songIndex];
    songNameElement.textContent = song.title;
    producerNameElement.textContent = song.producer;
    audioElement.src = song.src;
    coverElement.src = song.cover;
    audioElement.load();
    seekElement.value = 0;
}

function togglePlay() {
    if (audioElement.paused) {
        audioElement.play();
        playButton.textContent = "❚❚"; // Play tuşu duraklatma olarak değişir
    } else {
        audioElement.pause();
        playButton.textContent = "▶"; // Duraklatma tuşu başlatmaya döner
    }
}

function prevSong() {
    if (audioElement.currentTime <= 3) {
        // Eğer şarkının ilk 3 saniyesindeysek, bir önceki şarkıya geç
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        audioElement.play();
    } else {
        // Şarkıyı başa al
        audioElement.currentTime = 0;
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioElement.play();
}

function selectSong(index) {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    audioElement.play(); // Şarkıyı oynatmaya başla
    playButton.textContent = "❚❚"; // Butonu duraklatma olarak değiştir
}


// Seek çubuğu dinamik güncelleme
audioElement.addEventListener("timeupdate", () => {
    if (audioElement.duration) {
        const value = (audioElement.currentTime / audioElement.duration) * 100;
        seekElement.value = value;
        seekElement.style.background = `linear-gradient(to right, #fff ${value}%, #404040 ${value}%)`;
    }
});

seekElement.addEventListener("input", () => {
    if (audioElement.duration) {
        audioElement.currentTime = (seekElement.value / 100) * audioElement.duration;
    }
});

// Otomatik şarkı geçişi
audioElement.addEventListener('ended', nextSong);

document.addEventListener("DOMContentLoaded", () => {
    loadSong(currentSongIndex);
});
