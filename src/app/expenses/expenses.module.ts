import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ExpensesComponent } from './expenses.component';
import { ExpenseIndexComponent } from './expense-index/expense-index.component';
import { ExpenseNewComponent } from './expense-new/expense-new.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';
import { ExpenseShowComponent } from './expense-show/expense-show.component';
import { ExpensesService } from './expenses.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [ExpenseIndexComponent, ExpensesComponent, ExpenseNewComponent, ExpenseEditComponent, ExpenseShowComponent],
  providers: [ExpensesService]
})
export class ExpensesModule { }
