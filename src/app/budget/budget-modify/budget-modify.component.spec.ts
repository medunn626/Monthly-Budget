import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetModifyComponent } from './budget-modify.component';

describe('BudgetModifyComponent', () => {
  let component: BudgetModifyComponent;
  let fixture: ComponentFixture<BudgetModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
