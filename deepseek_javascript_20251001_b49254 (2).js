// Mobile Menu Toggle
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');

hamburgerMenu.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburgerMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Hero Carousel
const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentSlide = 0;

function showSlide(index) {
    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    
    carouselSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Auto-advance carousel
let carouselInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Pause auto-advance on hover
carouselSlides.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carouselSlides.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// Categories Carousel
const categoriesContainer = document.querySelector('.categories-container');
const categoryCards = document.querySelectorAll('.category-card');
const prevCatBtn = document.querySelector('.prev-cat');
const nextCatBtn = document.querySelector('.next-cat');
let currentCategory = 0;
const cardsPerView = Math.floor(categoriesContainer.offsetWidth / (categoryCards[0].offsetWidth + 20));

function updateCategoryCarousel() {
    const cardWidth = categoryCards[0].offsetWidth + 20; // including gap
    categoriesContainer.style.transform = `translateX(-${currentCategory * cardWidth}px`;
}

prevCatBtn.addEventListener('click', () => {
    if (currentCategory > 0) {
        currentCategory--;
        updateCategoryCarousel();
    }
});

nextCatBtn.addEventListener('click', () => {
    if (currentCategory < categoryCards.length - cardsPerView) {
        currentCategory++;
        updateCategoryCarousel();
    }
});

// Video Reels - Play on hover
const reels = document.querySelectorAll('.reel-video');

reels.forEach(reel => {
    reel.addEventListener('mouseenter', () => {
        reel.play();
    });
    
    reel.addEventListener('mouseleave', () => {
        reel.pause();
        reel.currentTime = 0;
    });
    
    // Also play on click for mobile
    reel.addEventListener('click', () => {
        if (reel.paused) {
            reel.play();
        } else {
            reel.pause();
        }
    });
});

// Add shadow effect on button click
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        button.style.transform = 'translateY(1px)';
    });
    
    button.addEventListener('mouseup', () => {
        button.style.boxShadow = '';
        button.style.transform = '';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.boxShadow = '';
        button.style.transform = '';
    });
});

// Gallery item click handler
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // In a real implementation, this would open a lightbox/modal
        alert('Gallery item clicked - would open in lightbox view');
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial positions
    updateCategoryCarousel();
    
    // Add loading animation to elements
    const animatedElements = document.querySelectorAll('.category-card, .product-card, .gallery-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});