import { Injectable, signal } from '@angular/core';

/** Espera antes de que los portones empiecen a abrirse y el contenido a revelarse. */
export const INTRO_RETRASO_MS = 600;
/** Duración del giro de los portones; debe coincidir con .puerta-hoja en styles.css. */
export const INTRO_DURACION_MS = 3200;

/**
 * Orquesta el efecto de bienvenida: expone el momento en que los portones
 * empiezan a abrirse para que el hero (título, nombre y figura) revele su
 * contenido exactamente al mismo tiempo.
 */
@Injectable({ providedIn: 'root' })
export class IntroService {
  private readonly prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  readonly abriendo = signal(this.prefiereMenosMovimiento);
  readonly portonesVisibles = signal(!this.prefiereMenosMovimiento);

  constructor() {
    if (this.prefiereMenosMovimiento) return;

    document.body.style.overflow = 'hidden';

    setTimeout(() => this.abriendo.set(true), INTRO_RETRASO_MS);
    setTimeout(() => {
      this.portonesVisibles.set(false);
      document.body.style.overflow = '';
    }, INTRO_RETRASO_MS + INTRO_DURACION_MS);
  }
}
