import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpensesComponent } from './expenses.component';
import { ExpenseIndexComponent } from './expense-index/expense-index.component';
import { ExpenseNewComponent } from './expense-new/expense-new.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';

const expenseRoutes: Routes = [
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
