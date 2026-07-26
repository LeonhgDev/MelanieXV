import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButterflyComponent, PosicionMariposa } from './butterfly.component';

interface MariposaPosada {
  readonly posicion: PosicionMariposa;
  readonly saleVolando: boolean;
}

/** Seis mariposas posadas sobre las flores del marco inferior; tres se van volando al abrir los portones y tres se quedan vagando. */
const MARIPOSAS: readonly MariposaPosada[] = [
  { posicion: { x: 8, y: 93 }, saleVolando: true },
  { posicion: { x: 22, y: 90 }, saleVolando: false },
  { posicion: { x: 38, y: 94 }, saleVolando: true },
  { posicion: { x: 62, y: 94 }, saleVolando: false },
  { posicion: { x: 78, y: 90 }, saleVolando: true },
  { posicion: { x: 92, y: 93 }, saleVolando: false },
];

@Component({
  selector: 'app-butterfly-flock',
  standalone: true,
  imports: [ButterflyComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (mariposa of mariposas; track $index) {
      <app-butterfly [posicionInicial]="mariposa.posicion" [saleVolando]="mariposa.saleVolando" />
    }
  `,
})
export class ButterflyFlockComponent {
  protected readonly mariposas = MARIPOSAS;
}
