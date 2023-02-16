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
  { path: '', redirectTo: 'addEmployee2ndMethod', pathMatch: 'full' },

  { path: 'addEmployee', component: AddEmployeeComponent },
  {
    path: 'addEmployee2ndMethod',
    component: AddEmployee2ndMethodComponent,
  },
  { path: 'formArray', component: FormArrayComponent },
  { path: 'skillsForm', component: SkillsFormComponent },

  { path: 'displayEmployees', component: DisplayEmployeeComponent },
  { path: 'employeeDetail/:employeeId', component: EmployeeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
