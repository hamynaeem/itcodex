// Contact Page Animations and Interactions

// Floating Contact Widget Toggle
function toggleContactWidget() {
  const widget = document.querySelector('.widget-content');
  widget.classList.toggle('active');
}

// Form Progress Tracking
document.addEventListener('DOMContentLoaded', function() {
  const formInputs = document.querySelectorAll('.glass-input');
  const steps = document.querySelectorAll('.step');
  
  formInputs.forEach((input, index) => {
    input.addEventListener('focus', () => {
      updateFormProgress(index + 1);
    });
    
    input.addEventListener('blur', () => {
      if (input.checkValidity()) {
        steps[index].classList.add('completed');
      }
    });
  });
  
  function updateFormProgress(currentStep) {
    steps.forEach((step, index) => {
      step.classList.toggle('active', index + 1 === currentStep);
    });
  }
  
  // Form submission with loading state
  const form = document.querySelector('.liquid-form');
  const submitBtn = document.querySelector('.liquid-btn');
  const loader = document.querySelector('.btn-loader');
  
  if (form && submitBtn && loader) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      loader.classList.add('active');
      submitBtn.style.pointerEvents = 'none';
      
      // Simulate form submission (replace with actual submission logic)
      setTimeout(() => {
        loader.classList.remove('active');
        submitBtn.style.pointerEvents = 'auto';
        
        // Show success message (you can customize this)
        showSuccessMessage();
      }, 2000);
    });
  }
  
  function showSuccessMessage() {
    // Create and show success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
      <i class="bi bi-check-circle-fill"></i>
      <span>Message sent successfully!</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe cards for stagger animation
  const cards = document.querySelectorAll('.glass-card, .detail-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
  
  // Particle system enhancement
  createFloatingParticles();
  
  function createFloatingParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Add more dynamic particles
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle dynamic-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;
      particlesContainer.appendChild(particle);
    }
  }
});

// Add CSS for success notification
const style = document.createElement('style');
style.textContent = `
  .success-notification {
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: rgba(40, 167, 69, 0.95);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
    backdrop-filter: blur(10px);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 9999;
  }
  
  .success-notification.show {
    transform: translateX(0);
  }
  
  .success-notification i {
    font-size: 1.2rem;
  }
  
  .animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .dynamic-particle {
    background: rgba(255, 255, 255, 0.4);
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
`;
document.head.appendChild(style);