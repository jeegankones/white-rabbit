import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapTabPage } from './map-tab.page';

import { MapTabPageRoutingModule } from './map-tab-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    FormsModule,
    GoogleMapsModule,
    MapTabPageRoutingModule,
  ],
  declarations: [MapTabPage]
})
export class MapTabPageModule {}
