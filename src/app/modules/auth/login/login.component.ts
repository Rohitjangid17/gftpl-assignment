import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../core/services/auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // login user
  loginUser() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const success = this.auth.login(username!, password!);

      if (success) {
        this.router.navigate(['/parties']); // after login redirect
      }
    }
  }
}
