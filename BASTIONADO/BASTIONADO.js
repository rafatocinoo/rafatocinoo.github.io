document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button');
    const descriptionBox = document.getElementById('description-box');

    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            const description = button.getAttribute('data-description');
            descriptionBox.textContent = description;
            descriptionBox.style.display = 'block';
        });

        button.addEventListener('mouseout', function() {
            descriptionBox.style.display = 'none';
        });
    });
});
