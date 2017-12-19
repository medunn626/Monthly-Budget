import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-index',
  templateUrl: './budget-index.component.html',
  styleUrls: ['./budget-index.component.css']
})
export class BudgetIndexComponent implements OnInit {

  allBudgets = {};

  constructor(
    public router: Router,
    public budgetService : BudgetService
  ) { }

  updateTotalSpent(budget) {
    this.budgetService.updateTotalSpent(budget)
    .subscribe(
      response => {
        let data = response.json();
      },
      err => {
        console.log('Error is', err)
      })
    }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/'])
    } else {
      this.budgetService.getAllBudgets()
      .subscribe(response => {
        this.allBudgets = response.json()['budget']
        console.log('Result is', this.allBudgets)
        this.updateTotalSpent(this.allBudgets)
      })
    }
  }

}
