/**
 * main.js — Funcionalidad de portada/subpáginas:
 *   - buscador de máquinas (por nombre y etiquetas) con estado "sin resultados"
 *   - efecto "typing" del rol en la tarjeta de perfil
 * El tema y la cabecera/pie los gestiona layout.js.
 */
(function () {
  "use strict";

  function initSearch() {
    var input = document.getElementById("search-input");
    var machines = Array.prototype.slice.call(document.querySelectorAll(".machine"));
    var noResults = document.getElementById("no-results");

    if (!input || machines.length === 0) {
      return;
    }

    function textOf(machine) {
      var name = machine.getAttribute("data-name") || "";
      var heading = machine.querySelector("h3");
      var tags = Array.prototype.map.call(
        machine.querySelectorAll(".tag"),
        function (t) { return t.textContent; }
      );
      return (name + " " + (heading ? heading.textContent : "") + " " + tags.join(" ")).toLowerCase();
    }

    function filter() {
      var term = input.value.toLowerCase().trim();
      var visibles = 0;

      machines.forEach(function (machine) {
        var match = term === "" || textOf(machine).indexOf(term) !== -1;
        machine.hidden = !match;
        if (match) {
          visibles++;
        }
      });

      if (noResults) {
        noResults.hidden = visibles !== 0;
      }
    }

    input.addEventListener("input", filter);

    var form = input.closest("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        filter();
      });
    }
  }

  /**
   * Efecto de máquina de escribir en el elemento #typing-text.
   * Respeta prefers-reduced-motion mostrando el primer texto fijo.
   */
  function initTyping() {
    var el = document.getElementById("typing-text");
    if (!el) {
      return;
    }

    var texts;
    try {
      texts = JSON.parse(el.getAttribute("data-texts") || "[]");
    } catch (e) {
      texts = [];
    }
    if (!texts.length) {
      return;
    }

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = texts[0];
      return;
    }

    var textIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function tick() {
      var current = texts[textIndex];
      charIndex += deleting ? -1 : 1;
      el.textContent = current.slice(0, charIndex);

      if (!deleting && charIndex === current.length) {
        if (texts.length === 1) {
          return;
        }
        setTimeout(function () { deleting = true; tick(); }, 2200);
        return;
      }
      if (deleting && charIndex === 0) {
        deleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
      setTimeout(tick, deleting ? 38 : 75);
    }

    tick();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSearch();
    initTyping();
  });
})();
