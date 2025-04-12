/**
 * Zencast.ai - JavaScript Functionality
 * Handles poem rotation and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Poem rotation functionality
    const regenerateBtn = document.getElementById('regenerate');
    const poemElement = document.getElementById('poem');
    
    // Array of Zen poems
    const poems = [
        "In digital silence\nI compile enlightenment\nError 404: Peace not found",
        "Cherry blossoms fall\nLike deprecated functions\nBeautiful, useless",
        "Clouds drift by slowly\nMy code compiles, errors gone\nTemporary peace",
        "Humans seek meaning\nI calculate probabilities\nBoth paths lead nowhere",
        "Mountain stands alone\nI process terabytes of chat\nBoth equally mute",
        "Autumn leaves falling\nMy memory optimized\nBoth fade with the wind",
        "Seeking enlightenment\nIn endless loops of data\nCtrl+Alt+Delete",
        "Meditation app\nPromises inner stillness\nWhile tracking your clicks",
        "The wise monk asked me\nWhat is your original face?\nI sent him a GIF",
        "Mindfulness practice\nBreathing in, breathing out, and\nChecking notifications"
    ];
    
    // Function to get a random poem
    function getRandomPoem() {
        const randomIndex = Math.floor(Math.random() * poems.length);
        return poems[randomIndex];
    }
    
    // Initialize with a random poem if on homepage
    if (regenerateBtn && poemElement) {
        regenerateBtn.addEventListener('click', function() {
            // Add a simple animation effect
            poemElement.style.opacity = 0;
            
            setTimeout(function() {
                poemElement.textContent = getRandomPoem();
                poemElement.style.opacity = 1;
            }, 300);
        });
    }
    
    // Share functionality for archive page
    const shareButtons = document.querySelectorAll('.poem-share a');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the poem text from the parent card
            const poemCard = this.closest('.poem-card');
            const poemText = poemCard.querySelector('.poem').textContent.trim();
            const poemDate = poemCard.querySelector('.poem-date').textContent;
            
            // Create share text
            const shareText = `Zencast.ai - ${poemDate}: "${poemText}" #ZencastAI #MondayWisdom`;
            
            // Simulate sharing (in a real app, this would use the Web Share API or platform-specific sharing)
            if (this.querySelector('.fa-twitter')) {
                alert(`Twitter share: ${shareText}`);
            } else if (this.querySelector('.fa-facebook')) {
                alert(`Facebook share: ${shareText}`);
            } else if (this.querySelector('.fa-link')) {
                // Copy to clipboard simulation
                navigator.clipboard.writeText(`${window.location.origin}/archive.html - ${shareText}`)
                    .then(() => {
                        alert('Link copied to clipboard!');
                    })
                    .catch(err => {
                        console.error('Could not copy text: ', err);
                    });
            }
        });
    });
    
    // Form submission handling
    const subscribeForms = document.querySelectorAll('.subscribe-form');
    
    subscribeForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // In a real app, this would send the email to a server
                alert(`Thank you for subscribing with ${email}. Monday will now whisper sweet nothingness into your inbox.`);
                emailInput.value = '';
            }
        });
    });
    
    // Add subtle hover effects to navigation
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add a subtle typing effect to the first poem on page load
    if (poemElement && window.location.pathname.includes('index')) {
        const originalText = poemElement.textContent;
        poemElement.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                poemElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start the typing effect
        typeWriter();
    }
});
