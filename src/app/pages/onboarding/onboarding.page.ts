import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AUTH_ERROR_CODES_MAP } from '../../shared/auth-error-codes';

@Component({
  selector: 'wr-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  @ViewChild('slides') slides: HTMLIonSlidesElement;
  config = {
    allowTouchMove: false,
    pagination: {
      el: '.swiper-pagination',
    },
  };
  verificationButtonDisabled = false;
  continueButtonDisabled = false;
  swiperAnimating = false;
  passwordForm: UntypedFormGroup;
  usernameForm: UntypedFormGroup;
  firstLastNameForm: UntypedFormGroup;
  currentUser: firebase.default.User;

  constructor(private authService: AuthService,
              private afAuth: AngularFireAuth,
              private afStore: AngularFirestore,
              private router: Router,
              private formBuilder: UntypedFormBuilder,
              private alertController: AlertController) {
  }

  // Access for form fields
  get password() {
    return this.passwordForm.get('password');
  }

  get confirm() {
    return this.passwordForm.get('confirm');
  }

  get username() {
    return this.usernameForm.get('username');
  }

  get firstName() {
    return this.firstLastNameForm.get('firstName');
  }

  get lastName() {
    return this.firstLastNameForm.get('lastName');
  }

  async ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['']
    }, {validators: this.checkPasswords});

    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });

    this.firstLastNameForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });

    this.currentUser = await this.afAuth.currentUser;
    if (this.currentUser.emailVerified) {
      this.nextSlide();
    } else {
      this.currentUser.sendEmailVerification();
    }
  }

  nextSlide() {
    this.slides.slideNext();
  }

  async verifyEmail() {
    this.continueButtonDisabled = true;
    await this.currentUser.reload();
    if (this.currentUser.emailVerified) {
      this.nextSlide();
      this.continueButtonDisabled = false;
      return;
    }
    this.continueButtonDisabled = false;
    const alert = await this.alertController.create({
      header: 'Sorry',
      message: `This user's email has not been verified.`,
      buttons: ['OK']
    });
    await alert.present();
  }

  async sendVerificationEmail() {
    try {
      this.verificationButtonDisabled = true;
      await this.currentUser.sendEmailVerification();
      this.verificationButtonDisabled = false;
    } catch (error) {
      this.verificationButtonDisabled = false;
      throw new Error(error);
    }
  }

  async setNewPassword() {
    try {
      this.continueButtonDisabled = true;
      await this.currentUser.reload();
      await this.currentUser.updatePassword(this.passwordForm.get('confirm').value);
      this.nextSlide();
      this.continueButtonDisabled = false;
    } catch (error) {
      if (error.code === AUTH_ERROR_CODES_MAP.credentialTooOldLoginAgain) {
        const alert = await this.alertController.create({
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
        await alert.present();
        this.continueButtonDisabled = false;
      }
      else {
        this.continueButtonDisabled = false;
        throw new Error(error);
      }
    }
  }

  async setUsername() {
    try {
      this.continueButtonDisabled = true;
      await this.currentUser.updateProfile({displayName: this.username.value});
      await this.afStore.doc(`/users/${this.currentUser.uid}`).update({displayName: this.username.value, completedOnboarding: true});
      const alert = await this.alertController.create({
        header: 'Success',
        message: `We've saved your information. Welcome to White Rabbit.`,
        buttons: ['Proceed']
      });
      await alert.present();
      await alert.onDidDismiss();
      // TODO Bugfix: router.navigate does not work
      window.location.href = '/';
    } catch (error) {
      this.continueButtonDisabled = false;
      throw new Error(error);
    }
  }

  async setFirstLast() {
    try {
      this.continueButtonDisabled = true;
      await this.afStore.doc(`/users/${this.currentUser.uid}`).set({
        firstName: this.firstName.value,
        lastName: this.lastName.value
      });
      this.nextSlide();
      this.continueButtonDisabled = false;
    } catch (error) {
      this.continueButtonDisabled = false;
      throw new Error(error);
    }
  }

  checkPasswords: ValidatorFn = (group):  ValidationErrors | null => {
    const pass = group.get('password');
    const confirmPass = group.get('confirm');
    if (pass.value === confirmPass.value) {
      confirmPass.setErrors(null);
      return null;
    }
    const error = {notSame: true};
    confirmPass.setErrors(error);
    return error;
  };
}
