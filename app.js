// Salon 803 - JavaScript

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Open directions to salon
function openDirections() {
    window.open('https://maps.google.com/?q=4444+Cypress+Creek+Parkway+STE+30+Houston+TX+77068', '_blank');
}

// Handle phone call
function handleCall() {
    window.location.href = 'tel:8326572126';
}

// Handle email
function handleEmail() {
    window.location.href = 'mailto:info@salon803.com';
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Handle join team form submission
    const joinTeamForm = document.getElementById('joinTeamForm');
    if (joinTeamForm) {
        joinTeamForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(joinTeamForm);
            const data = {};
            formData.forEach((value, key) => {
                if (key !== 'portfolio') {
                    data[key] = value;
                }
            });
            
            // Create email body
            const emailBody = `
New Team Application from Salon 803 Website

Full Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}
Weekly Availability: ${data.availability}
Social Media: ${data.social || 'Not provided'}

Message:
${data.message}

Note: Portfolio file needs to be sent separately if uploaded.
            `.trim();
            
            // Open email client with pre-filled data
            const subject = encodeURIComponent('Salon 803 Team Application - ' + data.fullName);
            const body = encodeURIComponent(emailBody);
            window.location.href = `mailto:info@salon803.com?subject=${subject}&body=${body}`;
            
            // Reset form
            joinTeamForm.reset();
            
            // Show confirmation (you could enhance this with a toast notification)
            alert('Thank you for your application! Your email client will open to send your application.');
        });
    }
});

// Add scroll animations (optional enhancement)
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', handleScrollAnimations);