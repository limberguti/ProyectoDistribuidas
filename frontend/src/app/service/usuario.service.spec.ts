import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService, Usuario } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService]
    });

    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('Debe regresar la lista de usuarios', () => {
    const dummyUsuarios: Usuario[] = [
      { id: 1, nombre: 'Usuario 1', email: 'user1@example.com', password: 'password1' },
      { id: 2, nombre: 'Usuario 2', email: 'user2@example.com', password: 'password2' }
    ];

    service.listar().subscribe(usuarios => {
      expect(usuarios.length).toBe(2);
      expect(usuarios).toEqual(dummyUsuarios);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios);
  });

  it('Debe regresar un solo usuario por id', () => {
    const dummyUsuario: Usuario = { id: 1, nombre: 'Usuario 1', email: 'user1@example.com', password: 'password1' };

    service.detalle(1).subscribe(usuario => {
      expect(usuario).toEqual(dummyUsuario);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuario);
  });

  it('Debe crear un nuevo usuario', () => {
    const dummyUsuario: Usuario = { id: 3, nombre: 'Usuario 3', email: 'user3@example.com', password: 'password3' };

    service.crear(dummyUsuario).subscribe(usuario => {
      expect(usuario).toEqual(dummyUsuario);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/create`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUsuario);
  });

  it('Debe actualizar un usuario existente', () => {
    const dummyUsuario: Usuario = { id: 1, nombre: 'Updated Usuario', email: 'updated@example.com', password: 'updatedpassword' };

    service.actualizar(1, dummyUsuario).subscribe(usuario => {
      expect(usuario).toEqual(dummyUsuario);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/update/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyUsuario);
  });

  it('Debe eliminar un usuario por id', () => {
    service.eliminar(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/delete/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
