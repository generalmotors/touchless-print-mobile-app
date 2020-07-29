import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {NavigationService} from './navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {

  constructor(router: Router, public navService: NavigationService) {
    // On navigation change, close the sidenav
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.toggleNav(true);
      }
    });
  }

  // Get nav status from the service
  get showNav(): boolean {
    return this.navService.isNavShown();
  }

  // Toggles the navigation in the service
  toggleNav(close = false): void {
    this.navService.toggleNav(close);
  }
}
