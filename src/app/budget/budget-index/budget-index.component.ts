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

  // getStartingBudget() {
  //   const startingBudgetDisplay = <HTMLInputElement>document.getElementById('budget-start')
  //   const startingBudget = localStorage.getItem('startBudget')
  //   startingBudgetDisplay.innerText = '$' + startingBudget
  // }
  //
  // getTotalSpent() {
  //   const totalSpentDisplay = <HTMLInputElement>document.getElementById('total-spent')
  //   const totalSpent = localStorage.getItem('total')
  //   totalSpentDisplay.innerText = '$' + totalSpent
  // }
  //
  // getRemainingBudget() {
  //   const budgetRemainingDisplay = <HTMLInputElement>document.getElementById('budget-remaining')
  //   const startingBudget = localStorage.getItem('startBudget')
  //   const totalSpent = localStorage.getItem('total')
  //   const startingBudgetNum = +startingBudget
  //   const totalSpentNum = +totalSpent
  //   const budgetRemaining = startingBudgetNum - totalSpentNum
  //   localStorage.setItem('currentBudget', budgetRemaining.toString())
  //   budgetRemainingDisplay.innerText = '$' + budgetRemaining.toString()
  // }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/'])
    } else {
      this.budgetService.getAllBudgets()
      .subscribe(response => {
        this.allBudgets = response.json()['budget']
        console.log('Response is', response)
        console.log('Response array is', this.allBudgets)
      })
      // this.getStartingBudget()
      // this.getTotalSpent()
      // this.getRemainingBudget()
    }
  }

}
