# MelanieXV — Invitación web de XV Años

Documentación del proyecto: origen, decisiones técnicas, configuración de GitHub y Vercel, y guías para hacer cambios y actualizaciones manuales.

| Dato | Valor |
| --- | --- |
| **Sitio en producción** | https://melaniexv.vercel.app |
| **Repositorio** | https://github.com/LeonhgDev/MelanieXV |
| **Proyecto Vercel** | `melaniexv` (equipo `leonhg-5931s-projects`, usuario `leonhg-5931`) |
| **Evento** | XV Años de Melanie — 8 de agosto de 2026, 18:45 hrs |
| **Vigencia estimada** | ~3 meses (no se planea actualizar versiones de dependencias) |

---

## 1. Origen y peticiones iniciales

La primera versión de la invitación fue una página de Google Sites (https://sites.google.com/view/nayelixv/home). El objetivo fue **superarla con tecnologías modernas**, manteniendo el alcance realista: es una página sencilla, de pocas visitas y vida corta, **optimizada 100 % para móviles** (los invitados la abren desde WhatsApp).

Requerimientos iniciales:

- Toda la información del evento **configurable y desacoplada** de las plantillas (un solo archivo de datos).
- Secciones: portada (hero), música, contador regresivo, ubicaciones (misa y recepción) con Google Maps/Waze, código de vestimenta, mesa de regalos con copiado del código, y confirmación de asistencia vía WhatsApp.
- Estética: minimalista y romántica, glassmorphism, bordes redondeados, animaciones sutiles.

Peticiones posteriores (ver historial en §8): imágenes por sección, favicon de corazón, sección de padres y padrinos, y un **panel de personalización en vivo** (paletas de color, tipografías, fondos y estilo de los nombres) para que la familia elija el diseño definitivo.

## 2. Selección de tecnología

| Tecnología | Versión | Por qué |
| --- | --- | --- |
| Angular | 20.3 (standalone + Signals) | Se pidió “19+”; se eligió 20 por ser la más reciente **compatible con PrimeNG estable** al momento de crear el proyecto. |
| PrimeNG | 20.4 (tema Aura) | Componentes interactivos (toast, inputs, select). |
| Tailwind CSS | 4.3 (vía `@tailwindcss/postcss`) | Todo el diseño visual; los tokens del tema se definen con `@theme inline`. |
| PrimeIcons | 7 | Iconografía. |
| Vercel | CLI 55 | Hosting estático con CDN, HTTPS y despliegues por comando. |

Sin SSR, sin routing (una sola página), sin backend: la “base de datos” es un archivo TypeScript y las confirmaciones llegan por WhatsApp.

## 3. Estructura del proyecto

```
MelanieXV/
├── src/
│   ├── index.html                  # Título, meta, favicon (emoji 💙) y fuentes de Google
│   ├── styles.css                  # Tailwind, tokens del tema, paletas, fuentes y fondos
│   ├── assets/img/                 # Imágenes de secciones (se compilan a assets/img/)
│   └── app/
│       ├── invitation-config.ts    # ★ TODOS los datos del evento se editan aquí
│       ├── app.ts / app.html       # Composición de la página + clase de tema raíz
│       ├── app.config.ts           # Providers (PrimeNG, animaciones, MessageService)
│       ├── services/
│       │   └── theme.service.ts    # Catálogos y estado del personalizador (Signals)
│       ├── directives/
│       │   └── reveal-on-scroll.directive.ts  # Animación de entrada
│       └── components/
│           ├── hero.component.ts           # Portada
│           ├── audio-player.component.ts   # Música flotante
│           ├── countdown.component.ts      # Contador regresivo
│           ├── family.component.ts         # Padres y padrinos
│           ├── locations.component.ts      # Misa/recepción + Maps/Waze
│           ├── dress-code.component.ts     # Código de vestimenta
│           ├── gifts.component.ts          # Mesa de regalos
│           ├── rsvp.component.ts           # Confirmación por WhatsApp
│           └── theme-toggler.component.ts  # Panel de personalización (temporal)
├── public/                         # Archivos servidos tal cual (cancion.mp3, hero.jpg)
├── vercel.json                     # Configuración del despliegue
└── angular.json                    # Build (registra public/ y src/assets como assets)
```

## 4. Cómo cambiar la información del evento

**Todo** el contenido se edita en `src/app/invitation-config.ts` (está tipado: el editor avisa si falta un campo). Campos principales:

- `nombreQuinceanera`, `fraseBienvenida`, `fechaEvento` (el contador y la fecha del hero se calculan solos).
- `codigoPaisWhatsapp` (52 = México), `whatsappConfirmacion`, `whatsappFelicitaciones` (10 dígitos, sin lada).
- `familia.grupos` — padres/padrinos; admite agregar más grupos (p. ej. “Mis abuelos”) sin tocar componentes. `familia.fraseCierre`.
- `ubicaciones.misa` / `ubicaciones.recepcion` — nombre, hora, dirección, `mapsUrl` (enlace corto de Google Maps) e `imagenUrl`. El enlace de Waze se genera solo a partir de la dirección.
- `codigoVestimenta` — título, advertencia, paleta sugerida (nombre + hex) y color reservado.
- `mesaRegalos` — tienda, código (botón de copiado) y URL.
- `pasesMaximosPorInvitado` — genera las opciones del formulario RSVP.
- `musicaUrl`, `heroImagenUrl` — archivos en `public/`.

**Imágenes**: las de secciones van en `src/assets/img/` (`CeremoniaReligiosa.jpg`, `Recepcion.png`, `CodigoVestimenta.png`); se muestran completas, escaladas al ancho de la tarjeta, y si el archivo no existe la tarjeta simplemente no muestra imagen. La foto de portada (`hero.jpg`) y la canción (`cancion.mp3`) van en `public/`.

Después de editar: guarda el archivo, y sigue el flujo de la §7 (commit → push → deploy).

## 5. Sistema de personalización (temas)

El diseño usa **tokens semánticos** de Tailwind definidos en `styles.css` con `@theme inline`: `text-acento`, `bg-acento`, `text-tinta`, `border-neutro`, `font-script`, etc. Cada token apunta a una variable CSS (`--tema-acento`, `--fuente-titulo`, …) que las clases de paleta/fuente/fondo redefinen.

`ThemeService` (`src/app/services/theme.service.ts`) guarda la selección en Signals e inyecta las clases activas en el contenedor raíz (`app.html`). Catálogos actuales:

- **10 paletas**: Océano (default), Rosa, Esmeralda, Lavanda, Vino, Dorado, Coral, Turquesa, Grafito, Fucsia.
- **10 fuentes de título**: Parisienne (default), Great Vibes, Dancing Script, Allura, Sacramento, Tangerine, Alex Brush, Pinyon Script, Italianno, Playfair Display.
- **11 fondos**: Aurora (default), Claro, Blanco, Marfil, Degradado, Puntos, Líneas, Pastel, Intenso, Amanecer, Algodón. Pastel/Intenso/Aurora se tiñen con la paleta activa.
- **Nombres de familia**: 6 colores (4 ligados a la paleta + Dorado y Vino fijos) y 12 letras.

**Agregar una opción** (ejemplo, paleta nueva): copia un bloque `.paleta-*` en `styles.css`, cambia los 8 valores, y añade la entrada al arreglo `paletas` del servicio. Fuentes nuevas requieren además sumar la familia al `<link>` de Google Fonts en `src/index.html`.

**Cambiar el diseño por defecto**: en `theme.service.ts`, los signals `paleta`, `fuente`, `fondo`, `fuenteNombres` y `colorNombres` se inicializan con `this.buscar(catalogo, 'id')` — cambia el id.

**Fijar el diseño definitivo**: cuando la familia decida, actualiza los defaults y elimina `<app-theme-toggler />` de `app.html` (y su import en `app.ts`). La selección de cada visitante **no se persiste**: al recargar vuelve a los defaults.

## 6. Configuración de GitHub

- Repo: `https://github.com/LeonhgDev/MelanieXV.git`, rama única `main`.
- La identidad de git está configurada **solo en este repositorio** (`git config user.name "LeonhgDev"`, `user.email "leonhg@gmail.com"`).
- La autenticación usa **Git Credential Manager** de Windows: la primera vez pidió iniciar sesión en el navegador; las credenciales quedaron guardadas, por lo que `git push` ya no pide nada.
- `.gitignore` excluye `node_modules/`, `dist/`, `.angular/`, `.vercel/`, `.env.local` y `.claude/settings.local.json`.

Si el push vuelve a pedir credenciales (p. ej. en otra máquina), basta iniciar sesión con la cuenta `LeonhgDev` en la ventana que abre Git Credential Manager.

## 7. Configuración de Vercel y cómo desplegar

- `vercel.json` define: framework `angular`, build `ng build`, salida `dist/melanie-xv/browser` y un *rewrite* de SPA (`/(.*)` → `/index.html`).
- El vínculo local con el proyecto está en `.vercel/project.json` (no versionado). La sesión de la CLI quedó iniciada como `leonhg-5931`.
- ⚠️ **No hay integración GitHub→Vercel**: hacer `git push` **no** publica. El intento de conexión automática falló porque la app de GitHub de Vercel no está instalada en la cuenta. Para activar despliegue automático: entrar a https://vercel.com/new, importar `LeonhgDev/MelanieXV` y autorizar la app; desde entonces cada push a `main` publica solo (y el paso manual sobra).

### Flujo completo para publicar un cambio (manual, el actual)

```powershell
# 1. Verificar y compilar
npm run build

# 2. Versionar
git add -A
git commit -m "Descripción del cambio"
git push

# 3. Publicar en producción
npx -y vercel@latest deploy --prod --yes
```

El deploy tarda ~1 minuto y termina mostrando `Aliased https://melaniexv.vercel.app`. Si el navegador muestra la versión vieja, recargar con `Ctrl+Shift+R` (caché).

### Comandos útiles

| Comando | Qué hace |
| --- | --- |
| `npm start` | Servidor local en http://localhost:4200 con recarga en vivo |
| `npm run build` | Compila a `dist/melanie-xv/` (falla si hay errores de tipos/plantillas) |
| `npm test` | Pruebas unitarias (Karma/Jasmine) |
| `npx vercel ls melaniexv` | Lista los despliegues del proyecto |
| `npx vercel rollback` | Regresa producción al despliegue anterior |

## 8. Historial de cambios

| Commit | Cambio |
| --- | --- |
| `328e20a` | Proyecto inicial: Angular 20 + PrimeNG + Tailwind, todas las secciones, configuración central |
| `acf44fd` | Configuración de despliegue en Vercel (`vercel.json`) |
| `5ee4d49` | Nueva fecha (8-ago-2026), recepción Salón Portofino, color reservado azul |
| `dc327b1` | Imágenes por sección, favicon 💙, primer sistema de temas (rosa/azul), código de regalos 51902017 |
| `7e5e467` | Limpieza: carpeta `img/` duplicada en la raíz |
| `8813ac7` | Personalizador: 10 paletas, 10 fuentes, 6 fondos; refactor a tokens semánticos |
| `f8d957e` / `54fb8e4` | Imágenes de vestimenta/ceremonia/recepción sin recorte |
| `db58677` | Sección de padres y padrinos + frase de cierre |
| `544dc4d` | Pestañas de ubicación claramente clickables (reemplaza p-selectButton) |
| `3d2dfbe` | 5 fondos coloridos nuevos (Pastel, Intenso, Aurora, Amanecer, Algodón) |
| `60e6d0b` | Color y letra personalizables para los nombres de la familia; WhatsApp de felicitaciones actualizado |
| `acf3391` | Defaults: fuente Parisienne y fondo Aurora |
| `ca3999e` | Advertencia de vestimenta: “en todas sus tonalidades” |

El detalle exacto de cada cambio está en `git log`.

## 9. Notas y decisiones varias

- **WhatsApp**: los enlaces se construyen como `https://wa.me/52<numero>?text=<mensaje URL-encoded>`; el mensaje de confirmación usa negritas de WhatsApp (`*texto*`) y saltos de línea.
- **Waze**: `https://waze.com/ul?q=<dirección>&navigate=yes` abre la app en móviles.
- **Autoplay**: los navegadores bloquean el audio automático; por eso la música solo inicia cuando el invitado toca el botón flotante (el rechazo de `play()` se ignora en silencio).
- **Favicon**: es un emoji dentro de un SVG inline en `index.html` — no hay archivo `.ico` que mantener; para cambiarlo basta sustituir el emoji.
- **Fuentes de Google**: se declaran todas en un solo `<link>`; el navegador solo descarga los archivos de las fuentes que realmente se usan en pantalla.
- **Presupuesto de tamaño**: `angular.json` permite hasta 800 kB iniciales sin warning (PrimeNG pesa); el bundle real ronda 690 kB (~147 kB transferidos).
- **Accesibilidad**: secciones con `aria-label`/`aria-labelledby`, botones con `aria-pressed`, y las animaciones de entrada se desactivan con `prefers-reduced-motion`.
- **Pruebas**: existe un spec mínimo (`app.spec.ts`) que verifica que la app se crea y muestra el nombre configurado.
