import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ExpensesService {

  deleteExpenseSuccess: boolean;
  deleteExpenseFailure: boolean;
  createExpenseFailure: boolean;
  updateExpenseFailure: boolean;
  isPaid: boolean = false;

  getAllExpenses() {
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    return this.http.get(environment.apiServer + '/expenses', config);
  }

  getOneExpense(expenseId) {
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    return this.http.get(environment.apiServer + '/expenses/' + expenseId, config);
  }

  deleteExpense(expense) {
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    return this.http.delete(environment.apiServer + '/expenses/' + expense.id, config)
  }

  saveExpense(newExpense) {
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    let expenseCreateParams = {
      "expense": {
        "description": newExpense.description,
        "amount": newExpense.amount,
        "payment_date": newExpense.payment_date,
        "paid": this.isPaid,
        "user_id": localStorage.getItem('id')
      }
    }
    return this.http.post(environment.apiServer + '/expenses', expenseCreateParams, config);
  }

  updateExpense(updatedExpense) {
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    let expenseUpdateParams = {
      "expense": {
        "description": updatedExpense.description,
        "amount": updatedExpense.amount,
        "payment_date": updatedExpense.payment_date,
        "paid": this.isPaid,
        "user_id": localStorage.getItem('id')
      }
    }
    return this.http.put(environment.apiServer + '/expenses/' + updatedExpense.expense.id, expenseUpdateParams, config);
  }

  removeMessage() {
    this.deleteExpenseSuccess = false
    this.deleteExpenseFailure = false
    this.createExpenseFailure = false
    this.updateExpenseFailure = false
  }

  constructor(private http: Http) { }

}
