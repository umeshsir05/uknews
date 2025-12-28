// Toggle mobile menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Change icon based on menu state
        const icon = menuToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon();
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        updateThemeIcon();
        
        // Save preference to localStorage
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
}

function updateThemeIcon() {
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Update active link based on current page
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    links.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === undefined && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setActiveLink();
    updateThemeIcon();
});
// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (mobileMenu && menuToggle && 
        !menuToggle.contains(event.target) && 
        !mobileMenu.contains(event.target) && 
        mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Certificate Modal Functions
function openCertificateModal(imageSrc, title, description) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalCertImage');
    const modalTitle = document.getElementById('modalCertTitle');
    const modalDescription = document.getElementById('modalCertDescription');
    
    // Set modal content
    modalImage.src = imageSrc;
    modalImage.alt = title;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function downloadCertificate() {
    const imageSrc = document.getElementById('modalCertImage').src;
    const title = document.getElementById('modalCertTitle').textContent;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = title.toLowerCase().replace(/\s+/g, '-') + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize certificate modal events
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certificateModal');
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeCertificateModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCertificateModal();
        }
    });
});