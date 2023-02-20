import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressArray, Employee } from '../employee.model';
import { EmployeesService } from '../services/employees.service';
import { StateData } from './State-list';

@Component({
  selector: 'app-add-employee2nd-method',
  templateUrl: './add-employee2nd-method.component.html',
  styleUrls: ['./add-employee2nd-method.component.scss'],
})
export class AddEmployee2ndMethodComponent implements OnInit {
  empId: any;
  employeeHeaderStatus = "Add" || "Edit";
  empAddBtn = true;
  empUpdateBtn = false;
  sendEmployeeDAta: Employee = {} as Employee;
  oneEmployeeData: Employee = {} as Employee;
  addressHeader = false;
  stateList = StateData;
  employeeForm = this.fb.group({
    // nonNullable: true,
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
    this.getEmployeeIdToEdit()
    if (this.empId) {
      this.getEmployeeData(this.empId);
    }
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

  newAddress(address?: AddressArray | null) {
    return this.fb.group({
      addLine1: [address?.addLine1, Validators.required],
      addLine2: [address?.addLine2],
      district: [address?.district, Validators.required],
      state: [address?.state, Validators.required],
      pinCode: [address?.pinCode, Validators.required],
    });
  }

  onAddAddress() {
    this.addressForms.push(this.newAddress());

    // console.log(this.addressForms)
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


    this.employeeService.postEmployeeDetails(this.employeeForm.getRawValue()).subscribe({
      next: (res) => {
        alert('Employee details added successfully');
        this.employeeForm.reset();
        this.router.navigate(['/', 'displayEmployees']);
      },
      error: (err) => {
        console.log(err);
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

  getEmployeeIdToEdit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.empId = params.get('employeeId')
      // console.log(this.empId);
    })
  }

  getEmployeeData(employeeId: number) {
    this.employeeHeaderStatus = "Edit";
    this.empUpdateBtn = true;
    this.empAddBtn = false;
    this.employeeService.getEmployeeDetailsById(employeeId).subscribe((res) => {
      // console.log(res);
      this.oneEmployeeData = res;
      this.editEmployeeData(this.oneEmployeeData);
    })
  }
  editEmployeeData(oneEmployeeData: Employee) {
    console.log(oneEmployeeData)
    this.employeeForm.patchValue({
      name: oneEmployeeData.name,
      email: oneEmployeeData.email,
      mobile: oneEmployeeData.mobile,
      gender: oneEmployeeData.gender,
    })
    oneEmployeeData.addressArray.forEach(address => {
      this.addressForms.push(this.newAddress(address));
    })
  }

  updateEmployeeData() {
    const oneEmp = this.employeeForm.getRawValue()
    this.employeeService.updateEmployee(oneEmp, this.empId).subscribe((res) => {
      alert("employee updated successfully")
      this.router.navigate(['/', 'displayEmployees'])
    })
  }
}


