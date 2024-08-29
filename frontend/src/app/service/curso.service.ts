import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.service';

export interface Curso {
  id: number;
  nombre: string;
  usuarios?: Usuario[];
}

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:8002/api/v1.0/private/cursos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/`);
  }

  detalle(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  crear(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.apiUrl}/create`, curso);
  }

  actualizar(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/update/${id}`, curso);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  asignarUsuario(idCurso: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/asignar-usuario/${idCurso}`, usuario);
  }
}
