import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budget-modify',
  templateUrl: './budget-modify.component.html',
  styleUrls: ['./budget-modify.component.css']
})
export class BudgetModifyComponent implements OnInit {

  updatedBudget = <any>{};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public budgetService: BudgetService
  ) { }

  ngOnInit() {
    const updatedStartingBudget = <HTMLInputElement>document.getElementById('updated-starting-budget')
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/'])
    } else {
      this.route.params.forEach( param => {
        this.budgetService.getOneBudget(param.id)
        .subscribe(response => {
          this.updatedBudget = response.json();
          updatedStartingBudget.value = this.updatedBudget.budget.starting_budget;
        })
      })
    }
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  updateBudget(updatedBudget) {
    this.budgetService.updateBudget(updatedBudget)
    .subscribe(
      response => {
        let data = response.json();
        this.router.navigate(["/budget"]);
      },
      err => {
        this.budgetService.updateBudgetFailure = true
      }
    )
  }

}
