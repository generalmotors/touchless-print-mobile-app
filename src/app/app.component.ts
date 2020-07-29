import { Component } from '@angular/core';
import { NavigationService } from './navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public navService: NavigationService) {}

  get showNav(): boolean {
    return this.navService.isNavShown();
  }
}
