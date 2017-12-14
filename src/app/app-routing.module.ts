import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';

import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseIndexComponent } from './expenses/expense-index/expense-index.component';
import { ExpenseNewComponent } from './expenses/expense-new/expense-new.component';
import { ExpenseEditComponent } from './expenses/expense-edit/expense-edit.component';

import { ChangePasswordComponent } from './auth/change-password/change-password.component';

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
        path: '',
        component: ExpenseIndexComponent
      },
      {
        path: 'new',
        component: ExpenseNewComponent
      },
      {
        path: 'edit/:id',
        component: ExpenseEditComponent
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
