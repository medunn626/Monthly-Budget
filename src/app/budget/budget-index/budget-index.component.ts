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
    const totalSpent = document.getElementsByTagName('li')
    const current = document.getElementsByTagName('span')
    this.budgetService.updateTotalSpent(budget)
    .subscribe(
      response => {
        let data = response.json();
        current[5].innerHTML = "$" + data.budget.remaining_budget
        totalSpent[6].innerHTML = "<b>Amount Spent:</b> $" + data.budget.amount_spent
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
        if (+localStorage.getItem('total') > 0) {
          this.updateTotalSpent(this.allBudgets)
        }
      })
    }
  }

}
