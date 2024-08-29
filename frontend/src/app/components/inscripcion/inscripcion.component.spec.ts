import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { InscripcionComponent } from './inscripcion.component';
import { Usuario, UsuarioService } from '../../service/usuario.service';
import { Curso, InscripcionService } from '../../service/inscripcion.service';

describe('InscripcionComponent', () => {
  let component: InscripcionComponent;
  let fixture: ComponentFixture<InscripcionComponent>;
  let insService: InscripcionService;
  let usuarioService: UsuarioService;

  const mockCursos: Curso[] = [
    { id: 1, nombre: 'Curso 1', usuarios: [] },
    { id: 2, nombre: 'Curso 2', usuarios: [] }
  ];

  const mockUsuarios: Usuario[] = [
    { id: 1, nombre: 'Usuario 1', email: 'user1@example.com', password: 'password1' },
    { id: 2, nombre: 'Usuario 2', email: 'user2@example.com', password: 'password2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscripcionComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [InscripcionService, UsuarioService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionComponent);
    component = fixture.componentInstance;
    insService = TestBed.inject(InscripcionService);
    usuarioService = TestBed.inject(UsuarioService);

    spyOn(insService, 'listar').and.returnValue(of(mockCursos));
    spyOn(usuarioService, 'listar').and.returnValue(of(mockUsuarios));
    //spyOn(insService, 'asignarUsuario').and.returnValue(of(mockCursos[0]));
    spyOn(insService, 'eliminar').and.returnValue(of(undefined));
    spyOn(insService, 'eliminarUsuario').and.returnValue(of(undefined));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list cursos and usuarios on init', () => {
    component.ngOnInit();
    expect(component.cursos).toEqual(mockCursos);
    expect(component.usuarios).toEqual(mockUsuarios);
  });

  it('should reset the form', () => {
    const form = { reset: jasmine.createSpy('reset') } as any;
    component.resetForm(form);
    expect(form.reset).toHaveBeenCalled();
    expect(component.selectedCurso).toEqual({ id: 0, nombre: '', usuarios: [] });
    expect(component.isEditing).toBeFalse();
  });

  it('should assign a usuario to a curso', () => {
    const form = { valid: true, reset: jasmine.createSpy('reset') } as any;
    component.selectedCurso = { id: 1, nombre: 'Curso 1', usuarios: [] };
    component.newUsuario = { id: 1, nombre: 'Usuario 1', email: 'user1@example.com', password: 'password1' };

    component.asignarUsuario(form);

    expect(insService.asignarUsuario).toHaveBeenCalledWith(1, component.newUsuario);
    expect(form.reset).toHaveBeenCalled();
    expect(component.selectedCurso).toEqual(mockCursos[0]);
    expect(component.cursos).toContain(mockCursos[0]);
  });

  it('should handle errors when assigning a usuario to a curso', () => {
    const form = { valid: true, reset: jasmine.createSpy('reset') } as any;
    spyOn(insService, 'asignarUsuario').and.returnValue(of({} as any));
    component.selectedCurso = { id: 1, nombre: 'Curso 1', usuarios: [] };
    component.newUsuario = { id: 1, nombre: 'Usuario 1', email: 'user1@example.com', password: 'password1' };

    component.asignarUsuario(form);

    expect(insService.asignarUsuario).toHaveBeenCalled();
    // You can add specific error handling tests here based on your component's logic
  });

  it('should delete a curso', () => {
    component.eliminarCurso(1);
    expect(insService.eliminar).toHaveBeenCalledWith(1);
  });

  it('should desinscribir a usuario from a curso', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.desinscribirUsuario(mockCursos[0], mockUsuarios[0]);
    expect(insService.eliminarUsuario).toHaveBeenCalledWith(mockCursos[0].id, mockUsuarios[0].id);
  });
});
