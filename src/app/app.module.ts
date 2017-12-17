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

import { ExpensesService } from './expenses/expenses.service';
import { ExpensesModule } from './expenses/expenses.module';
import { ExpensesRoutingModule } from './expenses/expenses-routing.module';

import { BudgetModule } from './budget/budget.module';
import { BudgetRoutingModule } from './budget/budget-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AuthModule,
    AuthRoutingModule,
    ModalModule,
    FilterPipeModule,
    ExpensesModule,
    ExpensesRoutingModule,
    BudgetModule,
    BudgetRoutingModule
  ],
  providers: [AuthService, ExpensesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
