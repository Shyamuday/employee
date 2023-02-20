import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee = {} as Employee
  employeeId!: number
  constructor(private employeeService: EmployeesService, private activateRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.employeeId = params['employeeId']
    })
    if (this.employeeId) {
      this.employeeService.getEmployeeDetailsById(this.employeeId).subscribe((employeesData) => {
        console.log(employeesData)
        this.employee = employeesData;
      })
    }
  }

}
