import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { INVITATION_CONFIG, Ubicacion } from '../invitation-config';

type ClaveUbicacion = 'misa' | 'recepcion';

@Component({
  selector: 'app-locations',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto flex max-w-md flex-col items-center gap-6">
      <!-- Selector tipo píldora: la opción activa se rellena con el acento -->
      <div
        class="flex gap-1.5 rounded-full border border-white/60 bg-white/50 p-1.5 shadow-lg shadow-neutro/40 backdrop-blur-md"
        role="tablist"
        aria-label="Elige la ubicación"
      >
        @for (opcion of opciones; track opcion.valor) {
          <button
            type="button"
            role="tab"
            [attr.aria-selected]="seleccion() === opcion.valor"
            (click)="cambiarSeleccion(opcion.valor)"
            class="inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 active:scale-95"
            [class]="
              seleccion() === opcion.valor
                ? 'bg-acento text-white shadow-md shadow-acento-claro'
                : 'text-tinta-suave hover:bg-acento-claro/50 hover:text-acento'
            "
          >
            <i class="pi text-xs" [class]="opcion.icono" aria-hidden="true"></i>
            {{ opcion.etiqueta }}
          </button>
        }
      </div>

      <div
        class="w-full overflow-hidden rounded-3xl border border-white/60 bg-white/50 text-center shadow-xl shadow-neutro/50 backdrop-blur-md"
      >
        <!-- Ambas imágenes apiladas: la activa se funde suavemente sobre la otra -->
        @if (imagenesFallidas().size < opciones.length) {
          <div class="relative aspect-video w-full">
            @for (opcion of opciones; track opcion.valor) {
              @if (!imagenesFallidas().has(opcion.valor)) {
                <img
                  [src]="config.ubicaciones[opcion.valor].imagenUrl"
                  [alt]="config.ubicaciones[opcion.valor].nombre"
                  loading="lazy"
                  (error)="marcarImagenFallida(opcion.valor)"
                  class="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out"
                  [class.opacity-0]="seleccion() !== opcion.valor"
                />
              }
            }
          </div>
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
  protected readonly config = INVITATION_CONFIG;

  protected readonly opciones: { etiqueta: string; valor: ClaveUbicacion; icono: string }[] = [
    { etiqueta: 'Ceremonia Religiosa', valor: 'misa', icono: 'pi-heart' },
    { etiqueta: 'Recepción', valor: 'recepcion', icono: 'pi-star' },
  ];

  protected readonly seleccion = signal<ClaveUbicacion>('misa');

  /** Oculta cada imagen cuyo archivo falte en src/assets/img/. */
  protected readonly imagenesFallidas = signal<ReadonlySet<ClaveUbicacion>>(new Set());

  protected readonly ubicacion = computed<Ubicacion>(
    () => this.config.ubicaciones[this.seleccion()],
  );

  /** Enlace universal de Waze: abre la app en móviles si está instalada. */
  protected readonly wazeUrl = computed(
    () => `https://waze.com/ul?q=${encodeURIComponent(this.ubicacion().direccion)}&navigate=yes`,
  );

  protected cambiarSeleccion(valor: ClaveUbicacion): void {
    this.seleccion.set(valor);
  }

  protected marcarImagenFallida(valor: ClaveUbicacion): void {
    this.imagenesFallidas.update((fallidas) => new Set(fallidas).add(valor));
  }
}
