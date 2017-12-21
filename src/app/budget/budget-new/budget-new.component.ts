import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-new',
  templateUrl: './budget-new.component.html',
  styleUrls: ['./budget-new.component.css']
})
export class BudgetNewComponent implements OnInit {

  newBudget = <any>{};

  constructor(
    private router : Router,
    public budgetService : BudgetService
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/'])
    }
  }

  removeMessage() {
    this.budgetService.removeMessage()
  }

  _keyPress(event: any) {
    const pattern = /^\d*(\.\d{0,2})?$/;
    let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  saveBudget(newBudget) {
  const newStartingBudget = <HTMLInputElement>document.getElementById('sarting-budget')
  this.budgetService.saveBudget(newBudget)
  .subscribe(
    response => {
      let data = response.json();
      this.router.navigate(["/budget"]);
    },
    err => {
      this.budgetService.addBudgetFailure = true
      newStartingBudget.value = ''
    }
  )
}

}
