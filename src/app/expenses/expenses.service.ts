import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ExpensesService {

  deleteExpenseSuccess: boolean;
  deleteExpenseFailure: boolean;
  createExpenseFailure: boolean;
  updateExpenseFailure: boolean;
  isPaid: boolean;

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

  getDate() {
    var today = new Date()
    var dd = today.getDate()
    return dd
  }

  setPaidStatus(date) {
    const today = this.getDate()
    if (date <= today) {
      this.isPaid = true
    } else if (date > today) {
      this.isPaid = false
    }
    return this.isPaid
  }

  saveExpense(newExpense) {
    this.setPaidStatus(newExpense.payment_date)
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    let expenseCreateParams = {
      "expense": {
        "description": newExpense.description,
        "amount": newExpense.amount,
        "payment_date": newExpense.payment_date,
        "recurring": newExpense.recurring,
        "paid": this.isPaid,
        "user_id": localStorage.getItem('id')
      }
    }
    return this.http.post(environment.apiServer + '/expenses', expenseCreateParams, config);
  }

  updateExpense(updatedExpense) {
    this.setPaidStatus(updatedExpense.payment_date)
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    let expenseUpdateParams = {
      "expense": {
        "description": updatedExpense.description,
        "amount": updatedExpense.amount,
        "payment_date": updatedExpense.payment_date,
        "recurring": updatedExpense.recurring,
        "paid": this.isPaid,
        "user_id": localStorage.getItem('id')
      }
    }
    return this.http.put(environment.apiServer + '/expenses/' + updatedExpense.expense.id, expenseUpdateParams, config);
  }

  updatePaidStatus(updatedExpense) {
    let config = {}
    config['headers'] = { Authorization:'Token token=' + localStorage.getItem('token')}
    let expenseUpdateParams = {
      "expense": {
        "description": updatedExpense.expense.description,
        "amount": updatedExpense.expense.amount,
        "payment_date": updatedExpense.expense.payment_date,
        "recurring": updatedExpense.expense.recurring,
        "paid": true,
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
