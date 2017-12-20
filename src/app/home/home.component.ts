import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetService } from '../budget/budget.service';
import { ExpensesService } from '../expenses/expenses.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allBudgets = {};
  allExpenses = [];

  constructor(
    public router: Router,
    public budgetService: BudgetService,
    public expensesService: ExpensesService
  ) { }

  getUser() {
    const welcomeMessage = <HTMLInputElement>document.getElementById('welcome-msg')
    const username = localStorage.getItem('user')
    welcomeMessage.innerText = 'Welcome, ' + username + '!'
  }

  updateRemainingBudget(budget) {
    const budgetMessage = <HTMLInputElement>document.getElementById('budget-msg')
    this.budgetService.updateTotalSpent(budget)
    .subscribe(
      response => {
        let data = response.json();
        const currentBudget = data.budget.remaining_budget
        budgetMessage.innerHTML = "Current Budget = <b>$" + currentBudget + "</b>"
      },
      err => {
        console.log('Error is', err)
      })
    }

  getBudget() {
    this.budgetService.getAllBudgets()
    .subscribe(response => {
      this.allBudgets = response.json()['budget']
      this.updateRemainingBudget(this.allBudgets)
    })
  }

  getDate() {
    const dateMessage = <HTMLInputElement>document.getElementById('date-msg')
    var today = new Date()
    var dd = today.getDate()
    return dd
  }

  getNextBill() {
    // Grab the element to display the message
    const billMessage = <HTMLInputElement>document.getElementById('bill-msg')
    // Get today's date
    const date = this.getDate()
    // Get all expenses from service
    this.expensesService.getAllExpenses()
    .subscribe(response => {
      this.allExpenses = response.json()['expenses']
      // Put all expenses in an array
      const expensesArray = this.allExpenses
      let unpaidArray = []
      let descriptionArray = []
      // For each expense, if the paid status is false, add those payment dates to another array
      for (let i = 0; i < expensesArray.length; i++) {
        if (expensesArray[i].paid === false) {
          unpaidArray.push(expensesArray[i].payment_date)
          descriptionArray.push(expensesArray[i].description)
        }
        }
        // Grab the first item in the array to get just then next day due
        const nextDayDue = unpaidArray[0]
        const description = descriptionArray[0]
        // Subtract this item from the current date
        const daysUntilNextBill = +nextDayDue - date
        // Update message
        if (unpaidArray.length > 0) {
          billMessage.innerHTML = description + " due in <b>" + daysUntilNextBill + " </b>day(s)"
      } else {
        billMessage.innerHTML = "Go to Expenses:"
      }
    })
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/'])
    } else {
      this.getUser()
      this.getBudget()
      this.getNextBill()
    }
  }

}
