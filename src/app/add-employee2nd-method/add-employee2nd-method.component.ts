import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressArray, Employee, EmployeeHeaderStatus } from '../employee.model';
import { EmployeesService } from '../services/employees.service';
import { StateData } from './State-list';

@Component({
  selector: 'app-add-employee2nd-method',
  templateUrl: './add-employee2nd-method.component.html',
  styleUrls: ['./add-employee2nd-method.component.scss'],
})
export class AddEmployee2ndMethodComponent implements OnInit {

  employeeId: string | null = null;;
  employeeHeaderStatus: EmployeeHeaderStatus = EmployeeHeaderStatus.Add
  employeeAddButton = true;
  employeeUpdateButton = false;
  Employee: Employee = {} as Employee;
  singleEmployee: Employee = {} as Employee;
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
      ],],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    addressArray: this.fb.array<AddressArray>([]),
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeesService,
    private activatedRoute: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    this.employeeId = this.activatedRoute.snapshot.params['employeeId'];
    if (this.employeeId) {
      this.getEmployeeData(this.employeeId);
    }
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
  addAddress() {
    this.addressForms.push(this.newAddress());
  }
  get patchAddress() {
    return this.employeeForm.get('addressArray') as FormArray;
  }
  saveEmployeeForm() {
    this.employeeService.postEmployeeDetails(this.employeeForm.getRawValue()).subscribe({
      next: (result) => {

        console.log(this.employeeForm);

        alert('Employee details added successfully');
        this.employeeForm.reset();
        this.router.navigate(['/', 'display-employees']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  removeAddressFormGroup(i: number) {
    this.addressForms.removeAt(i);
  }
  // isStateDisabled(option: string) {
  //   console.count(option)
  //   return this.addressForms.value.find((v: any) => v.state === option)
  // };
  getEmployeeData(employeeId: string) {
    this.employeeHeaderStatus = EmployeeHeaderStatus.Edit
    this.employeeUpdateButton = true;
    this.employeeAddButton = false;
    this.employeeService.getEmployeeDetailsById(employeeId).subscribe((result) => {
      this.singleEmployee = result;


      this.editEmployeeData()
    })
  }
  editEmployeeData() {
    const { addressArray, email, gender, mobile, name } = this.singleEmployee;
    this.addressForms.clear();
    if (addressArray !== null) {
      for (let i = 0; i < addressArray.length; i++) {
        const { addLine1, addLine2, district, state, pinCode } = addressArray[i] as AddressArray
        this.addressForms.push(this.generateFormGroup(addLine1, addLine2, district, state, pinCode))
      }
    }
    this.employeeForm.patchValue({ email, gender, mobile, name, addressArray })
  }
  generateFormGroup(addLine1: string | null, addLine2: string | null, district: string | null, state: string | null,
    pinCode: string | null) {
    return this.fb.group({
      addLine1: addLine1,
      addLine2: addLine2,
      district: district,
      state: state,
      pinCode: pinCode,
    });
  }
  updateEmployeeData() {
    const oneEmp = this.employeeForm.getRawValue()
    this.employeeService.updateEmployee(oneEmp, this.employeeId).subscribe((result) => {
      alert("employee updated successfully")
      this.router.navigate(['/', 'display-employees'])
    })
  }
}
