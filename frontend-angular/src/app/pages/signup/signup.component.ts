import { Component, inject } from '@angular/core';
import { Signup } from '../../model/user/signup';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { IApiResponse } from '../../model/apiresponse/apiresponse';
import { GlobalAlertService } from '../../services/global-alert.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupObj: Signup = new Signup


  http = inject(HttpClient)
  router = inject(Router)
  authService = inject(UserAuthService);
  globalAlertService = inject(GlobalAlertService)


  onSubmit() {
    console.log('Form Submitted', this.signupObj);

    this.authService.signup(this.signupObj).subscribe((res: IApiResponse) => {
      console.log('Response', res);
      if (res.status === 'success') {
        this.globalAlertService.showAlert(res.message, 'success');
        this.router.navigate(['/login']);
      }

    }, error => {
      this.globalAlertService.showAlert(error.error.message, 'error');
    });

  }

}
