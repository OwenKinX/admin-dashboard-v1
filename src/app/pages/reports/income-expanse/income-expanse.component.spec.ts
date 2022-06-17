import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpanseComponent } from './income-expanse.component';

describe('IncomeExpanseComponent', () => {
  let component: IncomeExpanseComponent;
  let fixture: ComponentFixture<IncomeExpanseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeExpanseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeExpanseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
