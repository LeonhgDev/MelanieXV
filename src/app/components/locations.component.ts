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
        (ngModelChange)="seleccion.set($event)"
        [allowEmpty]="false"
        optionLabel="etiqueta"
        optionValue="valor"
        size="small"
      />

      <div
        class="w-full rounded-3xl border border-white/60 bg-white/40 p-8 text-center shadow-xl shadow-stone-200/50 backdrop-blur-md"
      >
        <i
          class="pi mb-4 text-3xl text-rose-500"
          [class.pi-heart]="seleccion() === 'misa'"
          [class.pi-star]="seleccion() === 'recepcion'"
          aria-hidden="true"
        ></i>

        <h3 class="font-serif text-2xl text-stone-800">{{ ubicacion().nombre }}</h3>

        <p class="mt-2 text-lg font-medium text-rose-600">
          <i class="pi pi-clock mr-1 text-sm" aria-hidden="true"></i>{{ ubicacion().hora }}
        </p>

        <p class="mt-3 text-sm leading-relaxed font-light text-stone-600">
          {{ ubicacion().direccion }}
        </p>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            [href]="ubicacion().mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-rose-200 transition-all duration-300 hover:bg-rose-600 hover:shadow-xl"
          >
            <i class="pi pi-map-marker" aria-hidden="true"></i>
            Google Maps
          </a>
          <a
            [href]="wazeUrl()"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/60 px-6 py-3 text-sm font-medium text-stone-700 transition-all duration-300 hover:border-rose-300 hover:text-rose-600"
          >
            <i class="pi pi-compass" aria-hidden="true"></i>
            Waze
          </a>
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

  protected readonly ubicacion = computed<Ubicacion>(
    () => this.config.ubicaciones[this.seleccion()],
  );

  /** Enlace universal de Waze: abre la app en móviles si está instalada. */
  protected readonly wazeUrl = computed(
    () => `https://waze.com/ul?q=${encodeURIComponent(this.ubicacion().direccion)}&navigate=yes`,
  );
}
