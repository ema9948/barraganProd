import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { User } from 'src/app/utils/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
})
export class NuevoComponent {
  clients: User[] = [];
  estado: boolean = false;
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

  formData!: FormGroup;
  constructor(private http: CrudService, private fb: FormBuilder) {
    this.allFuction();
  }

  allFuction() {
    this.crearForm();
    this.allClients();
  }

  crearForm() {
    this.formData = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  guardar() {
    if (this.formData.invalid) {
      Object.values(this.formData.controls).forEach((item) => {
        item.markAsTouched();
      });
      return;
    }
    const { value } = this.formData;
    this.addCliente(value);
  }

  buscar(form: NgForm) {
    const { nombre, apellido } = form.value;
    if (!nombre) return;
    let result!: User[];

    result = this.clients.filter(
      (item) =>
        (item.nombre.toLowerCase() == nombre.toLowerCase() &&
          item.apellido.toLowerCase() == apellido.toLowerCase()) ||
        (!apellido.trim() && item.nombre.toLowerCase() == nombre.toLowerCase())
    );

    if (result.length == 0) {
      this.allClients();
      return this.Toast.fire({
        icon: 'error',
        title: 'No se encontraron resultados.',
      });
    }

    this.clients = result;

    return;
  }

  cambiarEstado(user: User) {
    this.http.patchClientFinish(user).subscribe((res) => {
      setTimeout(() => {
        this.allClients();
      }, 300);
    });
  }

  allClients() {
    this.http.allCliente().subscribe((res: User[]) => {
      this.clients = res.filter((item) => {
        if (!item.estado) return item;
        return;
      });
    });
  }

  addCliente(value: User) {
    this.http.addCliente(value).subscribe(
      (res) => {
        if (res.ok) {
          this.formData.reset();
          this.allClients();
          this.Toast.fire({
            icon: 'success',
            title: 'Cliente Agregado.',
          });
        }
      },
      (err) => {
        this.Toast.fire({
          icon: 'error',
          title: 'Error  al agregar cliente.',
        });
      }
    );
  }

  deleteCliente(usuario: User) {
    this.http.deleteCliente(usuario).subscribe(
      (res) => {
        if (res.ok) {
          this.allClients();
          this.Toast.fire({
            icon: 'success',
            title: 'Cliente Eliminado.',
          });
        }
      },
      (err) => console.log(err.ok)
    );
  }

  verifiInput(name: string) {
    return this.formData.get(name)?.invalid && this.formData.get(name)?.touched;
  }
}
