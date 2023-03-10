import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  addressHeader = false;

  formPreview = '';
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
    addressArray: this.fb.array([], Validators.required),
  });

  constructor(private fb: FormBuilder) {}

  // get name() {
  //   return this.employeeForm.get('name');
  // }
  // get mobile() {
  //   return this.employeeForm.get('mobile');
  // }
  // get email() {
  //   return this.employeeForm.get('email');
  // }
  get addressForms() {
    return this.employeeForm.get('addressArray') as FormArray;
  }

  saveEmployeeForm() {
    this.formPreview = JSON.stringify(this.employeeForm.value);
  }
  addressGroupForm!: FormGroup;

  addAddress() {
    this.addressHeader = true;
    this.addressGroupForm = this.fb.group({
      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
    });
    this.addressForms.push(this.addressGroupForm);
  }

  get addLine1() {
    return this.addressGroupForm.get('addLine1');
  }
  get addLine2() {
    return this.addressGroupForm.get('addLine2');
  }
  get district() {
    return this.addressGroupForm.get('district');
  }
  get state() {
    return this.addressGroupForm.get('state');
  }
  get pinCode() {
    return this.addressGroupForm.get('pinCode');
  }

  removeAddressFormGroup(index: number) {
    this.addressForms.removeAt(index);
  }
}
