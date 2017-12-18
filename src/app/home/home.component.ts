import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  getUser() {
    const welcomeMessage = <HTMLInputElement>document.getElementById('welcome-msg')
    const username = localStorage.getItem('user')
    welcomeMessage.innerText = 'Welcome, ' + username + '!'
  }

  getDate() {
    const dateMessage = <HTMLInputElement>document.getElementById('date-msg')
    var today = new Date()
    var dd = today.getDate()
    // var dd = 1
    console.log('The date is', dd)
    // if (dd > 3) {
    //   dateMessage.innerText = 'Today is the ' + dd + 'th'
    // } else if (dd == 3) {
    //   dateMessage.innerText = 'Today is the ' + dd + 'rd'
    // } else if (dd == 2) {
    //   dateMessage.innerText = 'Today is the ' + dd + 'nd'
    // } else if (dd == 1) {
    //   dateMessage.innerText = 'Today is the ' + dd + 'st'
    // }
    return dd
  }

  getBudget() {
    const budgetMessage = <HTMLInputElement>document.getElementById('budget-msg')
    const currentBudget = localStorage.getItem('currentBudget')
    budgetMessage.innerText = 'Current Budget: $' + currentBudget
  }

  getNextBill() {
    const billMessage = <HTMLInputElement>document.getElementById('bill-msg')
    const date = this.getDate()
    const nextBill = localStorage.getItem('nextBill')
    const daysUntilNextBill = +nextBill - date
    billMessage.innerText = 'Next Expense: ' + daysUntilNextBill + ' day(s)'
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/'])
    } else {
      this.getUser()
      this.getDate()
      this.getBudget()
      this.getNextBill()
    }
  }

}
