import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { INVITATION_CONFIG, Ubicacion } from '../invitation-config';

type ClaveUbicacion = 'misa' | 'recepcion';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [FormsModule, SelectButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto flex max-w-md flex-col items-center gap-6">
      <p-selectButton
        [options]="opciones"
        [ngModel]="seleccion()"
        (ngModelChange)="cambiarSeleccion($event)"
        [allowEmpty]="false"
        optionLabel="etiqueta"
        optionValue="valor"
        size="small"
      />

      <div
        class="w-full overflow-hidden rounded-3xl border border-white/60 bg-white/50 text-center shadow-xl shadow-neutro/50 backdrop-blur-md"
      >
        @if (!imagenFallida()) {
          <img
            [src]="ubicacion().imagenUrl"
            [alt]="ubicacion().nombre"
            loading="lazy"
            (error)="imagenFallida.set(true)"
            class="h-auto w-full"
          />
        }

        <div class="p-8">
          <i
            class="pi mb-4 text-3xl text-acento"
            [class.pi-heart]="seleccion() === 'misa'"
            [class.pi-star]="seleccion() === 'recepcion'"
            aria-hidden="true"
          ></i>

          <h3 class="font-serif text-2xl text-tinta">{{ ubicacion().nombre }}</h3>

          <p class="mt-2 text-lg font-medium text-acento">
            <i class="pi pi-clock mr-1 text-sm" aria-hidden="true"></i>{{ ubicacion().hora }}
          </p>

          <p class="mt-3 text-sm leading-relaxed font-light text-tinta-suave">
            {{ ubicacion().direccion }}
          </p>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              [href]="ubicacion().mapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-acento px-6 py-3 text-sm font-medium text-white shadow-lg shadow-acento-claro transition-all duration-300 hover:bg-acento-fuerte hover:shadow-xl"
            >
              <i class="pi pi-map-marker" aria-hidden="true"></i>
              Google Maps
            </a>
            <a
              [href]="wazeUrl()"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 rounded-full border border-neutro bg-white/60 px-6 py-3 text-sm font-medium text-tinta-suave transition-all duration-300 hover:border-acento-suave hover:text-acento"
            >
              <i class="pi pi-compass" aria-hidden="true"></i>
              Waze
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LocationsComponent {
  private readonly config = INVITATION_CONFIG;

  protected readonly opciones: { etiqueta: string; valor: ClaveUbicacion }[] = [
    { etiqueta: 'Ceremonia Religiosa', valor: 'misa' },
    { etiqueta: 'Recepción', valor: 'recepcion' },
  ];

  protected readonly seleccion = signal<ClaveUbicacion>('misa');

  /** Oculta la imagen si el archivo aún no existe en src/assets/img/. */
  protected readonly imagenFallida = signal(false);

  protected readonly ubicacion = computed<Ubicacion>(
    () => this.config.ubicaciones[this.seleccion()],
  );

  /** Enlace universal de Waze: abre la app en móviles si está instalada. */
  protected readonly wazeUrl = computed(
    () => `https://waze.com/ul?q=${encodeURIComponent(this.ubicacion().direccion)}&navigate=yes`,
  );

  protected cambiarSeleccion(valor: ClaveUbicacion): void {
    this.seleccion.set(valor);
    this.imagenFallida.set(false);
  }
}
