// Visual Effects Manager
class VisualEffects {
    constructor() {
        this.confettiColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffbe0b', '#fb5607', '#8338ec'];
    }

    // Create candle blow effect
    createCandleBlowEffect() {
        // Create poppers
        this.createPoppers(30);
    }

    // Create poppers/confetti
    createPoppers(count) {
        for (let i = 0; i < count; i++) {
            const popper = document.createElement('div');
            popper.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)]};
                border-radius: 50%;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                animation: popperAnimation ${Math.random() * 2 + 1}s ease-out forwards;
                z-index: 1000;
            `;
            
            document.body.appendChild(popper);
            
            setTimeout(() => {
                if (popper.parentNode) {
                    popper.parentNode.removeChild(popper);
                }
            }, 3000);
        }
        
        // Add popper animation if not exists
        if (!document.querySelector('#popperAnimation')) {
            const style = document.createElement('style');
            style.id = 'popperAnimation';
            style.innerHTML = `
                @keyframes popperAnimation {
                    0% { transform: scale(0) translateY(0); opacity: 1; }
                    50% { transform: scale(1.5) translateY(-20px); opacity: 0.8; }
                    100% { transform: scale(1) translateY(0); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Create heart background for card
    createHeartBackground() {
        const heartBg = document.getElementById('heartBg');
        if (!heartBg) return;

        // Create hearts
        for (let i = 0; i < 12; i++) {
            this.createBackgroundHeart(heartBg, i);
        }

        // Create sparkles
        for (let i = 0; i < 25; i++) {
            this.createSparkle(heartBg, i);
        }
    }

    // Create background heart
    createBackgroundHeart(container, index) {
        const heart = document.createElement('div');
        heart.classList.add('heart-beating');
        
        const size = 30 + Math.random() * 40;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const opacity = 0.08 + Math.random() * 0.1;
        const delay = Math.random() * 2;
        
        heart.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: #ff6b6b;
            left: ${left}%;
            top: ${top}%;
            opacity: ${opacity};
            transform: rotate(45deg);
            animation-delay: ${delay}s;
        `;
        
        heart.innerHTML = `
            <style>
                .heart-beating[data-index="${index}"]:before,
                .heart-beating[data-index="${index}"]:after {
                    content: '';
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: #ff6b6b;
                    border-radius: 50%;
                }
                .heart-beating[data-index="${index}"]:before {
                    top: -${size/2}px;
                    left: 0;
                }
                .heart-beating[data-index="${index}"]:after {
                    top: 0;
                    left: -${size/2}px;
                }
            </style>
        `;
        
        heart.setAttribute('data-index', index);
        container.appendChild(heart);
    }

    // Create sparkle
    createSparkle(container, index) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle-effect');
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 3;
        const duration = 1 + Math.random() * 2;
        
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #fff;
            border-radius: 50%;
            left: ${left}%;
            top: ${top}%;
            box-shadow: 0 0 8px #fff;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;
        
        container.appendChild(sparkle);
    }

    // Create confetti for card
    createCardConfetti() {
        const container = document.getElementById('confettiContainer');
        if (!container) return;

        // Top confetti
        for (let i = 0; i < 15; i++) {
            this.createConfettiPiece(container, true, i);
        }

        // Bottom confetti
        for (let i = 0; i < 15; i++) {
            this.createConfettiPiece(container, false, i);
        }
    }

    // Create individual confetti piece
    createConfettiPiece(container, isTop, index) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        
        const color = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 3 + Math.random() * 4;
        
        confetti.style.cssText = `
            position: absolute;
            width: 8px;
            height: 16px;
            background: ${color};
            left: ${left}%;
            ${isTop ? 'top: -20px;' : 'bottom: -20px;'}
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        container.appendChild(confetti);
    }

    // Create gift opening effect
    createGiftOpeningEffect() {
        const giftBox = document.getElementById('giftBox');
        if (giftBox) {
            giftBox.classList.add('gift-opening');
            
            // Create gift opening particles
            this.createPoppers(20);
        }
    }
}

// Initialize effects manager
const effectsManager = new VisualEffects();
window.effectsManager = effectsManager;
