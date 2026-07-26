import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { INVITATION_CONFIG } from '../invitation-config';
import { IntroService } from '../services/intro.service';

const ETIQUETA_INTRO = 'Mis XV Años';
const PASO_LETRA_MS = 70;

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <!-- Fondo: velo del acento sobre el fondo elegido + imagen opcional (public/hero.jpg) -->
      <div class="absolute inset-0 bg-gradient-to-b from-acento-claro/60 via-transparent to-transparent"></div>
      <div
        class="absolute inset-0 bg-cover bg-center"
        [style.background-image]="'url(' + config.heroImagenUrl + ')'"
      ></div>
      <!-- Overlay translúcido -->
      <div class="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>

      <div class="relative flex flex-col items-center gap-6">
        <p
          class="etiqueta-fondo-doble flex text-[1.05rem] font-light tracking-[0.4em] text-tinta-suave uppercase"
          aria-label="Mis XV Años"
        >
          @for (letra of etiquetaLetras; track $index) {
            <span
              class="letra-intro"
              [class.letra-intro--visible]="intro.abriendo()"
              [style.transition-delay.ms]="retrasoLetra($index)"
              aria-hidden="true"
              >{{ letra === ' ' ? ' ' : letra }}</span
            >
          }
        </p>

        <h1
          class="nombre-intro font-script text-7xl text-acento drop-shadow-sm sm:text-8xl md:text-9xl"
          [class.nombre-intro--visible]="intro.abriendo()"
        >
          {{ config.nombreQuinceanera }}
        </h1>

        <img
          src="assets/img/MXV_Espalda.png"
          alt=""
          aria-hidden="true"
          class="figura-intro h-48 w-auto select-none sm:h-64 md:h-72"
          [class.figura-intro--visible]="intro.abriendo()"
        />

        <div
          class="fecha-intro flex items-center gap-4 text-tinta-suave"
          [class.fecha-intro--visible]="intro.abriendo()"
        >
          <span class="h-px w-12 bg-acento-suave"></span>
          <p class="font-serif text-xl tracking-wide text-blue-800">{{ fechaLegible }}</p>
          <span class="h-px w-12 bg-acento-suave"></span>
        </div>

        <p
          class="frase-intro max-w-xs font-serif text-lg text-tinta-suave italic"
          [class.frase-intro--visible]="intro.abriendo()"
        >
          {{ config.fraseBienvenida }}
        </p>
      </div>

      <!-- Botón flotante para hacer scroll -->
      <a
        href="#contenido"
        aria-label="Ver la invitación"
        class="absolute bottom-8 flex h-12 w-12 animate-bounce items-center justify-center rounded-full border border-white/60 bg-white/50 text-acento shadow-xl shadow-neutro/50 backdrop-blur-md transition-colors duration-300 hover:bg-acento hover:text-white"
      >
        <i class="pi pi-angle-down text-xl" aria-hidden="true"></i>
      </a>
    </section>
  `,
})
export class HeroComponent {
  protected readonly config = INVITATION_CONFIG;
  protected readonly intro = inject(IntroService);

  protected readonly fechaLegible = this.construirFechaLegible(INVITATION_CONFIG.fechaEvento);

  /** Letras de "Mis XV Años"; se revelan de derecha a izquierda al abrir los portones. */
  protected readonly etiquetaLetras = ETIQUETA_INTRO.split('');

  protected retrasoLetra(indice: number): number {
    return (this.etiquetaLetras.length - 1 - indice) * PASO_LETRA_MS;
  }

  /** "sábado, 8 de agosto de 2026" -> "Sábado, 8 de Agosto de 2026" (día y mes con mayúscula inicial). */
  private construirFechaLegible(fecha: Date): string {
    const partes = new Intl.DateTimeFormat('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).formatToParts(fecha);

    return partes
      .map((parte) =>
        parte.type === 'weekday' || parte.type === 'month'
          ? parte.value.charAt(0).toUpperCase() + parte.value.slice(1)
          : parte.value,
      )
      .join('');
  }
}
