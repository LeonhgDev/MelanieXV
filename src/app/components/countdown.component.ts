import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { INVITATION_CONFIG } from '../invitation-config';

interface TiempoRestante {
  dias: string;
  horas: string;
  minutos: string;
  segundos: string;
  finalizado: boolean;
}

@Component({
  selector: 'app-countdown',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto grid max-w-md grid-cols-4 gap-3 sm:gap-4">
      @for (bloque of bloques(); track bloque.etiqueta) {
        <div
          class="flex flex-col items-center justify-center rounded-3xl border border-white/60 bg-white/40 py-4 shadow-xl shadow-stone-200/50 backdrop-blur-md ocean:border-slate-200/60 ocean:bg-white/50 ocean:shadow-slate-200/50"
          [class.animate-pulse]="bloque.pulso"
        >
          <span
            class="font-serif text-3xl font-semibold tabular-nums sm:text-4xl"
            [class]="
              bloque.pulso
                ? 'text-rose-500 ocean:text-blue-500'
                : 'text-rose-600 ocean:text-blue-600'
            "
          >
            {{ bloque.valor }}
          </span>
          <span class="mt-1 text-[10px] font-light tracking-widest text-stone-500 uppercase ocean:text-slate-500 sm:text-xs">
            {{ bloque.etiqueta }}
          </span>
        </div>
      }
    </div>

    @if (restante().finalizado) {
      <p class="mt-6 text-center font-serif text-xl text-rose-600 italic ocean:text-blue-600">
        ¡El gran día llegó!
      </p>
    }
  `,
})
export class CountdownComponent implements OnInit, OnDestroy {
  private readonly fechaEvento = INVITATION_CONFIG.fechaEvento.getTime();
  private readonly ahora = signal(Date.now());
  private intervalo?: ReturnType<typeof setInterval>;

  protected readonly restante = computed<TiempoRestante>(() => {
    const diferencia = this.fechaEvento - this.ahora();
    if (diferencia <= 0) {
      return { dias: '00', horas: '00', minutos: '00', segundos: '00', finalizado: true };
    }
    const segundosTotales = Math.floor(diferencia / 1000);
    const pad = (n: number) => String(n).padStart(2, '0');
    return {
      dias: String(Math.floor(segundosTotales / 86400)),
      horas: pad(Math.floor((segundosTotales % 86400) / 3600)),
      minutos: pad(Math.floor((segundosTotales % 3600) / 60)),
      segundos: pad(segundosTotales % 60),
      finalizado: false,
    };
  });

  protected readonly bloques = computed(() => {
    const r = this.restante();
    return [
      { etiqueta: 'Días', valor: r.dias, pulso: false },
      { etiqueta: 'Horas', valor: r.horas, pulso: false },
      { etiqueta: 'Min', valor: r.minutos, pulso: false },
      { etiqueta: 'Seg', valor: r.segundos, pulso: !r.finalizado },
    ];
  });

  ngOnInit(): void {
    this.intervalo = setInterval(() => this.ahora.set(Date.now()), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }
}
