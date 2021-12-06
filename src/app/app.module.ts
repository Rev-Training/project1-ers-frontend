import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { UserLogoutComponent } from './user/user-logout/user-logout.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserInputComponent } from './user/user-input/user-input.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { RequestInputComponent } from './request/request-input/request-input.component';
import { RequestManagementComponent } from './request/request-management/request-management.component';
import { RequestDetailsComponent } from './request/request-details/request-details.component';
import { FormsModule } from '@angular/forms';
import { UserPasswordResetComponent } from './user/user-password-reset/user-password-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserLoginComponent,
    UserManagementComponent,
    UserLogoutComponent,
    UserHomeComponent,
    UserInputComponent,
    UserDetailsComponent,
    RequestInputComponent,
    RequestManagementComponent,
    RequestDetailsComponent,
    UserPasswordResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
