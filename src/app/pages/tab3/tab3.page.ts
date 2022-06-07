import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wr-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private loadingController: LoadingController,
              private authService: AuthService,
              private router: Router,
              private alertController: AlertController) {}

  async signOut() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.signOut().then(
      (res) => {
        loading.dismiss();
        this.router.navigateByUrl('/login');
      },
      async (err) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: ':(',
          message: err.message,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

}
