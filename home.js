

document.addEventListener('DOMContentLoaded', () => {



    // --- Read Our Story Toggle ---
    const storyBtn = document.getElementById('read-story-btn');
    const fullStory = document.getElementById('about-full-story');

    if (storyBtn && fullStory) {
        storyBtn.addEventListener('click', () => {
            fullStory.classList.toggle('open');

            if (fullStory.classList.contains('open')) {
                fullStory.style.maxHeight = fullStory.scrollHeight + "px";
                storyBtn.innerHTML = 'Read Less <i class="fas fa-chevron-up" style="margin-left: 10px;"></i>';
            } else {
                fullStory.style.maxHeight = null;
                storyBtn.innerHTML = 'Read Our Story <i class="fas fa-chevron-down" style="margin-left: 10px;"></i>';
            }
        });
    }

    // --- Video Controls Logic ---
    const video = document.getElementById('heroVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const videoContainer = document.getElementById('videoContainer');

    if (video) {
        // Play/Pause
        // Play/Pause Logic
        function togglePlay() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }

        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent ensuring video click interaction conflicts
            togglePlay();
        });

        // Toggle play on video click (enables pausing when button is hidden)
        video.addEventListener('click', () => {
            togglePlay();
        });

        // Ensure button visibility matches state
        video.addEventListener('pause', () => {
            playPauseBtn.style.display = 'flex'; // Show button
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });

        video.addEventListener('play', () => {
            playPauseBtn.style.display = 'none'; // Hide button completely
        });

        // Mute/Unmute
        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
            updateVolumeIcon();
        });

        // Fullscreen Toggle
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFullscreen();
            });
        }

        function toggleFullscreen() {
            if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
                // Enter fullscreen
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen();
                } else if (videoContainer.webkitRequestFullscreen) {
                    videoContainer.webkitRequestFullscreen();
                } else if (videoContainer.mozRequestFullScreen) {
                    videoContainer.mozRequestFullScreen();
                } else if (video.webkitEnterFullscreen) {
                    // Fallback for iOS Safari
                    video.webkitEnterFullscreen();
                }

                updateFullscreenIcon(true);
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }

                updateFullscreenIcon(false);
            }
        }

        function updateFullscreenIcon(isFullscreen) {
            if (fullscreenBtn) {
                if (isFullscreen) {
                    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
                } else {
                    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                }
            }
        }

        function updateVolumeIcon() {
            if (video.muted) {
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        }

        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', () => {
            updateFullscreenIcon(!!document.fullscreenElement);
        });
        document.addEventListener('webkitfullscreenchange', () => {
            updateFullscreenIcon(!!document.webkitFullscreenElement);
        });
        document.addEventListener('mozfullscreenchange', () => {
            updateFullscreenIcon(!!document.mozFullScreenElement);
        });
        document.addEventListener('msfullscreenchange', () => {
            updateFullscreenIcon(!!document.msFullscreenElement);
        });

        // Progress Bar Logic
        const videoProgress = document.getElementById('videoProgress');
        if (videoProgress) {
            video.addEventListener('timeupdate', () => {
                const percentage = (video.currentTime / video.duration) * 100;
                videoProgress.value = percentage || 0;
                // Optional: distinct color for played portion via gradient
                videoProgress.style.background = `linear-gradient(to right, var(--color-secondary) ${percentage}%, rgba(255,255,255,0.2) ${percentage}%)`;
            });

            videoProgress.addEventListener('input', (e) => {
                e.stopPropagation(); // Prevent video click toggle
                const time = (videoProgress.value / 100) * video.duration;
                video.currentTime = time;
            });

            videoProgress.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Initialize state
        video.muted = false; // Ensure starts unmuted
        updateVolumeIcon();
    }

    // --- Image Popup/Lightbox for 2025 CONTESTANTS Section ---
    const contestantsSection = document.getElementById('2025-champions');
    if (contestantsSection) {
        const contestantImages = contestantsSection.querySelectorAll('.champion-big-image');

        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="image-modal-content">
                <span class="image-modal-close">&times;</span>
                <img class="image-modal-img" src="" alt="Contestant">
            </div>
        `;
        document.body.appendChild(modal);

        const modalImg = modal.querySelector('.image-modal-img');
        const closeBtn = modal.querySelector('.image-modal-close');

        // Add click listeners to each image
        contestantImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close modal on X button click
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});
