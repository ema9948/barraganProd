import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { User } from 'src/app/utils/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent {
  forma!: FormGroup;
  clients!: User[];
  clientFilter!: User[];

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

  constructor(private http: CrudService, private fb: FormBuilder) {
    this.allFuction();
  }

  crearForm() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
    });
  }

  buscar() {
    const { value } = this.forma;
    let client!: User[];

    if (!value.nombre.trim()) return this.allClients();

    client = this.clients.filter(
      (item) =>
        (item.nombre.toLowerCase() == value.nombre.toLowerCase() &&
          item.apellido.toLowerCase() == value.apellido.toLowerCase()) ||
        (!value.apellido.trim() &&
          item.nombre.toLowerCase() == value.nombre.toLowerCase())
    );

    if (client.length > 0) return (this.clientFilter = client);

    if (client.length == 0) {
      this.allClients();
      return this.Toast.fire({
        icon: 'error',
        title: 'No se encontraron resultados.',
      });
    }
  }

  allFuction() {
    this.allClients();
    this.crearForm();
  }

  allClients() {
    this.http.allCliente().subscribe((res: User[]) => {
      this.clients = res.filter((item) => item.estado);
      this.clientFilter = res.filter((item) => item.estado);
    });
  }

  deleteCliente(usuario: User) {
    this.http
      .deleteCliente(usuario)
      .subscribe((res) => res.ok && this.allClients());
  }

  verifiInput(name: string) {
    return this.forma.get(name)?.invalid && this.forma.get(name)?.touched;
  }
}
