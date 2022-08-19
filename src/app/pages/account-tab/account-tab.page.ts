import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wr-account-tab',
  templateUrl: 'account-tab.page.html',
  styleUrls: ['account-tab.page.scss']
})
export class AccountTabPage implements OnInit {
  userData: {
    displayName: string;
    created: Date;
  };

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.userData = data.account;
    });
  }

  signOut() {
    this.authService.signOut();
  }

}
