import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountTabPage } from './account-tab.page';

import { AccountTabPageRoutingModule } from './account-tab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AccountTabPage }]),
    AccountTabPageRoutingModule,
  ],
  declarations: [AccountTabPage]
})
export class AccountTabPageModule {}
