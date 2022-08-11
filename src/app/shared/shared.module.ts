import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map/map.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    GoogleMapsModule,
  ],
  declarations: [MapComponent],
  exports: [MapComponent]
})
export class SharedModule { }
