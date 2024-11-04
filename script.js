document.querySelectorAll('.subject').forEach(item => {
    item.addEventListener('click', () => {
        const url = item.getAttribute('data-url');
        window.location.href = url;  // Redirige a la URL especificada
    });
});
