// Audio Management
class BirthdayAudio {
    constructor() {
        this.birthdaySong = document.getElementById('birthdaySong');
    }

    // Play birthday song
    playBirthdaySong() {
        if (this.birthdaySong) {
            this.birthdaySong.volume = 0.7;
            
            // Try to play with user interaction
            const playPromise = this.birthdaySong.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Autoplay prevented, waiting for user interaction');
                });
            }
        }
    }

    // Force play song (after user interaction)
    forcePlaySong() {
        if (this.birthdaySong) {
            this.birthdaySong.play().catch(error => {
                console.error('Error playing song:', error);
            });
        }
    }

    // Stop birthday song
    stopBirthdaySong() {
        if (this.birthdaySong) {
            this.birthdaySong.pause();
            this.birthdaySong.currentTime = 0;
        }
    }
}

// Initialize audio manager
const audioManager = new BirthdayAudio();
window.audioManager = audioManager;
