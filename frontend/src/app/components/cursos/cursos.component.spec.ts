import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { CursosComponent } from './cursos.component';
import { CursoService, Curso } from '../../service/curso.service';
import { UsuarioService, Usuario } from '../../service/usuario.service';

describe('CursosComponent', () => {
  let component: CursosComponent;
  let fixture: ComponentFixture<CursosComponent>;
  let cursoService: CursoService;
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
      declarations: [CursosComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [CursoService, UsuarioService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosComponent);
    component = fixture.componentInstance;
    cursoService = TestBed.inject(CursoService);
    usuarioService = TestBed.inject(UsuarioService);

    spyOn(cursoService, 'listar').and.returnValue(of(mockCursos));
    spyOn(usuarioService, 'listar').and.returnValue(of(mockUsuarios));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list cursos on init', () => {
    component.ngOnInit();
    expect(component.cursos).toEqual(mockCursos);
  });

  it('should list usuarios on init', () => {
    component.ngOnInit();
    expect(component.usuarios).toEqual(mockUsuarios);
  });

  it('should create a new curso', () => {
    const form = { valid: true, reset: jasmine.createSpy('reset') } as any;
    spyOn(cursoService, 'crear').and.returnValue(of({} as Curso));
    component.selectedCurso = { id: 20, nombre: 'Nuevo Curso',usuarios: [] };

    component.crearCurso(form);

    expect(cursoService.crear).toHaveBeenCalledWith(component.selectedCurso);
    expect(form.reset).toHaveBeenCalled();
    expect(component.isEditing).toBeFalse();
    expect(component.showModal).toBeFalse();
  });

  
  /*it('should update an existing curso', () => {
    const form = { valid: true, reset: jasmine.createSpy('reset') } as any;
    spyOn(cursoService, 'actualizar').and.returnValue(of({} as Curso));
    
    // Configurar los valores correctos para el curso y isEditing
    component.selectedCurso = { id: 0, nombre: 'Curso Actualizado', usuarios: [] };
    component.isEditing = true;
  
    component.crearCurso(form);
  
    expect(cursoService.actualizar).toHaveBeenCalledWith(1, component.selectedCurso);
    expect(form.reset).toHaveBeenCalled();
    expect(component.isEditing).toBeFalse();
    expect(component.showModal).toBeFalse();
  });
  */

  it('should edit a curso', () => {
    const curso = mockCursos[0];
    component.editarCurso(curso);

    expect(component.selectedCurso).toEqual(curso);
    expect(component.isEditing).toBeTrue();
    expect(component.showModal).toBeTrue();
  });

  it('should delete a curso', () => {
    spyOn(cursoService, 'eliminar').and.returnValue(of(undefined));
    component.eliminarCurso(1);

    expect(cursoService.eliminar).toHaveBeenCalledWith(1);
  });

  it('should reset the form', () => {
    const form = { reset: jasmine.createSpy('reset') } as any;
    component.resetForm(form);

    expect(form.reset).toHaveBeenCalled();
    expect(component.selectedCurso).toEqual({ id: 0, nombre: '', usuarios: [] });
    expect(component.isEditing).toBeFalse();
  });

  it('should open the modal', () => {
    component.openModal(true);

    expect(component.isEditing).toBeTrue();
    expect(component.showModal).toBeTrue();
  });

  it('should close the modal', () => {
    component.closeModal();

    expect(component.showModal).toBeFalse();
  });
});
