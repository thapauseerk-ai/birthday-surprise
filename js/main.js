// Main Application Controller
class BirthdayApp {
    constructor() {
        this.currentPage = 1;
        this.candlesBlown = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.showPage(1);
        
        // Initialize audio after user interaction
        document.addEventListener('click', this.initializeApp.bind(this), { once: true });
        
        console.log('Birthday App Initialized');
    }

    // Initialize app after user interaction
    initializeApp() {
        // Start birthday song
        if (window.audioManager) {
            window.audioManager.playBirthdaySong();
        }
        
        console.log('App fully initialized');
    }

    // Bind event listeners
    bindEvents() {
        // Keyboard events
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        
        // Gift box click
        const giftBox = document.getElementById('giftBox');
        if (giftBox) {
            giftBox.addEventListener('click', this.openGift.bind(this));
        }
        
        // Navigation buttons
        const backBtn = document.getElementById('backBtn');
        const restartBtn = document.getElementById('restartBtn');
        
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showPage(1));
        }
        
        if (restartBtn) {
            restartBtn.addEventListener('click', this.restartApp.bind(this));
        }
    }

    // Handle keyboard events
    handleKeyDown(event) {
        switch (event.key) {
            case ' ':
            case 'Enter':
                if (this.currentPage === 1 && !this.candlesBlown) {
                    this.blowOutCandles();
                }
                break;
            case 'Escape':
                this.showPage(1);
                break;
        }
    }

    // Blow out candles
    blowOutCandles() {
        if (this.candlesBlown) return;
        
        this.candlesBlown = true;
        
        // Visual effects
        if (window.effectsManager) {
            window.effectsManager.createCandleBlowEffect();
        }
        
        // Update UI
        const cakeContainer = document.querySelector('.cake-container');
        const flame = document.getElementById('flame');
        
        if (flame) {
            flame.style.animation = 'none';
            flame.style.opacity = '0';
        }
        
        if (cakeContainer) {
            cakeContainer.classList.add('candle-blown');
        }
        
        console.log('Candles blown out!');
    }

    // Open gift (go to card page)
    openGift() {
        if (!this.candlesBlown) {
            alert('Blow out the candles first! 🎂');
            return;
        }
        
        // Visual effects
        if (window.effectsManager) {
            window.effectsManager.createGiftOpeningEffect();
            window.effectsManager.createHeartBackground();
            window.effectsManager.createCardConfetti();
        }
        
        // Show card page after delay
        setTimeout(() => {
            this.showPage(2);
        }, 1000);
    }

    // Show specific page
    showPage(pageNumber) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(`page${pageNumber}`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageNumber;
        }
        
        // Reset candles if going back to page 1
        if (pageNumber === 1) {
            this.resetCandles();
        }
    }

    // Reset candles
    resetCandles() {
        this.candlesBlown = false;
        const flame = document.getElementById('flame');
        const cakeContainer = document.querySelector('.cake-container');
        
        if (flame) {
            flame.classList.add('flickering');
            flame.style.opacity = '1';
        }
        
        if (cakeContainer) {
            cakeContainer.classList.remove('candle-blown');
        }
    }

    // Restart application
    restartApp() {
        this.candlesBlown = false;
        this.showPage(1);
        this.resetCandles();
        
        console.log('App restarted!');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.birthdayApp = new BirthdayApp();
});
