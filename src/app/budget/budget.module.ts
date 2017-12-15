import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BudgetComponent } from './budget.component';
import { BudgetIndexComponent } from './budget-index/budget-index.component';
import { BudgetModifyComponent } from './budget-modify/budget-modify.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [BudgetIndexComponent, BudgetModifyComponent]
})
export class BudgetModule { }
