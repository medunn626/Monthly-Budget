import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BudgetComponent } from './budget.component';
import { BudgetIndexComponent } from './budget-index/budget-index.component';
import { BudgetModifyComponent } from './budget-modify/budget-modify.component';

const budgetRoutes: Routes = [
  {
    path: 'budget',
    component: BudgetComponent,
    children: [
      {
        path: '',
        component: BudgetIndexComponent
      },
      {
        path: 'modify',
        component: BudgetModifyComponent
      }
    ]
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(budgetRoutes)
  ],
  exports: [
      RouterModule
  ]
})
export class BudgetRoutingModule { }
