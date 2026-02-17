export class Empleado {
  empleado_id!: number;
  usuario!: string;
  contrasenia!: string;
  cargo!: string;
}

export type EmpleadoCrear = Omit<Empleado, 'empleado_id'>;
