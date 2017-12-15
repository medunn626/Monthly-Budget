import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-modify',
  templateUrl: './budget-modify.component.html',
  styleUrls: ['./budget-modify.component.css']
})
export class BudgetModifyComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/'])
    }
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  modifyBudget() {
    const startingBudgetField = <HTMLInputElement>document.getElementById('starting-budget')
    console.log('Element is', startingBudgetField)
    const userEnteredField = startingBudgetField.value
    console.log('User entered is', userEnteredField)
    localStorage.setItem('startBudget', userEnteredField.toString())
    this.router.navigate((["/budget"]));
  }

}
