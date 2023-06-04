export class User {
  id?: number;
  nombre!: string;
  apellido!: string;
  telefono!: number;
  descripcion!: string;
  estado?: boolean;
  createOn?: Date;
  finish?: Date;
}
