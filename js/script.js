// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get all navigation links and all page sections
    const navLinks = document.querySelectorAll('a.nav-link');
    const pages = document.querySelectorAll('section.page');

    // Add a click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Stop the link from its default behavior (like jumping to '#')
            event.preventDefault();

            // Get the 'data-target' value (e.g., "about", "music-projects")
            const targetId = link.dataset.target;

            // 1. Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
            });

            // 2. Deactivate all nav links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });

            // 3. Show the target page
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // 4. Activate the clicked nav link
            link.classList.add('active');
        });
    });
});