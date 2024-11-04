// Seleccionamos los elementos relevantes
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.button');
    const descriptionBox = document.getElementById('description-box');

    // Añadimos un evento para cada enlace
    links.forEach(link => {
        link.addEventListener('mouseover', () => {
            // Obtenemos la descripción del atributo `data-description`
            const description = link.getAttribute('data-description');
            descriptionBox.textContent = description;
        });

        link.addEventListener('mouseout', () => {
            // Restauramos el contenido del cuadro de descripción al estado inicial
            descriptionBox.textContent = 'Pasa el cursor por los proyectos para ver la descripción aquí';
        });
    });
});
