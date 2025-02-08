import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseLayoutComponent } from './expense-layout.component';

describe('ExpenseLayoutComponent', () => {
  let component: ExpenseLayoutComponent;
  let fixture: ComponentFixture<ExpenseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
