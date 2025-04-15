document.addEventListener('DOMContentLoaded', function() {
    const contentContainer = document.getElementById('content-container');
    const tabLinks = document.querySelectorAll('.tab-link');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebarMenu = document.querySelector('.sidebar ul');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        sidebarMenu.classList.toggle('open');
        mobileMenuBtn.classList.toggle('open');
    });

    // Load the default tab (Home)
    loadContent('home');

    // Add click event listeners to all tab links
    tabLinks.forEach(function(tabLink) {
        tabLink.addEventListener('click', function() {
            // Remove active class from all tabs
            document.querySelectorAll('.tab-link').forEach(function(link) {
                link.classList.remove('active');
            });

            // Add active class to clicked tab
            this.classList.add('active');

            // Fade out current content first
            contentContainer.style.opacity = '0';

            // Wait for fade out, then load new content
            setTimeout(() => {
                // Load the corresponding content
                const tabId = this.getAttribute('data-tab');
                loadContent(tabId);
            }, 250); // Half of your animation time

            // Close mobile menu after selection
            if (window.innerWidth <= 768) {
                sidebarMenu.classList.remove('open');
                mobileMenuBtn.classList.remove('open');
            }
        });
    });

    // Function to load content from separate HTML files
    function loadContent(tabId) {
        fetch(`pages/${tabId}.html`)
            .then(response => response.text())
            .then(html => {
                contentContainer.innerHTML = html;
                contentContainer.className = 'tab-content';

                // Trigger fade in
                setTimeout(() => {
                    contentContainer.style.opacity = '1';
                }, 50); // Small delay to ensure DOM update
            })
            .catch(error => {
                console.error('Error loading content:', error);
                contentContainer.innerHTML = '<p>Error loading content. Please try again.</p>';
                contentContainer.style.opacity = '1';
            });
    }
});