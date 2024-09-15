document.addEventListener('DOMContentLoaded', function() {
    const supportToggle = document.querySelector('.support-toggle');
    const supportSection = document.querySelector('.support-section');

    supportToggle.addEventListener('click', function() {
        supportSection.classList.toggle('active');
    });

    const addresses = document.querySelectorAll('.crypto-address');
    
    addresses.forEach(address => {
        address.addEventListener('click', function() {
            const textToCopy = this.dataset.address;
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                const originalText = this.innerHTML;
                this.innerHTML = 'Copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });
});
