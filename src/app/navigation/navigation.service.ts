import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private showNav = false;

  constructor() {
  }

  // Toggles the sidenav (close param allows forcing menu close)
  toggleNav(close = false): void {
    this.showNav = !(close || this.showNav);
  }

  // Returns whether or not the sidenav is currently showing
  isNavShown(): boolean {
    return this.showNav;
  }
}
