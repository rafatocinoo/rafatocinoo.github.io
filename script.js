document.addEventListener("DOMContentLoaded", function() {
    const articles = document.querySelectorAll(".articles article");

    articles.forEach(article => {
        article.addEventListener("click", () => {
            alert("Has hecho clic en un artículo: " + article.querySelector("h3").textContent);
        });
    });
});
