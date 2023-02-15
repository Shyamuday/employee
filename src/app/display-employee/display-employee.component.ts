import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Employee } from '../employee.model';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss'],

})
export class DisplayEmployeeComponent implements OnInit, AfterViewInit {

  displayEmployeeData: MatTableDataSource<Employee[]> = new MatTableDataSource()
  displayedColumns: string[] = ['name', 'mobile', 'email', 'gender'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.getAllEmployeeData();
  }

  ngAfterViewInit(): void {
    this.displayEmployeeData.paginator = this.paginator
  }

  getAllEmployeeData() {
    this.employeeService.getEmployeeDetails().subscribe({
      next: (data) => {
        this.displayEmployeeData.data = data
      }, error: (error) => {
        console.log(error);
      }
    })
  }
}