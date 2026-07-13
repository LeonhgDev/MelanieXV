# MelanieXV

Invitación web para los XV Años de Melanie (8 de agosto de 2026), construida con Angular 20, PrimeNG y Tailwind CSS 4, desplegada en Vercel.

- **Producción:** https://melaniexv.vercel.app
- **Documentación completa** (tecnología, configuración de GitHub/Vercel, cómo hacer cambios y desplegar): [DOCUMENTACION.md](DOCUMENTACION.md)

## Inicio rápido

```bash
npm install      # instalar dependencias
npm start        # servidor local en http://localhost:4200
npm run build    # compilar a dist/melanie-xv/
```

Todos los datos del evento se editan en `src/app/invitation-config.ts`. Para publicar un cambio:

```bash
npm run build
git add -A && git commit -m "Descripción" && git push
npx -y vercel@latest deploy --prod --yes
```
