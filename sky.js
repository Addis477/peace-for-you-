// ===== SKY CANVAS - PEACE FOR YOU NETWORK =====
// Controls all sky animations and time-based colors

// Sky state
let currentTimeOfDay = 'afternoon';
let skyInterval;
let starInterval;

// Initialize sky when page loads
document.addEventListener('DOMContentLoaded', function() {
    initSky();
    startSkyTimer();
    createStars();
});

// Main sky initialization
function initSky() {
    updateTimeOfDay();
    applySkyToElements();
}

// Update time of day based on actual hour
function updateTimeOfDay() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 7) {
        currentTimeOfDay = 'dawn';
    } else if (hour >= 7 && hour < 11) {
        currentTimeOfDay = 'morning';
    } else if (hour >= 11 && hour < 16) {
        currentTimeOfDay = 'afternoon';
    } else if (hour >= 16 && hour < 18) {
        currentTimeOfDay = 'evening';
    } else if (hour >= 18 && hour < 20) {
        currentTimeOfDay = 'sunset';
    } else {
        currentTimeOfDay = 'night';
    }
}

// Apply sky colors to all sky elements
function applySkyToElements() {
    const skyElements = document.querySelectorAll('.hero-sky, .sky-mini, .sky-canvas');
    const gradients = {
        dawn: 'linear-gradient(135deg, #87CEEB 0%, #FDB813 70%)',
        morning: 'linear-gradient(135deg, #3498DB 0%, #87CEEB 100%)',
        afternoon: 'linear-gradient(135deg, #1E4B7A 0%, #3498DB 100%)',
        evening: 'linear-gradient(135deg, #4B0082 0%, #9370DB 70%)',
        sunset: 'linear-gradient(135deg, #FF4500 0%, #FDB813 50%, #4B0082 100%)',
        night: 'linear-gradient(135deg, #0B1A2F 0%, #191970 100%)'
    };
    
    skyElements.forEach(el => {
        if (el) {
            el.style.background = gradients[currentTimeOfDay];
            
            if (currentTimeOfDay === 'night') {
                el.classList.add('has-stars');
            } else {
                el.classList.remove('has-stars');
            }
        }
    });
}

// Timer to update sky every minute
function startSkyTimer() {
    if (skyInterval) clearInterval(skyInterval);
    skyInterval = setInterval(() => {
        const oldTime = currentTimeOfDay;
        updateTimeOfDay();
        if (oldTime !== currentTimeOfDay) {
            applySkyToElements();
        }
    }, 60000);
}

// Create stars for night sky
function createStars() {
    if (starInterval) clearInterval(starInterval);
    
    function addStars() {
        const nightSkies = document.querySelectorAll('.hero-sky.has-stars, .sky-mini.has-stars, .sky-canvas.has-stars');
        
        nightSkies.forEach(sky => {
            const oldStars = sky.querySelectorAll('.star');
            oldStars.forEach(star => star.remove());
            
            for (let i = 0; i < 50; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 3 + 1}px;
                    height: ${Math.random() * 3 + 1}px;
                    background: white;
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    opacity: ${Math.random() * 0.8 + 0.2};
                    animation: twinkle ${Math.random() * 3 + 2}s infinite;
                    box-shadow: 0 0 ${Math.random() * 3 + 1}px rgba(255,255,255,0.8);
                `;
                sky.appendChild(star);
            }
        });
    }
    
    addStars();
    starInterval = setInterval(addStars, 300000);
}

// Function to respond to peace words
function skyRespondToWord(word) {
    const skyElements = document.querySelectorAll('.hero-sky, .sky-mini, .sky-canvas');
    
    const wordEffects = {
        'love': 'rgba(253, 184, 19, 0.3)',
        'hope': 'rgba(255, 255, 0, 0.3)',
        'peace': 'rgba(59, 158, 191, 0.3)',
        'forgive': 'rgba(255, 182, 193, 0.3)',
        'child': 'rgba(253, 184, 19, 0.3)',
        'mother': 'rgba(255, 140, 0, 0.3)',
        'father': 'rgba(101, 67, 33, 0.3)',
        'land': 'rgba(76, 153, 0, 0.3)',
        'tree': 'rgba(34, 139, 34, 0.3)',
        'water': 'rgba(52, 152, 219, 0.3)',
        'free': 'rgba(255, 255, 255, 0.3)',
        'dream': 'rgba(230, 230, 250, 0.3)',
        'courage': 'rgba(255, 191, 0, 0.3)',
        'justice': 'rgba(128, 0, 128, 0.3)',
        'mercy': 'rgba(230, 230, 250, 0.3)',
        'dignity': 'rgba(0, 0, 139, 0.3)',
        'wonder': 'rgba(192, 192, 192, 0.3)',
        'story': 'rgba(255, 140, 0, 0.3)',
        'rise': 'rgba(255, 215, 0, 0.3)',
        'heal': 'rgba(144, 238, 144, 0.3)',
        'home': 'rgba(255, 140, 0, 0.3)',
        'joy': 'rgba(253, 184, 19, 0.3)',
        'pray': 'rgba(255, 255, 255, 0.2)',
        'enough': 'rgba(0, 0, 139, 0.2)'
    };
    
    const effect = wordEffects[word.toLowerCase()] || 'rgba(253, 184, 19, 0.2)';
    
    skyElements.forEach(sky => {
        const pulse = document.createElement('div');
        pulse.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${effect};
            pointer-events: none;
            animation: pulseFade 3s ease-out;
            z-index: 1;
        `;
        sky.appendChild(pulse);
        
        setTimeout(() => {
            pulse.remove();
        }, 3000);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
    }
    
    @keyframes pulseFade {
        0% { opacity: 0; }
        20% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    .hero-sky, .sky-mini, .sky-canvas {
        position: relative;
        transition: background 1s ease;
    }
    
    .star {
        position: absolute;
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Export functions
window.skyAPI = {
    respondToWord: skyRespondToWord,
    getTimeOfDay: () => currentTimeOfDay,
    refreshSky: applySkyToElements
};
