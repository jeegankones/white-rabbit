import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapTabPage } from './map-tab.page';
import { LocationsResolver } from '../../resolvers/locations.resolver';
import { UserResolver } from '../../resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: MapTabPage,
    resolve: {
      locations: LocationsResolver,
      user: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapTabPageRoutingModule {}
