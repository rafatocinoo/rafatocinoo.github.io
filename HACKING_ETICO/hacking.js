/**
 * Hacking Ético - JavaScript
 * Author: Rafa Tocino
 */

class ThemeManager {
  constructor() {
    this.themeSwitch = document.querySelector(".theme-switch")
    this.switchHandle = document.querySelector(".switch-handle")
    this.isDark = localStorage.getItem("darkMode") === "true"
    this.init()
  }

  init() {
    this.setTheme(this.isDark)
    this.themeSwitch.addEventListener("click", () => this.toggleTheme())
    this.themeSwitch.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.toggleTheme()
      }
    })
  }

  setTheme(isDark) {
    this.isDark = isDark
    if (isDark) {
      document.body.classList.add("dark-mode")
      this.switchHandle.textContent = "☀️"
    } else {
      document.body.classList.remove("dark-mode")
      this.switchHandle.textContent = "🌙"
    }
    localStorage.setItem("darkMode", isDark)
  }

  toggleTheme() {
    this.setTheme(!this.isDark)
  }
}

class SearchManager {
  constructor() {
    this.searchInput = document.getElementById("search-input")
    this.searchButton = document.getElementById("search-button")
    this.machines = document.querySelectorAll(".machine")
    if (!this.searchInput) return
    this.init()
  }

  init() {
    this.searchInput.addEventListener("input", () => this.search())
    this.searchButton.addEventListener("click", () => this.search())
  }

  search() {
    const term = this.searchInput.value.toLowerCase().trim()
    this.machines.forEach((machine) => {
      const title = machine.querySelector("h3")?.textContent.toLowerCase() ?? ""
      const tags = Array.from(machine.querySelectorAll(".tag"))
        .map((t) => t.textContent.toLowerCase())
      const diffBar = machine.querySelector(".difficulty-bar")
      const diffValue = diffBar ? parseInt(diffBar.getAttribute("data-width") ?? "0") : 0

      const diffMatch =
        (term.includes("fácil") && diffValue <= 40) ||
        (term.includes("media") && diffValue > 40 && diffValue <= 70) ||
        (term.includes("difícil") && diffValue > 70)

      const matches =
        term === "" ||
        title.includes(term) ||
        tags.some((t) => t.includes(term)) ||
        diffMatch

      machine.style.display = matches ? "" : "none"
    })
  }
}

class AnimationManager {
  constructor() {
    this.machines = document.querySelectorAll(".machine")
    this.init()
  }

  init() {
    this.machines.forEach((machine, i) => {
      setTimeout(() => machine.classList.add("visible"), i * 120)
    })

    document.querySelectorAll(".difficulty-bar").forEach((bar) => {
      const targetWidth = bar.getAttribute("data-width")
      if (!targetWidth) return
      setTimeout(() => {
        bar.style.width = targetWidth + "%"
      }, 400)
    })
  }
}

function setCurrentYear() {
  const el = document.getElementById("current-year")
  if (el) el.textContent = new Date().getFullYear()
}

document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager()
  new SearchManager()
  new AnimationManager()
  setCurrentYear()
})
