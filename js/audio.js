// Audio management
function playBirthdaySong() {
    const audio = document.getElementById('birthday-song');
    audio.currentTime = 0;
    audio.play().catch(e => {
        console.log('Audio play failed:', e);
        // This might happen due to browser autoplay policies
        // We'll handle it by showing a message
        showAudioMessage();
    });
}

function stopBirthdaySong() {
    const audio = document.getElementById('birthday-song');
    audio.pause();
    audio.currentTime = 0;
}

function showAudioMessage() {
    // Create a message if audio can't play automatically
    const message = document.createElement('div');
    message.innerHTML = 'Click anywhere to start audio';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.backgroundColor = 'rgba(0,0,0,0.8)';
    message.style.color = 'white';
    message.style.padding = '20px';
    message.style.borderRadius = '10px';
    message.style.zIndex = '1000';
    message.style.cursor = 'pointer';
    
    message.addEventListener('click', function() {
        const audio = document.getElementById('birthday-song');
        audio.play();
        message.remove();
    });
    
    document.body.appendChild(message);
}
