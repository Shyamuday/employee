import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployee2ndMethodComponent } from './add-employee2nd-method.component';

describe('AddEmployee2ndMethodComponent', () => {
  let component: AddEmployee2ndMethodComponent;
  let fixture: ComponentFixture<AddEmployee2ndMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployee2ndMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployee2ndMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
