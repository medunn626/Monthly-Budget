import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../expenses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-index',
  templateUrl: './expense-index.component.html',
  styleUrls: ['./expense-index.component.css']
})
export class ExpenseIndexComponent implements OnInit {

  allExpenses = [];

  constructor(
    public expensesService: ExpensesService,
    public router: Router
  ) { }

  deleteExpense(deletedExpense) {
    this.expensesService.deleteExpense(deletedExpense)
    .subscribe(
      response => {
        let expenseIndex = this.allExpenses.indexOf(deletedExpense);
        this.allExpenses.splice(expenseIndex, 1);
        this.expensesService.deleteExpenseSuccess = true
        this.expensesService.deleteExpenseFailure = false
      },
      err => {
        this.expensesService.deleteExpenseSuccess = false
        this.expensesService.deleteExpenseFailure = true
      }
    );
  }

  removeMessage() {
    this.expensesService.removeMessage()
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/'])
    } else {
      this.expensesService.getAllExpenses()
      .subscribe(response => {
        this.allExpenses = response.json()['expenses']
      });
    }
  }

}
