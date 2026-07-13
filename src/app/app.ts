import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { HeroComponent } from './components/hero.component';
import { AudioPlayerComponent } from './components/audio-player.component';
import { CountdownComponent } from './components/countdown.component';
import { FamilyComponent } from './components/family.component';
import { LocationsComponent } from './components/locations.component';
import { DressCodeComponent } from './components/dress-code.component';
import { GiftsComponent } from './components/gifts.component';
import { RsvpComponent } from './components/rsvp.component';
import { ThemeTogglerComponent } from './components/theme-toggler.component';
import { RevealOnScrollDirective } from './directives/reveal-on-scroll.directive';
import { ThemeService } from './services/theme.service';
import { INVITATION_CONFIG } from './invitation-config';

@Component({
  selector: 'app-root',
  imports: [
    ToastModule,
    HeroComponent,
    AudioPlayerComponent,
    CountdownComponent,
    FamilyComponent,
    LocationsComponent,
    DressCodeComponent,
    GiftsComponent,
    RsvpComponent,
    ThemeTogglerComponent,
    RevealOnScrollDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly config = INVITATION_CONFIG;
  protected readonly clasesTema = inject(ThemeService).clases;
}
