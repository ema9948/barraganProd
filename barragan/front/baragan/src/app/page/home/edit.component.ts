import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CrudService } from 'src/app/services/crud.service';
import { User } from 'src/app/utils/User';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  loading: boolean = false;
  forma!: FormGroup;
  cliente!: User;
  private id!: number;

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
    private router: ActivatedRoute,
    private http: CrudService,
    private fb: FormBuilder
  ) {
    this.allFuction();
  }

  ngOnInit(): void {}

  allFuction() {
    this.getParam();
    this.getCliente();
  }

  getParam() {
    this.router.params.subscribe((param) => {
      const { id } = param;
      this.id = id;
    });
  }

  crearForm() {
    this.forma = this.fb.group({
      nombre: [this.cliente.nombre, [Validators.required]],
      apellido: [this.cliente.apellido, [Validators.required]],
      telefono: [this.cliente.telefono, [Validators.required]],
      descripcion: [this.cliente.descripcion, [Validators.required]],
    });
  }

  guardar() {
    this.patchClient(this.forma.value, this.id);
  }

  patchClient(usuario: User, id: number) {
    this.http.patchCliente(usuario, id).subscribe((res) => {
      if (res.ok) {
        this.forma.reset();
        this.Toast.fire({
          icon: 'success',
          title: 'Cliente  Editado.',
        });
      }
    });
  }

  getCliente() {
    this.http.allCliente().subscribe((res: User[]) => {
      this.cliente = res.filter((item) => item.id == this.id)[0];
      this.crearForm();
      this.loading = true;
    });
  }

  verifiInput(name: string) {
    return this.forma.get(name)?.invalid && this.forma.get(name)?.touched;
  }
}
