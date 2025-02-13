document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".subject").forEach(subject => {
        subject.addEventListener("click", () => {
            window.location.href = subject.getAttribute("data-url");
        });

        subject.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                window.location.href = subject.getAttribute("data-url");
            }
        });
    });
});
