import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ModalModule } from 'ngx-modal';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module'
import { AuthRoutingModule } from './auth/auth-routing.module'
import { AuthService } from './auth/auth.service';

import { HomeComponent } from './home/home.component';

import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseIndexComponent } from './expenses/expense-index/expense-index.component';
import { ExpenseNewComponent } from './expenses/expense-new/expense-new.component';
import { ExpenseEditComponent } from './expenses/expense-edit/expense-edit.component';
import { ExpensesService } from './expenses/expenses.service';

import { BudgetComponent } from './budget/budget.component'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    ExpensesComponent,
    ExpenseIndexComponent,
    ExpenseNewComponent,
    ExpenseEditComponent,
    BudgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AuthModule,
    AuthRoutingModule,
    ModalModule,
    FilterPipeModule
  ],
  providers: [AuthService, ExpensesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
