import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component'
import { HomeComponent } from './home/home.component'
import { ExpensesComponent } from './expenses/expenses.component'
import { ExpenseNewComponent } from './expenses/expense-new/expense-new.component'
import { ChangePasswordComponent } from './auth/change-password/change-password.component'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
    children: [
      {
        path: 'new',
        component: ExpenseNewComponent
      }
    ]
  },
  {
    path: 'auth/change-password',
    component: ChangePasswordComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
