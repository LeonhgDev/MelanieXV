import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { INVITATION_CONFIG } from '../invitation-config';

/**
 * Panel flotante TEMPORAL (entorno de pruebas) para personalizar en vivo la
 * paleta de colores, la fuente de los títulos y el fondo de la página.
 * Para retirarlo basta con quitar <app-theme-toggler /> de app.html.
 */
@Component({
  selector: 'app-theme-toggler',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      (click)="abierto.set(!abierto())"
      [attr.aria-expanded]="abierto()"
      aria-controls="panel-tema"
      [attr.aria-label]="abierto() ? 'Cerrar personalización' : 'Personalizar diseño'"
      class="fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/50 text-acento shadow-xl shadow-neutro/50 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
    >
      <i class="pi text-lg" [class.pi-palette]="!abierto()" [class.pi-times]="abierto()" aria-hidden="true"></i>
    </button>

    @if (abierto()) {
      <aside
        id="panel-tema"
        aria-label="Personalización del diseño"
        class="fixed top-16 right-4 z-50 max-h-[75vh] w-72 overflow-y-auto rounded-3xl border border-white/60 bg-white/80 p-5 shadow-xl shadow-neutro/50 backdrop-blur-md"
      >
        <!-- Paleta de colores -->
        <h4 class="text-xs font-medium tracking-widest text-tinta-suave uppercase">Paleta</h4>
        <div class="mt-3 grid grid-cols-5 gap-2">
          @for (p of tema.paletas; track p.id) {
            <button
              type="button"
              (click)="tema.paleta.set(p)"
              [attr.aria-label]="'Paleta ' + p.nombre"
              [attr.aria-pressed]="tema.paleta().id === p.id"
              [title]="p.nombre"
              class="flex h-9 w-9 items-center justify-center rounded-full border border-white shadow-md transition-transform duration-200 hover:scale-110"
              [class.ring-2]="tema.paleta().id === p.id"
              [class.ring-offset-2]="tema.paleta().id === p.id"
              [class.ring-tinta]="tema.paleta().id === p.id"
              [style.background-color]="p.muestra"
            >
              @if (tema.paleta().id === p.id) {
                <i class="pi pi-check text-xs text-white" aria-hidden="true"></i>
              }
            </button>
          }
        </div>

        <!-- Fuente de títulos -->
        <h4 class="mt-6 text-xs font-medium tracking-widest text-tinta-suave uppercase">
          Fuente del título
        </h4>
        <div class="mt-3 flex flex-col gap-1">
          @for (f of tema.fuentes; track f.id) {
            <button
              type="button"
              (click)="tema.fuente.set(f)"
              [attr.aria-pressed]="tema.fuente().id === f.id"
              class="flex items-center justify-between rounded-xl px-3 py-1.5 text-left transition-colors duration-200 hover:bg-acento-claro/40"
              [class.bg-acento-claro/60]="tema.fuente().id === f.id"
            >
              <span class="text-2xl leading-tight text-tinta" [style.font-family]="f.familia">
                {{ nombreQuinceanera }}
              </span>
              <span class="ml-2 shrink-0 text-[10px] font-light text-tinta-suave">
                {{ f.nombre }}
                @if (tema.fuente().id === f.id) {
                  <i class="pi pi-check ml-1 text-[10px] text-acento" aria-hidden="true"></i>
                }
              </span>
            </button>
          }
        </div>

        <!-- Nombres de la familia: color -->
        <h4 class="mt-6 text-xs font-medium tracking-widest text-tinta-suave uppercase">
          Color de nombres
        </h4>
        <div class="mt-3 grid grid-cols-6 gap-2">
          @for (c of tema.coloresNombres; track c.id) {
            <button
              type="button"
              (click)="tema.colorNombres.set(c)"
              [attr.aria-label]="'Color de nombres ' + c.nombre"
              [attr.aria-pressed]="tema.colorNombres().id === c.id"
              [title]="c.nombre"
              class="flex h-8 w-8 items-center justify-center rounded-full border border-white shadow-md transition-transform duration-200 hover:scale-110"
              [class.ring-2]="tema.colorNombres().id === c.id"
              [class.ring-offset-2]="tema.colorNombres().id === c.id"
              [class.ring-tinta]="tema.colorNombres().id === c.id"
              [style.background]="c.css"
            >
              @if (tema.colorNombres().id === c.id) {
                <i class="pi pi-check text-[10px] text-white" aria-hidden="true"></i>
              }
            </button>
          }
        </div>

        <!-- Nombres de la familia: letra -->
        <h4 class="mt-6 text-xs font-medium tracking-widest text-tinta-suave uppercase">
          Letra de nombres
        </h4>
        <div class="mt-3 flex flex-col gap-1">
          @for (f of tema.fuentesNombres; track f.id) {
            <button
              type="button"
              (click)="tema.fuenteNombres.set(f)"
              [attr.aria-pressed]="tema.fuenteNombres().id === f.id"
              class="flex items-center justify-between rounded-xl px-3 py-1 text-left transition-colors duration-200 hover:bg-acento-claro/40"
            >
              <span class="text-xl leading-tight text-tinta" [style.font-family]="f.familia">
                {{ f.nombre }}
              </span>
              @if (tema.fuenteNombres().id === f.id) {
                <i class="pi pi-check ml-2 shrink-0 text-[10px] text-acento" aria-hidden="true"></i>
              }
            </button>
          }
        </div>

        <!-- Fondo de página -->
        <h4 class="mt-6 text-xs font-medium tracking-widest text-tinta-suave uppercase">Fondo</h4>
        <div class="mt-3 grid grid-cols-3 gap-2">
          @for (f of tema.fondos; track f.id) {
            <button
              type="button"
              (click)="tema.fondo.set(f)"
              [attr.aria-pressed]="tema.fondo().id === f.id"
              class="flex flex-col items-center gap-1 rounded-xl p-1.5 transition-colors duration-200 hover:bg-acento-claro/40"
            >
              <span
                class="h-9 w-full rounded-lg border shadow-sm"
                [class]="f.clase"
                [class.border-neutro]="tema.fondo().id !== f.id"
                [class.border-acento]="tema.fondo().id === f.id"
                aria-hidden="true"
              ></span>
              <span class="text-[10px] font-light text-tinta-suave">{{ f.nombre }}</span>
            </button>
          }
        </div>
      </aside>
    }
  `,
})
export class ThemeTogglerComponent {
  protected readonly tema = inject(ThemeService);
  protected readonly abierto = signal(false);
  protected readonly nombreQuinceanera = INVITATION_CONFIG.nombreQuinceanera;
}
