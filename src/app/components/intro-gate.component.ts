import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IntroService } from '../services/intro.service';

/**
 * Efecto de bienvenida: dos portones (PuertaI.png / Puertad.png) que cubren
 * la pantalla al cargar y giran hacia afuera, como una bisagra, para revelar
 * la invitación. El momento de apertura lo marca IntroService.
 */
@Component({
  selector: 'app-intro-gate',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (intro.portonesVisibles()) {
      <div class="fixed inset-0 z-[100] flex overflow-hidden [perspective:1600px]" aria-hidden="true">
        <img
          src="assets/img/PuertaI.png"
          alt=""
          class="puerta-hoja puerta-hoja--izquierda h-full w-1/2 object-contain object-right"
          [class.puerta-hoja--abierta-izquierda]="intro.abriendo()"
        />
        <img
          src="assets/img/Puertad.png"
          alt=""
          class="puerta-hoja puerta-hoja--derecha h-full w-1/2 object-contain object-left"
          [class.puerta-hoja--abierta-derecha]="intro.abriendo()"
        />
      </div>
    }
  `,
})
export class IntroGateComponent {
  protected readonly intro = inject(IntroService);
}
