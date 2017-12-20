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
    console.log('The date is', dd)
    return dd
  }

  checkPaidStatus(expenses) {
    const date = this.getDate()
    console.log('Expenses are', expenses)
    for (let i = 0; i < expenses.length; i++) {
      console.log('i is', i)
      if (expenses[i].payment_date <= date) {
        console.log('This should be maked as paid')
        this.expensesService.getOneExpense(expenses[i].id)
        .subscribe(response => {
          this.updatedExpense = response.json();
          console.log('Param is', this.updatedExpense)
          this.expensesService.updatePaidStatus(this.updatedExpense)
          .subscribe(
            response => {
              let data = response.json();
              console.log('Update result is', data)
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

  getTotal(expenses) {
    const totalDisplay = <HTMLInputElement>document.getElementById('total')
    let sum = 0
    for (let i = 0; i < expenses.length; i++) {
      sum += expenses[i].amount
    }
    console.log('Sum is', sum)
    localStorage.setItem('total', sum.toString())
    console.log('Local total is', localStorage.getItem('total'))
    totalDisplay.innerHTML = "Total Spent: <b>$" + sum.toString() + "</b>"
  }

  createUnpaidArray(expenses) {
    const array = []
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].paid == false) {
        array.push(expenses[i].payment_date)
        console.log('Array of unpaid bills is', array)
        return array
      }
    }
  }

  getNextBill(expenses) {
    const array = this.createUnpaidArray(expenses)
    console.log('Array is', array)
    const firstItem = array[0]
    console.log('Next bill is due on', firstItem)
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
        this.getTotal(this.allExpenses)
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
        this.getTotal(this.allExpenses)
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
