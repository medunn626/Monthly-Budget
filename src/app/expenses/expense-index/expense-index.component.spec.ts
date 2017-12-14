import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesIndexComponent } from './expenses-index.component';

describe('ExpensesIndexComponent', () => {
  let component: ExpensesIndexComponent;
  let fixture: ComponentFixture<ExpensesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
