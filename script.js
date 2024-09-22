document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointmentForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const patientNameSpan = document.getElementById('patientName');
    const submitBtn = document.getElementById('submitBtn');
    const newsletterForm = document.getElementById('newsletterForm');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Appointment form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const department = document.getElementById('department').value;

        if (name && email && phone && date && department) {
            // Animate the submit button
            submitBtn.classList.add('pulse');
            setTimeout(() => {
                submitBtn.classList.remove('pulse');
            }, 500);

            // Show the thank you message
            const departmentName = document.getElementById('department').options[document.getElementById('department').selectedIndex].text;
            thankYouMessage.innerHTML = `<p>Thank you ${name} for booking an appointment with us for ${departmentName}!</p>`;
            thankYouMessage.classList.remove('hidden');
            setTimeout(() => {
                thankYouMessage.classList.add('show');
            }, 10);

            // Scroll to the thank you message
            thankYouMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Reset form fields
            form.reset();

            // Hide the thank you message after 5 seconds
            setTimeout(() => {
                thankYouMessage.classList.remove('show');
                setTimeout(() => {
                    thankYouMessage.classList.add('hidden');
                }, 300);
            }, 5000);
        } else {
            alert('Please fill out all fields before submitting.');
        }
    });

    // Newsletter form submission
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (email) {
            alert(`Thank you for subscribing with email: ${email}`);
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // Add subtle animations to form elements
    const formElements = document.querySelectorAll('input, select');
    formElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.transform = 'scale(1.02)';
            element.style.transition = 'transform 0.3s ease';
        });

        element.addEventListener('blur', () => {
            element.style.transform = 'scale(1)';
        });
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 1s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});