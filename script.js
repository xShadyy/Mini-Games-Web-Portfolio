document.addEventListener('DOMContentLoaded', function() {

    const navLinks = document.querySelectorAll('nav ul li a');

    function removeActiveClasses() {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            removeActiveClasses();

            this.classList.add('active');
        });
    });
});

