import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee2nd-method',
  templateUrl: './add-employee2nd-method.component.html',
  styleUrls: ['./add-employee2nd-method.component.scss'],
})
export class AddEmployee2ndMethodComponent {
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
  get addressForms(): FormArray {
    return this.employeeForm.get('addressArray') as FormArray;
  }

  saveEmployeeForm() {
    // this.formPreview = JSON.stringify(this.employeeForm.value);
    console.log(this.employeeForm.value);
  }
  addressGroupForm!: FormGroup;

  newAddress(): FormGroup {
    return this.fb.group({
      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
    });
  }

  addAddress() {
    this.addressForms.push(this.newAddress());
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

  removeAddressFormGroup(i: number) {
    this.addressForms.removeAt(i);
  }
}
