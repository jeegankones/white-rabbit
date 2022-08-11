import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'wr-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService,
  ) {}

  // Easy access for form fields
  get email() {
    return this.credentialForm.get('email');
  }

  get password() {
    return this.credentialForm.get('password');
  }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async signIn() {
    const success = await this.authService.signIn(this.credentialForm.value);
    if (!success) {
      this.credentialForm.reset();
    }
  }

  enterKeyPress() {
    if (this.credentialForm.valid) {
      this.signIn();
    } else {
      this.credentialForm.markAllAsTouched();
    }
  }

}
