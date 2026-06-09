/**
 * main.js — Funcionalidad de la portada: buscador de máquinas en cliente.
 * El tema y la cabecera/pie los gestiona layout.js.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById("search-input");
    var machines = Array.prototype.slice.call(document.querySelectorAll(".machine"));
    var noResults = document.getElementById("no-results");

    if (!input || machines.length === 0) {
      return;
    }

    function filter() {
      var term = input.value.toLowerCase().trim();
      var visibles = 0;

      machines.forEach(function (machine) {
        var name = machine.getAttribute("data-name") || "";
        var match = term === "" || name.toLowerCase().indexOf(term) !== -1;
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
  });
})();
