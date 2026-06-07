/**
 * Cybersecurity Portfolio - Main JavaScript
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
    this.searchInput.addEventListener("input", () => this.performSearch())
    this.searchButton.addEventListener("click", () => this.performSearch())
  }

  performSearch() {
    const term = this.searchInput.value.toLowerCase().trim()
    this.machines.forEach((machine) => {
      const title = machine.querySelector("h3")?.textContent.toLowerCase() ?? ""
      const tags = Array.from(machine.querySelectorAll(".tag"))
        .map((t) => t.textContent.toLowerCase())
      const matches = term === "" || title.includes(term) || tags.some((t) => t.includes(term))
      machine.style.display = matches ? "" : "none"
    })
  }
}

class TypingManager {
  constructor(elementId, texts, speed = 75) {
    this.el = document.getElementById(elementId)
    this.texts = texts
    this.speed = speed
    this.textIndex = 0
    this.charIndex = 0
    this.isDeleting = false
    if (this.el) this._tick()
  }

  _tick() {
    const current = this.texts[this.textIndex]
    this.charIndex = this.isDeleting ? this.charIndex - 1 : this.charIndex + 1
    this.el.textContent = current.slice(0, this.charIndex)

    const atEnd = this.charIndex === current.length
    const atStart = this.charIndex === 0

    if (atEnd && !this.isDeleting) {
      if (this.texts.length === 1) return
      setTimeout(() => { this.isDeleting = true; this._tick() }, 2400)
      return
    }
    if (atStart && this.isDeleting) {
      this.isDeleting = false
      this.textIndex = (this.textIndex + 1) % this.texts.length
    }

    setTimeout(() => this._tick(), this.isDeleting ? 38 : this.speed)
  }
}

class AnimationManager {
  constructor() {
    this.machines = document.querySelectorAll(".machine")
    this.init()
  }

  init() {
    this.machines.forEach((machine, i) => {
      machine.style.animationDelay = `${i * 120}ms`
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
  new TypingManager("typing-text", ["Especialista en Ciberseguridad", "Red Team | Blue Team", "CTF Player | Pentester"])
  setCurrentYear()
})
