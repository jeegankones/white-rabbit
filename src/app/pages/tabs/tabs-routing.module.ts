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
        loadChildren: () => import('./map-tab/map-tab.module').then(m => m.MapTabPageModule),
      },
      {
        path: 'map/location/:id',
        loadChildren: () => import('../location/location.module').then(m => m.LocationPageModule),
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
