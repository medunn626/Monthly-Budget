import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newUser = <any>{};

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['home'])
    }
  }

  signUp() {
    this.auth.signUp(this.newUser.email, this.newUser.password, this.newUser.password_confirmation)
  }
}
