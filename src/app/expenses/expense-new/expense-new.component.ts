import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../expenses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-new',
  templateUrl: './expense-new.component.html',
  styleUrls: ['./expense-new.component.css']
})
export class ExpenseNewComponent implements OnInit {

  newExpense = <any>{};

  constructor(
    private router : Router,
    public expensesService : ExpensesService
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/'])
    }
  }

  removeMessage() {
    this.expensesService.removeMessage()
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  saveExpense(newExpense) {
  const newDescription = <HTMLInputElement>document.getElementById('new-description')
  const newAmount = <HTMLInputElement>document.getElementById('new-amount')
  const newPayment = <HTMLInputElement>document.getElementById('new-paymnt')
  this.expensesService.saveExpense(newExpense)
  .subscribe(
    response => {
      let data = response.json();
      this.router.navigate(["/expenses"]);
    },
    err => {
      this.expensesService.createExpenseFailure = true
      newDescription.value = ''
      newAmount.value = ''
      newPayment.value = ''
    }
  )
}

}
