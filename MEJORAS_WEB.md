# MEJORAS_WEB.md — Plan de mejora del portfolio de ciberseguridad

**Proyecto:** `rafatocinoo.github.io` (sitio estático en GitHub Pages)
**Autor:** Rafa Tocino — CyberSecurity Specialist
**Objetivo general:** Dejar la web pulida, coherente, accesible y 100% funcional, sin enlaces rotos, con un sistema de diseño unificado y código mantenible. Mantenerla como sitio estático (HTML/CSS/JS vanilla), sin frameworks pesados ni dependencias de build, porque se sirve desde GitHub Pages.

---

## 1. Estado actual (auditoría)

La web es un portfolio/blog de ciberseguridad con:

- **Página principal (`index.html`):** cabecera con flecha "atrás" y toggle de modo oscuro (🌙), tarjeta de perfil a la izquierda, buscador + "Máquinas Recientes" (Blue, Ice) en el centro, navegación "Asignaturas" a la derecha y footer.
- **Subpáginas por asignatura:** `ANALISIS FORENSE/ANALISIS.html`, `BASTIONADO/BASTIONADO.html`, `HACKING_ETICO/hacking.html`, etc.
- **Esquema de color:** morado/violeta dominante.
- **Estructura de carpetas:** nombres en mayúsculas y con espacios (`ANALISIS FORENSE`, `INCIDENTES DE CIBERSEGURIDAD`), carpetas `CTF` con nomenclatura inconsistente (`CTF.-2`, `CTF.-4`, `CTF.-5`), `img/`, `BASTIONADO/` con subproyectos.

## 2. Problemas detectados (priorizados)

### 🔴 Críticos (rompen funcionalidad)
1. **Enlaces "atrás" rotos en subpáginas:** apuntan a `https://rafatocinoo.github.io/rafatocinoo.github.io/index.html` (ruta duplicada → 404). Deben ser rutas relativas.
2. **Enlaces muertos (`#`)** en la navegación: *Incidentes de ciberseguridad*, *Normativas de ciberseguridad*, *Puesta en producción segura* y *Contacto* no llevan a ninguna parte.
3. **Carpetas y rutas con espacios y mayúsculas** (`ANALISIS FORENSE`, `INCIDENTES DE CIBERSEGURIDAD`): frágiles, obligan a URL-encoding (`%20`) y son propensas a errores entre sistemas.

### 🟠 Importantes (calidad y consistencia)
4. **Buscador de máquinas no funcional** (es solo decorativo).
5. **Barras de "Dificultad" sin etiqueta** (no se sabe si es Fácil/Media/Difícil) ni alternativa textual.
6. **Cabecera y footer duplicados** en cada página (mantenimiento costoso, riesgo de divergencia).
7. **Modo oscuro probablemente no persistente** (no recuerda la preferencia al recargar/navegar).
8. **Nomenclatura inconsistente** de carpetas/archivos (`CTF.-2`, mezclas de mayúsculas/minúsculas).

### 🟡 Mejora (pulido)
9. **SEO/metadatos mínimos:** falta Open Graph, favicon, `lang`, descripción por página.
10. **Accesibilidad:** emojis usados como botones sin etiqueta accesible, posibles `alt` ausentes, contraste, navegación por teclado.
11. **Responsive sin verificar:** el layout de 3 columnas puede romperse en móvil.
12. **Rendimiento:** imágenes sin optimizar ni `loading="lazy"`.

---

## 3. Mejoras a implementar (con criterios de aceptación)

### 3.1 Estructura de carpetas y enlaces
- Renombrar carpetas a *slugs* en minúsculas y con guiones, sin espacios ni acentos:
  - `ANALISIS FORENSE` → `analisis-forense`
  - `BASTIONADO` → `bastionado`
  - `HACKING_ETICO` → `hacking-etico`
  - `INCIDENTES DE CIBERSEGURIDAD` → `incidentes-ciberseguridad`
  - Carpetas `CTF.-2/4/5` → estructura limpia tipo `ctf/ctf-02`, `ctf/ctf-04`, etc.
- Actualizar **todas** las referencias internas tras renombrar.
- Sustituir enlaces "atrás" por rutas relativas (`../index.html` o ruta raíz), nunca absolutas con el dominio duplicado.
- **Criterio de aceptación:** no existe ningún 404 navegando por la web; ninguna URL contiene `%20` ni el dominio repetido.

### 3.2 Sistema de diseño unificado (CSS)
- Crear un único `css/styles.css` con **variables CSS** (`:root`) para colores, tipografías, espaciados, radios y sombras. Definir paleta morada coherente (color primario, secundario, fondo claro/oscuro, texto, bordes).
- Eliminar estilos inline/duplicados; que todas las páginas usen la misma hoja.
- **Criterio de aceptación:** un solo punto de verdad para el estilo; cambiar una variable cambia el sitio entero.

### 3.3 Modo oscuro funcional y persistente
- Toggle accesible (botón real con `aria-label`, no solo emoji).
- Implementar tema con `data-theme` en `<html>` y guardar preferencia en `localStorage`; respetar `prefers-color-scheme` la primera visita.
- **Criterio de aceptación:** el tema elegido persiste al recargar y al navegar entre páginas; el contraste cumple WCAG AA en ambos modos.

### 3.4 Buscador de máquinas funcional
- Filtrado en cliente (JS vanilla) sobre las tarjetas de máquinas por nombre. Idealmente, mover los datos de máquinas a un array/JSON y renderizarlas dinámicamente.
- Mensaje claro de "sin resultados".
- **Criterio de aceptación:** escribir "blue" filtra y muestra solo la máquina Blue; vaciar el campo restaura todas.

### 3.5 Tarjetas de máquinas
- Mostrar la dificultad como **etiqueta textual + barra** (p. ej. Fácil/Media/Difícil) con color asociado y alternativa accesible.
- Estructura de datos uniforme por máquina: nombre, dificultad, enlace THM, (opcional) tags/SO.
- **Criterio de aceptación:** cada tarjeta indica claramente su dificultad de forma legible y accesible.

### 3.6 Navegación "Asignaturas"
- Crear páginas reales (aunque sean *placeholders* con cabecera/footer y "Próximamente") para las secciones que hoy van a `#`: Incidentes, Normativas, Puesta en producción segura y Contacto.
- Página de **Contacto** con datos/enlaces reales (LinkedIn, email si procede) en lugar de `#`.
- **Criterio de aceptación:** ningún elemento de navegación apunta a `#`.

### 3.7 Reducir duplicación de cabecera/footer
- Extraer cabecera y footer a un patrón reutilizable. Opciones válidas para sitio estático:
  - Componente inyectado por un pequeño `js/layout.js` (fetch de parciales `partials/header.html` y `partials/footer.html`), **o**
  - Plantilla común documentada que se replique de forma consistente.
- **Criterio de aceptación:** modificar la cabecera en un solo sitio se refleja en todas las páginas.

### 3.8 SEO y metadatos
- Por página: `<html lang="es">`, `<title>` único, `<meta name="description">`, etiquetas Open Graph (`og:title`, `og:description`, `og:image`) y `og:url`.
- Añadir `favicon` y, opcionalmente, `robots.txt` y `sitemap.xml`.
- **Criterio de aceptación:** cada página tiene título y descripción propios; la previsualización al compartir muestra imagen y texto.

### 3.9 Accesibilidad (a11y)
- Roles y `aria-label` en botones de icono (atrás, tema, buscar).
- `alt` descriptivo en todas las imágenes.
- HTML semántico (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`), foco visible y navegación completa por teclado.
- **Criterio de aceptación:** Lighthouse Accessibility ≥ 90.

### 3.10 Responsive
- Layout de 3 columnas que colapse a 1 columna en móvil con orden lógico (perfil → buscador/máquinas → asignaturas).
- Probar a 360px, 768px y 1280px.
- **Criterio de aceptación:** sin scroll horizontal ni solapamientos en móvil; todo legible y usable.

### 3.11 Rendimiento
- Imágenes con dimensiones definidas, `loading="lazy"` donde aplique y, si es posible, formatos optimizados.
- **Criterio de aceptación:** Lighthouse Performance ≥ 90 en desktop.

---

## 4. Directrices técnicas (restricciones)
- **Solo HTML, CSS y JS vanilla.** Sin React/Vue/build steps (es GitHub Pages servido desde la rama).
- No introducir dependencias externas salvo que sean por CDN ligero y justificado.
- Mantener compatibilidad con rutas relativas (el sitio cuelga de la raíz del usuario, `usuario.github.io/`).
- Conservar el contenido existente; **no borrar** proyectos ni textos, solo reorganizar y mejorar.
- Git: trabajar en una rama nueva (`mejora/rediseno`), commits pequeños y descriptivos en español.

## 5. Plan de trabajo por fases
1. **Inventario y diagnóstico:** listar todos los archivos, enlaces y rutas; documentar enlaces rotos reales.
2. **Saneamiento de estructura:** renombrar carpetas/archivos a slugs y arreglar TODAS las rutas.
3. **Sistema de diseño:** centralizar CSS con variables y unificar estilos.
4. **Plantilla común:** extraer cabecera/footer.
5. **Funcionalidad:** modo oscuro persistente + buscador funcional + tarjetas con dificultad.
6. **Páginas faltantes:** crear secciones placeholder + Contacto.
7. **SEO + a11y + responsive + rendimiento.**
8. **QA final** con el checklist y verificación local.

## 6. Checklist final de QA
- [ ] Cero enlaces rotos (incluida la flecha "atrás" en todas las subpáginas).
- [ ] Ninguna ruta con espacios, acentos o dominio duplicado.
- [ ] Ningún `href="#"` sin destino real.
- [ ] Modo oscuro persiste al recargar y navegar; contraste AA.
- [ ] Buscador filtra correctamente; estado "sin resultados".
- [ ] Dificultad de cada máquina visible y accesible.
- [ ] Cabecera/footer centralizados.
- [ ] Responsive verificado a 360 / 768 / 1280 px.
- [ ] Metadatos, favicon y Open Graph por página.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90.
- [ ] Contenido original preservado.

---

> **Nota:** Este documento es la fuente de verdad de la reforma. Cualquier cambio debe poder justificarse contra los criterios de aceptación de la sección 3 y superar el checklist de la sección 6.
