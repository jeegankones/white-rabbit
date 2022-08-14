import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'wr-account-tab',
  templateUrl: 'account-tab.page.html',
  styleUrls: ['account-tab.page.scss']
})
export class AccountTabPage {

  constructor(private loadingController: LoadingController,
              private authService: AuthService) {}

  signOut() {
    this.authService.signOut();
  }

}
