import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagen } from '../Model/imagen';
@Injectable({
  providedIn: 'root',
})
export class ImagenServicio {
  private url = 'http://localhost:8080/empresa-app/imagenes';

  private imagenHttp = inject(HttpClient);

  obtenerImagenes(): Observable<Imagen[]> {
    return this.imagenHttp.get<Imagen[]>(this.url);
  }
  obtenerEmpleadoPorId(empleado_id: number): Observable<Imagen> {
    return this.imagenHttp.get<Imagen>(`${this.url}/${empleado_id}`);
  }
}
