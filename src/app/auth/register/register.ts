import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  form!: FormGroup;
  loading = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(6)],
      confirmPassword: ['', Validators.required],
    },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched
      return;
    }
    
    const { email, password } = this.form.value;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Registro exitoso. Puedes iniciar sesión ahora.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error en el registro';
        this.cdr.detectChanges();
      },
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
