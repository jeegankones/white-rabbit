import { ErrorHandler, Injectable } from '@angular/core';
import { AUTH_ERROR_CODES_MAP } from '../auth-error-codes';
import { AuthService } from '../../services/auth.service';
import { AlertController, AlertOptions } from '@ionic/angular';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  defaultAlert: AlertOptions = {
    header: 'Sorry',
    message: 'Something went wrong. Please try again.',
    buttons: ['OK']
  };

  constructor(private authService: AuthService, private alertController: AlertController) {
  }

  handleError(error: any) {
    if (Object.values(AUTH_ERROR_CODES_MAP).includes(error.rejection?.code)) {
      switch (error.rejection.code) {
        case AUTH_ERROR_CODES_MAP.credentialTooOldLoginAgain:
          this.showAlert({
            header: 'Sorry',
            message: 'Please sign in again.',
            buttons: [{
              text: 'OK',
              handler: () => {
                this.authService.signOut();
              }
            }],
            backdropDismiss: false
          });
          break;
        case AUTH_ERROR_CODES_MAP.invalidPassword:
        case AUTH_ERROR_CODES_MAP.userDeleted:
          this.showAlert({
            header: 'Sorry',
            message: 'Username or password is incorrect.',
            buttons: ['OK'],
          });
          break;
        default:
          this.showAlert();
      }
      return;
    }

    console.error(error);
  }

  showAlert(options?: AlertOptions) {
    this.alertController.create(options ?? this.defaultAlert)
      .then((alert) => {
        alert.present();
      });
  }
}
