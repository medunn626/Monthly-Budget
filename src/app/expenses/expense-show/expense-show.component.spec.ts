import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesShowComponent } from './expenses-show.component';

describe('ExpensesShowComponent', () => {
  let component: ExpensesShowComponent;
  let fixture: ComponentFixture<ExpensesShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
