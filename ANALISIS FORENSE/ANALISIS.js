// Theme Management
class ThemeManager {
  constructor() {
    this.themeSwitch = document.querySelector(".theme-switch")
    this.switchHandle = document.querySelector(".switch-handle")
    this.body = document.body
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
      this.body.classList.add("dark-mode")
      this.switchHandle.textContent = "☀️"
    } else {
      this.body.classList.remove("dark-mode")
      this.switchHandle.textContent = "🌙"
    }
    localStorage.setItem("darkMode", isDark)
  }

  toggleTheme() {
    this.setTheme(!this.isDark)
  }
}

// Project Management
class ProjectManager {
  constructor() {
    this.projects = document.querySelectorAll(".project")
    this.init()
  }

  init() {
    this.projects.forEach((project) => {
      project.addEventListener("click", () => this.navigateToProject(project))
      project.addEventListener("mouseenter", () => this.showDescription(project))
      project.addEventListener("mouseleave", () => this.hideDescription(project))
    })
  }

  navigateToProject(project) {
    const url = project.getAttribute("data-url")
    window.location.href = url
  }

  showDescription(project) {
    const description = project.querySelector(".description")
    description.style.display = "block"
  }

  hideDescription(project) {
    const description = project.querySelector(".description")
    description.style.display = "none"
  }
}

// Utility Functions
function setCurrentYear() {
  const currentYearElement = document.getElementById("current-year")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const themeManager = new ThemeManager()
  const projectManager = new ProjectManager()
  setCurrentYear()
})

