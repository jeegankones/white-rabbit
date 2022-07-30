import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'wr-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private loadingController: LoadingController,
              private authService: AuthService) {}

  signOut() {
    this.authService.signOut();
  }

}
