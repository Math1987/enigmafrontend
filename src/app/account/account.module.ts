import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from '../shared/services/user.service';
import {InputMailPipe} from '../shared/pipes/inputMail.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AccountRouting} from './account.routing';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {AccountConnectionComponent} from './account.connection/account.connection.component';



@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    InputMailPipe,
    AccountConnectionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    AccountRouting
  ],
  providers: []
})
export class AccountModule { }
