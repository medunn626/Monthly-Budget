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
  updatedExpense = <any>{};

  constructor(
    public expensesService: ExpensesService,
    public router: Router
  ) { }

  removeMessage() {
    this.expensesService.removeMessage()
  }

  getDate() {
    var today = new Date()
    var dd = today.getDate()
    return dd
  }

  checkPaidStatus(expenses) {
    const date = this.getDate()
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].payment_date <= date) {
        this.expensesService.getOneExpense(expenses[i].id)
        .subscribe(response => {
          this.updatedExpense = response.json();
          this.expensesService.updatePaidStatus(this.updatedExpense)
          .subscribe(
            response => {
              let data = response.json();
            },
            err => {
              console.log('Error is', err)
            }
          )
        });
      }
    }
  }

  resetOnFirst(expenses) {
    const date = this.getDate()
    if (date == 1) {
      for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].recurring != true) {
          this.deleteExpense(expenses[i])
        }
      }
    }
  }

  getTotals(expenses) {
    const totalNowDisplay = <HTMLInputElement>document.getElementById('total-now')
    const totalAllDisplay = <HTMLInputElement>document.getElementById('total-all')
    let sumNow = 0
    let sumAll = 0
    for (let i = 0; i < expenses.length; i++) {
      sumAll += +expenses[i].amount
      if (expenses[i].paid == true) {
        sumNow += +expenses[i].amount
      }
    }
    const sumNowFixed = sumNow.toFixed(2)
    const sumAllFixed = sumAll.toFixed(2)
    localStorage.setItem('total', sumNow.toString())
    totalNowDisplay.innerHTML = "Total Spent: <b>$" + sumNowFixed.toString() + "</b>"
    totalAllDisplay.innerHTML = "Total Expenses: <b>$" + sumAllFixed.toString() + "</b>"
  }

  createUnpaidArray(expenses) {
    const array = []
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].paid == false) {
        array.push(expenses[i].payment_date)
        return array
      }
    }
  }

  getNextBill(expenses) {
    const array = this.createUnpaidArray(expenses)
    const firstItem = array[0]
    localStorage.setItem('nextBill', firstItem)
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/'])
    } else {
      this.expensesService.getAllExpenses()
      .subscribe(response => {
        this.allExpenses = response.json()['expenses']
        this.checkPaidStatus(this.allExpenses)
        this.resetOnFirst(this.allExpenses)
        this.getTotals(this.allExpenses)
        this.getNextBill(this.allExpenses)
      });
    }
  }

  deleteExpense(deletedExpense) {
    this.expensesService.deleteExpense(deletedExpense)
    .subscribe(
      response => {
        let expenseIndex = this.allExpenses.indexOf(deletedExpense);
        this.allExpenses.splice(expenseIndex, 1);
        this.getTotals(this.allExpenses)
        this.expensesService.deleteExpenseSuccess = true
        this.expensesService.deleteExpenseFailure = false
      },
      err => {
        this.expensesService.deleteExpenseSuccess = false
        this.expensesService.deleteExpenseFailure = true
      }
    );
  }

}
