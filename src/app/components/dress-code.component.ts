import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { INVITATION_CONFIG } from '../invitation-config';

@Component({
  selector: 'app-dress-code',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="mx-auto max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white/40 text-center shadow-xl shadow-stone-200/50 backdrop-blur-md ocean:border-slate-200/60 ocean:bg-white/50 ocean:shadow-slate-200/50"
    >
      @if (!imagenFallida()) {
        <img
          [src]="vestimenta.imagenUrl"
          alt="Ilustración del código de vestimenta"
          loading="lazy"
          (error)="imagenFallida.set(true)"
          class="h-48 w-full object-cover"
        />
      }

      <div class="p-8">
        <i class="pi pi-sparkles mb-4 text-3xl text-rose-500 ocean:text-blue-500" aria-hidden="true"></i>

        <h3 class="font-serif text-3xl text-stone-800 ocean:text-slate-900">{{ vestimenta.titulo }}</h3>
        <p class="mt-2 text-sm font-light text-stone-600 ocean:text-slate-600">
          Colores sugeridos para nuestros invitados
        </p>

        <!-- Paleta de colores sugerida -->
        <div class="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
          @for (color of vestimenta.paletaSugerida; track color.nombre) {
            <div class="group flex flex-col items-center gap-2">
              <span
                class="h-10 w-10 rounded-full border border-stone-200 shadow-md transition-transform duration-300 group-hover:scale-110 ocean:border-slate-200"
                [style.background-color]="color.hex"
              ></span>
              <span class="text-[10px] font-light tracking-wide text-stone-500 ocean:text-slate-500">
                {{ color.nombre }}
              </span>
            </div>
          }
        </div>

        <!-- Advertencia elegante: color reservado -->
        <div
          class="mt-8 flex items-center gap-4 rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-left ocean:border-blue-200 ocean:bg-blue-50/70"
        >
          <span class="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <span
              class="h-9 w-9 rounded-full shadow-md"
              [style.background-color]="vestimenta.colorReservado.hex"
            ></span>
            <span
              class="absolute inset-0 flex items-center justify-center text-white"
              aria-hidden="true"
            >
              <i class="pi pi-ban text-2xl opacity-80"></i>
            </span>
          </span>
          <p class="text-sm leading-snug text-rose-700 italic ocean:text-blue-800">
            {{ vestimenta.advertencia }}
          </p>
        </div>
      </div>
    </div>
  `,
})
export class DressCodeComponent {
  protected readonly vestimenta = INVITATION_CONFIG.codigoVestimenta;

  /** Oculta la imagen si el archivo aún no existe en src/assets/img/. */
  protected readonly imagenFallida = signal(false);
}
