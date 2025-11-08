// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-celebration');
    const stopButton = document.getElementById('stop-celebration');
    const mainImage = document.getElementById('main-image');
    const effectsArea = document.getElementById('effects-area');
    
    let celebrationActive = false;
    let confettiInterval;
    
    // Start celebration
    startButton.addEventListener('click', function() {
        if (celebrationActive) return;
        
        celebrationActive = true;
        console.log('Celebration started!');
        
        // Add animations to main image
        mainImage.classList.add('pulse', 'float');
        
        // Start playing birthday song
        if (window.playBirthdaySong) {
            window.playBirthdaySong();
        }
        
        // Start confetti effect
        if (window.startConfetti) {
            window.startConfetti();
        }
        
        // Create confetti
        confettiInterval = setInterval(createConfetti, 200);
    });
    
    // Stop celebration
    stopButton.addEventListener('click', function() {
        if (!celebrationActive) return;
        
        celebrationActive = false;
        console.log('Celebration stopped!');
        
        // Remove animations from main image
        mainImage.classList.remove('pulse', 'float');
        
        // Stop playing birthday song
        if (window.stopBirthdaySong) {
            window.stopBirthdaySong();
        }
        
        // Stop confetti effect
        if (window.stopConfetti) {
            window.stopConfetti();
        }
        
        // Stop creating confetti
        clearInterval(confettiInterval);
        
        // Remove existing confetti
        const confettiElements = document.querySelectorAll('.confetti');
        confettiElements.forEach(el => {
            el.remove();
        });
    });
    
    // Function to create confetti
    function createConfetti() {
        if (!celebrationActive) return;
        
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random position
        const leftPos = Math.random() * 100;
        confetti.style.left = `${leftPos}vw`;
        
        // Random size
        const size = 5 + Math.random() * 10;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        // Random color
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = randomColor;
        
        // Random animation duration
        const duration = 3 + Math.random() * 4;
        confetti.style.animationDuration = `${duration}s`;
        
        effectsArea.appendChild(confetti);
        
        // Remove confetti after animation completes
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, duration * 1000);
    }
});
