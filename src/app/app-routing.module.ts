import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddEmployee2ndMethodComponent } from './add-employee2nd-method/add-employee2nd-method.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { FormArrayComponent } from './form-array/form-array.component';
import { HomeComponent } from './home/home.component';
import { SkillsFormComponent } from './skills-form/skills-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'add-employee-method', pathMatch: 'full' },

  { path: 'add-employee', component: AddEmployeeComponent },
  {
    path: 'add-employee-method',
    component: AddEmployee2ndMethodComponent,
  },
  { path: 'form-array', component: FormArrayComponent },
  { path: 'skills-form', component: SkillsFormComponent },

  { path: 'display-employees', component: DisplayEmployeeComponent },
  { path: 'employee-detail/:employeeId', component: EmployeeDetailsComponent },
  { path: 'employee-detail/:employeeId/edit', component: AddEmployee2ndMethodComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
