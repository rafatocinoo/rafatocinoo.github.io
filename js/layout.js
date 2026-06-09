/**
 * layout.js — Cabecera y pie reutilizables + gestión de tema.
 *
 * Cada página declara su contexto con atributos en <body>:
 *   data-page-title="Análisis Forense"  -> muestra título + flecha "atrás" (subpágina)
 *   (sin data-page-title)                -> portada (sin flecha "atrás")
 *
 * El tema se aplica antes del primer pintado con un script inline en <head>
 * para evitar parpadeo; aquí solo se cablea el botón de alternar.
 */
(function () {
  "use strict";

  var THEME_KEY = "theme";

  function getTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* almacenamiento no disponible: el tema solo durará la sesión */
    }
    var btn = document.querySelector(".theme-toggle");
    if (btn) {
      var dark = theme === "dark";
      btn.textContent = dark ? "☀️" : "🌙";
      btn.setAttribute(
        "aria-label",
        dark ? "Activar modo claro" : "Activar modo oscuro"
      );
      btn.setAttribute("aria-pressed", String(dark));
    }
  }

  function buildHeader() {
    var body = document.body;
    var title = body.getAttribute("data-page-title");

    var header = document.createElement("header");
    header.className = "site-header";

    if (title) {
      var back = document.createElement("a");
      back.className = "back-link";
      back.href = "/";
      back.setAttribute("aria-label", "Volver al inicio");
      back.textContent = "←";
      header.appendChild(back);

      var h1 = document.createElement("h1");
      h1.className = "site-header__title";
      h1.textContent = title;
      header.appendChild(h1);
    }

    var spacer = document.createElement("div");
    spacer.className = "site-header__spacer";
    header.appendChild(spacer);

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "theme-toggle";
    toggle.addEventListener("click", function () {
      setTheme(getTheme() === "dark" ? "light" : "dark");
    });
    header.appendChild(toggle);

    // Tras el enlace de salto (si existe) para que siga siendo el primer foco
    var skip = body.querySelector(".skip-link");
    var ref = skip ? skip.nextSibling : body.firstChild;
    body.insertBefore(header, ref);
  }

  function buildFooter() {
    var footer = document.createElement("footer");
    footer.className = "site-footer";
    var year = new Date().getFullYear();
    var p = document.createElement("p");
    p.innerHTML =
      "&copy; " + year + " Rafa Tocino — Todos los derechos reservados";
    footer.appendChild(p);
    document.body.appendChild(footer);
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
    buildFooter();
    setTheme(getTheme()); // sincroniza icono/aria del botón con el tema activo
  });
})();
