document.querySelectorAll('.project').forEach(item => {
    item.addEventListener('click', () => {
        const url = item.getAttribute('data-url');
        window.location.href = url;  // Redirige a la URL especificada
    });

    item.addEventListener('mouseenter', () => {
        const description = item.getAttribute('data-description');
        document.getElementById('description-box').innerText = description; // Muestra la descripción
    });

    item.addEventListener('mouseleave', () => {
        document.getElementById('description-box').innerText = "Pasa el cursor por los proyectos para ver la descripción aquí"; // Restablece el texto
    });
});

