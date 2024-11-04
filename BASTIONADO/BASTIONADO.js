document.querySelectorAll('.project').forEach(item => {
    item.addEventListener('click', () => {
        const url = item.getAttribute('data-url');
        window.location.href = url;  // Redirige a la URL especificada
    });
    
    item.addEventListener('mouseenter', () => {
        const description = item.querySelector('.description');
        description.style.display = 'block'; // Muestra la descripción al pasar el mouse
    });

    item.addEventListener('mouseleave', () => {
        const description = item.querySelector('.description');
        description.style.display = 'none'; // Oculta la descripción al salir el mouse
    });
});
