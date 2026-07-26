import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, effect, inject, signal } from '@angular/core';
import { IntroService } from '../services/intro.service';

const DURACION_MIN_S = 6;
const DURACION_MAX_S = 11;
const DURACION_SALIDA_S = 9;

export interface PosicionMariposa {
  readonly x: number;
  readonly y: number;
}

/**
 * Una mariposa: empieza posada en `posicionInicial` (sobre las flores del
 * marco inferior) y, en cuanto IntroService marca que los portones se están
 * abriendo, si `saleVolando` es true se va volando fuera de pantalla y
 * desaparece; si no, se queda vagando al azar por la página.
 */
@Component({
  selector: 'app-butterfly',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <div
        class="mariposa pointer-events-none fixed z-40"
        [style.left.vw]="x()"
        [style.top.vh]="y()"
        [style.transform]="'translate(-50%, -50%) rotate(' + angulo() + 'deg)'"
        [style.--vuelo-duracion]="duracion() + 's'"
        aria-hidden="true"
      >
        <img
          src="assets/img/Butterfly.png"
          alt=""
          class="block h-12 w-12 drop-shadow-sm select-none sm:h-[3.75rem] sm:w-[3.75rem]"
          [class.mariposa-aleteo]="volando()"
        />
      </div>
    }
  `,
})
export class ButterflyComponent implements OnInit, OnDestroy {
  @Input({ required: true }) posicionInicial!: PosicionMariposa;
  @Input() saleVolando = false;

  private readonly intro = inject(IntroService);
  private readonly reduccionMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  protected readonly x = signal(0);
  protected readonly y = signal(0);
  protected readonly angulo = signal(0);
  protected readonly duracion = signal(DURACION_MIN_S);
  protected readonly volando = signal(false);
  protected readonly visible = signal(true);

  private temporizador?: ReturnType<typeof setTimeout>;
  private empezoAVolar = false;

  constructor() {
    effect(() => {
      if (this.intro.abriendo() && !this.empezoAVolar) {
        this.empezoAVolar = true;
        this.iniciarVuelo();
      }
    });
  }

  ngOnInit(): void {
    this.x.set(this.posicionInicial.x);
    this.y.set(this.posicionInicial.y);
  }

  ngOnDestroy(): void {
    clearTimeout(this.temporizador);
  }

  private iniciarVuelo(): void {
    if (this.reduccionMovimiento) {
      if (this.saleVolando) this.visible.set(false);
      return;
    }

    this.volando.set(true);

    if (this.saleVolando) {
      this.duracion.set(DURACION_SALIDA_S);
      this.angulo.set(this.posicionAleatoria(-15, 15));
      this.x.set(this.posicionAleatoria(-10, 110));
      this.y.set(-25);
      this.temporizador = setTimeout(() => this.visible.set(false), DURACION_SALIDA_S * 1000);
      return;
    }

    this.volarASiguientePunto();
  }

  private volarASiguientePunto(): void {
    const xAnterior = this.x();
    const nuevoX = this.posicionAleatoria(8, 88);
    const nuevoY = this.posicionAleatoria(12, 82);
    const duracionSegundos = DURACION_MIN_S + Math.random() * (DURACION_MAX_S - DURACION_MIN_S);

    this.angulo.set(Math.max(-20, Math.min(20, (nuevoX - xAnterior) * 0.6)));
    this.duracion.set(duracionSegundos);
    this.x.set(nuevoX);
    this.y.set(nuevoY);

    this.temporizador = setTimeout(() => this.volarASiguientePunto(), duracionSegundos * 1000);
  }

  private posicionAleatoria(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }
}
