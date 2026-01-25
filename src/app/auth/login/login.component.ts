import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loading = false;
  errorMessage: string ='';

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/movies']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Credenciales incorrectas';
        this.cdr.detectChanges();
      },
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
