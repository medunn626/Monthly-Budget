import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BudgetService {

  addBudgetFailure: boolean;
  updateBudgetFailure: boolean;

  getAllBudgets() {
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    return this.http.get(environment.apiServer + '/budgets', config);
  }

  getOneBudget(budgetId) {
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    return this.http.get(environment.apiServer + '/budgets/' + budgetId, config);
  }

  saveBudget(newBudget) {
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    let budgetCreateParams = {
      "budget": {
        "starting_budget": newBudget.starting_budget,
        "amount_spent": +localStorage.getItem('total'),
        "remaining_budget": newBudget.starting_budget - +localStorage.getItem('total'),
        "user_id": localStorage.getItem('id')
      }
    }
    console.log('Params are', budgetCreateParams)
    return this.http.post(environment.apiServer + '/budgets', budgetCreateParams, config);
  }

  updateBudget(updatedBudget) {
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    let budgetUpdateParams = {
      "budget": {
        "starting_budget": updatedBudget.starting_budget,
        "amount_spent": +localStorage.getItem('total'),
        "remaining_budget": updatedBudget.starting_budget - +localStorage.getItem('total'),
        "user_id": localStorage.getItem('id')
      }
    }
    console.log('Params are', budgetUpdateParams)
    return this.http.put(environment.apiServer + '/budgets/' + updatedBudget.budget.id, budgetUpdateParams, config);
  }

  updateTotalSpent(updatedBudget) {
    console.log('updatedBudget is', updatedBudget)
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    let budgetUpdateParams = {
      "budget": {
        "starting_budget": updatedBudget.starting_budget,
        "amount_spent": +localStorage.getItem('total'),
        "remaining_budget": updatedBudget.starting_budget - +localStorage.getItem('total'),
        "user_id": localStorage.getItem('id')
      }
    }
    console.log('Params are', budgetUpdateParams)
    return this.http.put(environment.apiServer + '/budgets/' + updatedBudget.id, budgetUpdateParams, config);
  }

  removeMessage() {
    this.addBudgetFailure = false
    this.updateBudgetFailure = false
  }

  constructor(private http: Http) { }

}
