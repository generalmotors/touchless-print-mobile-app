import {Component} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent {
  isSupported = true;

  constructor(private deviceService: DeviceDetectorService) {
    this.checkSupported();
  }

  // Checks if the users browser is supported
  checkSupported() {
    try {
      // Only allow Safari on iOS and Chrome on Android
      // Some browsers do not support camera access which is necessary for scanning the QR Code
      const devInfo = this.deviceService.getDeviceInfo();
      this.isSupported = (devInfo.browser === 'Safari' && devInfo.os === 'iOS') ||
        (devInfo.browser === 'Chrome' && devInfo.os === 'Android');
    } catch (e) {
      this.isSupported = false;
    }
  }
}
