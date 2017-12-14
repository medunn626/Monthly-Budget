import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpensesComponent } from './expenses.component';
import { ExpenseIndexComponent } from './expense-index/expense-index.component';
import { ExpenseNewComponent } from './expense-new/expense-new.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';
import { ExpenseShowComponent } from './expense-show/expense-show.component';

const expenseRoutes: Routes = [
  {
    path: 'expenses',
    component: ExpensesComponent,
    children: [ //create the sub sections (children) for this route
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
      },
      {
        path: ':id',
        component: ExpenseShowComponent
      }
    ]
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(expenseRoutes)
  ],
  exports: [
      RouterModule
  ]
})
export class ExpensesRoutingModule { }
