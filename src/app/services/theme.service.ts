import { Injectable, signal } from '@angular/core';

export type Tema = 'romantic-rose' | 'ocean-blue';

/**
 * Estado global del tema visual. La clase del tema activo se inyecta en el
 * contenedor raíz (app.html) y las utilidades `ocean:*` de Tailwind
 * (definidas en styles.css) reaccionan a ella en todos los componentes.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly temaActual = signal<Tema>('ocean-blue');

  alternar(): void {
    this.temaActual.update((tema) => (tema === 'ocean-blue' ? 'romantic-rose' : 'ocean-blue'));
  }
}
