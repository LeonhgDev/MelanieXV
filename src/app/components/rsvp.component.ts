import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { INVITATION_CONFIG } from '../invitation-config';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [FormsModule, InputTextModule, SelectModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="mx-auto max-w-md rounded-3xl border border-white/60 bg-white/40 p-8 shadow-xl shadow-stone-200/50 backdrop-blur-md ocean:border-slate-200/60 ocean:bg-white/50 ocean:shadow-slate-200/50"
    >
      <div class="text-center">
        <i class="pi pi-envelope mb-4 text-3xl text-rose-500 ocean:text-blue-500" aria-hidden="true"></i>
        <h3 class="font-serif text-2xl text-stone-800 ocean:text-slate-900">Confirma tu asistencia</h3>
        <p class="mt-2 text-sm font-light text-stone-600 ocean:text-slate-600">
          Por favor confirma antes del gran día. ¡Queremos celebrar contigo!
        </p>
      </div>

      <form class="mt-6 flex flex-col gap-4" (submit)="$event.preventDefault(); confirmar()">
        <div class="flex flex-col gap-1">
          <label for="nombre" class="text-xs font-medium tracking-wide text-stone-600 uppercase ocean:text-slate-600">
            Tu nombre completo
          </label>
          <input
            pInputText
            id="nombre"
            name="nombre"
            type="text"
            autocomplete="name"
            placeholder="Ej. Familia García López"
            [ngModel]="nombre()"
            (ngModelChange)="nombre.set($event)"
            class="w-full"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="pases" class="text-xs font-medium tracking-wide text-stone-600 uppercase ocean:text-slate-600">
            Número de lugares
          </label>
          <p-select
            inputId="pases"
            name="pases"
            [options]="opcionesPases"
            optionLabel="etiqueta"
            optionValue="valor"
            placeholder="Selecciona tus pases"
            [ngModel]="pases()"
            (ngModelChange)="pases.set($event)"
            styleClass="w-full"
            appendTo="body"
          />
        </div>

        <p-button
          type="submit"
          label="Confirmar asistencia"
          icon="pi pi-whatsapp"
          severity="success"
          [disabled]="!formularioValido()"
          styleClass="w-full !rounded-full"
        />
      </form>

      <div class="my-6 flex items-center gap-3">
        <span class="h-px flex-1 bg-stone-200 ocean:bg-slate-200"></span>
        <span class="text-xs font-light text-stone-400 ocean:text-slate-400">o</span>
        <span class="h-px flex-1 bg-stone-200 ocean:bg-slate-200"></span>
      </div>

      <p-button
        label="Enviar mensaje de felicitación"
        icon="pi pi-heart"
        [outlined]="true"
        severity="secondary"
        (onClick)="felicitar()"
        styleClass="w-full !rounded-full"
      />
    </div>
  `,
})
export class RsvpComponent {
  private readonly config = INVITATION_CONFIG;
  private readonly messageService = inject(MessageService);

  protected readonly nombre = signal('');
  protected readonly pases = signal<number | null>(null);

  protected readonly opcionesPases = Array.from(
    { length: this.config.pasesMaximosPorInvitado },
    (_, i) => ({
      etiqueta: `${i + 1} ${i === 0 ? 'lugar' : 'lugares'}`,
      valor: i + 1,
    }),
  );

  protected readonly formularioValido = computed(
    () => this.nombre().trim().length > 2 && this.pases() !== null,
  );

  protected confirmar(): void {
    if (!this.formularioValido()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Faltan datos',
        detail: 'Escribe tu nombre y selecciona el número de lugares.',
        life: 3000,
      });
      return;
    }

    const mensaje =
      `¡Hola! Confirmo mi asistencia a los *XV Años de ${this.config.nombreQuinceanera}*.\n` +
      `*Nombre:* ${this.nombre().trim()}\n` +
      `*Lugares confirmados:* ${this.pases()}`;

    this.abrirWhatsapp(this.config.whatsappConfirmacion, mensaje);
  }

  protected felicitar(): void {
    const mensaje = `¡Hola! Quiero enviar un mensaje de felicitación a *${this.config.nombreQuinceanera}* por sus XV Años: \n`;
    this.abrirWhatsapp(this.config.whatsappFelicitaciones, mensaje);
  }

  /** Abre el chat de WhatsApp (app en móviles, WhatsApp Web en escritorio). */
  private abrirWhatsapp(telefono: string, mensaje: string): void {
    const url = `https://wa.me/${this.config.codigoPaisWhatsapp}${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener');
  }
}
