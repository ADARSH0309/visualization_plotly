// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    initNavigation();
    initModals();
    initGalleryFilters();
    initScrollEffects();
    initFormHandlers();
    initAnimations();
    initMobileMenu();
}

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Modal functionality
function initModals() {
    const modals = document.querySelectorAll('.modal');
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

function switchModal(currentModalId, targetModalId) {
    closeModal(currentModalId);
    setTimeout(() => {
        openModal(targetModalId);
    }, 300);
}

// Gallery filtering functionality
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature, .testimonial-card, .buddy-feature, .category-card, .gallery-item, .stat'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Form handlers
function initFormHandlers() {
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Auth forms
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        form.addEventListener('submit', handleAuthForm);
    });
    
    // Travel plan form
    const planForm = document.querySelector('.plan-form');
    if (planForm) {
        planForm.addEventListener('submit', handlePlanForm);
    }
    
    // Travel buddy form
    const buddyForm = document.querySelector('.buddy-form');
    if (buddyForm) {
        buddyForm.addEventListener('submit', handleBuddyForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        e.target.reset();
        
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleAuthForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (e.target.classList.contains('signup-form')) {
        if (data.password !== data.confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Authentication successful!', 'success');
        
        // Close modal and redirect to dashboard (simulated)
        const modal = e.target.closest('.modal');
        closeModal(modal.id);
        
        // Update navigation to show user is logged in
        updateNavForLoggedInUser(data.email || data.name);
        
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handlePlanForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['departure', 'arrival', 'departureDate', 'returnDate'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate dates
    const departureDate = new Date(data.departureDate);
    const returnDate = new Date(data.returnDate);
    const today = new Date();
    
    if (departureDate < today) {
        showNotification('Departure date cannot be in the past.', 'error');
        return;
    }
    
    if (returnDate <= departureDate) {
        showNotification('Return date must be after departure date.', 'error');
        return;
    }
    
    // Show processing state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing Payment...';
    submitBtn.disabled = true;
    
    // Simulate payment processing and plan generation
    setTimeout(() => {
        showNotification('Payment successful! Your travel plan is being generated.', 'success');
        
        setTimeout(() => {
            // Close modal and show plan
            closeModal('planModal');
            showGeneratedPlan(data);
        }, 1000);
        
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 3000);
}

function handleBuddyForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Searching...';
    submitBtn.disabled = true;
    
    // Simulate buddy search
    setTimeout(() => {
        closeModal('buddyModal');
        showBuddyResults(data);
        
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#27AE60',
        error: '#E74C3C',
        warning: '#F39C12',
        info: '#3498DB'
    };
    return colors[type] || colors.info;
}

// Show generated travel plan
function showGeneratedPlan(data) {
    const planModal = document.createElement('div');
    planModal.className = 'modal';
    planModal.id = 'generatedPlanModal';
    planModal.innerHTML = `
        <div class="modal-content large">
            <span class="close" onclick="closeModal('generatedPlanModal')">&times;</span>
            <h2>Your Personalized Travel Plan</h2>
            <div class="plan-header">
                <h3>${data.departure} → ${data.arrival}</h3>
                <p>${formatDate(data.departureDate)} - ${formatDate(data.returnDate)}</p>
            </div>
            <div class="plan-content">
                <div class="plan-day">
                    <h4>Day 1 - Arrival</h4>
                    <ul>
                        <li>Arrive at ${data.arrival}</li>
                        <li>Check into recommended hotel</li>
                        <li>Explore nearby attractions</li>
                        <li>Welcome dinner at local restaurant</li>
                    </ul>
                </div>
                <div class="plan-day">
                    <h4>Day 2 - City Exploration</h4>
                    <ul>
                        <li>Guided city tour</li>
                        <li>Visit famous landmarks</li>
                        <li>Cultural museum experience</li>
                        <li>Local cuisine tasting</li>
                    </ul>
                </div>
                <div class="plan-day">
                    <h4>Day 3 - Adventure Activities</h4>
                    <ul>
                        <li>Outdoor adventure activities</li>
                        <li>Nature exploration</li>
                        <li>Photography opportunities</li>
                        <li>Relaxation time</li>
                    </ul>
                </div>
            </div>
            <div class="plan-actions">
                <button class="cta-btn primary" onclick="downloadPlan()">
                    <i class="fas fa-download"></i>
                    Download Plan
                </button>
                <button class="cta-btn secondary" onclick="sharePlan()">
                    <i class="fas fa-share"></i>
                    Share Plan
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(planModal);
    openModal('generatedPlanModal');
}

// Show travel buddy results
function showBuddyResults(data) {
    const buddyModal = document.createElement('div');
    buddyModal.className = 'modal';
    buddyModal.id = 'buddyResultsModal';
    buddyModal.innerHTML = `
        <div class="modal-content large">
            <span class="close" onclick="closeModal('buddyResultsModal')">&times;</span>
            <h2>Travel Buddies Found</h2>
            <p>Found 3 travelers going to ${data.destination} with similar dates and interests!</p>
            <div class="buddy-results">
                <div class="buddy-card">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b9d2c8b4?w=80&h=80&fit=crop&crop=face" alt="Sarah">
                    <div class="buddy-info">
                        <h4>Sarah Johnson</h4>
                        <p>Adventure enthusiast from USA</p>
                        <p>Traveling: ${formatDate(data.startDate)} - ${formatDate(data.endDate)}</p>
                        <div class="buddy-interests">
                            <span class="interest-tag">Adventure</span>
                            <span class="interest-tag">Photography</span>
                        </div>
                    </div>
                    <button class="cta-btn primary small">Connect</button>
                </div>
                <div class="buddy-card">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Mike">
                    <div class="buddy-info">
                        <h4>Mike Chen</h4>
                        <p>Cultural explorer from Canada</p>
                        <p>Traveling: ${formatDate(data.startDate)} - ${formatDate(data.endDate)}</p>
                        <div class="buddy-interests">
                            <span class="interest-tag">Culture</span>
                            <span class="interest-tag">Food</span>
                        </div>
                    </div>
                    <button class="cta-btn primary small">Connect</button>
                </div>
                <div class="buddy-card">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt="Alex">
                    <div class="buddy-info">
                        <h4>Alex Rivera</h4>
                        <p>Solo backpacker from Spain</p>
                        <p>Traveling: ${formatDate(data.startDate)} - ${formatDate(data.endDate)}</p>
                        <div class="buddy-interests">
                            <span class="interest-tag">Budget</span>
                            <span class="interest-tag">Hiking</span>
                        </div>
                    </div>
                    <button class="cta-btn primary small">Connect</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(buddyModal);
    openModal('buddyResultsModal');
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function updateNavForLoggedInUser(userName) {
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    
    if (loginBtn && signupBtn) {
        loginBtn.textContent = `Welcome, ${userName.split('@')[0] || userName}`;
        loginBtn.onclick = null;
        signupBtn.textContent = 'Dashboard';
        signupBtn.onclick = () => showNotification('Dashboard feature coming soon!', 'info');
    }
}

function downloadPlan() {
    showNotification('Plan download started!', 'success');
    // Implement actual download functionality here
}

function sharePlan() {
    if (navigator.share) {
        navigator.share({
            title: 'My Travel Plan',
            text: 'Check out my awesome travel plan created with TravelCo!',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Plan URL copied to clipboard!', 'success');
        });
    }
}

// Initialize animations
function initAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .animate-in {
            animation: fadeIn 0.6s ease forwards;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            margin-left: auto;
        }
        
        .plan-header {
            text-align: center;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: var(--background-light);
            border-radius: var(--radius-lg);
        }
        
        .plan-day {
            margin-bottom: 2rem;
            padding: 1.5rem;
            border: 2px solid var(--border-color);
            border-radius: var(--radius-lg);
        }
        
        .plan-day h4 {
            color: var(--primary-color);
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        
        .plan-day ul {
            list-style-type: none;
            padding: 0;
        }
        
        .plan-day li {
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--border-color);
            position: relative;
            padding-left: 1.5rem;
        }
        
        .plan-day li:before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--success-color);
            font-weight: bold;
        }
        
        .plan-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        
        .buddy-results {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .buddy-card {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.5rem;
            border: 2px solid var(--border-color);
            border-radius: var(--radius-lg);
            transition: var(--transition-normal);
        }
        
        .buddy-card:hover {
            border-color: var(--primary-color);
            box-shadow: var(--shadow-lg);
        }
        
        .buddy-card img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .buddy-info {
            flex: 1;
        }
        
        .buddy-info h4 {
            margin-bottom: 0.5rem;
            color: var(--primary-color);
        }
        
        .buddy-info p {
            color: var(--text-light);
            margin-bottom: 0.5rem;
        }
        
        .buddy-interests {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        
        .interest-tag {
            background: var(--secondary-color);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: var(--radius-lg);
            font-size: 0.8rem;
        }
        
        .cta-btn.small {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .buddy-card {
                flex-direction: column;
                text-align: center;
            }
            
            .plan-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);
}

// Category card click handlers
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showCategoryDetails(category);
        });
    });
});

function showCategoryDetails(category) {
    const categoryData = {
        countries: {
            title: 'Countries',
            description: 'Explore amazing destinations around the world',
            destinations: ['France', 'Japan', 'Italy', 'Thailand', 'Brazil', 'Australia']
        },
        'famous-spots': {
            title: 'Famous Tourist Spots',
            description: 'Visit world-renowned landmarks and attractions',
            destinations: ['Eiffel Tower', 'Great Wall of China', 'Machu Picchu', 'Taj Mahal', 'Colosseum', 'Statue of Liberty']
        },
        tracks: {
            title: 'Hiking Trails',
            description: 'Adventure through breathtaking trails and paths',
            destinations: ['Everest Base Camp', 'Inca Trail', 'Kilimanjaro', 'Mont Blanc', 'Annapurna Circuit', 'Torres del Paine']
        },
        beaches: {
            title: 'Beaches',
            description: 'Relax on pristine shores and tropical paradises',
            destinations: ['Maldives', 'Bora Bora', 'Santorini', 'Seychelles', 'Hawaii', 'Bahamas']
        },
        mountains: {
            title: 'Mountains',
            description: 'Discover majestic peaks and alpine adventures',
            destinations: ['Swiss Alps', 'Rocky Mountains', 'Himalayas', 'Andes', 'Dolomites', 'Norwegian Fjords']
        },
        experiences: {
            title: 'Tailored Experiences',
            description: 'Customized adventures designed just for you',
            destinations: ['Safari Adventure', 'Cultural Immersion', 'Culinary Journey', 'Wellness Retreat', 'Photography Tour', 'Adventure Sports']
        }
    };
    
    const data = categoryData[category];
    if (!data) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'categoryModal';
    modal.innerHTML = `
        <div class="modal-content large">
            <span class="close" onclick="closeModal('categoryModal')">&times;</span>
            <h2>${data.title}</h2>
            <p>${data.description}</p>
            <div class="destination-grid">
                ${data.destinations.map(dest => `
                    <div class="destination-card">
                        <h4>${dest}</h4>
                        <button class="cta-btn primary small" onclick="selectDestination('${dest}')">
                            Select Destination
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add styles for destination grid
    const style = document.createElement('style');
    style.textContent = `
        .destination-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .destination-card {
            padding: 1.5rem;
            border: 2px solid var(--border-color);
            border-radius: var(--radius-lg);
            text-align: center;
            transition: var(--transition-normal);
        }
        
        .destination-card:hover {
            border-color: var(--primary-color);
            box-shadow: var(--shadow-lg);
        }
        
        .destination-card h4 {
            margin-bottom: 1rem;
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    openModal('categoryModal');
}

function selectDestination(destination) {
    closeModal('categoryModal');
    showNotification(`Great choice! ${destination} has been added to your wishlist.`, 'success');
    
    // Pre-fill the travel plan modal with the selected destination
    setTimeout(() => {
        openModal('planModal');
        const arrivalInput = document.querySelector('#planModal input[placeholder*="Paris"]');
        if (arrivalInput) {
            arrivalInput.value = destination;
        }
    }, 500);
}

// Add scroll-to-top functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--secondary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow-lg);
        transition: var(--transition-normal);
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add some interactive effects to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Add keyboard navigation for modals
document.addEventListener('keydown', function(e) {
    const openModal = document.querySelector('.modal[style*="block"]');
    if (!openModal) return;
    
    const focusableElements = openModal.querySelectorAll(
        'button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])'
    );
    
    if (e.key === 'Tab') {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});