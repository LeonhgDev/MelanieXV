import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { HeroComponent } from './components/hero.component';
import { AudioPlayerComponent } from './components/audio-player.component';
import { CountdownComponent } from './components/countdown.component';
import { LocationsComponent } from './components/locations.component';
import { DressCodeComponent } from './components/dress-code.component';
import { GiftsComponent } from './components/gifts.component';
import { RsvpComponent } from './components/rsvp.component';
import { RevealOnScrollDirective } from './directives/reveal-on-scroll.directive';
import { INVITATION_CONFIG } from './invitation-config';

@Component({
  selector: 'app-root',
  imports: [
    ToastModule,
    HeroComponent,
    AudioPlayerComponent,
    CountdownComponent,
    LocationsComponent,
    DressCodeComponent,
    GiftsComponent,
    RsvpComponent,
    RevealOnScrollDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly config = INVITATION_CONFIG;
}
