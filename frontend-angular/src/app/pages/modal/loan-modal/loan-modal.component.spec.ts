import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanModalComponent } from './loan-modal.component';

describe('LoanModalComponent', () => {
  let component: LoanModalComponent;
  let fixture: ComponentFixture<LoanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
