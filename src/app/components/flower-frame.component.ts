import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IntroService } from '../services/intro.service';

/**
 * Marco floral fijo (arriba y abajo) que permanece en pantalla aunque el
 * usuario haga scroll, en vez de desplazarse junto con el hero. Al hacer
 * scroll, ambos marcos se recortan a la mitad hacia el centro (arriba pierde
 * su mitad superior, abajo pierde su mitad inferior) y recuperan su tamaño
 * completo al regresar arriba.
 */
@Component({
  selector: 'app-flower-frame',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      src="assets/img/FondoSuperiorBlanco.png"
      alt=""
      aria-hidden="true"
      class="marco-superior pointer-events-none fixed inset-x-0 top-0 z-30 max-h-[28.8svh] w-full select-none object-cover object-top [mask-image:linear-gradient(to_bottom,black_65%,transparent)]"
      [class.marco-superior--recortado]="intro.desplazado()"
    />
    <img
      src="assets/img/FondoInferiorBlanco.png"
      alt=""
      aria-hidden="true"
      class="marco-inferior pointer-events-none fixed inset-x-0 bottom-0 z-30 max-h-[28.8svh] w-full select-none object-cover object-bottom [mask-image:linear-gradient(to_top,black_65%,transparent)]"
      [class.marco-inferior--recortado]="intro.desplazado()"
    />
  `,
})
export class FlowerFrameComponent {
  protected readonly intro = inject(IntroService);
}
