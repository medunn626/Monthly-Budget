import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string
  password: string
  oldPassword: string
  newPassword: string
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  signOut() {
    this.auth.signOut();
  }
  signIn(email: string, password: string) {
    this.auth.signIn(this.email, this.password)
  }
  changePassword(oldPassword: string, newPassword: string) {
    this.auth.changePassword(this.oldPassword, this.newPassword)
  }
}
