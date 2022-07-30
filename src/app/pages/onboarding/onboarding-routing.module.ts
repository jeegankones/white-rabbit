import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnboardingPage } from './onboarding.page';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { OnboardingGuard } from '../../guards/onboarding.guard';
import { redirectUnauthorizedToLogin } from '../../app-routing.module';

const routes: Routes = [
  {
    path: '',
    component: OnboardingPage,
    canActivate: [AngularFireAuthGuard, OnboardingGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingPageRoutingModule {}
