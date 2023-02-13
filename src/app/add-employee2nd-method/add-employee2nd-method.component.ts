import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee2nd-method',
  templateUrl: './add-employee2nd-method.component.html',
  styleUrls: ['./add-employee2nd-method.component.scss'],
})
export class AddEmployee2ndMethodComponent {
  addressHeader = false;
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

  constructor(private fb: FormBuilder) {}

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

  saveEmployeeForm() {
    // this.formPreview = JSON.stringify(this.employeeForm.value);
    console.log(this.employeeForm);
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

  removeAddressFormGroup(i: number) {
    this.addressForms.removeAt(i);
  }
}
