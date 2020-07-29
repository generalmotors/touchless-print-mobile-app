import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorage} from 'ngx-webstorage';
import {NgxConfigureService} from 'ngx-configure';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  hasCameras: boolean;
  hasPermission: boolean;

  loading = false;
  isSupported = false;

  @LocalStorage()
  public region: string;

  constructor(
    router: Router,
    public configService: NgxConfigureService,
    private deviceService: DeviceDetectorService
  ) {
    try {
      // Routes to region selection if it has not already been set
      if (
        !this.region ||
        this.region.length <= 0 ||
        !configService.config[this.region].active
      ) {
        router.navigate(['/select-region']);
      }
      this.checkSupported();
    } catch (e) {
      router.navigate(['/select-region']);
    }
  }

  // Checks if the device has a camera available
  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.hasCameras = Boolean(devices && devices.length);
  }

  // Checks if the user granted camera permission
  onHasPermission(hasCameraPermission: boolean): void {
    this.hasPermission = hasCameraPermission;
  }

  // Checks if the users browser is supported
  checkSupported(): void {
    try {
      // Only allow Safari on iOS and Chrome on Android
      // Some browsers do not support camera access which is necessary for scanning the QR Code
      const devInfo = this.deviceService.getDeviceInfo();
      if (
        (devInfo.browser === 'Safari' && devInfo.os === 'iOS') ||
        (devInfo.browser === 'Chrome' && devInfo.os === 'Android')
      ) {
        this.isSupported = true;
      }
    } catch (e) {
      this.isSupported = false;
    }
  }

  // Route to the correct HPAC location based on their region settings for releasing documents to the printer
  scanSuccessHandler(event): void {
    if (this.ValidateIPaddress(event)) {
      this.loading = true;
      (window as any).location.assign(
        `${this.configService.config[this.region].url}?ip=${event}`
      );
    }
  }

  // Validate that an IP address was scanned from the QR Code
  ValidateIPaddress(ipaddress): boolean {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipaddress
      )
    ) {
      return true;
    }
    alert('Invalid QR code scanned. Try again.');
    return false;
  }
}
