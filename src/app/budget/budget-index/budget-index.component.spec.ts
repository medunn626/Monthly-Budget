import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetIndexComponent } from './budget-index.component';

describe('BudgetIndexComponent', () => {
  let component: BudgetIndexComponent;
  let fixture: ComponentFixture<BudgetIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
