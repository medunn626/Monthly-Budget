import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../expenses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css']
})
export class ExpenseEditComponent implements OnInit {

  updatedExpense = <any>{};

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    public expensesService : ExpensesService
  ) { }

  ngOnInit() {
    const descriptionField = <HTMLInputElement>document.getElementById('update-description')
    const amountField = <HTMLInputElement>document.getElementById('update-amount')
    const paymentField = <HTMLInputElement>document.getElementById('update-payment')
    const recurringField = <HTMLInputElement>document.getElementById('update-recurring')
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/'])
    } else {
      this.route.params.forEach( param => {
        this.expensesService.getOneExpense(param.id)
        .subscribe(response => {
          this.updatedExpense = response.json();
          descriptionField.value = this.updatedExpense.expense.description;
          amountField.value = this.updatedExpense.expense.amount;
          paymentField.value = this.updatedExpense.expense.payment_date;
          recurringField.checked = this.updatedExpense.expense.recurring;
        });
      });
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

  updateExpense(updatedExpense) {
    this.expensesService.updateExpense(updatedExpense)
    .subscribe(
      response => {
        let data = response.json();
        this.router.navigate(["/expenses"]);
        console.log('Update result is', data)
    },
    err => {
      this.expensesService.updateExpenseFailure = true
    }
  )
}

}
