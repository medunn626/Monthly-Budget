import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  user: any

  constructor(
    private http: Http
  ) { }

  getUserToken() {
    return this.user.token
  }

  setUser(data) {
    this.user = data
  }

  signIn(email: string, password: string) {
    let credentials = {
      'credentials': {
        'email': email,
        'password': password
      }
    }

    this.http.post(environment.apiServer + '/sign-in', credentials)
      .subscribe(
        response => this.user = JSON.parse(response['_body']).user,
        err => console.log(err)
      )
  }
  signUp(email: string, password: string, password_confirmation: string) {
    const url = environment.apiServer + '/sign-up/'
    const credentials = {
      'credentials': {
        'email': email,
        'password': password,
        'password_confirmation': password_confirmation
      }
    }
    this.http.post(environment.apiServer + '/sign-up', credentials)
      .subscribe(
        response => {
          this.signIn(credentials.credentials.email, credentials.credentials.password)
        },
        err => console.log(err)
      )
  }

  signOut() {
    let url = environment.apiServer + '/sign-out/' + this.user.id
    let config = {}

    config['headers'] = { Authorization:'Token token=' + this.getUserToken()}
    this.http.delete(url, config)
      .subscribe(
        data => this.user = null,
        err => console.log(err)
      )
  }
  changePassword(oldPassword: string, newPassword: string) {
    let url = environment.apiServer + '/change-password/' + this.user.id
    let config = {}
    let passwords = {
      'passwords': {
        'old': oldPassword,
        'new': newPassword
      }
    }

    config['headers'] = { Authorization:'Token token=' + this.getUserToken()}
    this.http.patch(url, passwords, config)
      .subscribe(
        data => console.log('Success'),
        err => console.log(err)
      )
  }
}
