import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado, EmpleadoCrear } from '../Model/empleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoServicio {
  private url = 'http://localhost:8080/empresa-app/empleados';

  private empleadoHttp = inject(HttpClient);

  obtenerEmpleados(): Observable<Empleado[]> {
    return this.empleadoHttp.get<Empleado[]>(this.url);
  }

  agregarEmpleado(empleado: EmpleadoCrear): Observable<Empleado> {
    return this.empleadoHttp.post<Empleado>(this.url, empleado);
  }

  eliminarEmpleado(empleado_id: number): Observable<Empleado> {
    return this.empleadoHttp.delete<Empleado>(`${this.url}/${empleado_id}`);
  }

  obtenerEmpleadoPorId(empleado_id: number): Observable<Empleado> {
    return this.empleadoHttp.get<Empleado>(`${this.url}/${empleado_id}`);
  }

  guardarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.empleadoHttp.post<Empleado>(this.url, empleado);
  }
}
