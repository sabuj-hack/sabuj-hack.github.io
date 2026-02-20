document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-video');
    const videoSource = document.getElementById('video-source');
    const playBtn = document.getElementById('play-pause');
    const muteBtn = document.getElementById('mute');
    const volumeSlider = document.getElementById('volume');
    const waves = document.getElementById('waves');
    const playIcon = playBtn.querySelector('.play-icon');
    const pauseIcon = playBtn.querySelector('.pause-icon');
    const volumeOn = muteBtn.querySelector('.volume-on');
    const volumeOff = muteBtn.querySelector('.volume-off');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const trackName = document.getElementById('track-name');
    const trackItems = document.querySelectorAll('.track-item');

    // Track list with videos
    const tracks = [
        { name: 'BRAZILIAN DANÇA', video: 'video1.mp4' },
        { name: 'MONTAGEM RUGADA', video: 'video2.mp4' },
        { name: 'Jumpstyle', video: 'video3.mp4' },
        { name: 'Funk Criminal', video: 'video4.mp4' }
    ];

    let currentTrack = 0;
    let isPlaying = false;

    // Auto-play video
    video.play().catch(() => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        isPlaying = false;
    });

    // Change Video Function
    function changeVideo(videoSrc) {
        videoSource.src = videoSrc;
        video.load();
        
        if (isPlaying) {
            video.play().catch(() => {
                console.log('Video play prevented');
            });
        }
    }

    // Update Track
    function updateTrack(index) {
        // Update active track in list
        trackItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update track name
        trackName.textContent = tracks[index].name;
        
        // Change video
        changeVideo(tracks[index].video);
        
        currentTrack = index;
    }

    // Play/Pause Toggle
    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            waves.classList.add('active');
            isPlaying = true;
        } else {
            video.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            waves.classList.remove('active');
            isPlaying = false;
        }
    });

    // Mute/Unmute Toggle
    muteBtn.addEventListener('click', () => {
        if (video.muted) {
            video.muted = false;
            volumeOn.style.display = 'block';
            volumeOff.style.display = 'none';
        } else {
            video.muted = true; 
            volumeOn.style.display = 'none';
            volumeOff.style.display = 'block';
        }
    });

    // Volume Slider
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        video.volume = volume;

        if (volume === 0) {
            video.muted = true;
            volumeOn.style.display = 'none';
            volumeOff.style.display = 'block';
        } else if (video.muted && volume > 0) {
            video.muted = false;
            volumeOn.style.display = 'block';
            volumeOff.style.display = 'none';
        }
    });

    // Previous Track
    prevBtn.addEventListener('click', () => {
        const newIndex = (currentTrack - 1 + tracks.length) % tracks.length;
        updateTrack(newIndex);
    });

    // Next Track
    nextBtn.addEventListener('click', () => {
        const newIndex = (currentTrack + 1) % tracks.length;
        updateTrack(newIndex);
    });

    // Click on track item
    trackItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateTrack(index);
        });
    });

    // Sync on video events
    video.addEventListener('play', () => {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        waves.classList.add('active');
        isPlaying = true;
    });

    video.addEventListener('pause', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        waves.classList.remove('active');
        isPlaying = false;
    });

});
