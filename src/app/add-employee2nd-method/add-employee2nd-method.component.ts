import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeesService } from '../services/employees.service';
import { StateData } from './State-list';

@Component({
  selector: 'app-add-employee2nd-method',
  templateUrl: './add-employee2nd-method.component.html',
  styleUrls: ['./add-employee2nd-method.component.scss'],
})
export class AddEmployee2ndMethodComponent {
  employeeData: Employee = {} as Employee;
  addressHeader = false;
  stateList = StateData;
  employeeForm = this.fb.group({
    name: ['', Validators.required],
    mobile: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    addressArray: this.fb.array([]),
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeesService
  ) {}

  isDisabled(option: any) {
    return option.selected;
  }
  get name() {
    return this.employeeForm.get('name');
  }
  get mobile() {
    return this.employeeForm.get('mobile');
  }
  get email() {
    return this.employeeForm.get('email');
  }
  get gender() {
    return this.employeeForm.get('gender');
  }
  get addressForms() {
    return this.employeeForm.get('addressArray') as FormArray;
  }

  newAddress() {
    return this.fb.group({
      addLine1: ['', Validators.required],
      addLine2: [''],
      district: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
    });
  }

  onAddAddress() {
    this.addressForms.push(this.newAddress());
  }

  addLine1(i: number) {
    return this.addressForms.at(i).get('addLine1');
  }
  addLine2(i: number) {
    return this.addressForms.at(i).get('addLine2');
  }
  district(i: number) {
    return this.addressForms.at(i).get('district');
  }
  state(i: number) {
    return this.addressForms.at(i).get('state');
  }
  pinCode(i: number) {
    return this.addressForms.at(i).get('pinCode');
  }

  saveEmployeeForm() {
    const data = this.employeeForm.value;

    this.employeeService.postEmployeeDetails(data).subscribe({
      next: (res) => {
        alert('Employee details added successfully');
        this.employeeForm.reset();
        this.router.navigate(['/', 'displayEmployees']);
      },
      error: (err) => {
        console.log(err);
      },
    });

    // this.formPreview = JSON.stringify(this.employeeForm.value);
    // console.log(this.employeeForm);
  }

  removeAddressFormGroup(i: number) {
    this.addressForms.removeAt(i);
  }

  optionValidity() {
    const selectedState = this.employeeForm.valueChanges.subscribe(
      (value) => {}
    );
  }
}
