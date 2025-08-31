import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../core/services/auth.service';
import { NgClass, NgIf } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse, UserLogin } from '../../../core/interfaces/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, NgxLoadingModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoader: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toastrService: ToastrService
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

    this.isLoader = true;

    const { username, password }: UserLogin = this.loginForm.value;

    this._authService.login(username, password).subscribe({
      next: (response: LoginResponse) => {
        this.isLoader = false;
        this._toastrService.success("Login successful!");
        this._authService.setToken(response.token);
        this._router.navigate(["/parties"]);
      },
      error: (error) => {
        this.isLoader = false;
        this._toastrService.error(error.error.msg ?? "Something went wrong");
        console.error(error);
      }
    });
  }
}
