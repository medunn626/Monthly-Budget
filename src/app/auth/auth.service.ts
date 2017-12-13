import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()

export class AuthService {

  loggedIn: boolean = false;
  loginFailure: boolean;
  signUpFailure: boolean;
  signOutFailure: boolean;
  changePasswordSuccess: boolean;
  changePasswordFailure: boolean;

  constructor(
    private http: Http,
    public router: Router
  ) { }

  login(email: string, password: string) {
    const emailField = <HTMLInputElement>document.getElementById('email-log')
    const passwordField = <HTMLInputElement>document.getElementById('password-log')
    const data = {
      'credentials': {
        'email': email,
        'password': password
    }
  }
  this.http.post(environment.apiServer + '/sign-in', data)
  .subscribe(
    response => {
      const user = JSON.parse(response['_body']).user
      localStorage.setItem('token', user.token)
      localStorage.setItem('id', user.id)
      this.loggedIn = true
      this.loginFailure = false
      this.signUpFailure = false
      this.router.navigate(['/home/'])
    },
    err => {
      this.loginFailure = true
      this.signUpFailure = false
      emailField.value = ''
      passwordField.value = ''
    }
  )
}

signUp(email: string, password: string, password_confirmation: string) {
  const newEmailField = <HTMLInputElement>document.getElementById('email-sign')
  const newPasswordField = <HTMLInputElement>document.getElementById('password-sign')
  const passwordConfirmField = <HTMLInputElement>document.getElementById('password-confirm-sign')
  if (password == password_confirmation) {
    const data = {
      'credentials': {
        'email': email,
        'password': password,
        'password_confirmation': password_confirmation
      }
    }
    this.http.post(environment.apiServer + '/sign-up', data)
    .subscribe(
      response => {
        this.login(data.credentials.email, data.credentials.password)
      },
      err => {
        this.signUpFailure = true
        this.loginFailure = false
        newEmailField.value = ''
        newPasswordField.value = ''
        passwordConfirmField.value = ''
      }
    )
  } else {
    this.signUpFailure = true
    this.loginFailure = false
    newEmailField.value = ''
    newPasswordField.value = ''
    passwordConfirmField.value = ''
  }
}

signOut() {
  let config = {}
  config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
  this.http.delete(environment.apiServer + '/sign-out/' + localStorage.getItem('id'), config)
  .subscribe(
    data => {
      localStorage.clear()
      this.signOutFailure = false
      this.loggedIn = false
      this.router.navigate(['/'])
    },
    err => {
      this.signOutFailure = true
    }
  )
}

changePassword(oldPassword: string, newPassword: string) {
  const oldField = <HTMLInputElement>document.getElementById('old')
  const newField = <HTMLInputElement>document.getElementById('new')
  if (oldPassword != newPassword ) {
    const data = {
      'passwords': {
        'old': oldPassword,
        'new': newPassword
      }
    }
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    this.http.patch(environment.apiServer + '/change-password/' + localStorage.getItem('id'), data, config)
    .subscribe(
      response => {
        this.changePasswordSuccess = true
        this.changePasswordFailure = false
        oldField.value = ''
        newField.value = ''
      },
      err => {
        this.changePasswordSuccess = false
        this.changePasswordFailure = true
        oldField.value = ''
        newField.value = ''
      }
    )
  } else {
    this.changePasswordSuccess = false
    this.changePasswordFailure = true
    oldField.value = ''
    newField.value = ''
  }
}

removeMessage() {
  this.changePasswordFailure = false
  this.changePasswordSuccess = false
  this.signOutFailure = false
}

}
