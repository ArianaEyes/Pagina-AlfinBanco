import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoServicio } from '../../Services/EmpleadoServicio';
import { Empleado } from '../../Model/empleado';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private router = inject(Router);
  private empleadoServicio = inject(EmpleadoServicio);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.obtenerEmpleado();
  }

  formEmpleados = this.fb.nonNullable.group({
    usuario: '',
    contrasenia: '',
  });
  empleados!: Empleado[];

  private obtenerEmpleado(): void {
    this.empleadoServicio.obtenerEmpleados().subscribe({
      next: (datos) => {
        this.empleados = datos;
      },
      error: (error) => {
        console.log('Error al obtener los empleados:', error);
      },
    });
  }

  comprobarEmpleado() {
    const { usuario, contrasenia } = this.formEmpleados.getRawValue();
    console.log(this.formEmpleados.getRawValue());
    const empleado = this.empleados.find((e) => {
      console.log('Comparando:', e.usuario, e.contrasenia, 'con ', usuario, contrasenia);

      if (e.usuario == usuario && e.contrasenia == contrasenia) {
        return true;
      }
      return false;
    });

    if (empleado && empleado.cargo == 'analista') {
      this.router.navigate(['/acceso']);
    } else if (empleado && empleado.cargo == 'administrador') {
      this.router.navigate(['/acceso-admin']);
    }
  }

}
