import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { UsuariosComponent } from './usuarios.component';
import { UsuarioService, Usuario } from '../../service/usuario.service';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  let usuarioService: UsuarioService;

  const mockUsuarios: Usuario[] = [
    { id: 1, nombre: 'Usuario 1', email: 'user1@example.com', password: 'password1' },
    { id: 2, nombre: 'Usuario 2', email: 'user2@example.com', password: 'password2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [UsuarioService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);

    spyOn(usuarioService, 'listar').and.returnValue(of(mockUsuarios));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list usuarios on init', () => {
    component.ngOnInit();
    expect(component.usuarios).toEqual(mockUsuarios);
  });

  it('should open modal for creating a new usuario', () => {
    component.openModal(false);
    expect(component.isEditing).toBeFalse();
    expect(component.showModal).toBeTrue();
  });

  it('should open modal for editing an existing usuario', () => {
    const usuario = mockUsuarios[0];
    component.openModal(true, usuario);
    expect(component.isEditing).toBeTrue();
    expect(component.selectedUsuario).toEqual(usuario);
    expect(component.showModal).toBeTrue();
  });

  it('should close modal', () => {
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });

  it('should create a new usuario', () => {
    const form = { valid: true, reset: jasmine.createSpy('reset') } as any;
    spyOn(usuarioService, 'crear').and.returnValue(of({} as Usuario));
    component.selectedUsuario = { id: 0, nombre: 'Nuevo Usuario', email: 'newuser@example.com', password: 'password' };

    component.crearUsuario(form);

    expect(usuarioService.crear).toHaveBeenCalledWith({ id: 0, nombre: 'Nuevo Usuario', email: 'newuser@example.com', password: 'password' });
    expect(form.reset).toHaveBeenCalled();
    expect(component.isEditing).toBeFalse();
    expect(component.showModal).toBeFalse();
  });

  it('should update an existing usuario', () => {
    const form = { valid: true, reset: jasmine.createSpy('reset') } as any;
    spyOn(usuarioService, 'actualizar').and.returnValue(of({} as Usuario));
    component.selectedUsuario = { id: 1, nombre: 'Usuario Actualizado', email: 'updateduser@example.com', password: 'password' };
    component.isEditing = true;

    component.crearUsuario(form);

    expect(usuarioService.actualizar).toHaveBeenCalledWith(1, component.selectedUsuario);
    expect(form.reset).toHaveBeenCalled();
    expect(component.isEditing).toBeFalse();
    expect(component.showModal).toBeFalse();
  });

  it('should delete a usuario', () => {
    spyOn(usuarioService, 'eliminar').and.returnValue(of(undefined));
    component.eliminarUsuario(1);

    expect(usuarioService.eliminar).toHaveBeenCalledWith(1);
  });

  it('should reset the form', () => {
    component.resetForm();

    expect(component.selectedUsuario).toEqual({ id: 0, nombre: '', email: '', password: '' });
    expect(component.isEditing).toBeFalse();
    expect(component.errorMessage).toBe('');
  });

  it('should validate nombre with only letters', () => {
    expect(component.validateNombre('Nombre Valido')).toBeTrue();
    expect(component.validateNombre('Nombre 123')).toBeFalse();
  });

  it('should prevent non-letter characters in nombre input', () => {
    const event = { charCode: 48, preventDefault: jasmine.createSpy('preventDefault') } as any;
    component.allowOnlyLetters(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
