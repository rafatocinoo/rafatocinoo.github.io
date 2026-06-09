/**
 * Hacking Ético - JavaScript específico
 * Author: Rafa Tocino
 * Description: Funcionalidades específicas para la sección de hacking ético
 */

// DOM Elements específicos de la página de hacking
const machineCards = document.querySelectorAll('.machine');
const difficultyBars = document.querySelectorAll('.difficulty-bar');
const thmLinks = document.querySelectorAll('.thm-link');
const writeupLinks = document.querySelectorAll('.writeup-link');
const tags = document.querySelectorAll('.tag');

/**
 * Gestor de filtrado por etiquetas
 */
class TagFilterManager {
  constructor() {
    this.activeFilters = new Set();
    this.init();
  }

  init() {
    // Crear el contenedor de filtros si no existe
    if (!document.querySelector('.tag-filters')) {
      this.createFilterUI();
    }

    // Añadir event listeners a las etiquetas
    tags.forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        const tagText = tag.textContent.trim();
        this.toggleFilter(tagText);
      });
    });
  }

  createFilterUI() {
    // Obtener todas las etiquetas únicas
    const uniqueTags = new Set();
    tags.forEach(tag => {
      uniqueTags.add(tag.textContent.trim());
    });

    // Crear el contenedor de filtros
    const filterContainer = document.createElement('div');
    filterContainer.className = 'tag-filters';
    
    const filterTitle = document.createElement('h3');
    filterTitle.textContent = 'Filtrar por etiqueta:';
    filterContainer.appendChild(filterTitle);
    
    const filterTags = document.createElement('div');
    filterTags.className = 'filter-tags';
    
    // Añadir cada etiqueta única como un filtro
    uniqueTags.forEach(tagText => {
      const filterTag = document.createElement('span');
      filterTag.className = 'filter-tag';
      filterTag.textContent = tagText;
      filterTag.addEventListener('click', () => {
        this.toggleFilter(tagText);
        filterTag.classList.toggle('active');
      });
      filterTags.appendChild(filterTag);
    });
    
    filterContainer.appendChild(filterTags);
    
    // Añadir el contenedor antes del contenedor de máquinas
    const machinesContainer = document.querySelector('.machines-container');
    machinesContainer.parentNode.insertBefore(filterContainer, machinesContainer);
  }

  toggleFilter(tagText) {
    if (this.activeFilters.has(tagText)) {
      this.activeFilters.delete(tagText);
    } else {
      this.activeFilters.add(tagText);
    }
    
    this.applyFilters();
  }

  applyFilters() {
    // Si no hay filtros activos, mostrar todas las máquinas
    if (this.activeFilters.size === 0) {
      machineCards.forEach(card => {
        card.style.display = 'block';
      });
      return;
    }
    
    // Filtrar las máquinas según las etiquetas seleccionadas
    machineCards.forEach(card => {
      const cardTags = Array.from(card.querySelectorAll('.tag'))
        .map(tag => tag.textContent.trim());
      
      // Comprobar si la máquina tiene al menos una de las etiquetas filtradas
      const hasMatchingTag = Array.from(this.activeFilters)
        .some(filter => cardTags.includes(filter));
      
      card.style.display = hasMatchingTag ? 'block' : 'none';
    });
  }
}

/**
 * Gestor de búsqueda específico para la página de hacking
 * Extiende la funcionalidad del SearchManager en script.js
 */
class HackingSearchManager {
  constructor() {
    this.init();
  }

  init() {
    // Asumimos que el SearchManager ya está inicializado en script.js
    // Aquí añadimos funcionalidad adicional específica para esta página
    
    const searchInput = document.getElementById('search-input');
    
    // Añadir placeholder con sugerencias
    searchInput.setAttribute('placeholder', 'Buscar por nombre, dificultad o etiqueta...');
    
    // Mejorar la búsqueda para incluir etiquetas y dificultad
    searchInput.addEventListener('input', () => {
      this.enhancedSearch();
    });
  }

  enhancedSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    
    machineCards.forEach(machine => {
      const title = machine.querySelector('h3').textContent.toLowerCase();
      const tags = Array.from(machine.querySelectorAll('.tag'))
        .map(tag => tag.textContent.toLowerCase());
      const difficulty = machine.querySelector('.difficulty-bar').style.width;
      const difficultyValue = parseInt(difficulty);
      
      // Términos de dificultad para búsqueda
      const isDifficultySearch = 
        (searchTerm.includes('fácil') && difficultyValue <= 40) ||
        (searchTerm.includes('media') && difficultyValue > 40 && difficultyValue <= 70) ||
        (searchTerm.includes('difícil') && difficultyValue > 70);
      
      // Buscar en título, etiquetas o dificultad
      if (
        searchTerm === '' || 
        title.includes(searchTerm) || 
        tags.some(tag => tag.includes(searchTerm)) ||
        isDifficultySearch
      ) {
        machine.style.display = 'block';
      } else {
        machine.style.display = 'none';
      }
    });
  }
}

/**
 * Gestor de animaciones para la página de hacking
 */
class HackingAnimationManager {
  constructor() {
    this.init();
  }

  init() {
    // Animación de entrada para las máquinas
    machineCards.forEach((machine, index) => {
      setTimeout(() => {
        machine.style.opacity = '1';
        machine.style.transform = 'translateY(0)';
      }, 100 * index);
    });
    
    // Animación para las barras de dificultad
    difficultyBars.forEach(bar => {
      const originalWidth = bar.style.width;
      bar.style.width = '0%';
      
      setTimeout(() => {
        bar.style.transition = 'width 1s ease-in-out';
        bar.style.width = originalWidth;
      }, 500);
    });
  }
}

/**
 * Inicializar todo cuando el DOM está cargado
 */
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar los gestores específicos de la página de hacking
  const tagFilterManager = new TagFilterManager();
  const hackingSearchManager = new HackingSearchManager();
  const hackingAnimationManager = new HackingAnimationManager();
  
  // Añadir tooltips a los enlaces
  thmLinks.forEach(link => {
    link.setAttribute('title', 'Abrir máquina en TryHackMe');
  });
  
  writeupLinks.forEach(link => {
    link.setAttribute('title', 'Ver solución detallada');
  });
});