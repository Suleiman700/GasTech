// Handle scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Observe elements with fade-in class
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach((element) => {
        observer.observe(element);
    });

    // Add counter animation to statistics
    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        const numbers = statsSection.querySelectorAll('.stat-number');
        
        numbers.forEach(num => {
            const finalNumber = parseInt(num.innerText);
            let currentNumber = 0;
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = finalNumber / steps;
            
            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    num.innerText = finalNumber + (num.innerText.includes('+') ? '+' : '');
                    clearInterval(counter);
                } else {
                    num.innerText = Math.floor(currentNumber);
                }
            }, duration / steps);
        });
    }
});

// Customer Carousel Animation
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.customers-carousel');
    if (carousel) {
        let position = 0;
        const speed = 1; // pixels per frame
        const logos = carousel.querySelectorAll('.customer-logo');
        const logoWidth = 216; // 200px width + 16px margin
        const totalWidth = logoWidth * (logos.length / 2); // Divide by 2 because logos are duplicated

        function animate() {
            position -= speed;
            
            // Reset position when half of the carousel is shown (seamless loop)
            if (position <= -totalWidth) {
                position = 0;
            }
            
            carousel.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animate);
        }

        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            carousel.style.animationPlayState = 'paused';
        });

        carousel.addEventListener('mouseleave', () => {
            carousel.style.animationPlayState = 'running';
        });

        // Start animation
        animate();
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            // Change icon based on menu state
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});
