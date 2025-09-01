import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { LoginResponse, UserLogin } from '../../../core/interfaces/auth';
import { ToastrService } from '../../../core/services/toastr.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, CommonModule, NgIf, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _spinnerService: NgxSpinnerService
  ) {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // login user
  loginUser() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this._spinnerService.show();

    const { username, password }: UserLogin = this.loginForm.value;

    this._authService.login(username, password).subscribe({
      next: (response: LoginResponse) => {
        this._spinnerService.hide();
        this._toastrService.success("Login successful!");
        this._authService.setToken(response.token);
        this._router.navigate(["/parties"]);
      },
      error: (error) => {
        this._spinnerService.hide();
        this._toastrService.error(error.error.msg ?? "Something went wrong");
        console.error(error);
      }
    });
  }
}
