# 🧙‍♂️ Alan OS - Portfolio

El propósito principal de este portfolio es:

- Explorar y aprender sobre **Astro**
- Aplicar buenas prácticas de **desarrollo Frontend** ya que no lo utilizo a diario en mi trabajo como desarrollador de backend.
- Experimentar con estructura, componentes, estilos y performance leyendo las documentaciones pertinentes.
- Tener un espacio propio para mostrar creatividad y gustos personales sin abandonar la arista profesional que motiva al desarrollo del proyecto.

No está pensado como un producto final, sino como un **laboratorio** que me lleve a diseñar y crear sobre la marcha.

El diseño del portfolio está fuertemente inspirado en mi afición por los juegos RPG clásicos y mi color favorito! (nótese en menús y ventanas).


## 🛠️ Tecnologías utilizadas

- **Astro**: Utilizado como orquestador principal a fin de aprender sobre las **Islas** y mejorar la performance.
- **React + TypeScript**: Para la construcción de la interfaz de usuario con tipado fuerte, garantizando un código robusto y mantenible.
- **Zustand**: Gestión de estado global ligera para la comunicación entre ventanas y accessos directos.
- **i18next**: Sistema centralizado para soporte multi-idioma (ES/EN).


## 🚀 Buenas Prácticas Aplicadas (Deep Dive)

Durante el desarrollo, el proyecto ha evolucionado aplicando patrones de diseño:

### 1. Arquitectura de Estado Global (Zustand)
Se implementó un `useStore` centralizado para manejar la apertura, cierre y foco de ventanas. Esto desacopla la lógica de la UI y permite que componentes en diferentes "islas" de Astro se comuniquen entre sí de forma eficiente.

### 2. Abstracción de Lógica con Custom Hooks (`useDraggable`)
Para mantener el principio **DRY (Don't Repeat Yourself)**, se extrajo la lógica matemática que da movimiento y límites de pantalla (*clamping*) a un hook personalizado. Esto permite que tanto ventanas como shortcuts compartan la misma capacidad de movimiento sin duplicar código.

### 3. Sistema de UI Modular (Atoms & Molecules)
Se refactorizaron componentes en piezas de UI reutilizables:
- `Divider`: Separador visual
- `BadgeList`: Renderizado dinámico de tecnologias y herramientas.
- `ProjectCard`: Componente para la galería de proyectos con soporte para imágenes opcionales y contenido textual.

### 4. i18n
Se centralizó la configuración de `i18next` para evitar parpadeos de contenido (*FOUC*). El sistema detecta automáticamente el idioma del navegador y recuerda la preferencia del usuario mediante `localStorage` desde el arranque del motor de traducciones.

### 5. Optimización Mobile-First
Se diseñó una lógica de comportamiento dual:
- **Web**: Experiencia de ventanas flotantes, arrastrables y foco dinámico.
- **Mobile**: Interfaz adaptada con transiciones suaves y posicionamiento fijo.

## Estado

 **Finalizado**

El proyecto se encuentra finalizado al día de la fecha!!!

---

👾 *Gracias por pasar!!!.*