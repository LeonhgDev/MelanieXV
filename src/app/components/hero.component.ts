import { ChangeDetectionStrategy, Component } from '@angular/core';
import { INVITATION_CONFIG } from '../invitation-config';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <!-- Fondo: degradado elegante + imagen opcional (public/hero.jpg) -->
      <div class="absolute inset-0 bg-gradient-to-b from-rose-100 via-stone-100 to-stone-50"></div>
      <div
        class="absolute inset-0 bg-cover bg-center"
        [style.background-image]="'url(' + config.heroImagenUrl + ')'"
      ></div>
      <!-- Overlay translúcido -->
      <div class="absolute inset-0 bg-stone-50/40 backdrop-blur-[2px]"></div>

      <div class="relative flex flex-col items-center gap-6">
        <p class="text-sm font-light tracking-[0.4em] text-stone-600 uppercase">Mis XV Años</p>

        <h1 class="font-script text-7xl text-rose-600 drop-shadow-sm sm:text-8xl md:text-9xl">
          {{ config.nombreQuinceanera }}
        </h1>

        <div class="flex items-center gap-4 text-stone-500">
          <span class="h-px w-12 bg-stone-400"></span>
          <p class="font-serif text-xl tracking-wide capitalize">{{ fechaLegible }}</p>
          <span class="h-px w-12 bg-stone-400"></span>
        </div>

        <p class="max-w-xs font-serif text-lg text-stone-600 italic">
          {{ config.fraseBienvenida }}
        </p>
      </div>

      <!-- Botón flotante para hacer scroll -->
      <a
        href="#contenido"
        aria-label="Ver la invitación"
        class="absolute bottom-8 flex h-12 w-12 animate-bounce items-center justify-center rounded-full border border-white/60 bg-white/40 text-rose-600 shadow-xl shadow-stone-200/50 backdrop-blur-md transition-colors duration-300 hover:bg-rose-500 hover:text-white"
      >
        <i class="pi pi-angle-down text-xl" aria-hidden="true"></i>
      </a>
    </section>
  `,
})
export class HeroComponent {
  protected readonly config = INVITATION_CONFIG;

  protected readonly fechaLegible = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(INVITATION_CONFIG.fechaEvento);
}
