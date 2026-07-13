import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { INVITATION_CONFIG } from '../invitation-config';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      (click)="alternar()"
      [attr.aria-label]="reproduciendo() ? 'Pausar música' : 'Reproducir música'"
      class="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-white/40 shadow-xl shadow-stone-200/50 backdrop-blur-md transition-transform duration-300 hover:scale-110 active:scale-95 ocean:border-slate-200/60 ocean:bg-white/50 ocean:shadow-slate-200/50"
    >
      <!-- Ondas de sonido de fondo cuando la música está activa -->
      @if (reproduciendo()) {
        <span class="absolute inset-0 flex items-center justify-center gap-[3px]" aria-hidden="true">
          @for (retraso of ondas; track $index) {
            <span
              class="animate-sound-wave h-6 w-[3px] rounded-full bg-rose-300/70 ocean:bg-blue-300/70"
              [style.animation-delay]="retraso"
            ></span>
          }
        </span>
      }
      <i
        class="pi relative text-lg text-rose-600 ocean:text-blue-600"
        [class.pi-pause]="reproduciendo()"
        [class.pi-play]="!reproduciendo()"
        aria-hidden="true"
      ></i>
    </button>
  `,
})
export class AudioPlayerComponent implements OnDestroy {
  protected readonly reproduciendo = signal(false);
  protected readonly ondas = ['0ms', '150ms', '300ms', '450ms', '600ms'];

  private audio?: HTMLAudioElement;

  protected alternar(): void {
    if (!this.audio) {
      this.audio = new Audio(INVITATION_CONFIG.musicaUrl);
      this.audio.loop = true;
      this.audio.addEventListener('pause', () => this.reproduciendo.set(false));
      this.audio.addEventListener('play', () => this.reproduciendo.set(true));
    }

    if (this.audio.paused) {
      // play() devuelve una promesa que puede rechazarse por políticas de
      // autoplay o por archivo faltante: se ignora en silencio.
      this.audio.play().catch(() => this.reproduciendo.set(false));
    } else {
      this.audio.pause();
    }
  }

  ngOnDestroy(): void {
    this.audio?.pause();
    this.audio = undefined;
  }
}
