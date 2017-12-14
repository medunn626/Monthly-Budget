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
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/'])
    } else {
      this.route.params.forEach( param => {
        this.expensesService.getOneExpense(param.id)
        .subscribe(response => {
          this.updatedExpense = response.json();
          descriptionField.value = this.updatedExpense.expense.description
          amountField.value = this.updatedExpense.expense.amount
          paymentField.value = this.updatedExpense.expense.payment_date
        });
      });
    }
  }

  removeMessage() {
    this.expensesService.removeMessage()
  }

  updateExpense(updatedExpense) {
    this.expensesService.updateExpense(updatedExpense)
    .subscribe(
      response => {
        let data = response.json();
        this.router.navigate(["/expenses"]);
    },
    err => {
      this.expensesService.updateExpenseFailure = true
    }
  )
}

}
