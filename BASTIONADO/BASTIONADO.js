document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        // Guardar el texto original del botón
        const originalText = button.textContent;
        const description = button.getAttribute('data-description');

        button.addEventListener('mouseover', function() {
            button.textContent = description; // Mostrar la descripción en el botón
        });

        button.addEventListener('mouseout', function() {
            button.textContent = originalText; // Restaurar el texto original
        });
    });
});
