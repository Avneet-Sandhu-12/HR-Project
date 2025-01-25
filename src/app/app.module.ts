import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeMedicalDetailsComponent } from './employee-medical-details/employee-medical-details.component';
import { EmployeeChartsComponent } from './employee-charts/employee-charts.component';
import { SettingsComponent } from './settings/settings.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { SslInterceptor } from './ssl-interceptor';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserTableComponent } from './user-table/user-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MedicalPolicyComponent } from './medical-policy/medical-policy.component';
import { MatTableModule } from '@angular/material/table';
import { MedicalDetailsModalComponent } from './medical-details-modal/medical-details-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CdkTableModule } from '@angular/cdk/table';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeMedicalDetailsComponent,
    EmployeeChartsComponent,
    SettingsComponent,
    UserTableComponent,
    EmployeeFormComponent,
    MedicalPolicyComponent,
    MedicalDetailsModalComponent,
    AddEmployeeComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTableModule,
    CdkTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    NgChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['http://localhost:5000/login'],
      },
    }),
  ],
  providers: [ AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: SslInterceptor, multi: true }],
  bootstrap: [AppComponent,EmployeeChartsComponent],
  entryComponents: [EmployeeFormComponent]
})
export class AppModule { }
