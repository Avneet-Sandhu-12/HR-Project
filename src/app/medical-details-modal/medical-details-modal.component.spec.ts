import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalDetailsModalComponent } from './medical-details-modal.component';

describe('MedicalDetailsModalComponent', () => {
  let component: MedicalDetailsModalComponent;
  let fixture: ComponentFixture<MedicalDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
