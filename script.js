/**
 * Cybersecurity Blog - Main JavaScript
 * Author: Rafa Tocino
 * Description: Handles theme switching, search functionality, and animations
 */

// DOM Elements
const themeSwitch = document.querySelector(".theme-switch")
const switchHandle = document.querySelector(".switch-handle")
const body = document.body
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")
const machines = document.querySelectorAll(".machine")
const currentYearElement = document.getElementById("current-year")

/**
 * Theme Management
 */
class ThemeManager {
  constructor() {
    this.isDark = localStorage.getItem("darkMode") === "true"
    this.init()
  }

  init() {
    // Set initial theme
    this.setTheme(this.isDark)

    // Add event listener for theme switch
    themeSwitch.addEventListener("click", () => {
      this.toggleTheme()
    })

    // Add keyboard accessibility
    themeSwitch.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.toggleTheme()
      }
    })
  }

  setTheme(isDark) {
    this.isDark = isDark

    if (isDark) {
      body.classList.add("dark-mode")
      switchHandle.textContent = "☀️"
    } else {
      body.classList.remove("dark-mode")
      switchHandle.textContent = "🌙"
    }

    localStorage.setItem("darkMode", isDark)
  }

  toggleTheme() {
    this.setTheme(!this.isDark)
  }
}

/**
 * Search Functionality
 */
class SearchManager {
  constructor() {
    this.init()
  }

  init() {
    searchInput.addEventListener("input", () => {
      this.performSearch()
    })

    searchButton.addEventListener("click", () => {
      this.performSearch()
    })
  }

  performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim()

    machines.forEach((machine) => {
      const title = machine.querySelector("h3").textContent.toLowerCase()

      if (searchTerm === "" || title.includes(searchTerm)) {
        machine.style.display = "block"
      } else {
        machine.style.display = "none"
      }
    })
  }
}

/**
 * Animation Manager
 */
class AnimationManager {
  constructor() {
    this.init()
  }

  init() {
    // Staggered animation for machines
    machines.forEach((machine, index) => {
      setTimeout(() => {
        machine.style.opacity = "1"
      }, 100 * index)
    })
  }
}

/**
 * Utility Functions
 */
function setCurrentYear() {
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }
}

/**
 * Initialize everything when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize managers
  const themeManager = new ThemeManager()
  const searchManager = new SearchManager()
  const animationManager = new AnimationManager()

  // Set current year in footer
  setCurrentYear()
})



