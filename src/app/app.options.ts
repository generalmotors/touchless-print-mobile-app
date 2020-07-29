import { NgxConfigureOptions } from 'ngx-configure';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AppOptions extends NgxConfigureOptions {
  ConfigurationURL = `assets/config/${environment.state}.json`;
  BustCache = true;
}
