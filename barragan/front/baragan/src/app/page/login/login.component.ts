import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form!: FormGroup;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private serviceLogin: LoginService
  ) {
    console.log(environment.API_URI);
    this.allFuctionCons();
  }

  allFuctionCons() {
    this.crearForm();
  }

  crearForm() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    Object.values(this.form.controls).map((item) => {
      item.markAsTouched();
    });

    this.serviceLogin.login(this.form.value).subscribe(
      (res) => {
        this.router.navigate(['/home']);
      },
      () => {
        return this.Toast.fire({
          icon: 'error',
          title: 'Error, no se puedo iniciar Session.',
        });
      }
    );
  }

  verifiInput(name: string) {
    return this.form.get(name)?.invalid && this.form.get(name)?.touched;
  }
}
