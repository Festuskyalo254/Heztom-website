document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) {
        return;
    }

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = contactForm.querySelector('#name').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const subject = contactForm.querySelector('#subject').value.trim();
        const message = contactForm.querySelector('#message').value.trim();

        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            });

            const result = await response.json().catch(() => ({}));

            if (response.ok && result.success !== false) {
                alert('Thank you for contacting us, ' + name + '! We have received your message.');
                contactForm.reset();
            } else {
                alert(`Error sending message: ${result.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Could not send your message right now. Please try again later.');
        }
    });
});

