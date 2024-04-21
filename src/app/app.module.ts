import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeesComponent,
    UserRegisterComponent,
    ForgotPasswordComponent,
    RecoveryPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
