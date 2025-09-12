// Add smooth hover effects and interactions
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');

// Hamburger menu logic
const hamburger = document.querySelector('.hamburger');
const mobileOverlay = document.querySelector('.mobile-overlay');
const body = document.body;

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    // Lock scroll when menu is open
    if (mobileOverlay.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Close overlay when clicking outside nav (optional for smooth feel)
mobileOverlay.addEventListener('click', function (e) {
    if (e.target === mobileOverlay) {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.style.overflow = '';
    }
});

// searchInput.addEventListener('focus', function () {
//     this.parentElement.style.transform = 'translateY(-2px)';
//     this.parentElement.style.boxShadow = '0 15px 50px rgba(30, 51, 98, 0.2)';
// });

// searchInput.addEventListener('blur', function () {
//     this.parentElement.style.transform = 'translateY(0)';
//     this.parentElement.style.boxShadow = '0 10px 40px rgba(30, 51, 98, 0.15)';
// });

searchBtn.addEventListener('click', function () {
    const query = searchInput.value;
    if (query.trim()) {
        alert(`Searching for: ${query}`);
    }
});

// Hero Slideshow Logic
const slides = document.querySelectorAll('.hero-slideshow .slide');
const leftArrow = document.querySelector('.hero-slideshow .slideshow-arrow.left');
const rightArrow = document.querySelector('.hero-slideshow .slideshow-arrow.right');
const indicators = document.querySelectorAll('.hero-slideshow .indicator');
let currentSlide = 0;
let slideInterval;

function showSlide(idx) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
    });
    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === idx);
    });
    currentSlide = idx;
}

function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
}

rightArrow.addEventListener('click', nextSlide);
leftArrow.addEventListener('click', prevSlide);
indicators.forEach((ind, i) => {
    ind.addEventListener('click', () => showSlide(i));
});

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
}
function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Pause on hover for arrows/indicators/slides
document.querySelector('.hero-slideshow').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.hero-slideshow').addEventListener('mouseleave', startAutoSlide);

showSlide(0);
startAutoSlide();


class ProductSlide {
    constructor() {
        this.sliderTrack = document.getElementById('sliderTrack');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.currentSlide = 0;
        this.totalSlides = 2;

        this.init();
    }

    init() {
        // Add click listeners to navigation dots
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation
        this.sliderTrack.setAttribute('tabindex', '0');
        this.sliderTrack.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.goToSlide(this.currentSlide - 1);
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                this.goToSlide(this.currentSlide + 1);
                e.preventDefault();
            }
        });
    }

    goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < this.totalSlides) {
            this.currentSlide = slideIndex;

            // Update slider position
            const translateX = -slideIndex * 100;
            this.sliderTrack.style.transform = `translateX(${translateX}%)`;

            // Update active dot
            this.navDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
        }
    }
}

// Initialize the slider when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ProductSlide();
});