import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'empleados',
    component: EmployeesComponent
  },
  {
    path: 'registro-usuario',
    component: UserRegisterComponent
  },
  {
    path: 'olvido-contrasenia',
    component: ForgotPasswordComponent
  },
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
