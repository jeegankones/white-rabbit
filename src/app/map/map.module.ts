import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapPage } from './map.page';

import { MapPageRoutingModule } from './map-routing.module';
import {GoogleMapsModule} from '@angular/google-maps';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GoogleMapsModule,
    MapPageRoutingModule
  ],
  declarations: [MapPage]
})
export class MapPageModule {}