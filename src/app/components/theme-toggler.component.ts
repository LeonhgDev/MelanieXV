import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

/**
 * Botón flotante TEMPORAL (entorno de pruebas) para alternar entre las
 * paletas 'romantic-rose' y 'ocean-blue' y compararlas en vivo.
 * Para retirarlo basta con quitar <app-theme-toggler /> de app.html.
 */
@Component({
  selector: 'app-theme-toggler',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      (click)="tema.alternar()"
      [attr.aria-label]="'Cambiar tema. Tema actual: ' + tema.temaActual()"
      [title]="'Tema: ' + tema.temaActual()"
      class="fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/40 text-rose-600 shadow-xl shadow-stone-200/50 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 ocean:border-slate-200/60 ocean:bg-white/50 ocean:text-blue-600 ocean:shadow-slate-200/50"
    >
      <i class="pi pi-palette text-lg" aria-hidden="true"></i>
    </button>
  `,
})
export class ThemeTogglerComponent {
  protected readonly tema = inject(ThemeService);
}
