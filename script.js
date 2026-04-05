// JaidenMoves - Main Script

// Get DOM elements
const messageElement = document.getElementById('message');

// Initialize app
function init() {
    if (messageElement) {
        messageElement.textContent = 'Your website is ready to go!';
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
