import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationPage } from './location.page';
import { LocationResolver } from '../../resolvers/location.resolver';
import { UserResolver } from '../../resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: LocationPage,
    resolve: {
      location: LocationResolver,
      user: UserResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationPageRoutingModule {}
