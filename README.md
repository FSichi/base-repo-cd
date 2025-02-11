# React + Typescript + Vite

Esta solución está construida utilizando React, Vite y TypeScript, implementando el patrón Container-Presentational para una arquitectura más modular y escalable. Los componentes presentacionales se centran exclusivamente en la interfaz de usuario (UI), mientras que los contenedores manejan la lógica de negocio, estado y comunicación con servicios externos.

La aplicación está compuesta por Page Components, que integran la vista y la lógica, apoyándose en UI Components reutilizables para una experiencia consistente. Para gestionar el estado y la lógica compartida, se implementan Custom Hooks y Custom Contexts, lo que facilita el manejo eficiente del estado global, conexiones con WebSocket, y otras funcionalidades clave.

Las comunicaciones con el backend están centralizadas en instancias de Axios, gestionando eficientemente las interacciones con las APIs a través de DB Services y DB Hooks.

El uso de Common Components, utilidades y helpers garantiza una alta reutilización del código y facilita la escalabilidad futura del proyecto.