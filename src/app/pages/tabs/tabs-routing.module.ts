import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { AccessGuard } from '../../guards/access.guard';
import { redirectUnauthorizedToLogin } from '../../app-routing.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AngularFireAuthGuard],
    canActivateChild: [AccessGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    },
    children: [
      {
        path: 'map',
        loadChildren: () => import('../map-tab/map-tab.module').then(m => m.MapTabPageModule),
      },
      {
        path: 'map/location/:id',
        loadChildren: () => import('../location/location.module').then(m => m.LocationPageModule),
      },
      {
        path: 'account',
        loadChildren: () => import('../account-tab/account-tab.module').then(m => m.AccountTabPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
