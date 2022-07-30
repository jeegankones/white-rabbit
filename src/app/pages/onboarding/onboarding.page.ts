import { Component, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

SwiperCore.use([Pagination]);

@Component({
  selector: 'wr-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    pagination: {clickable: false},
    allowTouchMove: false,
  };
  verificationButtonDisabled = false;
  continueButtonDisabled = false;
  swiperAnimating = false;
  passwordForm: FormGroup;
  usernameForm: FormGroup;

  constructor(private authService: AuthService,
              private afAuth: AngularFireAuth,
              private afStore: AngularFirestore,
              private router: Router,
              private formBuilder: FormBuilder,
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

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['']
    }, {validators: this.checkPasswords});

    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }

  nextSlide() {
    this.swiper.swiperRef.slideNext();
  }

  async verifyEmail() {
    this.continueButtonDisabled = true;
    const user = await this.afAuth.currentUser;
    if (user.emailVerified) {
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
      const user = await this.afAuth.currentUser;
      await user.sendEmailVerification();
      this.verificationButtonDisabled = false;
    } catch (error) {
      this.verificationButtonDisabled = false;
      throw new Error(error);
    }
  }

  async setNewPassword() {
    try {
      this.continueButtonDisabled = true;
      const user = await this.afAuth.currentUser;
      await user.updatePassword(this.passwordForm.get('confirm').value);
      this.nextSlide();
      this.continueButtonDisabled = false;
    } catch (error) {
      this.continueButtonDisabled = false;
      throw new Error(error);
    }
  }

  async setUsername() {
    try {
      this.continueButtonDisabled = true;
      const user = await this.afAuth.currentUser;
      await user.updateProfile({displayName: this.usernameForm.get('username').value});
      await this.afStore.doc(`/users/${user.uid}`).set({completedOnboarding: true});
      const alert = await this.alertController.create({
        header: 'Success',
        message: `We've saved your information. Welcome to White Rabbit.`,
        buttons: ['Proceed']
      });
      await alert.present();
      await alert.onDidDismiss();
      // TODO Bugfix router.navigate does not work
      window.location.href = '/';
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
