import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { INVITATION_CONFIG } from '../invitation-config';

@Component({
  selector: 'app-family',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto flex max-w-md flex-col items-center gap-10 text-center">
      @for (grupo of familia.grupos; track grupo.titulo) {
        <div class="flex flex-col items-center gap-3">
          <h3 class="font-script text-4xl text-acento">{{ grupo.titulo }}</h3>
          @for (nombre of grupo.nombres; track nombre; let ultimo = $last) {
            <p
              class="text-2xl tracking-wide"
              [style.color]="tema.colorNombres().css"
              [style.font-family]="tema.fuenteNombres().familia"
            >
              {{ nombre }}
            </p>
            @if (!ultimo) {
              <span class="font-script text-2xl text-acento-suave" aria-hidden="true">&amp;</span>
            }
          }
        </div>
      }

      <div class="flex items-center gap-4">
        <span class="h-px w-12 bg-acento-suave"></span>
        <p class="font-serif text-xl text-tinta-suave italic">{{ familia.fraseCierre }}</p>
        <span class="h-px w-12 bg-acento-suave"></span>
      </div>
    </div>
  `,
})
export class FamilyComponent {
  protected readonly familia = INVITATION_CONFIG.familia;
  protected readonly tema = inject(ThemeService);
}
