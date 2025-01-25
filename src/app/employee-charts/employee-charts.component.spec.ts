import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeChartsComponent } from './employee-charts.component';

describe('EmployeeChatsComponent', () => {
  let component: EmployeeChartsComponent;
  let fixture: ComponentFixture<EmployeeChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
