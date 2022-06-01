import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapTabPage } from './map-tab.page';

import { MapTabPageRoutingModule } from './map-tab-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GoogleMapsModule,
    MapTabPageRoutingModule
  ],
  declarations: [MapTabPage, MapComponent]
})
export class MapTabPageModule {}
