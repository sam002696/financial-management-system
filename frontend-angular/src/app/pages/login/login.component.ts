import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { GlobalAlertService } from '../../services/global-alert.service';
import { IApiResponse } from '../../model/apiresponse/apiresponse';
import { UserProfileService } from '../../services/user-profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    "email": "",
    "password": ""
  }

  http = inject(HttpClient)
  router = inject(Router)
  authService = inject(UserAuthService);
  globalAlertService = inject(GlobalAlertService)
  userProfileService = inject(UserProfileService);


  onLogin() {
    console.log('Form Submitted', this.loginObj);

    this.authService.login(this.loginObj).subscribe((res: IApiResponse) => {
      console.log('Response', res);
      if (res.status === 'success') {
        localStorage.setItem('user', JSON.stringify(res.data))
        this.userProfileService.setUser(res.data);
        this.globalAlertService.showAlert(res.message, 'success');
        this.router.navigate(['/dashboard']);
      }

    }, error => {
      this.globalAlertService.showAlert(error.error.message, 'error');
    });

  }

}
