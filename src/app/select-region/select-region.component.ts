import {Component} from '@angular/core';
import {LocalStorage} from 'ngx-webstorage';
import {NgxConfigureService} from 'ngx-configure';
import {Router} from '@angular/router';

@Component({
  selector: 'app-select-region',
  templateUrl: './select-region.component.html',
  styleUrls: ['./select-region.component.scss'],
})
export class SelectRegionComponent {
  @LocalStorage()
  public region;

  public availableRegions;

  constructor(public configService: NgxConfigureService, private router: Router) {
    try {
      // Gets the active regions from the configuration json file depending on environment
      let keys = Object.keys(configService.config);
      keys = keys.filter(x => configService.config[x].active);
      this.availableRegions = keys;
    } catch (e) {
      console.log('Error getting region config');
    }
  }

  // Set the region according to selection, delay slightly then navigates to scanner
  setRegion(regionSelection: string): void {
    if (regionSelection && regionSelection.length > 0) {
      this.region = regionSelection;
      setTimeout(() => {
          this.router.navigate(['/main']);
        }
        , 500);
    }
  }
}
