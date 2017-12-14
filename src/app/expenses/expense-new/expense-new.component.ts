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

  isNumberKey(evt) {
    console.log('The keydown function got executed.')
    // const charCode = (evt.which) ? evt.which : event.keyCode
    // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //   return false
    // } else {
    //   return true
    // }
  }

  saveExpense(newExpense) {
  const newDescription = <HTMLInputElement>document.getElementById('new-description')
  const newAmount = <HTMLInputElement>document.getElementById('new-amount')
  const newPayment = <HTMLInputElement>document.getElementById('new-paymnt')
  this.expensesService.saveExpense(newExpense)
  .subscribe(
    response => {
      let data = response.json();
      this.router.navigate(["/expenses/" + data.expense.id]);
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
