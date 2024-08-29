import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CursoService, Curso } from './curso.service';
import { Usuario } from './usuario.service';

describe('CursoService', () => {
  let service: CursoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CursoService]
    });

    service = TestBed.inject(CursoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('Debe regresar una lista de cursos', () => {
    const dummyCursos: Curso[] = [
      { id: 1, nombre: 'Curso 1' },
      { id: 2, nombre: 'Curso 2' }
    ];

    service.listar().subscribe(cursos => {
      expect(cursos.length).toBe(2);
      expect(cursos).toEqual(dummyCursos);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCursos);
  });

  it('Debe regresar un solo curso por id', () => {
    const dummyCurso: Curso = { id: 1, nombre: 'Curso 1' };

    service.detalle(1).subscribe(curso => {
      expect(curso).toEqual(dummyCurso);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCurso);
  });

  it('Debe crear un nuevo curso', () => {
    const newCurso: Curso = { id: 3, nombre: 'Curso 3' };

    service.crear(newCurso).subscribe(curso => {
      expect(curso).toEqual(newCurso);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/create`);
    expect(req.request.method).toBe('POST');
    req.flush(newCurso);
  });

  it('Debe actualizar un curso existente', () => {
    const updatedCurso: Curso = { id: 1, nombre: 'Curso Actualizado' };

    service.actualizar(1, updatedCurso).subscribe(curso => {
      expect(curso).toEqual(updatedCurso);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/update/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCurso);
  });

  it('Debe eliminar un curso por id', () => {
    service.eliminar(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/delete/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
  
  it('Debe asignar un usuario a un curso', () => {
    const dummyUsuario: Usuario = { id: 1, nombre: 'Usuario 1', email: 'a@a.com', password: "123" };

    service.asignarUsuario(1, dummyUsuario).subscribe(usuario => {
      expect(usuario).toEqual(dummyUsuario);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/asignar-usuario/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyUsuario);
  });
});

