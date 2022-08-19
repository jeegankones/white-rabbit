import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTabPage } from './account-tab.page';
import { AccountResolver } from './account.resolver';

const routes: Routes = [
  {
    path: '',
    component: AccountTabPage,
    resolve: {
      account: AccountResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountTabPageRoutingModule {}
