import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { INVITATION_CONFIG } from '../invitation-config';

@Component({
  selector: 'app-gifts',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="mx-auto max-w-md rounded-3xl border border-white/60 bg-white/40 p-8 text-center shadow-xl shadow-stone-200/50 backdrop-blur-md"
    >
      <i class="pi pi-gift mb-4 text-4xl text-rose-500" aria-hidden="true"></i>

      <h3 class="font-serif text-2xl text-stone-800">Mesa de Regalos</h3>
      <p class="mt-2 text-sm font-light text-stone-600">
        Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo, contamos con mesa
        de regalos en <span class="font-medium">{{ regalos.tienda }}</span>.
      </p>

      <!-- Código del evento con copiado rápido -->
      <div
        class="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white/60 px-5 py-3"
      >
        <div class="text-left">
          <p class="text-[10px] font-light tracking-widest text-stone-500 uppercase">
            Número de evento
          </p>
          <p class="font-serif text-xl font-semibold tracking-wider text-stone-800 tabular-nums">
            {{ regalos.codigo }}
          </p>
        </div>
        <button
          type="button"
          (click)="copiarCodigo()"
          aria-label="Copiar número de evento"
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-200 transition-all duration-300 hover:bg-rose-600 active:scale-95"
        >
          <i class="pi pi-copy" aria-hidden="true"></i>
        </button>
      </div>

      <a
        [href]="regalos.url"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-rose-300 bg-white/60 px-6 py-3 text-sm font-medium text-rose-600 transition-all duration-300 hover:bg-rose-500 hover:text-white"
      >
        <i class="pi pi-external-link" aria-hidden="true"></i>
        Ver mesa de regalos
      </a>
    </div>
  `,
})
export class GiftsComponent {
  protected readonly regalos = INVITATION_CONFIG.mesaRegalos;
  private readonly messageService = inject(MessageService);

  protected async copiarCodigo(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.regalos.codigo);
      this.messageService.add({
        severity: 'success',
        summary: '¡Código copiado con éxito!',
        detail: `Pégalo en la búsqueda de ${this.regalos.tienda}.`,
        life: 3000,
      });
    } catch {
      this.messageService.add({
        severity: 'warn',
        summary: 'No se pudo copiar',
        detail: `Anota el número de evento: ${this.regalos.codigo}`,
        life: 4000,
      });
    }
  }
}
