import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { INVITATION_CONFIG } from '../invitation-config';

@Component({
  selector: 'app-dress-code',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="mx-auto max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white/50 text-center shadow-xl shadow-neutro/50 backdrop-blur-md"
    >
      @if (!imagenFallida()) {
        <img
          [src]="vestimenta.imagenUrl"
          alt="Ilustración del código de vestimenta"
          loading="lazy"
          (error)="imagenFallida.set(true)"
          class="mx-auto mt-8 h-auto w-[49%] rounded-2xl"
        />
      }

      <div class="p-8">
        <i class="pi pi-sparkles mb-4 text-3xl text-acento" aria-hidden="true"></i>

        <h3 class="font-serif text-3xl text-tinta">{{ vestimenta.titulo }}</h3>

        <!-- Advertencia elegante: color reservado -->
        <div
          class="mt-8 flex items-center gap-4 rounded-2xl border border-acento-claro bg-acento-claro/30 p-4 text-left"
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
          <p class="text-sm leading-snug text-acento-fuerte italic">
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
