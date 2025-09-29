// FX Textiles E-commerce JavaScript
class FXTextiles {
    constructor() {
        this.products = [];
        this.cart = [];
        this.currentUser = null;
        this.razorpayKey = 'YOUR_RAZORPAY_KEY';
        this.apiBase = 'http://localhost:5000/api';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.loadProducts();
        this.checkAuth();
        this.simulateLoading();
    }

    simulateLoading() {
        const loadingScreen = document.querySelector('.loading-screen');
        setTimeout(() => {
            loadingScreen.classList.add('loaded');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 2000);
    }

    setupEventListeners() {
        // Mobile Menu
        const hamburger = document.querySelector('.hamburger-menu');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeMenu = document.querySelector('.close-menu');

        hamburger?.addEventListener('click', () => this.toggleMobileMenu());
        closeMenu?.addEventListener('click', () => this.toggleMobileMenu());

        // Search
        const searchBtn = document.getElementById('search-btn');
        const closeSearch = document.querySelector('.close-search');
        const searchOverlay = document.querySelector('.search-overlay');

        searchBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            searchOverlay.classList.add('active');
        });

        closeSearch?.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });

        // Hero Carousel
        this.setupCarousel();

        // Collections Carousel
        this.setupCollectionsCarousel();

        // Product Filters
        this.setupProductFilters();

        // Video Reels
        this.setupVideoReels();

        // Scroll Animations
        this.setupScrollAnimations();

        // Header Scroll Effect
        window.addEventListener('scroll', () => this.handleScroll());
    }

    toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    setupCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            currentSlide = (index + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        };

        prevBtn?.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn?.addEventListener('click', () => showSlide(currentSlide + 1));

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });

        // Auto-advance
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    setupCollectionsCarousel() {
        const track = document.querySelector('.collections-track');
        const prevBtn = document.querySelector('.prev-collection');
        const nextBtn = document.querySelector('.next-collection');
        const cards = document.querySelectorAll('.collection-card');
        let position = 0;
        const cardWidth = cards[0]?.offsetWidth + 32; // including gap

        const moveCarousel = (direction) => {
            const maxPosition = -((cards.length - 4) * cardWidth);
            
            if (direction === 'next' && position > maxPosition) {
                position -= cardWidth;
            } else if (direction === 'prev' && position < 0) {
                position += cardWidth;
            }
            
            track.style.transform = `translateX(${position}px)`;
        };

        prevBtn?.addEventListener('click', () => moveCarousel('prev'));
        nextBtn?.addEventListener('click', () => moveCarousel('next'));
    }

    setupProductFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const productsGrid = document.getElementById('products-grid');
        const loadMoreBtn = document.getElementById('load-more-btn');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterProducts(btn.dataset.filter);
            });
        });

        loadMoreBtn?.addEventListener('click', () => this.loadMoreProducts());
    }

    setupVideoReels() {
        const reels = document.querySelectorAll('.reel-video video');
        const playBtns = document.querySelectorAll('.play-btn');

        reels.forEach(video => {
            video.addEventListener('mouseenter', () => {
                if (video.paused) {
                    video.play().catch(() => {});
                }
            });

            video.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        });

        playBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const video = reels[index];
                if (video.paused) {
                    video.play().catch(() => {});
                    btn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    btn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe product cards
        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });

        // Observe other elements
        document.querySelectorAll('.feature-card, .collection-card, .reel-card').forEach(el => {
            observer.observe(el);
        });
    }

    handleScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    initializeAnimations() {
        // GSAP animations would go here in a real implementation
        console.log('Initializing animations...');
    }

    async loadProducts() {
        try {
            // In a real implementation, this would fetch from your backend
            const response = await fetch(`${this.apiBase}/products`);
            this.products = await response.json();
            this.renderProducts();
        } catch (error) {
            console.error('Error loading products:', error);
            // Fallback to mock data
            this.products = this.getMockProducts();
            this.renderProducts();
        }
    }

    getMockProducts() {
        return [
            {
                id: 1,
                name: "Artisan Linen Throw",
                category: "linen",
                price: 245.00,
                image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                badge: "New",
                rating: 4.8,
                reviews: 24
            },
            {
                id: 2,
                name: "Silk Jacquard Cushion",
                category: "silk",
                price: 189.00,
                image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                badge: "Best Seller",
                rating: 4.9,
                reviews: 31
            },
            {
                id: 3,
                name: "Organic Cotton Duvet",
                category: "cotton",
                price: 320.00,
                image: "https://images.unsplash.com/photo-1558769132-cb25c5d1d1c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 4.7,
                reviews: 18
            },
            {
                id: 4,
                name: "Cashmere Blanket",
                category: "wool",
                price: 450.00,
                image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                rating: 5.0,
                reviews: 12
            }
        ];
    }

    renderProducts(filter = 'all') {
        const grid = document.getElementById('products-grid');
        if (!grid) return;

        const filteredProducts = filter === 'all' 
            ? this.products 
            : this.products.filter(p => p.category === filter);

        grid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <div class="product-actions">
                        <button class="action-icon" onclick="fxTextiles.addToWishlist(${product.id})">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="action-icon" onclick="fxTextiles.quickView(${product.id})">
                            <i class="far fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3>${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-rating">
                        <div class="stars">
                            ${this.generateStars(product.rating)}
                        </div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <button class="btn btn-primary" onclick="fxTextiles.addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');

        // Re-initialize intersection observer for new products
        setTimeout(() => {
            document.querySelectorAll('.product-card').forEach(card => {
                card.classList.add('visible');
            });
        }, 100);
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    filterProducts(category) {
        this.renderProducts(category);
    }

    loadMoreProducts() {
        // Implementation for loading more products
        console.log('Loading more products...');
    }

    async addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        this.cart.push({ ...product, quantity: 1 });
        this.showNotification('Product added to cart');
        this.updateCartCount();
    }

    addToWishlist(productId) {
        this.showNotification('Added to wishlist');
    }

    quickView(productId) {
        // Implementation for quick view modal
        console.log('Quick view for product:', productId);
    }

    showNotification(message) {
        // Create and show a notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--jute-gold);
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.cart.length;
        }
    }

    async checkAuth() {
        // Check if user is logged in
        const token = localStorage.getItem('fx_token');
        if (token) {
            try {
                const response = await fetch(`${this.apiBase}/auth/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    this.currentUser = await response.json();
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            }
        }
    }

    async initiatePayment(orderData) {
        try {
            const response = await fetch(`${this.apiBase}/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('fx_token')}`
                },
                body: JSON.stringify(orderData)
            });

            const order = await response.json();

            const options = {
                key: this.razorpayKey,
                amount: order.amount,
                currency: order.currency,
                name: 'FX Textiles',
                description: 'Luxury Textiles Purchase',
                order_id: order.id,
                handler: (response) => {
                    this.handlePaymentSuccess(response);
                },
                prefill: {
                    name: this.currentUser?.name || '',
                    email: this.currentUser?.email || '',
                    contact: this.currentUser?.phone || ''
                },
                theme: {
                    color: '#C69C58'
                }
            };

            const razorpay = new Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Payment initiation failed:', error);
            this.showNotification('Payment failed. Please try again.');
        }
    }

    handlePaymentSuccess(response) {
        this.showNotification('Payment successful!');
        // Clear cart and redirect to success page
        this.cart = [];
        this.updateCartCount();
        
        // In a real implementation, you would verify the payment with your backend
        console.log('Payment success:', response);
    }
}

// Initialize the application
const fxTextiles = new FXTextiles();

// Export for global access
window.fxTextiles = fxTextiles;
