import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss'],

})
export class DisplayEmployeeComponent implements OnInit {
  displayEmployeeData: any;
  displayedColumns: string[] = ['name', 'mobile', 'email', 'gender'];

  constructor(private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.getAllEmployeeData();
  }

  getAllEmployeeData() {
    this.employeeService.getEmployeeDetails().subscribe({
      next: (res) => {
        this.displayEmployeeData = res;
      },
    });
  }
}
