# Auth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Auth service
Created the Auth Service to interact with the GA provided template. Auth actions retrieve the api from environment.

1. Add service to handle Authentication requests
  1. signIn- Takes email: string and password: string from the calling component. Creates the hash for credentials to use in the sign-in action. Subscribes to response to save the user as this.user(auth.user)
  2. signUp- Takes email: string, password: string and password_confirmation: string from component.
  3. signOut- Takes no arguments. Uses the existing token and processes delete action.
  4. changePassword- Takes oldPassword: string and newPassword: string from component. Takes token from authenticated user and sends patch request to server. Subscribe console logs
