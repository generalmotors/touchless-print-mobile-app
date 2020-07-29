import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  HashLocationStrategy,
  Location,
  LocationStrategy,
} from '@angular/common';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxConfigureOptions, NgxConfigureModule } from 'ngx-configure';
import { AppOptions } from './app.options';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NavigationComponent } from './navigation/navigation.component';
import { MainComponent } from './main/main.component';
import { SelectRegionComponent } from './select-region/select-region.component';
import { AlertsComponent } from './alerts/alerts.component';
import { NavigationService } from './navigation/navigation.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainComponent,
    SelectRegionComponent,
    AlertsComponent,
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({ prefix: 'touchless-print' }),
    NgxConfigureModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    AppRoutingModule,
    ZXingScannerModule,
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NgxConfigureOptions, useClass: AppOptions },
    NavigationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
